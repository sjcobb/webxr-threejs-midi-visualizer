// https://github.com/hawksley/Threex.chromakey/blob/master/threex.chromakey.js

// import Store from './Store.js';

// const THREEx = THREEx || {};
// const THREEx = {};

// THREEx.ChromaKeyMaterial = function (url, keyColor) {
export default class ChromaKeyMaterial {

    constructor(path, color) {
        // super();
        // this.pool = new Pool();
        this.path = path;
        this.color = color;
        this.video = document.createElement('video');
    }
    
    // THREE.ShaderMaterial.call(this);

    init() {
         // const video = document.createElement('video');
        this.video.src = url;
        this.video.load();
        this.video.muted = true;
        console.log(this.video);

        var keyColorObject = new THREE.Color(keyColor);

        this.videoTexture = new THREE.Texture(video);
        this.videoTexture.minFilter = THREE.LinearFilter;
        this.videoTexture.magFilter = THREE.LinearFilter;
    }

    startVideo() {
        console.log('startVideo() -> this: ', this);
        video.play();
    }

    stopVideo() {
        video.pause();
        video.src = "";
    }

    update() {
        // console.log('update -> this: ', this);
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            // videoImageContext.drawImage(video, 0, 0);
            if (this.videoTexture) {
                this.videoTexture.needsUpdate = true;
                // console.log(this.videoTexture);
            }
        }

        // TODO: if video.readyState === 4, start recording
    }

    setValues() {
        // https://stackoverflow.com/a/64731616/7639084
        this.uniforms = {
            textureUni: {
                type: "t",
                value: videoTexture
            },
            color: {
                type: "c",
                value: keyColorObject
            }
        };

        this.vertexShader =
            "varying mediump vec2 vUv;\n" +
            "void main(void)\n" +
            "{\n" +
            "vUv = uv;\n" +
            "mediump vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n" +
            "gl_Position = projectionMatrix * mvPosition;\n" +
            "}";

        this.fragmentShader =
            "uniform mediump sampler2D textureUni;\n" +
            "uniform mediump vec3 color;\n" +
            "varying mediump vec2 vUv;\n" +
            "void main(void)\n" +
            "{\n" +
            "  mediump vec3 tColor = texture2D( textureUni, vUv ).rgb;\n" +
            "  mediump float a = (length(tColor - color) - 0.5) * 7.0;\n" +
            "  gl_FragColor = vec4(tColor, a);\n" +
            "}";

        this.transparent = true;
    }
}

// // https://threejs.org/docs/#api/en/materials/ShaderMaterial
// THREEx.ChromaKeyMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
// const ChromaKeyMaterial = THREEx.ChromaKeyMaterial;
// // export default THREEx.ChromaKeyMaterial;
// export default ChromaKeyMaterial;