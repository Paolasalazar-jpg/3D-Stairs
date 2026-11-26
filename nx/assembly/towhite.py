"""NuStairz assembly renders (ProRes, black background, premultiplied) -> white background H.264.
Solid interior keeps its colour exactly; only the 1-3 px anti-aliased edge gets a proper alpha,
estimated against the neighbouring solid colour, so edges have no dark fringe and shadows stay intact."""
import subprocess, sys, numpy as np
from scipy import ndimage as nd
src, dst = sys.argv[1], sys.argv[2]
W, H = 1920, 1080
dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb48le', '-'], stdout=subprocess.PIPE)
enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', '30000/1001', '-i', '-',
                        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', dst], stdin=subprocess.PIPE)
n, fb = 0, W * H * 6
while True:
    buf = dec.stdout.read(fb)
    if len(buf) < fb: break
    c = np.frombuffer(buf, np.uint16).reshape(H, W, 3).astype(np.float32) / 257.0
    m = c.max(2)
    obj = m > 0.5
    solid = nd.binary_erosion(obj, iterations=2)
    ref = nd.maximum_filter(np.where(solid, m, 0), size=9)
    a = np.where(ref > 0, np.clip(m / np.maximum(ref, 1e-3), 0, 1), np.clip(m / 40.0, 0, 1))
    a[solid] = 1.0
    out = np.clip(c + (1 - a[..., None]) * 255.0, 0, 255).round().astype(np.uint8)
    enc.stdin.write(out.tobytes()); n += 1
enc.stdin.close(); enc.wait(); dec.wait()
print(dst, n, 'frames')
