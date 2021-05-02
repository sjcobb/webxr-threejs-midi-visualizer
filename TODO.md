# TODO

## XR - Human mesh video

- [x] map videoTexture mesh to Cannon rigid body physic object
- [x] detect collisions with video mesh, play note on collide
- [x] balls need to be coupled to reticle piano placement

- [ ] balls scale should match indiv key hit

- [ ] balls should drop from top right angled spawn point
- [ ] fix canvas viewport top cutoff
- [ ] stream 1 minute long video to video mesh
- [ ] touch up piano rotoscope in DaVinci Fusion

- [ ] why two render loops?

- [ ] positional audio as camera moves
- [ ] reticle debug mode to show visible marker
- [ ] reticle piano should always be at straight ahead angle
    - see line: Store.reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

- Research: how to play 1 minute long video? 
  - node fs.createReadStream
    - https://www.geeksforgeeks.org/how-to-stream-large-mp4-files/
    - https://betterprogramming.pub/video-stream-with-node-js-and-html5-320b3191a6b6
    - https://github.com/daspinola/video-stream-sample
  - export PNG sequence from Blender?
  - access WebM stream using: https://github.com/endlesshack/youtube-video
  - CSS + iframe: https://github.com/mrdoob/three.js/blob/master/examples/css3d_youtube.html

## Chord Detector
- [ ] Giant rectangle cube following balls that tells you name of chord - G7 Dominant
- [x] Use tonal lib: Chord.detect(["D", "F#", "A", "C"]); // => ["D7"]
- [ ] Chord.name for display name, .symbol for shortname
- [ ] Push notes into nextNotesArr while length less than or equal to 4 call Chord.detect, if - no chord returned drop single ball, if True, then drop Rect with note names
- [ ] Only push notes, when played quickly ticks
- [ ] Call from addBody with setTimeout for balls so there is time to calc chord

## XR - Live animation using Google MediaPipe API

- [ ] use 'MediaPipe - Holistic' [Pen](https://codepen.io/sjcobb/pen/BapMRQP) as starting point
- [ ] combine with threejs example webgl_animation_skinning_additive_blending
- [ ] pull in desired Miximo model
- [ ] map Miximo model's joints to return data from MediaPipe graph
- [ ] performance testing

- https://github.com/google/mediapipe/issues/1586 | Weird results.multiHandedness[0].index in JavaScript
- https://github.com/beemsoft/webxr-handtracking-playground
  - https://google.github.io/mediapipe/solutions/hands
  - https://github.com/beemsoft/webxr-handtracking-playground/blob/master/src/shared/hands/TrackedHandsManager.ts
- https://github.com/mrdoob/three.js/blob/dev/examples/webgl_animation_skinning_additive_blending.html
- https://google.github.io/mediapipe/tools/visualizer.html
-  https://google.github.io/mediapipe/solutions/holistic#javascript-solution-api
- MediaPipe - Hands: https://codepen.io/sjcobb/pen/gOgqWwe
- MediaPipe - Holistic: https://codepen.io/sjcobb/pen/BapMRQP
- https://www.reddit.com/r/AR_MR_XR/comments/kd0uxv/mediapipe_holistic_simultaneous_face_hand_and/