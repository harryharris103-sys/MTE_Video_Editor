# Changelog
Version lives in one place: `APP.v` near the top of the script in `index.html` (shown in the header; also names the offline cache). Bump it on every release: MAJOR.MINOR.PATCH.

## 1.7.0 - 2026-10-18
- Fast export: MP4 is now encoded directly with the browser's H.264 + AAC encoders (WebCodecs, hardware accelerated when available). It renders faster than real time, writes the MP4 itself (no real-time recording and no ffmpeg.wasm second pass) and the soundtrack is mixed off-line with exact fades and trims
- Export screen with progress bar, speed (x real time), time left and Cancel; the editor is locked while exporting
- New Export options: engine (Fast / Compatible), quality (Draft, Standard, High, Maximum) and frame rate (24 / 30 / 60). Export settings are remembered
- Automatic fallback: if the browser cannot do a fast export, the previous real-time method is used. MKV, WMV, raw H.264 and WebM still use the Compatible method
- Editing: Ripple delete (Shift+Delete, closes the gap), frame step with the arrow keys (Shift = 1 s), J / L = back / forward 5 s, K = pause, Home / End, Ctrl+C / Ctrl+V, N = snap, + / - = timeline zoom
- Warns before closing the tab when there is unsaved work

## 1.6.0 - 2026-10-17
- Offline: new service worker (`sw.js`) and web app manifest (`manifest.webmanifest`). The editor, icons and manifest are saved on first visit and open with no internet, also on weak wifi (saved copy is used after 3 s); updates are picked up automatically and announced
- Export tab > "Offline use": shows what is saved and has a "Save converter for offline (~30 MB)" button so MKV / H.264 / WMV import and export work with no internet; the converter cache is kept across updates; the app asks the browser to keep its storage
- New logo made for video editing: gold film-reel ring (sprocket holes), MTE monogram and a mini timeline with playhead; used in the header, favicon, app icons (any + maskable) and Apple touch icon
- Two ready-made transparent logo overlays (`logo-overlay-white.png`, `logo-overlay-dark.png`) to import with ★ Logo and place on videos

## 1.5.2 - 2026-10-12
- MKV (and avi, wmv, flv, ts, mpg, raw h264) are always prepared before use: audio is converted to stereo AAC so it plays, and H.264 video is kept untouched (fast) when possible, otherwise re-encoded

## 1.5.1 - 2026-10-12
- Pictures/logos: one main "Size % (overall)" slider scales the image proportionally; Width % / Height % are now an optional "Stretch" fine-tune below it

## 1.5.0 - 2026-10-12
- Import: .mkv and raw .h264 (also avi, wmv, flv, ts, mov, mpg) are accepted; if the browser cannot play a file it is converted to H.264 MP4 automatically with ffmpeg.wasm
- Export: new MKV (H.264 + AAC) and raw .h264 stream options, alongside MP4 (H.264) and WMV

## 1.4.0 - 2026-10-11
- Media tab: every imported video, music clip and image is listed (add with + / drag onto a lane / remove)
- Pictures: import images and place them on video lanes; crop each edge, stretch width and height independently, move, rotate, opacity, fades; drag them directly on the monitor
- Text clips: type text with font, size, style, colour, outline, shadow, entrance animations (fade, slide, rise, zoom, wipe, typewriter) and looping motion (pulse, float, swing, blink, bounce, shake)
- Workspace Fit / zoom (50-150%) like a video-editor app; timeline zoom now also has Fit and Ctrl+scroll
- Interface regrouped into Media / Text / Export / Templates tabs with a three-column layout
- Export resolution: 1080p (default), 720p, 540p or platform default; preview runs lighter than export
- Templates also save text clips

## 1.3.0 - 2026-10-11
- Audio fixes: sound is unlocked on first tap, never left muted after an interrupted export, and a 🔊/🔇 indicator + button in the toolbar shows and retries audio status
- Fade in / fade out for video and music clips (video fades go to/from black; overlapping clips on two video lanes cross-fade)
- Multi-select: Shift/Ctrl+click, Select all (Ctrl+A); move, split, copy, paste and delete work on the whole selection; batch volume/fades
- Saved logos: imported PNG logos are kept on this device and listed in the left panel
- New export formats via ffmpeg.wasm: true MP4 (H.264/AAC) and WMV (converter downloads once, then works offline)
- Offline: app shell is precached, converter files are cached after first use, offline-ready and update notices

## 1.2.0 - 2026-10-11
- New timeline layout: one lane per video / music / lower third / logo, unlimited extra lanes
- Drag clips to move (also between lanes of the same type), drag edges to trim, S to split, copy / paste / delete / undo
- Source / Program monitor tabs; Properties panel for the selected clip
- Several lower thirds and logos at once, each with its own timing and settings
- Templates now save lower thirds + logos (with images) for reuse on new videos
- Removed: Set In / Set Out, separate Source preview box, v1.1 single-logo storage

## 1.1.0 - 2026-10-01
- Version ID in header, templates and offline cache
- Cut / Copy / Delete / Paste for video and music, with Source preview + Undo/Reset
- Lower third overall size slider; h:m:s pickers for start/duration/music start
- PNG logo: position sliders, quick positions, size slider, looped animations (pulse, float, swing, flip, blink, bounce) with adjustable loop length

## 1.0.0 - 2026-09-29
- First release: music on video, lower thirds with transitions, fonts, templates, social sizes, MP4/WebM/GIF export, dark mode, PWA
