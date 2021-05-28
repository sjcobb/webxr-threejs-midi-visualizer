// https://github.com/hawksley/Threex.chromakey/blob/master/threex.chromakey.js

// import Store from './Store.js';

// const THREEx = THREEx || {};
// const THREEx = {};

export function ChromaKeyMaterial(url, keyColor) {
    // this.prototype = Object.create(THREE.ShaderMaterial.prototype);
    // THREE.ShaderMaterial.call(this);

    const video = document.createElement('video');
    video.src = url;
    video.load();
    video.muted = true;
    console.log(video);

    var keyColorObject = new THREE.Color(keyColor);

    var videoTexture = new THREE.Texture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    startVideo = function () {
        console.log('startVideo() -> this: ', this);
        video.play();
    };

    stopVideo = function () {
        video.pause();
        video.src = "";
    };

    update = function () {
        // console.log('update -> this: ', this);
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            // videoImageContext.drawImage(video, 0, 0);
            if (videoTexture) {
                videoTexture.needsUpdate = true;
                // console.log(videoTexture);
            }
        }

        // TODO: if video.readyState === 4, start recording
    };

    setValues({
        // https://stackoverflow.com/a/64731616/7639084
        uniforms: {
            textureUni: {
                type: "t",
                value: videoTexture
            },
            color: {
                type: "c",
                value: keyColorObject
            }
        },
        vertexShader:
            "varying mediump vec2 vUv;\n" +
            "void main(void)\n" +
            "{\n" +
            "vUv = uv;\n" +
            "mediump vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n" +
            "gl_Position = projectionMatrix * mvPosition;\n" +
            "}",
        fragmentShader:
            "uniform mediump sampler2D textureUni;\n" +
            "uniform mediump vec3 color;\n" +
            "varying mediump vec2 vUv;\n" +
            "void main(void)\n" +
            "{\n" +
            "  mediump vec3 tColor = texture2D( textureUni, vUv ).rgb;\n" +
            "  mediump float a = (length(tColor - color) - 0.5) * 7.0;\n" +
            "  gl_FragColor = vec4(tColor, a);\n" +
            "}",
        transparent: true
    });

    // this.prototype = Object.create(THREE.ShaderMaterial.prototype);
};

// https://threejs.org/docs/#api/en/materials/ShaderMaterial
// THREEx.ChromaKeyMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
// const ChromaKeyMaterial = THREEx.ChromaKeyMaterial;
// export default THREEx.ChromaKeyMaterial;
// export default ChromaKeyMaterial;