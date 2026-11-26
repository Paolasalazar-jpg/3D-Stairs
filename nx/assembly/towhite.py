"""Black-background render -> white background H.264 (for mix-blend-mode: multiply on the page).
The render is premultiplied over black (C = a*F), so over white: out = C + (1-a)*255,
with a estimated from the brightest channel near the edge."""
import subprocess, sys, numpy as np
src, dst = sys.argv[1], sys.argv[2]
W, H = 1920, 1080
dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', '30000/1001', '-i', '-',
                        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', dst], stdin=subprocess.PIPE)
n = 0
while True:
    buf = dec.stdout.read(W * H * 3)
    if len(buf) < W * H * 3: break
    c = np.frombuffer(buf, np.uint8).reshape(H, W, 3).astype(np.float32)
    a = np.clip(c.max(2, keepdims=True) / 14.0, 0, 1)
    out = np.clip(c + (1 - a) * 255, 0, 255).astype(np.uint8)
    enc.stdin.write(out.tobytes()); n += 1
enc.stdin.close(); enc.wait(); dec.wait()
print(dst, n, 'frames')
