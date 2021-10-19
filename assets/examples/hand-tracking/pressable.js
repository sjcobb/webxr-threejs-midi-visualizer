// https://vr-piano.vercel.app/js/pressable.js
//https://aframe.io/aframe/examples/showcase/hand-tracking/

AFRAME.registerComponent('pressable', {
    schema: {
        pressDistance: {
            default: 0.06
        }
    },
    init: function() {
        this.worldPosition = new THREE.Vector3()
        this.piano = document.querySelector('[piano]')
        this.handEls = document.querySelectorAll('[hand-tracking]')
        this.pressed = false

        this.tick = AFRAME.utils.throttleTick(this.tick, 62, this)
    },
    tick: function() {
 
        let handEls = this.handEls
        let handEl
        let distance
        for (let i = 0; i < handEls.length; i++) {
            handEl = handEls[i].components['hand-tracking']
            if (handEl.hand != null) {
                const index_position = handEl.hand[XRHand.INDEX_PHALANX_TIP].object3D.position.clone()
                
                // distance = this.calculateFingerDistance(handEl.components['hand-tracking-controls'].indexTipPosition)
                distance = this.calculateFingerDistance(index_position)
                // console.log('distance', distance)
                if (distance < this.data.pressDistance) {
                    if (!this.pressed) {
                        let note = this.el.dataset.note
                        // this.el.emit('keyPressed', {key: note})
                        // console.log('note', this.el.components)
                        this.piano.components.piano.playKeyNote(note, '16n')
                    }
                    this.pressed = true
                    return
                }

            } else {
                return
            }
        }
        if (this.pressed) {
            this.el.emit('pressedended')
        }
        this.pressed = false
    },
    calculateFingerDistance: function(fingerPosition) {
        let el = this.el
        let worldPosition = this.worldPosition
        worldPosition.copy(el.object3D.position)
        el.object3D.parent.updateMatrixWorld()
        el.object3D.parent.localToWorld(worldPosition)
        return worldPosition.distanceTo(fingerPosition)
    }
});