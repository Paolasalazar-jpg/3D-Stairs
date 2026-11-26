import sys, json, struct, gzip, base64, collections

MATTE = {'BEIGE_MATTE', 'WHITE_MATTE', 'PALE_WHITE_MATTE'}
path, out, key_n = sys.argv[1], sys.argv[2], (sys.argv[3] == 'vn') if len(sys.argv) > 3 else False

V, VT, VN = [], [], []
prims = collections.OrderedDict()  # (obj, mat) -> list of faces
obj = mat = None
for line in open(path):
    if line.startswith('v '): V.append(tuple(map(float, line.split()[1:4])))
    elif line.startswith('vt '): VT.append(tuple(map(float, line.split()[1:3])))
    elif line.startswith('vn '): VN.append(tuple(map(float, line.split()[1:4])))
    elif line.startswith('o '): obj = line[2:].strip()
    elif line.startswith('usemtl '): mat = line[7:].strip()
    elif line.startswith('f '):
        f = []
        for t in line.split()[1:]:
            p = t.split('/')
            f.append((int(p[0]) - 1, int(p[1]) - 1 if len(p) > 1 and p[1] else -1, int(p[2]) - 1 if len(p) > 2 and p[2] else -1))
        prims.setdefault((obj, mat), []).append(f)

# object -> part name
faces_per_obj = collections.Counter()
for (o, m), fs in prims.items(): faces_per_obj[o] += len(fs)
def part(o, m):
    if o.startswith('Giron_Tread'): return 'tread' if faces_per_obj[o] > 2000 else 'sidebullnose'
    if o.startswith('Contremarche_Riser'): return 'riser'
    if o.startswith('Bracket_Top_H'): return 'lclip'
    if o.startswith('Cube'):
        mats = {mm for (oo, mm) in prims if oo == o}
        return 'risercap' if 'WHITE_MATTE' in mats else 'bullnosecap'
    raise SystemExit('unknown object ' + o)

mn = [min(v[k] for v in V) for k in range(3)]
mx = [max(v[k] for v in V) for k in range(3)]

def planar(arr):
    lo = bytes(a & 255 for a in arr); hi = bytes(a >> 8 for a in arr)
    return lo + hi
def delta(arr, stride):
    return [(arr[i] - (arr[i - stride] if i >= stride else 0)) & 65535 for i in range(len(arr))]

head = {'min': mn, 'max': mx, 'prims': []}
blobs = []
for (o, m), fs in prims.items():
    wood = m not in MATTE
    vmap, pos, uvs, idx = {}, [], [], []
    def vid(c):
        k = (c[0], c[1] if wood else -1, c[2] if key_n else -1)
        if k not in vmap:
            vmap[k] = len(vmap); pos.append(V[c[0]]); uvs.append(VT[c[1]] if wood else None)
        return vmap[k]
    for f in fs:
        ids = [vid(c) for c in f]
        for i in range(1, len(ids) - 1): idx += [ids[0], ids[i], ids[i + 1]]
    if len(vmap) > 65535: raise SystemExit('too many verts')
    q = []
    for p in pos:
        for k in range(3): q.append(round((p[k] - mn[k]) / (mx[k] - mn[k]) * 65535))
    pr = {'n': part(o, m), 'm': m, 'v': len(pos), 'i': len(idx)}
    blob = planar(delta(q, 3))
    if wood:
        umin = [min(u[a] for u in uvs) for a in range(2)]; umax = [max(u[a] for u in uvs) for a in range(2)]
        qu = []
        for u in uvs:
            for a in range(2): qu.append(round((u[a] - umin[a]) / ((umax[a] - umin[a]) or 1) * 65535))
        blob += planar(delta(qu, 2)); pr['u'] = [umin, umax]; pr['w'] = 1
    blob += planar(delta(idx, 1))
    head['prims'].append(pr); blobs.append(blob)
    print(pr['n'], m, pr['v'], 'verts', pr['i'] // 3, 'tris', file=sys.stderr)

js = json.dumps(head, separators=(',', ':')).encode()
raw = struct.pack('<I', len(js)) + js + b''.join(blobs)
b64 = base64.b64encode(gzip.compress(raw, 9, mtime=0)).decode()
open(out, 'w').write(b64)
print('b64 length', len(b64), file=sys.stderr)
