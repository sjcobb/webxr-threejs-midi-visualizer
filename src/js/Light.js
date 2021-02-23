import Store from './Store.js';


// import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
// import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
// // import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

export default class Light {

    constructor() {
        // super();
    }

    addLightning() {
        // https://threejs.org/examples/webgl_lightningstrike.html

    }

    addDirectionalLight() {
        // https://threejs.org/docs/#api/en/lights/DirectionalLight.target

    }

    addSpotlight() {
        // const lightPos = [-50, 10, 20]; // works for autoScroll false
        // const lightPos = [35, 3, 11]; // too far away
        // const lightPos = [25, 3, 5];

        // const lightPos = [0, -6, -34];
        // const lightPos = [-10, 5, -20];
        const lightPos = [-30, 20, -20];

        // // //
        let phong = new THREE.MeshPhongMaterial({
            color: 'pink',
            emissive: 0,
            specular: 0x070707,
            shininess: 100
        });
        let box = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        let currentShape, currentMesh;
        currentShape = box;
        currentMesh = phong;
        const lightRefObj = new THREE.Mesh(currentShape, currentMesh);
        lightRefObj.position.set(...lightPos);

        Store.lightObj = lightRefObj;
        Store.scene.add(Store.lightObj);
        // // //

        // / const spotLight = new THREE.SpotLight(0xffffff, 1);
        // spotLight.position.set(15, 40, 35);
        Store.lightPrimary.position.set(...lightPos);
        // Store.lightPrimary.intensity = 2;
        Store.lightPrimary.intensity = 3;

        // SPOTLIGHT params: https://github.com/mrdoob/three.js/blob/dev/examples/webgl_lights_spotlight.html
        // Store.lightPrimary.angle = Math.PI / 4;
        // Store.lightPrimary.intensity = 1.7;
        // Store.lightPrimary.penumbra = 0.1;
        // Store.lightPrimary.decay = 2;
        // Store.lightPrimary.distance = 200;

        // Store.lightPrimary.castShadow = true;
        // Store.lightPrimary.shadow.mapSize.width = 512;
        // Store.lightPrimary.shadow.mapSize.height = 512;
        // Store.lightPrimary.shadow.camera.near = 10;
        // Store.lightPrimary.shadow.camera.far = 200;
        // Store.lightPrimary.shadow.focus = 1;

        // // Store.lightPrimary.target.position.set(200, -50, 100);
        // // Store.lightPrimary.target.position.x = (Store.camera.position.x + 25);
        Store.scene.add(Store.lightPrimary);

        // const lightHelper = new THREE.SpotLightHelper(Store.lightPrimary);
        // Store.scene.add(lightHelper);

        // const shadowCameraHelper = new THREE.CameraHelper(Store.lightPrimary.shadow.camera);
        // Store.scene.add(shadowCameraHelper);
    }

    addLights(renderer) {
        // https://stackoverflow.com/a/40416826/7639084

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        this.addSpotlight();

        // // //
        // const ambient = new THREE.AmbientLight(0x888888);
        // const ambient = new THREE.AmbientLight(0x343434); // too dark
        // const ambient = new THREE.AmbientLight(0xf2f2f2); // beethoven 25, too bright
        const ambient = new THREE.AmbientLight(0xe8e8e8);
        Store.scene.add(ambient);

        const light = new THREE.DirectionalLight(0xdddddd);
        light.position.set(3, 10, 4);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        // light.castShadow = false;

        const lightSize = 10;
        // const lightSize = 100;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 50;
        light.shadow.camera.left = light.shadow.camera.bottom = -lightSize;
        light.shadow.camera.right = light.shadow.camera.top = lightSize;

        // light.shadow.mapSize.width = 1024; // prev
        // light.shadow.mapSize.height = 1024;

        light.shadow.mapSize.width = 0; // TODO: figure out lighting and shadow casts from balls
        light.shadow.mapSize.height = 0;

        this.sun = light;
        // Store.scene.add(light);

        // const fogColor = new THREE.Color(0xffffff);
        const fogColor = new THREE.Color(0xE5E5E5); 
        // const fogColor  = new THREE.Color("rgb(255, 0, 0)");
        // Store.scene.background = fogColor; // PREV
    }

}