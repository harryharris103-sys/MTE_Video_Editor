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

## Offline use
Open the app once online; a "Ready to work offline" notice confirms it is cached. After you ship a new version, bump `APP.v` in index.html and reload once to receive it.

## Self-hosting the WMV / true-MP4 converter (optional, fully offline)
By default the converter files load once from unpkg.com and are cached. To bundle them yourself, create `vendor/ffmpeg/` and copy in:
- `ffmpeg.js` and `814.ffmpeg.js` from `@ffmpeg/ffmpeg@0.12.10/dist/umd/`
- `util.js` = `@ffmpeg/util@0.12.1/dist/umd/index.js`
- `ffmpeg-core.js` and `ffmpeg-core.wasm` from `@ffmpeg/core@0.12.6/dist/umd/`
