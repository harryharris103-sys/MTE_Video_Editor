# MTE Video Editor
Private, browser-based editor: add music and animated lower thirds to local videos and export for social platforms. Files never leave your device.

## Run locally
`python -m http.server 8000` in this folder, then open http://localhost:8000 (a server is needed for install/offline).

## Host on GitHub Pages
Push these files to a repo -> Settings -> Pages -> deploy from `main` / root. Open the HTTPS link on any device and use "Install app" / "Add to Home screen".

## Roadmap
- Add 192px + 512px PNG icons (better Android install prompts)
- Wrap with Tauri/Electron (Windows) or Capacitor/TWA (Android)
- WMV/true MP4 transcoding via ffmpeg.wasm
- Multi-clip timeline, waveform view, background rendering
