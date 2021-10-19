// https://vr-piano.vercel.app/js/piano.js

const synth = new Tone.PolySynth(Tone.Synth).toDestination()

AFRAME.registerComponent('piano', {

    init: function () {
        this.notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
        this.octaves = ['2', '3', '4', '5', '6', '7']

        let keys_container = this.createKeys()
        let piano_model = this.createPianoModel() 

        this.el.addEventListener('keyPressed', evt => {
            console.log('keyPressed evt', evt)
        })

        this.first_key_pressed = false

        this.el.appendChild(piano_model)
        this.el.appendChild(keys_container)
    },

    createKeys: function () {
        let key_width = 0.03
        let key_depth = 0.125
        let key_height = 0.01

        let keys_container = document.createElement('a-entity')
        keys_container.setAttribute('id', 'keys_container')
        keys_container.setAttribute('position', '-0.025 0.67 -0.03')
        keys_container.setAttribute('layout', {
            columns: this.notes.length,
            margin: key_width + 0.001,
            align: 'center'
        })

        this.octaves.forEach(octave => {
            this.notes.forEach(note => {
                let white_key = document.createElement('a-box')
                white_key.setAttribute('geometry', {
                    width: key_width,
                    depth: key_depth,
                    height: key_height
                })
                white_key.setAttribute('material', {
                    color: 'white'
                })
                white_key.setAttribute('data-note', note + octave)
                white_key.setAttribute('pressable', '')

                white_key.classList.add('collidable')
                white_key.addEventListener('click', this.onKeyPress.bind(this))

                let has_black_key = ['C', 'D', 'F', 'G', 'A'].includes(note)

                if (has_black_key) {
                    let black_key = document.createElement('a-box')
                    black_key.setAttribute('geometry', {
                        width: key_width * .5,
                        depth: key_depth * .65,
                        height: key_height
                    })
                    black_key.setAttribute('material', {
                        color: 'black'
                    })
                    black_key.setAttribute('position', {
                        x: key_width * .5,
                        y: key_height * .5,
                        z: -(key_depth * .175)
                    })
                    black_key.setAttribute('data-note', note + '#' + octave)

                    black_key.classList.add('collidable')
                    black_key.addEventListener('click', this.onKeyPress.bind(this))

                    white_key.appendChild(black_key)
                }

                // let animation = {
                //     property: 'rotation',
                //     from: '0 0 0',
                //     to: '0 360 0',
                //     dur: 5000,
                //     loop: 'true',
                //     dir: 'alternate',
                // }

                let animation = {
                    property: 'material.color',
                    from: 'white',
                    to: 'red',
                    dur: 5000,
                    loop: 'true',
                    dir: 'alternate',
                }
                white_key.setAttribute('animation', animation)


                keys_container.appendChild(white_key)
            })
        })


        return keys_container
    },

    onKeyPress: async function (evt) {
        evt.stopPropagation()
        if (this.first_key_pressed !== true) {
            await Tone.start()
            this.first_key_pressed = true
        }
        let key = evt.target
        let note = key.dataset.note

        this.playKeyNote(note, '16n')
    },

    playKeyNote: function (note, duration) {
        synth.triggerAttackRelease(note, duration)
    },

    createPianoModel: function () {
        const model_src = './assets/Piano_3D.glb'
        let model = document.createElement('a-entity')
        model.setAttribute('gltf-model', `url(${model_src})`)
        model.setAttribute('id', 'piano_model')

        return model

    }
})
