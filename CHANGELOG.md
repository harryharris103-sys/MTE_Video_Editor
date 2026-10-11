# Changelog
Version lives in one place: `APP.v` near the top of the script in `index.html` (shown in the header; also names the offline cache). Bump it on every release: MAJOR.MINOR.PATCH.

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
