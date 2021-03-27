# TODO

- [ ] top of viewport is cut off in ar mode
- [ ] video mesh does not stay in place in ar mode 
  - when camera moves, mesh moves slightly
  - when camera angle changes, mesh stays in place
- [ ] lighting improvements - add shadows

# WebXR Lighting Estimation API

- https://immersive-web.github.io/lighting-estimation/
- https://immersive-web.github.io/lighting-estimation/#xrlightprobe

XRLightEstimate provides the estimated lighting values for an XRLightProbe at the time represented by an XRFrame

XRLightProbe.getLightEstimate()
- primaryLightDirection
  { x: 0.0, y: 1.0, z: 0.0, w: 0.0 } - means light is shining straight down from above
- primaryLightIntensity
  { x: 0.0, y: 0.0, z: 0.0, w: 1.0 } - means no illumination


# WebXR Depth API NOTES 

- https://github.com/immersive-web/depth-sensing/blob/main/explainer.md

session.depthUsage
session.depthFormat

const depthInfo = frame.getDepthInformation(view);
const depthInMeters = depthInfo.getDepthInMeters(x, y);
//
vec2 packedDepth = texture2D(depth_texture, uv_coord).ra;
return dot(packedDepth, vec2(255.0, 256.0 * 255.0)) * u_RawValueToMeters;

- https://www.chromestatus.com/feature/5742647199137792#:~:text=Feature%3A%20WebXR%20Depth%20API,environment%20in%20Augmented%20Reality%20scenarios.
- https://github.com/immersive-web/depth-sensing/blob/main/explainer.md
- https://github.com/w3ctag/design-reviews/issues/550
- https://medium.com/@brijesh.intouch/chess-game-using-webxr-device-api-201f8c06ba2c
- https://woll-an.medium.com/augmented-reality-measure-with-webxr-and-three-js-a0c8355eb91a

- https://ai.googleblog.com/2020/04/udepth-real-time-3d-depth-sensing-on.html

## Overview
...

### Lighting
https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Lighting

const depthInfo = xrWebGLBinding.getDepthInformation(view);
let depthValueInMeters = depthInfo.getDepthInMeters(x, y);
  // Where x, y - image coordinates of point a.

### Math Links

- https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web

## Three.js

- https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager
  - WebXR Device API
  - https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API
- https://threejs.org/docs/#api/en/materials/MeshDepthMaterial
  - Depth is based off of the camera near and far plane. White is nearest, black is farthest.
- https://github.com/Brijesh1005/webxr-chess-game/blob/master/chess/app.js#L747
  - https://medium.com/@brijesh.intouch/chess-game-using-webxr-device-api-201f8c06ba2c
  - board.position.setFromMatrixPosition(hitMatrix);
  - this.scene.add(new THREE.AxesHelper( 10 ));
  - this.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera); // for click event
  - const hits = await this.session.requestHitTest(origin, direction, frameOfRef);
- smooth animations -> see Tween.js


## Play Canvas

https://github.com/playcanvas/engine/pull/2561
CPU Path: https://playcanvas.com/project/732030/overview/ar-depth-sensing
GPU Path: https://playcanvas.com/project/738358/overview/ar-depth-sensing-texture
Depth Occlusion: https://playcanvas.com/project/738703/overview/ar-depth-sensing-occlusion

https://playcanvas.com/editor/code/738703?tabs=38289857

### Example: Add object at camera point location
if (depthSensing.available)
    var depth = depthSensing.getDepth(depthSensing.width / 2, depthSensing.height / 2);
    this.vec3A.add(this.camera.getPosition());
    var ent = this.template.resource.instantiate();
    this.app.root.addChild(ent);     
    ent.setPosition(this.vec3A); // position it to pointer position

### Example: Hand Tracking
https://forum.playcanvas.com/t/webxr-hand-tracking/14131

## ARCore (Android / Java)

- https://developers.google.com/ar/develop/java/depth/overview
- https://developers.google.com/ar/reference/c/group/ar-frame#arframe_acquiredepthimage
- acquireDepthImage()
  - https://developers.google.com/ar/reference/java/com/google/ar/core/Frame#acquireDepthImage()
- public PointCloud acquirePointCloud ()

## Holograms

### LED Fan

- https://hypervsn.com/
- https://github.com/jnweiger/led-hologram-propeller
- https://www.amazon.com/GIWOX-Hologram-Projector-Hi-Resolution-Holographic/dp/B07FSJWVGT
- https://www.youtube.com/watch?v=VVt-eN90mx4
- instructables.com/Programmable-LED-Fan-A-Light-Breeze/

- https://learn.adafruit.com/adafruit-dotstar-leds/overview
- https://www.adafruit.com/category/168 
- 

- light field display: https://www.youtube.com/watch?v=pI__qNx8Gdk
  - https://en.wikipedia.org/wiki/Light_field#Light_field_displays

## Misc

- https://www.hooktheory.com/theorytab
- https://www.hooktheory.com/theorytab/common-chord-progressions
- Stepwise Bass Up -- chord progression
I      I
ii^7   dm^7
I^6    C/E
IV     F

"endOfTrackTicks": 16382

- https://www.amazon.com/Pixel-Perfect-Camera-Colour-Correction/dp/B07VCTWR5Q
    - https://www.youtube.com/watch?v=66Inh378YDY | Davinci Resolve Color Match Tool for Color Grading

## Local Development

- https for local development is mandatory for webxr
    - https://stackoverflow.com/questions/4779963/how-can-i-access-my-localhost-from-my-android-device
    - https://developers.google.com/web/tools/chrome-devtools/remote-debugging/local-server
    - https://github.com/immersive-web/webxr/issues/60#issuecomment-570271488
    - https://stackoverflow.com/a/46554860/7639084

    - USED: https://matthewhoelter.com/2019/10/21/how-to-setup-https-on-your-local-development-environment-localhost-in-minutes.html

    - TRY: https://stackoverflow.com/a/15855621/7639084
    sudo nano /etc/hosts
    127.0.0.1 192.168.0.10
    ifconfig
    ifconfig | grep 192

- Sharing
  - ssh scobb@10.0.0.18
  
USMORSCOBB2MB:webxr-depth-detector scobb$ http-server -S -C localhost+3.pem -K localhost+3-key.pem

### Commands

- npm run watch
- npm run build-prod
- http-server -S -C localhost+3.pem -K localhost+3-key.pem

https://USMORSCOBB2MB.local:8080

https://10.0.0.7:8080

