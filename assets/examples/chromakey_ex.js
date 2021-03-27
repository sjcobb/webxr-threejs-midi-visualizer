// Option 1: https://github.com/hawksley/Threex.chromakey

// Option 2:
// http://makc.github.io/three.js/chromakey/
// https://makc3d.wordpress.com/2014/04/01/transparent-video-texture-in-three-js/
// https://github.com/makc/makc.github.io/tree/master/three.js/chromakey
// http://stemkoski.github.io/Three.js/Video.html
// http://stemkoski.github.io/Three.js/Webcam-Texture.html
// https://hmp.is.it/creating-chroma-key-effect-html5-canvas/

ChromaKeyMaterial = function (url, width, height, keyColor) {
	THREE.ShaderMaterial.call(this);

	video = document.createElement('video');
	video.loop = true;
	video.src = url;
	video.load();
	video.play();

	var videoImage = document.createElement('canvas');
	if (window["webkitURL"]) document.body.appendChild(videoImage);
	videoImage.width = width;
	videoImage.height = height;
	
	var keyColorObject = new THREE.Color(keyColor);

	var videoImageContext = videoImage.getContext('2d');
	// background color if no video present
	videoImageContext.fillStyle = '#' + keyColorObject.getHexString();
	videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

	var videoTexture = new THREE.Texture(videoImage);
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;

	this.update = function () {
		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			videoImageContext.drawImage(video, 0, 0);
			if (videoTexture) {
				videoTexture.needsUpdate = true;
			}
		}
	}

	this.setValues({

		uniforms: {
			texture: {
				type: "t",
				value: videoTexture
			},
			color: {
				type: "c",
				value: keyColorObject
			}
		},
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent,

		transparent: true
	});
}

ChromaKeyMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);



(function () {
	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera();
	camera.position.set(0, 150, 900);
	camera.lookAt(scene.position);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor(0xffffff);
	document.getElementById('demo').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	var floorTexture = new THREE.ImageUtils.loadTexture('checkerboard.jpg');
	floorTexture.anisotropy = renderer.getMaxAnisotropy();
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(10, 10);

	var floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), new THREE.MeshBasicMaterial({
		map: floorTexture,
		side: THREE.DoubleSide
	}));
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);


	var movieMaterial = new ChromaKeyMaterial('video.ogv', 242, 421, 0xd400);
	var movieGeometry = new THREE.PlaneGeometry(60, 105, 4, 4);

	var girls = []
	for (var i = 0; i < 5; i++)
		for (var j = 0; j < 5; j++)
			if ((i + j) % 2 == 0) {
				var movie = new THREE.Mesh(movieGeometry, movieMaterial);
				movie.position.set(0, 53, 0);

				var girl = new THREE.Object3D();
				girl.position.set(150 * (i - 2), 0, 150 * (j - 2));

				girl.add(movie);
				scene.add(girl);

				girls.push(girl);
			}


	// stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	document.body.appendChild(stats.domElement);

	// resize
	var resize = function () {
		// notify the renderer of the size change
		renderer.setSize(window.innerWidth, window.innerHeight);
		// update the camera
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	window.addEventListener('resize', resize, false);
	resize();

	// animate
	var animate = function () {
		controls.update();

		movieMaterial.update();

		for (var i in girls) girls[i].lookAt(camera.position);

		renderer.render(scene, camera);

		stats.update();
		requestAnimationFrame(animate);
	}

	animate();

})();
