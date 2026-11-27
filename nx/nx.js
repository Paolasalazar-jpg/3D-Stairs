/* NuStairz product pages: 3D explorer bundle. Loaded from the Squarespace footer.
   Does nothing unless the page has section#p-hero. */
(function () {
if (window.__nxBundle) return; window.__nxBundle = 1;
var BASE = (document.currentScript && document.currentScript.src || '').replace(/[^\/]*$/, ''); window.__nxBase = BASE;
function boot() {
if (!document.querySelector('section#p-hero')) return;
var st = document.createElement('style'); st.id = 'nx-css'; st.textContent = ".nx { width: 100%; font-family: inherit; color: #1d1d1f; }\nbody.ns-nx-page .ns-ymal { display: none !important; }\nbody.ns-nx-page section#p-colours { display: none !important; }\nbody:not(.sqs-edit-mode-active) section#p-explore { display: none !important; }\n.nx-title { text-align: center; margin: 0 0 clamp(18px, 2.6vw, 36px) !important; }\n\n/* panel: big centred 3D on top, a centred row of pills underneath */\n.nx-panel { position: relative; background: #f5f5f7; border-radius: 28px; height: clamp(560px, 52vw, 860px); overflow: hidden; display: flex; flex-direction: column; }\n.nx-stage { position: relative; flex: 1 1 auto; min-height: 0; }\n.nx-stage canvas { position: absolute; inset: 0; width: 100% !important; height: 100% !important; display: block; cursor: grab; touch-action: pan-y; transition: opacity .4s ease; }\n.nx-stage canvas:active { cursor: grabbing; }\n.nx-video { position: absolute; top: 3%; left: 4%; width: 92%; height: calc(97% - var(--nx-cardh, 0px)); transition: opacity .4s ease, height .3s ease; object-fit: contain; mix-blend-mode: multiply; opacity: 0; pointer-events: none; }\n.nx-panel.is-video .nx-video { opacity: 1; }\n.nx-panel.is-video canvas { opacity: 0; pointer-events: none; }\n.nx-hint { position: absolute; left: 50%; top: 16px; transform: translateX(-50%); font-size: 13px; color: #86868b; pointer-events: none; transition: opacity .4s ease; white-space: nowrap; }\n.nx-panel.is-open .nx-hint, .nx-panel.was-dragged .nx-hint { opacity: 0; }\n\n.nx-nav { position: relative; flex: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; padding: 6px clamp(14px, 1.8vw, 24px) clamp(18px, 2vw, 26px); z-index: 2; }\n.nx-item { flex: none; }\n.nx-pill { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 7px; height: 42px; padding: 0 14px 0 8px; border-radius: 21px; background: #e8e8ed; font-size: 14px; font-weight: 600; letter-spacing: -0.01em; line-height: 1; color: #1d1d1f; cursor: pointer; white-space: nowrap; transition: background .2s ease, color .2s ease; }\n.nx-pill:hover { background: #dedee3; }\n.nx-pill:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n.nx-item.is-active .nx-pill { background: #1d1d1f; color: #fff; }\n.nx-item.is-active .nx-ic { border-color: #fff; }\n.nx-ic { width: 22px; height: 22px; border: 1.5px solid currentColor; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; flex: none; }\n.nx-ic svg, .nx-close svg, .nx-arrow svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }\n.nx-item.is-active .nx-ic svg { transform: rotate(45deg); }\n.nx-ic svg { transition: transform .3s ease; }\n.nx-dot { width: 22px; height: 22px; border-radius: 50%; background: #c9b79c center / cover; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); flex: none; }\n\n/* text card: floats over the bottom-left of the 3D, just above the row */\n.nx-body { display: none; }\n.nx-panel.is-open .nx-item.is-active .nx-body { display: block; position: absolute; left: 0; right: 0; margin: 0 auto; bottom: calc(100% + 6px); width: min(460px, calc(100% - 48px)); box-sizing: border-box; background: rgba(255,255,255,.86); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); border-radius: 24px; padding: 20px 26px; box-shadow: 0 6px 30px rgba(0,0,0,.06); font-size: 16px; line-height: 1.47; letter-spacing: -0.01em; color: #1d1d1f; text-align: center; animation: nxIn .45s ease; white-space: normal; }\n.nx-body p { margin: 0; color: #1d1d1f !important; font-size: 16px !important; line-height: 1.47 !important; }\n.nx-body b { font-weight: 600; }\n@keyframes nxIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }\n\n.nx-sw { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 16px; }\n.nx-sw a { display: block; width: 34px; height: 34px; border-radius: 50%; background: none !important; padding: 0 !important; cursor: pointer; position: relative; text-decoration: none !important; transition: transform .2s ease; }\n.nx-sw a:hover { transform: scale(1.08); }\n.nx-swi { display: block; width: 100%; height: 100%; border-radius: 50%; background: #ccc center / cover no-repeat; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); }\n.nx-sw a.is-on::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 2px solid #1d1d1f; }\n.nx-swname { margin-top: 12px; font-size: 14px; color: #6e6e73; min-height: 1.3em; }\n\n.nx-close, .nx-arrow { all: unset; box-sizing: border-box; width: 36px; height: 36px; border-radius: 50%; background: #e8e8ed; color: #1d1d1f; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: background .2s ease, opacity .3s ease; }\n.nx-close:hover, .nx-arrow:hover { background: #dedee3; }\n.nx-close { position: absolute; top: 22px; right: 22px; opacity: 0; pointer-events: none; z-index: 3; }\n.nx-arrows { position: absolute; top: 22px; right: 68px; display: flex; gap: 8px; opacity: 0; pointer-events: none; z-index: 3; transition: opacity .3s ease; }\n.nx-panel.is-open .nx-close, .nx-panel.is-open .nx-arrows { opacity: 1; pointer-events: auto; }\n\n@media (max-width: 767px) {\n.nx-panel { height: auto; border-radius: 22px; padding-bottom: 18px; display: block; }\n.nx-stage { height: 78vw; max-height: 460px; }\n.nx-hint { display: none; }\n.nx-nav { flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; padding: 4px 18px 6px; scrollbar-width: none; }\n.nx-nav::-webkit-scrollbar { display: none; }\n.nx-pill { height: 40px; font-size: 14px; padding: 0 14px 0 8px; }\n.nx-ic, .nx-dot { width: 22px; height: 22px; }\n.nx-panel.is-open .nx-nav { display: block; overflow: visible; padding: 4px 18px 0; }\n.nx-panel.is-open .nx-item { display: none; }\n.nx-panel.is-open .nx-item.is-active { display: block; }\n.nx-panel.is-open .nx-item.is-active .nx-pill { display: none; }\n.nx-panel.is-open .nx-item.is-active .nx-body { position: static; width: auto; background: #e8e8ed; -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none; padding: 20px 22px; border-radius: 22px; font-size: 15px; }\n.nx-body p { font-size: 15px !important; }\n.nx-arrows { position: static; justify-content: center; margin-top: 14px; display: none; }\n.nx-panel.is-open .nx-arrows { display: flex; }\n.nx-close { top: 14px; right: 14px; }\n}\nbody:not(.sqs-edit-mode-active) .ns-nx-hide { display: none !important; }\nbody.sqs-edit-mode-active .ns-nx-block { display: none !important; }\n.ns-nx-block { width: 100%; max-width: 1240px; margin: clamp(14px, 2vw, 28px) auto 0; padding: 0 clamp(12px, 2vw, 24px); box-sizing: border-box; position: relative; z-index: 1; }\n/* announcement bar: orange elsewhere, eases to the site blue on product pages */\n.sqs-announcement-bar { transition: background-color .9s ease !important; }\nhtml.ns-annc-blue .sqs-announcement-bar { background-color: rgb(28, 69, 144) !important; }\n.nx-gsw { position: relative; z-index: 2; width: 100%; box-sizing: border-box; text-align: center; padding: 18px 16px 28px; }\n.nx-gsw .nx-sw { margin-top: 0; }\n.nx-gsw .nx-swname { margin-top: 10px; }\n"; document.head.appendChild(st);
setTimeout(function () { document.documentElement.classList.add('ns-annc-blue'); }, 350);
if (!window.NS3D_DATA) fetch(BASE + 'model.b64').then(function (r) { return r.text(); }).then(function (t) { window.NS3D_DATA = t.trim(); }).catch(function (e) { console.error('NS3D data', e); });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
/* NuStairz "Take a closer look" 3D explorer (new product page design).
   Needs window.NS3D_DATA (the stair model, packed) and three.js from jsDelivr. */
(function () {
if (window.NS3D) return;
var THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';

var PARTS = [
{ id: 'colours', label: 'Colours', text: 'Seven wood-look finishes, from soft greys to rich browns. Pick one to see that colour.' },
{ id: 'tread', label: 'Stair Tread', meshes: ['tread'], text: '48″ × 12.2″ (1220 × 310 mm). A waterproof vinyl tread with a rounded nose that fits over your existing step.' },
{ id: 'riser', label: 'Reversible Riser', meshes: ['riser'], text: '48″ × 7.5″ (1220 × 190 mm). Wood look on one side, clean white on the other. Flip it to suit your space.' },
{ id: 'sidebullnose', label: 'Side Bullnose', meshes: ['sidebullnose'], dir: [-0.9, 0.55, 1], text: 'Finishes the open side of the step with the same rounded profile as the tread nose.' },
{ id: 'bullnosecap', label: 'Side Bullnose End Cap', meshes: ['bullnosecap'], dir: [-1, 0.4, 0.5], text: 'Closes the end of the side bullnose for a clean, finished corner.' },
{ id: 'risercap', label: 'Riser End Cap', meshes: ['risercap'], dir: [-0.5, 0.3, 1], text: 'Covers the open edge of the riser so no cut edge shows.' },
{ id: 'lclip', label: 'L-Clips', meshes: ['lclip'], dir: [-0.9, 0.7, 0.8], text: 'Two L-shaped clips hold the side bullnose firmly against the tread.' },
{ id: 'assembly', label: 'Assembly', text: 'See how every piece comes together on the step.' }
];

var MAT = { BEIGE_MATTE: 0xe6dfcf, WHITE_MATTE: 0xf4f4f2, PALE_WHITE_MATTE: 0xebe7dc };
function isWood(p) { return p.w ? true : !(p.m in MAT); }

function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

async function unpack(b64) {
var bin = Uint8Array.from(atob(b64), function (c) { return c.charCodeAt(0); });
var ds = new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'));
var buf = await new Response(ds).arrayBuffer();
var dv = new DataView(buf), n = dv.getUint32(0, true);
var head = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 4, n)));
var off = 4 + n, out = [], u8 = new Uint8Array(buf);
function dec(count, stride) {
var r = new Uint16Array(count);
for (var i = 0; i < count; i++) r[i] = u8[off + i] | (u8[off + count + i] << 8);
for (var k = stride; k < count; k++) r[k] = (r[k] + r[k - stride]) & 65535;
off += count * 2; return r;
}
head.prims.forEach(function (p) {
var q = dec(p.v * 3, 3), pos = new Float32Array(p.v * 3);
for (var i = 0; i < p.v * 3; i++) { var k = i % 3; pos[i] = head.min[k] + q[i] / 65535 * (head.max[k] - head.min[k]); }
var uv = null, wood = isWood(p);
if (wood) {
var qu = dec(p.v * 2, 2); uv = new Float32Array(p.v * 2);
for (var j = 0; j < p.v * 2; j++) { var a = j % 2; uv[j] = p.u[0][a] + qu[j] / 65535 * (p.u[1][a] - p.u[0][a]); }
}
out.push({ name: p.n, mat: p.m, wood: wood, pos: pos, uv: uv, idx: dec(p.i, 1) });
});
return out;
}

window.NS3D = async function (mount, opts) {
opts = opts || {};
if (opts.texts) opts.texts.forEach(function (t, i) { if (PARTS[i] && t) { if (t.label) PARTS[i].label = t.label; if (t.text != null) PARTS[i].text = t.text; } });
var colours = opts.colours || [];
var cur = Math.max(0, colours.findIndex(function (c) { return c.current; }));

/* ---------- markup ---------- */
var root = el('div', 'nx');
var panel = el('div', 'nx-panel');
var stage = el('div', 'nx-stage');
var nav = el('div', 'nx-nav');
var hint = el('div', 'nx-hint', 'Drag to turn');
var close = el('button', 'nx-close', '<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>');
close.type = 'button'; close.setAttribute('aria-label', 'Close');
var arrows = el('div', 'nx-arrows',
'<button type="button" class="nx-arrow" data-d="-1" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>' +
'<button type="button" class="nx-arrow" data-d="1" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>');
stage.appendChild(hint);
panel.appendChild(stage); panel.appendChild(nav); panel.appendChild(close); panel.appendChild(arrows);
if (opts.title) { var ht = el('h2', 'nx-title'); ht.textContent = opts.title; root.appendChild(ht); }
root.appendChild(panel);
mount.appendChild(root);

var items = PARTS.map(function (p, i) {
var it = el('div', 'nx-item');
var ic = p.id === 'colours' ? '<span class="nx-dot"></span>' : '<span class="nx-ic"><svg viewBox="0 0 24 24"><path d="M12 7v10M7 12h10"/></svg></span>';
var btn = el('button', 'nx-pill', ic + '<span>' + p.label + '</span>'); btn.type = 'button';
var body = el('div', 'nx-body');
var txt = '<p><b>' + p.label + '.</b> ' + p.text + '</p>';
if (p.id === 'colours' && colours.length) {
txt += '<div class="nx-sw">' + colours.map(function (c, k) {
return '<a data-k="' + k + '" href="' + (c.url || '#') + '" aria-label="' + c.name + '" title="' + c.name + '"><i class="nx-swi" style="background-image:url(\'' + c.img + '\') !important"></i></a>';
}).join('') + '</div><div class="nx-swname"></div>';
}
body.innerHTML = txt;
it.appendChild(btn); it.appendChild(body); nav.appendChild(it);
btn.addEventListener('click', function () { if (state.part === p) shut(); else open(i); });
return { p: p, it: it, btn: btn, body: body };
});
var state = { part: null, anim: false };

/* ---------- 3D ---------- */
var THREE = await import(THREE_URL);
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: !!opts.test });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
stage.insertBefore(renderer.domElement, stage.firstChild);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, 1, 0.01, 50);
scene.add(new THREE.HemisphereLight(0xffffff, 0xd9d4cc, 1.6));
var key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(2, 4, 3); scene.add(key);
var fill = new THREE.DirectionalLight(0xffffff, 0.6); fill.position.set(-3, 1.5, -1); scene.add(fill);

var model = new THREE.Group(); scene.add(model);
var tex = new THREE.TextureLoader(); tex.crossOrigin = 'anonymous';
var woodMats = [];
function loadWood(url) {
if (!url) return;
tex.load(url, function (t) {
t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping;
t.anisotropy = renderer.capabilities.getMaxAnisotropy();
woodMats.forEach(function (m) { if (m.map) m.map.dispose(); m.map = t.clone(); m.map.needsUpdate = true; m.needsUpdate = true; });
});
}

var prims = await unpack(opts.data || window.NS3D_DATA);
var groups = {};
prims.forEach(function (p) {
var g = new THREE.BufferGeometry();
g.setAttribute('position', new THREE.BufferAttribute(p.pos, 3));
if (p.uv) g.setAttribute('uv', new THREE.BufferAttribute(p.uv, 2));
g.setIndex(new THREE.BufferAttribute(p.idx, 1));
g.computeVertexNormals();
var m = p.wood
? new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.62, metalness: 0 })
: new THREE.MeshStandardMaterial({ color: MAT[p.mat] || 0xeeeeee, roughness: 0.8, metalness: 0 });
if (p.wood) woodMats.push(m);
m.transparent = true;
var mesh = new THREE.Mesh(g, m);
mesh.userData.part = p.name;
(groups[p.name] = groups[p.name] || []).push(mesh);
model.add(mesh);
});
/* centre the model */
var box = new THREE.Box3().setFromObject(model), ctr = box.getCenter(new THREE.Vector3());
model.children.forEach(function (c) { c.position.sub(ctr); });
var size = box.getSize(new THREE.Vector3()).length();

var VIEW_DIR = new THREE.Vector3(opts.vx == null ? 0.8 : opts.vx, opts.vy == null ? 0.45 : opts.vy, 1).normalize();
var view = { target: new THREE.Vector3(), dist: size * 1.55, yaw: 0, pitch: 0, dir: VIEW_DIR.clone(), shift: 0 };
var goal = { target: new THREE.Vector3(), dist: view.dist, yaw: 0, pitch: 0, dir: VIEW_DIR.clone(), shift: 0 };

/* share of the stage height covered by the centred text card, so zooms frame the part in the space above it */
function cardShare() {
if (!state.part || window.innerWidth < 768 || state.part.id === 'assembly') return 0;
var b = items[state.i] && items[state.i].body, h = stage.clientHeight;
return b && h ? Math.min(0.5, (b.offsetHeight + 12) / h) : 0;
}
function frame(names, dir) {
goal.dir.copy(dir ? new THREE.Vector3(dir[0], dir[1], dir[2]).normalize() : VIEW_DIR);
var b = new THREE.Box3();
model.children.forEach(function (c) { if (!names || names.indexOf(c.userData.part) > -1) b.expandByObject(c); });
var t = b.getCenter(new THREE.Vector3());
var share = cardShare(); goal.shift = share / 2;
var f = goal.dir.clone(), r = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), f).normalize(), u = new THREE.Vector3().crossVectors(f, r);
var tv = Math.tan(camera.fov * Math.PI / 360) * (1 - share), th = Math.tan(camera.fov * Math.PI / 360) * camera.aspect, m = names ? (names[0] === 'tread' || names[0] === 'riser' ? 0.92 : 0.42) : 1.3, d = 0, c = new THREE.Vector3();
for (var i = 0; i < 8; i++) {
c.set(i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z).sub(t);
d = Math.max(d, c.dot(f) + Math.abs(c.dot(r)) / (th * m), c.dot(f) + Math.abs(c.dot(u)) / (tv * m));
}
goal.target.copy(t); goal.dist = Math.max(d, 0.12); goal.yaw = 0; goal.pitch = 0;
}
function highlight(names, small) {
model.children.forEach(function (c) { c.userData.op = (!names || names.indexOf(c.userData.part) > -1) ? 1 : (small ? 0.05 : 0.1); });
}

/* drag to turn */
var drag = null;
renderer.domElement.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, yaw: goal.yaw, pitch: goal.pitch }; renderer.domElement.setPointerCapture(e.pointerId); });
renderer.domElement.addEventListener('pointermove', function (e) {
if (!drag) return;
goal.yaw = drag.yaw + (e.clientX - drag.x) * 0.008;
goal.pitch = Math.max(-0.5, Math.min(0.6, drag.pitch + (e.clientY - drag.y) * 0.006));
if (Math.abs(e.clientX - drag.x) > 6) panel.classList.add('was-dragged');
});
['pointerup', 'pointercancel'].forEach(function (t) { renderer.domElement.addEventListener(t, function () { drag = null; }); });

var W = 1, H = 1;
function resize() {
var w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
W = w; H = h;
renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
frame(state.part && state.part.meshes || null, state.part && state.part.dir);
if (!state.anim) { view.dist = goal.dist; view.target.copy(goal.target); view.shift = goal.shift; }
}
var tmp = new THREE.Vector3(), q = new THREE.Quaternion(), e3 = new THREE.Euler();
function render() {
var k = state.snap ? 1 : 0.085;
view.target.lerp(goal.target, k); view.dist += (goal.dist - view.dist) * k;
view.yaw += (goal.yaw - view.yaw) * k; view.pitch += (goal.pitch - view.pitch) * k;
view.shift += (goal.shift - view.shift) * k;
e3.set(-view.pitch, view.yaw, 0, 'YXZ'); q.setFromEuler(e3);
view.dir.lerp(goal.dir, k).normalize(); tmp.copy(view.dir).applyQuaternion(q).multiplyScalar(view.dist).add(view.target);
camera.position.copy(tmp); camera.lookAt(view.target);
if (Math.abs(view.shift) > 0.001) camera.setViewOffset(W, H, 0, view.shift * H, W, H); else camera.clearViewOffset();
model.children.forEach(function (c) {
var o = c.userData.op == null ? 1 : c.userData.op;
c.material.opacity += (o - c.material.opacity) * (state.snap ? 1 : 0.12);
c.material.depthWrite = c.material.opacity > 0.9;
});
renderer.render(scene, camera);
}
var running = true;
(function loop() { if (running) render(); requestAnimationFrame(loop); })();
if (window.IntersectionObserver) new IntersectionObserver(function (en) { running = en[0].isIntersecting; }).observe(panel);
new ResizeObserver(resize).observe(stage); resize();

/* assembly video */
var vid = null;
function showVideo(on) {
if (on && !vid && opts.video) {
vid = el('video', 'nx-video'); vid.src = opts.video; vid.muted = true; vid.loop = true; vid.playsInline = true;
vid.setAttribute('playsinline', ''); stage.appendChild(vid);
}
panel.classList.toggle('is-video', !!on);
if (vid) { if (on) { vid.currentTime = 0; vid.play().catch(function () {}); } else vid.pause(); }
}

/* colours: each swatch links to that colour's page; the model shows this page's colour */
var dot = root.querySelector('.nx-dot'), nm = root.querySelector('.nx-swname');
function setColour(k) {
var c = colours[k]; if (!c) return; cur = k;
if (dot) dot.style.setProperty('background-image', 'url(\'' + c.img + '\')', 'important');
root.querySelectorAll('.nx-sw a').forEach(function (b, i) { b.classList.toggle('is-on', i === k); });
if (nm) nm.textContent = c.name;
loadWood(c.tex || c.img);
}
root.querySelectorAll('.nx-sw a').forEach(function (b) {
var k = +b.dataset.k, c = colours[k];
b.addEventListener('mouseenter', function () { if (nm) nm.textContent = c.name; });
b.addEventListener('mouseleave', function () { if (nm && colours[cur]) nm.textContent = colours[cur].name; });
b.addEventListener('click', function (e) {
if (k === cur || !c.url) { e.preventDefault(); setColour(k); return; }
try { sessionStorage.setItem('nx-open', 'colours'); } catch (err) {}
setColour(k);
});
});
setColour(cur);

/* open / close */
function open(i) {
var p = PARTS[i]; state.part = p; state.i = i; state.anim = true;
panel.classList.add('is-open');
items.forEach(function (o, k) { o.it.classList.toggle('is-active', k === i); });
showVideo(p.id === 'assembly');
highlight(p.meshes || null, !!p.dir); frame(p.meshes || null, p.dir);
requestAnimationFrame(function () {
if (state.part !== p) return;
frame(p.meshes || null, p.dir);
var b = items[i].body; panel.style.setProperty('--nx-cardh', window.innerWidth >= 768 && b.offsetHeight ? (b.offsetHeight + 12) + 'px' : '0px');
});
}
function shut() {
state.part = null; panel.classList.remove('is-open');
items.forEach(function (o) { o.it.classList.remove('is-active'); });
showVideo(false); highlight(null); frame(null);
}
close.addEventListener('click', shut);
arrows.querySelectorAll('.nx-arrow').forEach(function (a) {
a.addEventListener('click', function () { if (state.part) open((state.i + (+a.dataset.d) + PARTS.length) % PARTS.length); });
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.part) shut(); });

frame(null); highlight(null); state.snap = true; render(); state.snap = false;
root.classList.add('is-ready');
var openColours = false;
try { openColours = sessionStorage.getItem('nx-open') === 'colours'; sessionStorage.removeItem('nx-open'); } catch (err) {}
if (openColours) open(0);
return { open: open, shut: shut, setColour: setColour, render: function () { state.snap = true; render(); state.snap = false; } };
};
})();

(function () {
if (window.__nxGlue) return; window.__nxGlue = 1;
function go() {
var body = document.body;
if (!body || body.classList.contains('sqs-edit-mode-active')) return;
if (!document.querySelector('section#p-hero')) return;
var v = document.querySelector('#p-hero video'), media = document.querySelector('.ns-media'), ymal = document.querySelector('.ns-ymal');
if (!v || !media || !ymal || !window.NS3D || !window.NS3D_DATA) return setTimeout(go, 150);
if (document.querySelector('.ns-nx-block')) return;
var vb = v.closest('.fe-block');
var wrap = document.createElement('div'); wrap.className = 'ns-nx-block';
vb.parentNode.insertBefore(wrap, vb.nextSibling);
vb.classList.add('ns-nx-hide'); body.classList.add('ns-nx-page');
var colours = [].map.call(ymal.querySelectorAll('.ns-ymal-item'), function (a) {
var im = a.querySelector('img'); var src = ((im && (im.getAttribute('data-src') || im.currentSrc || im.src)) || '').split('?')[0];
var link = a.matches('a') ? a : (a.querySelector('a') || a.closest('a'));
return { name: a.innerText.replace(/^\s*\d+\s*/, '').replace(/\s+/g, ' ').trim(), img: src + '?format=300w', tex: src + '?format=1500w', url: link ? link.getAttribute('href') : '', current: a.classList.contains('is-current') };
});
var ex = document.querySelector('section#p-explore'), texts = null, title = '';
if (ex) {
texts = []; var cur = null;
[].forEach.call(ex.querySelectorAll('.sqs-html-content h1, .sqs-html-content h2, .sqs-html-content h3, .sqs-html-content h4, .sqs-html-content p'), function (n) {
var t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) return;
if (/^H[12]$/.test(n.tagName)) { if (!title) title = t; }
else if (/^H[34]$/.test(n.tagName)) { cur = { label: t.replace(/\.$/, ''), text: '' }; texts.push(cur); }
else if (cur) cur.text += (cur.text ? ' ' : '') + t;
});
}
var h1 = ((document.querySelector('#p-hero h1') || document.querySelector('h1') || {}).textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
var here = location.pathname.replace(/\/$/, '');
colours.forEach(function (c) {
if (h1 && c.name.toLowerCase() === h1) c.current = true;
if (c.url && c.url.replace(/[?#].*$/, '').replace(/\/$/, '') === here) c.current = true;
});
var src = v.currentSrc || v.getAttribute('src') || (v.querySelector('source') || {}).src;
var VID = { 'antique sawmill oak': 'Antique_Sawmill', 'pewter oak': 'Pewter', 'espresso oak': 'Espresso', 'chestnut oak': 'Chestnut', 'classic oak': 'Classic', 'cinnamon oak': 'Cinnamon', 'summer wheat oak': 'Summer_Wheat' };
var curC = colours.filter(function (c) { return c.current; })[0], vk = curC && VID[curC.name.toLowerCase()];
if (vk && window.__nxBase) src = window.__nxBase + 'assembly/NuStairz_' + vk + '_white.mp4';
NS3D(wrap, { colours: colours, video: src, texts: texts, title: '' }).catch(function (e) { console.error('NS3D', e); });
function sync() { wrap.style.display = vb.classList.contains('ns-video-off') ? 'none' : ''; }
new MutationObserver(sync).observe(vb, { attributes: true, attributeFilter: ['class'] });
/* colour swatches under the Photos slideshow: each goes to that colour's page, which opens on Photos */
var gal = document.querySelector('section.ns-gallery') || document.querySelector('section#p-hero ~ section.gallery-section');
if (gal && colours.length > 1 && !gal.querySelector('.nx-gsw')) {
var row = document.createElement('div'); row.className = 'nx-gsw';
var curName = (colours.filter(function (c) { return c.current; })[0] || {}).name || '';
row.innerHTML = '<div class="nx-sw">' + colours.map(function (c) {
return '<a href="' + (c.url || '#') + '" class="' + (c.current ? 'is-on' : '') + '" aria-label="' + c.name + '" title="' + c.name + '" data-name="' + c.name + '"><i class="nx-swi" style="background-image:url(\'' + c.img + '\') !important"></i></a>';
}).join('') + '</div><div class="nx-swname">' + curName + '</div>';
var nmG = row.querySelector('.nx-swname');
row.querySelectorAll('a').forEach(function (a) {
a.addEventListener('mouseenter', function () { nmG.textContent = a.dataset.name; });
a.addEventListener('mouseleave', function () { nmG.textContent = curName; });
a.addEventListener('click', function (e) { if (a.classList.contains('is-on')) { e.preventDefault(); return; } try { sessionStorage.setItem('nx-open', 'photos'); } catch (err) {} });
});
var cw = gal.querySelector('.content-wrapper'); if (cw) cw.parentNode.insertBefore(row, cw.nextSibling); else gal.appendChild(row);
}
var wantPhotos = false;
try { wantPhotos = sessionStorage.getItem('nx-open') === 'photos'; if (wantPhotos) sessionStorage.removeItem('nx-open'); } catch (err) {}
var b = media.querySelector(wantPhotos ? '[data-m="photos"]' : '[data-m="3d"]'); if (b) b.click();
media.classList.remove('open'); sync();
if (wantPhotos && gal) setTimeout(function () { var r = gal.getBoundingClientRect(); window.scrollTo({ top: window.scrollY + r.top - Math.max(0, (window.innerHeight - r.height) / 2), behavior: 'smooth' }); }, 400);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();

/* NuStairz: every section fits on one screen (desktop). The 3D panel takes the space left under the title; taller sections are scaled down. */
(function () {
if (window.__nxFit) return; window.__nxFit = 1;
function fit() {
var b = document.body; if (!b || b.classList.contains('sqs-edit-mode-active')) return;
var vh = window.innerHeight, mob = window.innerWidth < 768;
var p = document.querySelector('.nx-panel');
if (p && p.offsetParent) {
var top = p.getBoundingClientRect().top + window.scrollY;
if (!mob) p.style.height = Math.max(460, Math.min(900, vh - top - 24)) + 'px';
else { var st = p.querySelector('.nx-stage'), nav = p.querySelector('.nx-nav'); if (st) st.style.height = Math.max(220, Math.min(window.innerWidth * 0.9, vh - top - (nav ? nav.offsetHeight : 60) - 40)) + 'px'; }
}
var hero = document.querySelector('#p-hero'); if (!hero) return;
[].forEach.call(hero.parentElement.children, function (s) {
if (s.tagName !== 'SECTION' || s === hero) return;
var w = s.querySelector('.content-wrapper') || s; w.style.zoom = '';
if (mob || getComputedStyle(s).display === 'none') return;
var h = s.offsetHeight; if (h <= vh) return;
var z = vh / h; w.style.zoom = z.toFixed(3);
var h2 = s.offsetHeight; if (h2 > vh) w.style.zoom = (z * vh / h2).toFixed(3);
});
}
var t; function later() { clearTimeout(t); t = setTimeout(fit, 80); }
window.addEventListener('resize', later); window.addEventListener('load', later);
document.addEventListener('click', function () { setTimeout(fit, 120); setTimeout(fit, 500); }, true);
document.addEventListener('DOMContentLoaded', function () { setTimeout(fit, 400); setTimeout(fit, 1500); });
})();

/* NuStairz: links to other websites and PDFs open in a new tab (site-wide) */
(function () {
if (window.__nxExt) return; window.__nxExt = 1;
var SHOP = 'https://www.homedepot.ca/recherche?q=nustairz#!q=nustairz';
function mark(root) {
if (document.body && document.body.classList.contains('sqs-edit-mode-active')) return;
[].forEach.call((root || document).querySelectorAll('a[href]'), function (a) {
var h = a.getAttribute('href') || '';
if (/^(mailto:|tel:|#|javascript:)/i.test(h)) return;
var ext = false;
try { var u = new URL(h, location.href); ext = u.host !== location.host || /\.pdf($|[?#])/i.test(u.pathname) || /^\/s\//.test(u.pathname); } catch (e) {}
var txt = (a.textContent || '').trim();
if ((/homedepot\./i.test(h) || /^shop( now)?$/i.test(txt) || a.classList.contains('ns-shop')) && h !== SHOP) { a.setAttribute('href', SHOP); ext = true; }
if (ext && a.target !== '_blank') { a.target = '_blank'; a.rel = 'noopener'; }
});
}
function tag() { [].forEach.call(document.querySelectorAll('section.page-section'), function (x) { if (/AVAILABLE EXCLUSIVELY AT/i.test(x.textContent) && x.querySelector('img')) x.classList.add('ns-hd-sec'); }); }
function go() { tag(); mark(); new MutationObserver(function () { clearTimeout(go.t); go.t = setTimeout(mark, 200); }).observe(document.body, { childList: true, subtree: true }); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
