# Changelog
Version lives in one place: `APP.v` near the top of the script in `index.html` (shown in the header; also names the offline cache). Bump it on every release: MAJOR.MINOR.PATCH.

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
