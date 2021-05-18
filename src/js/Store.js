// import InstrumentMappings from './InstrumentMappings.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
// import { Scene}  from '../../vendor/render/scenes/scene.js';

export default {
    // activeInstrColor: '#9F532A', // ltred
    // activeInstrColor: '#800000', // dkred
    // activeInstrColor: '#8F0000', // medred
    // activeInstrColor: '#0018F9', // music wheel I blue
    // activeInstrColor: '#7ec850', // grass green (lt)
    // activeInstrColor: '#567d46', // grass green (md)
    // activeInstrColor: '#edc9af', // desert sand
    // activeInstrColor: '#e9be9f', // sand (md)
    // activeInstrColor: '#e5b38f', // sand (md2)
    // activeInstrColor: '#d8d8d8',
    // activeInstrColor: '#00A29C', // teal: https://www.color-hex.com/color-palette/4666
    // activeInstrColor: '#66b2b2', // lt teal
    // activeInstrColor: '#003366', // spinner midnight blue
    // activeInstrColor: '#001f3e',
    // activeInstrColor: '#1f1f1f',
    activeInstrColor: '#343434', // gray
    // activeInstrColor: '#ffffff',
    // activeInstrColor: '#FFFF00', // yellow
    ai: {
        enabled: false,
    },
    bodies: [],
    // bpm: 120,
    // bpm: 140,
    bpm: 160,
    // camera: new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000), // PREV
    camera: {},
    // cameraCircularAnimation: false, // true - drum spinner (v0.3), NOW view.drumCircle
    cameraLookUp: false,
    clock: new THREE.Clock(),
    clockNote: new THREE.Clock(),
    configColorAnimate: true,
    controls: '',
    controller: '',
    // controls: new FlyControls(camera),
    // currentNoteLength: 0, // not needed
    currentNote: {
        keydownTimeStamp: 0,
        keydownPressed: false,
        keyupTimeStamp: 0,
    },
    damping: 0.01, // effects bounciness, lag
    dashboard: {
        chart: {},
        chordsPlayed: [],
        // lastNote: 'C4',
        lastNote: '',
        lastNoteLength: 0,
        // playedNotes: ['C4', 'D4', 'C5'],
        allPlayedNotes: [],
        allPlayedOctaves: [],
        recentPlayedNotes: [],
        noteCountsObj: {
            // TODO: final data structure chosen for bar3D, clean up others
            A3: {note: "A", octave: 3, count: 0},
            A4: {note: "A", octave: 4, count: 0},
            A5: {note: "A", octave: 5, count: 0},
            A6: {note: "A", octave: 6, count: 0},
            C6: {note: "C", octave: 6, count: 0},
        },
        noteCountsArr: [
            // {note: 'C', octave: 6, count: 0},
            // {note: 'A', octave: 5, count: 0},
            // {note: 'A', octave: 4, count: 0},
            // {note: 'G', octave: 3, count: 0},
            // {note: 'B', octave: 3, count: 0},
            // {note: 'G', octave: 4, count: 0},
            // {note: 'B', octave: 4, count: 0},
            // {note: 'G', octave: 5, count: 0},
            // {note: 'B', octave: 5, count: 0},
            // {note: 'G', octave: 6, count: 0},
            // {note: 'B', octave: 6, count: 0},
        ],
        instrData: [],
        // https://echarts.apache.org/en/option.html#dataset.source
        dataset: {
            source: [
                ['Note', '0:0:0', '1:0:0', '2:0:0', '3:0:0'],
                ['C4', 1, 0, 0, 1],
                ['D4', 0, 1, 1, 1],
            ]
        },
        midiConvertData: {
            source: [
                {
                    "duration": 0.6,
                    "durationTicks": 960,
                    "midi": 60,
                    "name": "C4",
                    "ticks": 0,
                    "time": 0,
                    "velocity": 0.5433070866141733
                },
                {
                    "duration": 1.2,
                    "durationTicks": 1920,
                    "midi": 48,
                    "name": "C3",
                    "ticks": 0,
                    "time": 0,
                    "velocity": 0.5118110236220472
                },
                {
                    "duration": 0.6,
                    "durationTicks": 960,
                    "midi": 60,
                    "name": "C4",
                    "ticks": 960,
                    "time": 0.6,
                    "velocity": 0.5984251968503937
                },
            ]
        }
    },
    dropCoordCircle: [],
    dropCoordCircleInterval: [],
    dropOffset: 0,
    
    drumsOnly: false,
    errorText: '',
    errorGeo: '',
    fixedTimeStep: 1.0 / 60.0,
    flameArr: [],
    flameCounter: 0,

    hitMatrixPos: null,

    inputMidi: false,
    instr: {},
    instrumentCounter: 0,
    // keysOnly: true,
    lastColor: '#000000',
    // lightPrimary: new THREE.SpotLight(0xffffff, 1),
    lightPrimary: new THREE.PointLight(0xf7ffd8, 2, 50),
    lightObj: {},
    loader: new THREE.TextureLoader(),
    machineTrigger: false,
    meshes: [],
    multiplierPosX: -2.5,
    musicActive: false,
    patternInfinite: false,
    polySynth: {},
    groundMeshIncrementer: 0,
    recording: {
        playerFirst: {},
        parts: [
            {
                notes: [],
            },
            {
                notes: [],
            },
            {
                notes: [],
            },
        ],
        // first: {
        //     notes: [],
        // },
        // second: {
        //     notes: [],
        // },
        // third: {
        //     notes: [],
        // },
    },
    // renderer: new THREE.WebGLRenderer(),
    renderer: new THREE.WebGLRenderer({ alpha: true, antialias: true }),
    reticle: null,
    reticleMesh: null,
    sampler: {
        strings: {},
        guitar: {},
    },
    scene: new THREE.Scene(),
    // sceneXR: new Scene(),
    spinnerBody: {},
    // staffLineInitZ: 8,    // remove
    // staffLineSecondZ: -8, // remove
    // showStaticRows: false, // old static animation
    tempPos: 0,
    ticks: 0,
    triggerAnimationTime: '4:0:0',
    triggerOn: 'contact', 
    // triggerOn: 'spinner', 
    // Transport: Tone.Transport, //TODO: add Transport here for logging ticks and position
    uiHidden: false,
    ui: {
        machine: {
            currentSequence: []
        }
    },
    view: {
        autoScroll: true,
        // autoStartTime: 6000,
        autoStartTime: 0,
        drumCircle: true,
        skybox: false,
        cameraPositionBehind: true,
        cameraAutoStart: true,
        hideFloor: true,
        
        floorTexture: false, // doesn't work, was used for earthquake video

        // posBehindX: -95, 
        posBehindY: 30,
        posBehindZ: 0,

        // posDropX: -2500,
        posDropX: undefined,
        // posDropY: 30,
        posDropY: 15,
        posDropZ: -30,

        posDropMatrix: null,
        posDrop: null,

        // posLandX: 0,
        // posLandY: -10, // too low
        // posLandY: 10, // keyboard too high
        posLandY: 0,
        // posLandZ: -30,

        reticleDebugMode: false,
        reticleSelected: false,

        rotateOrigin: true,
        songAutoStart: true,
        showDashboard: false,
        showHitMarker: true,
        showLogoSprite: false,
        showStats: true,
        showStaff: {
            bass: false,
            treble: false,
        },
        // TODO: fix splitScreen view
        splitScreen: false,
        stage: {
            // size: 'lg',
            // size: 'sm',
            size: 'xr',
        },
        xr: true
    },
    world: new CANNON.World(),
};

/*** COLOR OPTIONS ***/
// '#7cfc00'; //lawn green
// '#F8041E'; //fire temple red med
// '#9F532A'; //fire temple red dk
// '#191CAC'; //deepblue
// '#0018F9'; //music wheel I blue
// '#C6018B'; //music wheel VI pink
// '#4B0AA1'; //music wheel V - dkblue
// '#006CFA'; //music wheel IV - medblue