import Tone from 'Tone';
// import * as THREE from 'three';
import Stats from 'stats.js';
import { ARButton } from './ARButton.js';

import Store from './Store.js';
import InstrumentMappings from './InstrumentMappings.js';
import { getInstrumentMappingTemplate, generateInstrMetadata, getInstrByInputNote } from './InstrumentMappings.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import Light from './Light.js';
import Physics from './Physics.js';

import Recording from './Recording.js';
// import * as recordingFirstNotes from '../../assets/recording/1.json'
// console.log({recordingFirstNotes});
// console.log(recordingFirstNotes.tracks[0].notes);

/***
 *** SCENE SETUP ***
 * Tone.js: v13.8.4 *
 * Three.js: v97 *
 * TODO: update to most recent of both libs
 ***/

let stats;
if (Store.view.showStats === true) {
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
}

const instrument = new InstrumentMappings();

Store.instr = getInstrumentMappingTemplate();

/*** 
 *** 3D ENVIRONMENT ***
 ***/

/////////////
// CAMERAS //
/////////////
let left = 0;
let bottom = 0;
var width = window.innerWidth;
var height = window.innerHeight;
const createCamera = () => {
    // const width = 1280;
    // const height = 720;

    // // //

    // const width = 1920;
    // const height = 1080;

    //
    const fov = 45;
    const aspect = width / height;
    const near = 1;
    const far = 100000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    return camera;
};

// Store.scene.background = new THREE.Color(0, 0, 0);

//-----CAMERA 1------//
Store.camera = createCamera();
// Store.camera.position.set(0, 16, 26); 
// Store.camera.lookAt(new THREE.Vector3(0, -2.5, 0)); // v0.5

// Store.camera.position.set(Store.view.posBehindX, Store.view.posBehindY, Store.view.posBehindZ);
// Store.camera.lookAt(new THREE.Vector3(Store.dropPosX, 1, Store.view.posBehindZ - 15));

Store.camera.position.set(0, 0, 0); 
// Store.camera.lookAt(new THREE.Vector3(0, -2.5, 0)); // v0.5

if (Store.cameraLookUp === true) {
    Store.camera.lookAt(new THREE.Vector3(Store.dropPosX - 5, 100, Store.view.posBehindZ));
}

console.log('Store.camera: ', Store.camera);

//-----CAMERA 2------//
// https://observablehq.com/@vicapow/threejs-example-of-multiple-camera-viewports
// https://threejs.org/examples/webgl_multiple_views.html
const cameraTop = createCamera();
cameraTop.position.z = 0.1; // -0.1 (flips)
cameraTop.position.y = 100;
cameraTop.lookAt(new THREE.Vector3(0, 0, 0));
console.log({cameraTop});

//////////////
// RENDERER //
//////////////
// https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
// https://threejs.org/docs/#api/en/renderers/WebGLRenderer.xr

// TODO: adjust window.innerWidth so scene isn't cut off on phone
Store.renderer.setPixelRatio(window.devicePixelRatio);
Store.renderer.setSize(window.innerWidth, window.innerHeight);

if (Store.view.xr === true) {
    Store.renderer.xr.enabled = true;

    // https://github.com/immersive-web/depth-sensing/blob/main/explainer.md
    // const sessionInitParams = { requiredFeatures: [ 'hit-test' ] };
    const sessionInitParams = {
        requiredFeatures: ['hit-test'],
        // requiredFeatures: ['depth-sensing'],
        // depthSensing: {
        //     usagePreference: ['cpu-optimized', 'gpu-optimized'],
        //     formatPreference: ['luminance-alpha', 'float32']
        // }
    };

    document.body.appendChild(ARButton.createButton( Store.renderer, sessionInitParams));
    Store.controller = Store.renderer.xr.getController(0);
    Store.controller.addEventListener('select', onSelect);
    Store.scene.add(Store.controller);
}

// // //

document.body.appendChild(Store.renderer.domElement);
Store.renderer.domElement.id = 'canvas-scene-primary';

// update viewport on resize
window.addEventListener('resize', function() {
    var width = window.innerWidth + 2;
    var height = window.innerHeight;
    Store.renderer.setSize(width, height);
    Store.camera.aspect = width / height; // aspect ratio
    Store.camera.updateProjectionMatrix();

    // //
    // cameraTop.aspect = Math.floor(width / 2) / height;
    // cameraTop.updateProjectionMatrix();
});

//////////////
// CONTROLS //
//////////////
// https://threejs.org/examples/#misc_controls_fly
Store.controls = new FlyControls(Store.camera);
Store.controls.movementSpeed = 1; //prev: 10
Store.controls.domElement = Store.renderer.domElement;
Store.controls.rollSpeed = Math.PI / 40;
Store.controls.autoForward = false;
Store.controls.dragToLook = true;

/////////////
// LOADER //
////////////
Store.loader = new THREE.TextureLoader();


////////////////
// BACKGROUND //
////////////////
// // Store.scene.background = new THREE.Color( 0xff0000 ); // red
// Store.scene.background = new THREE.Color( 0x00b140 ); // green screen
// Store.scene.background = new THREE.Color( 0x0047bb ); // blue screen
// Store.scene.background = new THREE.Color( 0x000000 ); // black

const light = new Light();
light.addLights(Store.renderer);

const physics = new Physics();
// physics.init();
physics.initPhysics();

/////////////// 
// RECORDING //
//////////////
// const recording = new Recording();
// recording.initSample();
// recording.initInstruments();

//-----GEOMETRY VARIABLES------//
let box = new THREE.BoxGeometry(1, 1, 1);
let sphere = new THREE.SphereGeometry(0.5, 32, 32);
let torus = new THREE.TorusGeometry(0.5, 0.25, 32, 32, 2 * Math.PI);

//-----MATERIAL VARIABLES------//
let phong = new THREE.MeshPhongMaterial({
    // color: 'pink',
    color: 0x888888,
    emissive: 0,
    specular: 0x070707,
    shininess: 100
});
let basic = new THREE.MeshBasicMaterial({
    color: 'pink'
});
let lambert = new THREE.MeshPhongMaterial({
    color: 'pink',
    reflectivity: 0.5,
    refractionRatio: 1
});

//-----OBJ FUNCTIONALITY------//
//make the objects and add them to the scene
let currentShape, currentMesh;
currentShape = box;
currentMesh = phong;

let boxRefGeo = new THREE.BoxGeometry(12.15, 12.15, 12.15);
// const objCenter = new THREE.Mesh(currentShape, currentMesh);
const objCenter = new THREE.Mesh(boxRefGeo, currentMesh);
// objCenter.position.set(0, 0, Store.view.posBehindZ);
// objCenter.position.set(0, 0, 0);
objCenter.position.set(0, 3, -29);
// Store.scene.add(objCenter); //for absolute center reference

//-----HUMAN VIDEO------//
// https://threejs.org/docs/#api/en/textures/VideoTexture
// https://stackoverflow.com/questions/18383470/using-video-as-texture-with-three-js
// https://gist.github.com/ErikPeterson/b1db23f83b9ca7904bbf
// https://stackoverflow.com/questions/37884013/adding-video-as-texture-in-three-js/37892861

const video = document.getElementById('human-keyboard-video');
console.log(video);
if (video != null) {
    // // video.src = "URL for your video file goes here";
    // video.load();
    // video.play();

    // const videoTexture = new THREE.VideoTexture(video);
    // const videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.FrontSide, toneMapped: false} );
    // const screenGeo = new THREE.BoxGeometry(20, 30, 2);
    // // const screenGeo = new THREE.PlaneGeometry(1, 1, 0);
    // const videoScreen = new THREE.Mesh(screenGeo, videoMaterial);
    // videoScreen.position.set(-3, -8, -31);
    // Store.scene.add(videoScreen);
}
// https://github.com/hawksley/Threex.chromakey
// // chroma blue: #0022F5
//0xd432 is the green screen color, insert yours, if different, below
// var myGreenScreenMaterial = new THREEx.ChromaKeyMaterial("assets/human/blue_human_short.mp4", 0xd432);
// var myGreenScreenMaterial = new THREEx.ChromaKeyMaterial("assets/human/blue_human_short.mp4", 0x000000);
var myGreenScreenMaterial = new THREEx.ChromaKeyMaterial("assets/human/blue_human_short.mp4", 0x0022F5);
var myGeometry = new THREE.PlaneBufferGeometry(20, 30);
// var myGeometry = new THREE.BoxGeometry(20, 30, 2);
var myGreenScreenVideoObject = new THREE.Mesh(myGeometry, myGreenScreenMaterial);
myGreenScreenVideoObject.position.set(-3, -8, -31);
Store.scene.add(myGreenScreenVideoObject);
myGreenScreenMaterial.startVideo();

//-----SKYBOX (LOAD TEXTURES)------//
if (Store.view.skybox === true) {
    // https://github.com/hghazni/Three.js-Skybox/blob/master/js/script.js#L35
    // assets: http://www.custommapmakers.org/skyboxes.php

    const globalSkyboxTheme = 'nightsky';
    // const globalSkyboxTheme = 'hills'; //blurry
    // const globalSkyboxTheme = 'island'; //only unsupported .tga currently
    // const globalSkyboxTheme = 'bluefreeze';
    // const globalSkyboxTheme = 'mercury';

    var skyboxGeometry = new THREE.CubeGeometry(1800, 1800, 1800);

    var cubeMaterials = [
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`assets/skybox/${globalSkyboxTheme}/ft.png`), side: THREE.DoubleSide }), //front side
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`assets/skybox/${globalSkyboxTheme}/bk.png`), side: THREE.DoubleSide }), //back side
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`assets/skybox/${globalSkyboxTheme}/up.png`), side: THREE.DoubleSide }), //up side
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`assets/skybox/${globalSkyboxTheme}/dn.png`), side: THREE.DoubleSide }), //down side
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`assets/skybox/${globalSkyboxTheme}/rt.png`), side: THREE.DoubleSide }), //right side
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`assets/skybox/${globalSkyboxTheme}/lf.png`), side: THREE.DoubleSide }) //left side
    ];

    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var skyboxCubeMesh = new THREE.Mesh(skyboxGeometry, cubeMaterial); //nightsky skybox

    Store.scene.add(skyboxCubeMesh); //add nightsky skybox
}

//-----CONSOLE------//
// https://stackoverflow.com/questions/52270850/three-js-rendering-text-to-scene
// https://stackoverflow.com/questions/19846078/how-to-read-from-chromes-console-in-javascript
const fontLoader = new THREE.FontLoader();
fontLoader.load( 'https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
    const textGeo = new THREE.TextGeometry('Console errors go here...', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
    });
    const textMaterial = new THREE.MeshLambertMaterial({
        color: 0xF3FFE2
    });
    const consoleMesh = new THREE.Mesh(textGeo, textMaterial);
    // consoleMesh.position.set(0, 2, 0);
    consoleMesh.position.set(-3, -8, -31);
    consoleMesh.scale.multiplyScalar(0.01)
    consoleMesh.castShadow = true;
    Store.scene.add(consoleMesh);
});

//-----MUSIC STAFF------//
function addStaffLines(color = 0x000000, offset, posXstart, posXend, posY, posZ, innerLinePadding, dashedLines = false, middleC = false) {
    const origOffset = offset;
    let staffLineMaterial;
    for (let i = 0; i < 5; i++) {

        offset = origOffset;
        if (i === 0 && middleC === true) {
            offset += 20;
        }

        const staffLineGeo = new THREE.Geometry();
        const zCoord = (posZ + (innerLinePadding * i) + offset);
        staffLineGeo.vertices.push(
            new THREE.Vector3(posXstart, posY, zCoord),
            new THREE.Vector3(posXend, posY, zCoord)
        );
        if (i % 2) {
            staffLineMaterial = new THREE.LineBasicMaterial({
                color: color,
                // color: 0x0000ff, //blue (every other)
                linewidth: 2000, //no effect
            });
        } else {
            staffLineMaterial = new THREE.LineBasicMaterial({
                color: color,
                linewidth: 2000,
                // opacity: 0.1, //no effect
            });
        }
        let staffLine = new THREE.Line(staffLineGeo, staffLineMaterial);
        if (dashedLines === true) {
            // if (i <= 1) {
            if (i === 0 && middleC === true) {
                staffLine = new THREE.Line(staffLineGeo, new THREE.LineDashedMaterial( { color: 0xffffff, dashSize: 1, gapSize: 5 } )); // blue: 0x0000ff
                staffLine.computeLineDistances();
            } else if (i === 3 || i === 4) {
                staffLine = new THREE.Line(staffLineGeo, new THREE.LineDashedMaterial( { color: 0xffffff, dashSize: 1, gapSize: 5 } )); // blue: 0x0000ff
                staffLine.computeLineDistances();
            } else {
                staffLine = new THREE.Line(); // empty line
            }
        }
        Store.scene.add(staffLine);
    }
}

const staffLineLengthEnd = 8000;
const lineYHeight = -0.95;
if (Store.view.showStaff.treble === true) {
    addStaffLines(0xffffff, -10, -1000, staffLineLengthEnd, lineYHeight, 0, 2);
    addStaffLines(0xffffff, -20, -1000, staffLineLengthEnd, lineYHeight, 0, 2, true, true); // two dashed lines above treble clef
}
if (Store.view.showStaff.bass === true) {
    addStaffLines(0xffffff, 2, -1000, staffLineLengthEnd, lineYHeight, 0, 2);
}

//-----ANIMATION------//
let animate = () => {

    if (Store.view.showStats === true) {
        stats.begin();
    }

    var delta = Store.clock.getDelta();
    // console.log('delta: ', delta); //hundreths
    // TODO: fix logs - why not updating correctly?
    // console.log('ticks: ', Tone.Transport.ticks); //ex. 10 
    // console.log('position: ', Tone.Transport.position); //ex: 0:0:0.124
    // console.log('seconds: ', Tone.Transport.seconds);
    // console.log(Store.ticks);
    // console.log(Store.clock.elapsedTime);

    if (Store.view.autoScroll === true) {
        // const ticksMultiplier = 12; // v0.5
        // const ticksMultiplier = 18; 
        const ticksMultiplier = 24;

        Store.ticks += (delta * ticksMultiplier); // Too fast, balls dropped too far left
        // if (Store.view.cameraPositionBehind === true) {
        //     if (Store.view.cameraAutoStart === true) {
        //         Store.camera.position.x = Store.view.posBehindX + (Store.ticks);
        //         cameraTop.position.x = (Store.view.posBehindX + 30) + (Store.ticks);
        //     }
        // } else {
        //     Store.camera.position.x = (Store.ticks) - 35; // prev
        //     // Store.camera.position.x = (Store.ticks) - 55; 
        // }
    }
    
    myGreenScreenMaterial.update();

    physics.updateBodies(Store.world);
    Store.world.step(Store.fixedTimeStep);

    Store.controls.update(delta); // IMPORTANT

    // https://stackoverflow.com/questions/14740076/one-scene-but-multiple-viewports-with-their-own-camera-three-js
    // https://stemkoski.github.io/Three.js/Multiple-Cameras.html
    // https://observablehq.com/@vicapow/threejs-example-of-multiple-camera-viewports
    // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_multiple_views.html#L258
    // TODO: reusable updateCamera method
    left = 0;
    // console.log({left}); // 0
    // console.log({bottom}); // 0
    if (Store.view.splitScreen === true) {
        width = Math.floor(width / 2);
    }
    Store.renderer.setViewport(left, bottom, width, height);
    // Store.renderer.setScissor(left, bottom, Math.floor(width / 2), height); 
    Store.renderer.setScissor(left, bottom, width, height);
    Store.renderer.setScissorTest(true);

    // Store.renderer.setClearColor(new THREE.Color(1, 1, 1)); // white background
    Store.renderer.setClearColor( 0x000000, 0 ); // default, transparent background

    Store.camera.aspect = width / height;
    Store.camera.updateProjectionMatrix();

    // console.log('Store.camera: ', Store.camera);
    Store.renderer.render(Store.scene, Store.camera);

    // // //

    if (Store.view.splitScreen === true) {
        left = width;
        Store.renderer.setViewport(left, bottom, width, height);
        Store.renderer.setScissor(left, bottom, width, height);
        Store.renderer.setScissorTest(true);
        Store.renderer.setClearColor(new THREE.Color(1, 1, 1));
        cameraTop.aspect = Math.floor(width / 2) / height;
        cameraTop.updateProjectionMatrix();
        Store.renderer.render(Store.scene, cameraTop);
    }
    // // //

    // https://gamedev.stackexchange.com/questions/40704/what-is-the-purpose-of-glscissor

    if (Store.view.showStats === true) {
        stats.end();
    }

    if (Store.view.xr === true) {
        Store.renderer.setAnimationLoop(render);
    }
    
    requestAnimationFrame(animate);

};

window.onload = () => {
    //-----KEYBOARD MAPPING------//

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;

        if (keyName === 'Control') {
            // do not log when only Control key is pressed.
            return;
        }

        if (event.ctrlKey) {

        } else if (Store.currentNote.keydownPressed === false) {
            let keyMapped = instrument.getKeyboardMapping(keyName);
            switch (keyName) { 
                case ('z'):
                    // physics.addBody(true, Store.dropPosX, keyMapped);
                    // Store.dropPosX -= 1.3;
                    break;
                case ('Escape'):
                    Tone.Transport.stop();
                    // Store.recording.playerFirst.stop();
                    console.error('... ESCAPE -> Tone.Transport & recording stopped ...');
                    break;
                case ('Enter'):
                    Tone.Transport.start();
                    console.info('... ENTER -> Tone.Transport started ...');
                    break;
                case(' '):
                    console.error('... SPACEBAR RESET -> polySynth.triggerRelease() ...');
                    if (Store.polySynth) {
                        console.log(Store.polySynth);
                        Store.polySynth.releaseAll();
                    } 
                default:
            }

            if (keyMapped !== undefined) {
                if (keyName === keyMapped.keyInput) {
                    physics.addBody(true, Store.dropPosX, keyMapped);
                } else {}
            }
        }
    }, false);

    animate();

    if (Store.view.showDashboard === true) {
        setTimeout(() => {
            createCharts(false);
        }, 3000);
    }

};

/* 
 * MUSIC VISUALIZATION DASHBOARD
 */

function initDashboardData() {
    for (var key in Store.instr) {
        if (Store.instr.hasOwnProperty(key)) {
            const currentInstr = Store.instr[key];
            // console.log({currentInstr});
            if (currentInstr.note && currentInstr.octave) {
                Store.dashboard.instrData.push(currentInstr.note + currentInstr.octave);
            }
        }
    }
} 

if (Store.view.showDashboard === true) {
    initDashboardData();
    setInterval(() => {
        if (Store.dashboard.allPlayedNotes.length !== Store.dashboard.lastNoteLength) {
            Store.dashboard.lastNoteLength = Store.dashboard.recentPlayedNotes.length;
        }
    }, 100);
}

if (Store.view.chordDetect === true) {
    setInterval(() => {
        console.log(Store.dashboard);
        if (Store.dashboard.chordsPlayed[0]) {
            console.log('addChord -> : ', Store.dashboard.chordsPlayed[0]);

            const tempChordBodyParams = [false, 0, Store.dashboard.chordsPlayed[0]]
            // physics.addBody(...tempChordBodyParams);
        }
    }, 8000);
}

////////
// XR //
////////
let hitTestSource = null;
let hitTestSourceRequested = false;
let reticle;
if (Store.view.showHitMarker === true) {
    reticle = new THREE.Mesh(
        new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
        new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    Store.scene.add(reticle);
}

function render(timestamp, frame) {
    if (frame) {
        // console.log({frame});

        // TODO: how to reorient camera and default placement of scene
        const referenceSpace = Store.renderer.xr.getReferenceSpace();

        const session = Store.renderer.xr.getSession();
        if (Store.view.showHitMarker === true) {
            if (hitTestSourceRequested === false) {
                session.requestReferenceSpace('viewer').then( function ( referenceSpace ) {
                    session.requestHitTestSource({ space: referenceSpace }).then( function ( source ) {
                        hitTestSource = source;
                    });
                });
                session.addEventListener('end', function () {
                    hitTestSourceRequested = false;
                    hitTestSource = null;
                });
                hitTestSourceRequested = true;
            }
            if (hitTestSource) {
                const hitTestResults = frame.getHitTestResults(hitTestSource);
                console.log({hitTestResults});
                if ( hitTestResults.length ) {
                    const hit = hitTestResults[ 0 ];
                    reticle.visible = true;
                    reticle.matrix.fromArray(hit.getPose( referenceSpace ).transform.matrix);
                } else {
                    reticle.visible = false;
                }
            }
        }
    }
    Store.renderer.render(Store.scene, Store.camera);
}

function onSelect() {
    console.log('XR controller -> onSelect()...');
    if ( reticle.visible ) {
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.setFromMatrixPosition( reticle.matrix );
        mesh.scale.y = Math.random() * 2 + 1;
        Store.scene.add(mesh);
    }
}