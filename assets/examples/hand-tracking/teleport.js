// https://vr-piano.vercel.app/js/teleport.js

AFRAME.registerComponent('teleport', {
    init: function () {

        this.el.cameraRig = document.getElementById("cameraRig")

        this.el.addEventListener('ybuttondown', function (e) {
            this.emit('teleportstart')
        })

        this.el.addEventListener('ybuttonup', function (e) {
            this.emit('teleportend')
        })
        
        this.el.addEventListener('bbuttondown', function (e) {
            this.emit('teleportstart')
        })

        this.el.addEventListener('bbuttonup', function (e) {
            this.emit('teleportend')
        })

        this.el.addEventListener('axismove', function (event) {
            let delta = 0
            delta = +event.detail.axis[2].toFixed(2)

            if (delta > 0) {
                this.cameraRig.object3D.rotation.y -= .06

            } else {
                this.cameraRig.object3D.rotation.y += .06
            }
        })
    },

});