import Tone from 'Tone';
import { Transport, Player, Players, Part, Time, Volume } from 'Tone';
// import * as Tonal from "tonal";
import { Note, Interval, Scale, Chord, ChordDetect, ChordType } from "@tonaljs/tonal";

import { generateInstrMetadata } from './InstrumentMappings';

// import Transport from 'Tone/core/Transport';
// import Volume from 'Tone/component/Volume';

import Store from './Store';

import InstrumentMappings from './InstrumentMappings';
import { getInstrByNote } from './InstrumentMappings';

import Physics from './Physics';
import Flame from './Flame';

import * as recordingFirstNotes from '../../assets/recording/1.json';
import * as recordingSecondNotes from '../../assets/recording/2.json';

// console.log({recordingFirstNotes});
// console.log(recordingFirstNotes.tracks[0].notes);
// console.log({recordingSecondNotes});
// // 

//////////
// TONE //
/////////
// Tone.Transport.bpm.value = 200; //PREV
// Tone.Transport.bpm.value = 120;
Tone.Transport.bpm.value = Store.bpm;
// Tone.Transport.bpm.rampTo(120, 10);

// https://tonejs.github.io/docs/r13/Transport#timesignature
// Tone.Transport.timeSignature = 12; // v0.4, v0.5
Tone.Transport.timeSignature = 14;

// Tone.Transport.timeSignature = 4;     // DEFAULT

// Tone.Transport.setLoopPoints(0, "13m"); //starts over at beginning
// Tone.Transport.loop = true; //TODO: *** clear all addBody objects if Transport loop true

/////////////
// SAMPLER //
/////////////
// https://tonejs.github.io/docs/r11/Sampler
// https://github.com/nbrosowsky/tonejs-instruments

// const samplerAssetPath = './assets/samples/violin/'
// Store.sampler.strings = new Tone.Sampler({
//     'A3': samplerAssetPath + 'A3.[mp3|ogg]',
//     'A4': samplerAssetPath + 'A4.[mp3|ogg]',
//     'A5': samplerAssetPath + 'A5.[mp3|ogg]',
//     'A6': samplerAssetPath + 'A6.[mp3|ogg]',
//     'C4': samplerAssetPath + 'C4.[mp3|ogg]',
//     'C5': samplerAssetPath + 'C5.[mp3|ogg]',
//     'C6': samplerAssetPath + 'C6.[mp3|ogg]',
//     'C7': samplerAssetPath + 'C7.[mp3|ogg]',
//     'E4': samplerAssetPath + 'E4.[mp3|ogg]',
//     'E5': samplerAssetPath + 'E5.[mp3|ogg]',
//     'E6': samplerAssetPath + 'E6.[mp3|ogg]',
//     'G4': samplerAssetPath + 'G4.[mp3|ogg]',
//     'G5': samplerAssetPath + 'G5.[mp3|ogg]',
//     'G6': samplerAssetPath + 'G6.[mp3|ogg]',
// }, function(){
//     // Store.sampler.strings.triggerAttackRelease("A3");
//     // Store.sampler.strings.triggerAttackRelease("A3", 3);
// }).toMaster();
// // Store.sampler.strings.volume.value = -32;
// Store.sampler.strings.volume.value = -26;
// // console.log(Store.sampler.strings);

// // //

// const samplerAssetPathSecond = './assets/samples/guitar-acoustic/'
// Store.sampler.guitar = new Tone.Sampler({
//     'F3': samplerAssetPathSecond + 'F3.[mp3|ogg]',
//     'F#1': samplerAssetPathSecond + 'Fs1.[mp3|ogg]',
//     'F#2': samplerAssetPathSecond + 'Fs2.[mp3|ogg]',
//     'F#3': samplerAssetPathSecond + 'Fs3.[mp3|ogg]',
//     'G1': samplerAssetPathSecond + 'G1.[mp3|ogg]',
//     'G2': samplerAssetPathSecond + 'G2.[mp3|ogg]',
//     'G3': samplerAssetPathSecond + 'G3.[mp3|ogg]',
//     'G#1': samplerAssetPathSecond + 'Gs1.[mp3|ogg]',
//     'G#2': samplerAssetPathSecond + 'Gs2.[mp3|ogg]',
//     'G#3': samplerAssetPathSecond + 'Gs3.[mp3|ogg]',
//     'A1': samplerAssetPathSecond + 'A1.[mp3|ogg]',
//     'A2': samplerAssetPathSecond + 'A2.[mp3|ogg]',
//     'A3': samplerAssetPathSecond + 'A3.[mp3|ogg]',
//     'A#1': samplerAssetPathSecond + 'As1.[mp3|ogg]',
//     'A#2': samplerAssetPathSecond + 'As2.[mp3|ogg]',
//     'A#3': samplerAssetPathSecond + 'As3.[mp3|ogg]',
//     'B1': samplerAssetPathSecond + 'B1.[mp3|ogg]',
//     'B2': samplerAssetPathSecond + 'B2.[mp3|ogg]',
//     'B3': samplerAssetPathSecond + 'B3.[mp3|ogg]',
//     'C2': samplerAssetPathSecond + 'C2.[mp3|ogg]',
//     'C3': samplerAssetPathSecond + 'C3.[mp3|ogg]',
//     'C4': samplerAssetPathSecond + 'C4.[mp3|ogg]',
//     'C#2': samplerAssetPathSecond + 'Cs2.[mp3|ogg]',
//     'C#3': samplerAssetPathSecond + 'Cs3.[mp3|ogg]',
//     'C#4': samplerAssetPathSecond + 'Cs4.[mp3|ogg]',
//     'D1': samplerAssetPathSecond + 'D1.[mp3|ogg]',
//     'D2': samplerAssetPathSecond + 'D2.[mp3|ogg]',
//     'D3': samplerAssetPathSecond + 'D3.[mp3|ogg]',
//     'D4': samplerAssetPathSecond + 'D4.[mp3|ogg]',
//     'D#1': samplerAssetPathSecond + 'Ds1.[mp3|ogg]',
//     'D#2': samplerAssetPathSecond + 'Ds2.[mp3|ogg]',
//     'D#3': samplerAssetPathSecond + 'Ds3.[mp3|ogg]',
//     'E1': samplerAssetPathSecond + 'E1.[mp3|ogg]',
//     'E2': samplerAssetPathSecond + 'E2.[mp3|ogg]',
//     'E3': samplerAssetPathSecond + 'E3.[mp3|ogg]',
//     'F1': samplerAssetPathSecond + 'F1.[mp3|ogg]',
//     'F2': samplerAssetPathSecond + 'F2.[mp3|ogg]',
// }, function(){
//     // Store.sampler.guitar.triggerAttackRelease("A3");
// }).toMaster();
// Store.sampler.guitar.volume.value = -20;
// // console.log(Store.sampler.guitar);

// const samplerAssetPathThird = './assets/samples/piano/'
// Store.sampler.piano = new Tone.Sampler({
//     'A0': samplerAssetPathThird + 'A0.[mp3|ogg]',
//     'A1': samplerAssetPathThird + 'A1.[mp3|ogg]',
//     'A2': samplerAssetPathThird + 'A2.[mp3|ogg]',
//     'A3': samplerAssetPathThird + 'A3.[mp3|ogg]',
//     'A4': samplerAssetPathThird + 'A4.[mp3|ogg]',
//     'A5': samplerAssetPathThird + 'A5.[mp3|ogg]',
//     'A6': samplerAssetPathThird + 'A6.[mp3|ogg]',
//     'A#0': samplerAssetPathThird + 'As0.[mp3|ogg]',
//     'A#1': samplerAssetPathThird + 'As1.[mp3|ogg]',
//     'A#2': samplerAssetPathThird + 'As2.[mp3|ogg]',
//     'A#3': samplerAssetPathThird + 'As3.[mp3|ogg]',
//     'A#4': samplerAssetPathThird + 'As4.[mp3|ogg]',
//     'A#5': samplerAssetPathThird + 'As5.[mp3|ogg]',
//     'A#6': samplerAssetPathThird + 'As6.[mp3|ogg]',
//     'B0': samplerAssetPathThird + 'B0.[mp3|ogg]',
//     'B1': samplerAssetPathThird + 'B1.[mp3|ogg]',
//     'B2': samplerAssetPathThird + 'B2.[mp3|ogg]',
//     'B3': samplerAssetPathThird + 'B3.[mp3|ogg]',
//     'B4': samplerAssetPathThird + 'B4.[mp3|ogg]',
//     'B5': samplerAssetPathThird + 'B5.[mp3|ogg]',
//     'B6': samplerAssetPathThird + 'B6.[mp3|ogg]',
//     'C0': samplerAssetPathThird + 'C0.[mp3|ogg]',
//     'C1': samplerAssetPathThird + 'C1.[mp3|ogg]',
//     'C2': samplerAssetPathThird + 'C2.[mp3|ogg]',
//     'C3': samplerAssetPathThird + 'C3.[mp3|ogg]',
//     'C4': samplerAssetPathThird + 'C4.[mp3|ogg]',
//     'C5': samplerAssetPathThird + 'C5.[mp3|ogg]',
//     'C6': samplerAssetPathThird + 'C6.[mp3|ogg]',
//     'C7': samplerAssetPathThird + 'C7.[mp3|ogg]',
//     'C#0': samplerAssetPathThird + 'Cs0.[mp3|ogg]',
//     'C#1': samplerAssetPathThird + 'Cs1.[mp3|ogg]',
//     'C#2': samplerAssetPathThird + 'Cs2.[mp3|ogg]',
//     'C#3': samplerAssetPathThird + 'Cs3.[mp3|ogg]',
//     'C#4': samplerAssetPathThird + 'Cs4.[mp3|ogg]',
//     'C#5': samplerAssetPathThird + 'Cs5.[mp3|ogg]',
//     'C#6': samplerAssetPathThird + 'Cs6.[mp3|ogg]',
//     'D0': samplerAssetPathThird + 'D0.[mp3|ogg]',
//     'D1': samplerAssetPathThird + 'D1.[mp3|ogg]',
//     'D2': samplerAssetPathThird + 'D2.[mp3|ogg]',
//     'D3': samplerAssetPathThird + 'D3.[mp3|ogg]',
//     'D4': samplerAssetPathThird + 'D4.[mp3|ogg]',
//     'D5': samplerAssetPathThird + 'D5.[mp3|ogg]',
//     'D6': samplerAssetPathThird + 'D6.[mp3|ogg]',
//     'D#0': samplerAssetPathThird + 'Ds0.[mp3|ogg]',
//     'D#1': samplerAssetPathThird + 'Ds1.[mp3|ogg]',
//     'D#2': samplerAssetPathThird + 'Ds2.[mp3|ogg]',
//     'D#3': samplerAssetPathThird + 'Ds3.[mp3|ogg]',
//     'D#4': samplerAssetPathThird + 'Ds4.[mp3|ogg]',
//     'D#5': samplerAssetPathThird + 'Ds5.[mp3|ogg]',
//     'D#6': samplerAssetPathThird + 'Ds6.[mp3|ogg]',
//     'E0': samplerAssetPathThird + 'E0.[mp3|ogg]',
//     'E1': samplerAssetPathThird + 'E1.[mp3|ogg]',
//     'E2': samplerAssetPathThird + 'E2.[mp3|ogg]',
//     'E3': samplerAssetPathThird + 'E3.[mp3|ogg]',
//     'E4': samplerAssetPathThird + 'E4.[mp3|ogg]',
//     'E5': samplerAssetPathThird + 'E5.[mp3|ogg]',
//     'E6': samplerAssetPathThird + 'E6.[mp3|ogg]',
//     'F0': samplerAssetPathThird + 'F0.[mp3|ogg]',
//     'F1': samplerAssetPathThird + 'F1.[mp3|ogg]',
//     'F2': samplerAssetPathThird + 'F2.[mp3|ogg]',
//     'F3': samplerAssetPathThird + 'F3.[mp3|ogg]',
//     'F4': samplerAssetPathThird + 'F4.[mp3|ogg]',
//     'F5': samplerAssetPathThird + 'F5.[mp3|ogg]',
//     'F6': samplerAssetPathThird + 'F6.[mp3|ogg]',
//     'F#0': samplerAssetPathThird + 'Fs0.[mp3|ogg]',
//     'F#1': samplerAssetPathThird + 'Fs1.[mp3|ogg]',
//     'F#2': samplerAssetPathThird + 'Fs2.[mp3|ogg]',
//     'F#3': samplerAssetPathThird + 'Fs3.[mp3|ogg]',
//     'F#4': samplerAssetPathThird + 'Fs4.[mp3|ogg]',
//     'F#5': samplerAssetPathThird + 'Fs5.[mp3|ogg]',
//     'F#6': samplerAssetPathThird + 'Fs6.[mp3|ogg]',
//     'G0': samplerAssetPathThird + 'G0.[mp3|ogg]',
//     'G1': samplerAssetPathThird + 'G1.[mp3|ogg]',
//     'G2': samplerAssetPathThird + 'G2.[mp3|ogg]',
//     'G3': samplerAssetPathThird + 'G3.[mp3|ogg]',
//     'G4': samplerAssetPathThird + 'G4.[mp3|ogg]',
//     'G5': samplerAssetPathThird + 'G5.[mp3|ogg]',
//     'G6': samplerAssetPathThird + 'G6.[mp3|ogg]',
//     'G#0': samplerAssetPathThird + 'Gs0.[mp3|ogg]',
//     'G#1': samplerAssetPathThird + 'Gs1.[mp3|ogg]',
//     'G#2': samplerAssetPathThird + 'Gs2.[mp3|ogg]',
//     'G#3': samplerAssetPathThird + 'Gs3.[mp3|ogg]',
//     'G#4': samplerAssetPathThird + 'Gs4.[mp3|ogg]',
//     'G#5': samplerAssetPathThird + 'Gs5.[mp3|ogg]',
//     'G#6': samplerAssetPathThird + 'Gs6.[mp3|ogg]'
// }, function(){
//     // Store.sampler.piano.triggerAttackRelease("A3");
// }).toMaster();
// Store.sampler.piano.volume.value = -14;

///////////
// SYNTH //
///////////
// https://tonejs.github.io/examples/polySynth.html
// https://tonejs.github.io/docs/13.8.25/PolySynth

// var polySynth = new Tone.PolySynth(6, Tone.Synth, {
// Store.polySynth = new Tone.PolySynth(4, Tone.Synth, { // default
Store.polySynth = new Tone.PolySynth(10, Tone.Synth, {
    // oscillator: {
    //     type: "triangle", // sine, square, sawtooth, triangle (default), custom
    //     // frequency: 440 ,
    //     // detune: 0 ,
    //     // phase: 0 ,
    //     // partials: [] ,
    //    partialCount: 0
    // },
    // // https://tonejs.github.io/docs/13.8.25/Envelope
    envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
        // attack: 0.1,
        // decay: 0.2,
        // sustain: 1, // v0.5
        // sustain: 0.5, 
        // release: 0.8,
    },
    // // https://tonejs.github.io/docs/13.8.25/Filter#type
    // filter: {
	// 	// type: "highpass", // lowpass, highpass, bandpass, lowshelf, highshelf, notch, allpass, peaking
	// },
}).toMaster();

// Store.polySynth.volume.value = -8; // v0.4, v0.5
Store.polySynth.volume.value = -18;

// Store.polySynth.set("detune", +1200); // octave = 12 semitones of 100 cents each
// Store.polySynth.set("detune", +1200);

const bounceSynth = new Tone.Synth();
bounceSynth.volume.value = 2;
bounceSynth.toMaster();

var toneSnare = new Tone.NoiseSynth({
    "volume": -5.0,
    "envelope": {
        "attack": 0.001,
        "decay": 0.2,
        "sustain": 0
    },
    "filterEnvelope": {
        "attack": 0.001,
        "decay": 0.1,
        "sustain": 0
    }
}).toMaster();

// const player808HiHat = new Player(`${sampleBaseUrl}/808-hihat-vh.mp3`).toMaster();
// const playerHiHatOpen = new Tone.Player("./assets/samples/drum-kits/dubstep/hihat-open.mp3").toMaster(); //PREV
const playerHiHatOpen = new Player("./assets/samples/drum-kits/dubstep/hihat-open.mp3").toMaster();
const playerHiHat = new Player("./assets/samples/drum-kits/dubstep/hihat-closed.mp3").toMaster();
playerHiHatOpen.volume.value = -2;
playerHiHat.volume.value = -2;

// const playerKick = new Player("./assets/samples/drum-kits/analog/kick.mp3").toMaster(); //aka dubstep - 808?
// const playerKick = new Player("./assets/samples/drum-kits/dubstep/kick.mp3").toMaster(); //aka analog - PREV
// const playerKick = new Player("./assets/samples/drum-kits/electronic/kick.mp3").toMaster(); //guitar pluck
// const playerKick = new Player("./assets/samples/drum-kits/percussion/kick.mp3").toMaster(); //normal

// const playerKick = new Player("./assets/samples/drum-kits/808/808-kick-vh.mp3").toMaster(); // high
const playerKick = new Player("./assets/samples/drum-kits/808/808-kick-vm.mp3").toMaster(); // medium
// const playerKick = new Player("./assets/samples/drum-kits/808/808-kick-vl.mp3").toMaster(); // low

// const playerKick = new Player("./assets/samples/drum-kits/hiphop/kick.mp3").toMaster(); //v2, v3, v4 (boring, but not distorted)
playerKick.volume.value = +2;

// playerKick.volume.value = -6; // -6 broken
// playerKick.input.value = -4; //err
// {
//     onload: Tone.noOp ,
//     playbackRate: 1 ,
//     loop: false ,
//     autostart: false ,
//     loopStart: 0 ,
//     loopEnd: 0 ,
//     reverse: false ,
//     fadeIn: 0 ,
//     fadeOut: 0
// }

console.log({playerKick});
// input: AudioParam {value: 1, automationRate: "a-rate", defaultValue: 1, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}

const playerCrash = new Player("./assets/samples/drum-kits/hiphop/clap.mp3").toMaster(); //hand clap echo
// const playerCrash = new Player("./assets/samples/drum-kits/percussion/clap.mp3").toMaster(); //stick click

// const playerRide = new Player("./assets/samples/drum-kits/dubstep/ride.wav").toMaster(); //drum stick click
const playerRide = new Player("./assets/samples/drum-kits/hiphop/ride.mp3").toMaster(); //cool click pop
// const playerRide = new Player("./assets/samples/drum-kits/electronic/ride.mp3").toMaster(); //high tick metal
// const playerRide = new Player("./assets/samples/drum-kits/percussion/ride.mp3").toMaster(); //weird low squeak 
// const playerRide = new Player("./assets/samples/drum-kits/analog/ride.mp3").toMaster(); // drum stick click

const playerTomHigh = new Player("./assets/samples/drum-kits/electronic/tom-high.mp3").toMaster();
const playerTomMid = new Player("./assets/samples/drum-kits/electronic/tom-mid.mp3").toMaster();
// const playerTomLow = new Player("./assets/samples/drum-kits/electronic/tom-low.mp3").toMaster();

// let flameFirst = new Flame();

export default class Trigger {
    constructor() {
        // super();
    }
    
    triggerNote(obj) {
        // console.log({obj});
        // console.log(obj.userData.opts);

        const physics = new Physics();

        const instrument = new InstrumentMappings();

        Store.musicActive = true; //remove?

        // console.log('Store.inputMidi: ', Store.inputMidi);
        if (Store.inputMidi === true) {

        } else {

        }
        // console.log('Trigger -> addBody - opts: ', obj.userData.opts);
        
        let triggerObj = {};
        let combinedNote = 'C1';
        if (obj.userData.opts.type !== 'drum') {
            combinedNote = obj.userData.opts.note ? (obj.userData.opts.note + obj.userData.opts.octave) : 'C4';
            // console.log({combinedNote});

            Store.dashboard.lastNote = combinedNote;

            Store.dashboard.allPlayedNotes.push(combinedNote);

            if (Store.dashboard.noteCountsObj[combinedNote] != null) {
                Store.dashboard.noteCountsObj[combinedNote].count++;
            } else {
                Store.dashboard.noteCountsObj[combinedNote] = {
                    note: obj.userData.opts.note,
                    octave: obj.userData.opts.octave,
                    count: 1,
                };
            }

            Store.dashboard.noteCountsArr = [];
            for (let key in Store.dashboard.noteCountsObj){
                // console.log({key});
                Store.dashboard.noteCountsArr.push(Store.dashboard.noteCountsObj[key]);
            }

            // https://stackoverflow.com/a/8900824/7639084
            Store.dashboard.noteCountsArr.sort(function(a, b) {
                var textA = a.note.toUpperCase();
                var textB = b.note.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            // console.log('triggerNote -> Store.dashboard.allPlayedNotes: ', Store.dashboard.allPlayedNotes);

            Store.dashboard.recentPlayedNotes.push(combinedNote);
            // console.log('triggerNote -> Store.dashboard.recentPlayedNotes: ', Store.dashboard.recentPlayedNotes);

            triggerObj = obj.userData.opts;

        } else {
            triggerObj = instrument.getNoteMapping(obj); //ORIG
        }
        
        // console.log('Trigger -> combinedNote: ', combinedNote);
        let drumIndex = 0;
        if (triggerObj.type === 'drum') {
            if (triggerObj.variation === 'kick') {
                // console.log('trigger -> playerKick: ', playerKick);
                playerKick.start();
                // toneKick.triggerAttackRelease("C2"); //deep
            } else if (triggerObj.variation === 'hihat') {
                playerHiHat.start();
            } else if (triggerObj.variation === 'hihat-open') {
                playerHiHatOpen.start();
            } else if (triggerObj.variation === 'snare') {
                toneSnare.triggerAttackRelease();
            } else if (triggerObj.variation === 'crash') {
                playerCrash.start();
                // toneCrash.triggerAttackRelease("C4"); //laser
            } else if (triggerObj.variation === 'ride') {
                playerRide.start();
            } else if (triggerObj.variation === 'tom-high') {
                playerTomHigh.start(); // key: 7
                // flameFirst.create(obj.initPosition);
            } else {
                // console.log('UNDEF variation - triggerNote() -> triggerObj (drum): ', triggerObj);
                playerHiHat.start();
            }
            drumIndex++;
        } else if (triggerObj.type === 'chord') { // TODO: rename, universal chord / note accessor
            // console.log('triggerNote (chord) -> combinedNote: ', combinedNote);
            // console.log('triggerNote (chord) -> triggerObj: ', triggerObj);

            // console.log('triggerNote (chord) -> obj.userData.opts.duration: ', obj.userData.opts.duration);
            // console.log('triggerNote (chord - ', combinedNote, ') -> obj.userData.opts.duration: ', obj.userData.opts.duration);
            const noteLength = obj.userData.opts.duration ? obj.userData.opts.duration : 0.15;

            if (triggerObj.variation === 'violin') {
                Store.sampler.strings.triggerAttackRelease(combinedNote, noteLength); 
            } else if (triggerObj.variation === 'guitar') {
                Store.sampler.guitar.triggerAttackRelease(combinedNote, noteLength); 
            } else if (triggerObj.variation === 'piano') {
                Store.sampler.piano.triggerAttackRelease(combinedNote, noteLength); 
            } else {
                Store.polySynth.triggerAttackRelease(combinedNote, noteLength); 
            }
        } else {
            bounceSynth.triggerAttackRelease(combinedNote, "8n");
            // console.log('triggerNote -> ballDesc: ', triggerObj.ballDesc, ', note: ', combinedNote);
        }

        Store.musicActive = false; //remove?

        if (Store.configColorAnimate === true && triggerObj.color) {
            // console.log("configColorAnimate -> GLOBALS: ", globals);
            if (triggerObj.type !== 'drum') {
                Store.activeInstrColor = triggerObj.color;
            }
        }

        if (Store.view.chordDetect === true) {
            // if (Store.dashboard.allPlayedNotes.length === 4) {
            if (Store.dashboard.allPlayedNotes.length % 4 === 0) {
                // console.log(Tonal);
                // Tonal.ChordDetect.detect(Store.dashboard.allPlayedNotes);

                // console.log(Chord);
                const currentChord = Chord.detect(Store.dashboard.allPlayedNotes);
                // console.log({currentChord});

                if (currentChord.length) {
                    const currentChordNoRoot = currentChord[0].slice(0, currentChord[0].length - 2);
                    // console.log(currentChordNoRoot);

                    const currentChordSplit = currentChord[0].split('/');
                    // console.log({currentChordSplit});

                    // const currentChordInfo = Chord.get(currentChordNoRoot);
                    const currentChordInfo = Chord.get(currentChordSplit[0]);
                    const currentChordDisplayName = currentChordInfo.name;
                    // console.log(currentChordDisplayName);
                    
                    if (currentChordDisplayName) {
                        Store.dashboard.currentChordDisplayName = currentChordDisplayName;
                        Store.dashboard.currentChordInfo = currentChordInfo;

                        Store.dashboard.allPlayedNotes = Store.dashboard.allPlayedNotes.slice(4);

                        Store.dashboard.chordsPlayed.push(currentChordInfo);
                    }
                }

                // console.log(Chord.getChord(currentChord[0]));
                // console.log(Chord.getChord("maj7", "G4", "B4"));

                // https://github.com/tonaljs/tonal/tree/master/packages/chord
                // ...
                // Chord.getChord("maj7", "G4", "B4"); // =>
                // {
                //   empty: false,
                //   name: "G major seventh over B",
                //   symbol: "Gmaj7/B",
                //   tonic: "G4",
                //   root: "B4",
                //   rootDegree: 2,
                //   setNum: 2193,
                //   type: "major seventh",
                //   aliases: ["maj7", "Δ", "ma7", "M7", "Maj7"],
                //   chroma: "100010010001",
                //   intervals: ["3M", "5P", "7M", "8P"],
                //   normalized: "100010010001",
                //   notes: ["B4", "D5", "F#5", "G5"],
                //   quality: "Major",
                // }

                // Chord.reduced("Cmaj7"); // => ["C5", "CM"]

            }
            // console.log(Store.dashboard);
        }
    }

}



//-----RECORDING------//
// https://codepen.io/gregh/project/editor/aAexRX

const physics = new Physics();

Store.recording.parts[0] = recordingFirstNotes.tracks[0].notes;
Store.recording.parts[1] = recordingSecondNotes.tracks[0].notes;

// console.log({recordingNotes});
// console.log('Store.recording: ', Store.recording);

const recordingPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);
    // console.log(instrMapped);
    instrMapped.midi = datum.midi;

    // instrMapped.color = '#008b8b';
    // instrMapped.color = '#800000'; // dkred
    // instrMapped.color = '#64b5f6'; // human blue
    // instrMapped.color = '#AC3E24'; // beethoven red

    instrMapped.color = '#FFFF00'; // yellow
    // instrMapped.color = '#081953'; // dkblue (ball pit blue)

    // TODO: how to calculate ratio of x to y, to rotate piano key positions relative to origin (A0, midi 21), aka move clock-wise
    // TODO: how to projection map keyboard video so it creates illusion of being in-line with rotated dropped note spheres

    // instrMapped.originalPosition.z = (instrMapped.posIndex * 0.9); // prev
    // instrMapped.originalPosition.z = (instrMapped.posIndex * 0.5); // worse
    instrMapped.originalPosition.z = (instrMapped.posIndex * 1.1); // better
    // instrMapped.originalPosition.z = (instrMapped.posIndex * 2.25); // bad

    // nstrMapped.originalPosition.x = (instrMapped.negIndex / 6); // prev
    // instrMapped.originalPosition.x = (instrMapped.negIndex / 4); // better
    instrMapped.originalPosition.x = (instrMapped.negIndex / 3); // better
    // instrMapped.originalPosition.x = (instrMapped.negIndex / 2); // bad

    instrMapped.duration = datum.duration
    // instrMapped.duration = datum.duration * 2;

    // instrMapped.variation = 'guitar';
    // instrMapped.variation = 'violin';
    // instrMapped.variation = 'piano';

    console.log(instrMapped.originalPosition);
    // physics.addBody(true, Store.view.posDropX, instrMapped, 0); // prev
    physics.addBody(true, instrMapped.originalPosition.x, instrMapped, 0); 

}, Store.recording.parts[0]);
// }, recordingFirstNotes);      // twinkle twinkle little star
// }, recordingSecondNotes);  // bah bah black sheep
// }, recordingThirdNotes);  // alphabet song

// recordingPart.volume.value = -18;
// recordingPart.loop = true;
// recordingPart.loop = 2;

//recordingPart.playbackRate = 0.9;
// recordingPart.start("0:5:0");
// recordingPart.start("0:0:0");
console.log('pre-start -> recordingPart', recordingPart);
// recordingPart.start(0);
// recordingPart.start(6);
recordingPart.start(10);

const recordingSecondPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    // instrMapped.color = '#0000cd';
    // instrMapped.color = '#003366'; 

    instrMapped.color = '#800000'; // dkred
    // instrMapped.color = '#64b5f6'; // human blue

    // instrMapped.originalPosition.z += 15;
    instrMapped.originalPosition.z -= 10;
    // instrMapped.originalPosition.z += 8;

    // instrMapped.duration = datum.duration / 2;
    // instrMapped.duration = datum.duration * 2;
    instrMapped.duration = datum.duration;

    // instrMapped.variation = 'sample';
    // instrMapped.variation = 'violin';

    physics.addBody(true, Store.view.posDropX, instrMapped, 0);

}, Store.recording.parts[1]);
// }, recordingSecondNotes);  // bah bah black sheep

// // recordingSecondPart.loop = true;
// recordingSecondPart.start("0:0:0");
// recordingSecondPart.start("4:0:0"); // little too early
// recordingSecondPart.start("4:4:0"); // decent
// recordingSecondPart.start("5:0:0"); // too late

// recordingSecondPart.playbackRate = 0.9;
// recordingSecondPart.start("0:0:0"); 
// recordingSecondPart.start("2:16:0"); // TODO: change to ticks or seconds

// recordingSecondPart.start(0);
// recordingSecondPart.start(27.5); // little early

// recordingSecondPart.start(28.85);
// recordingSecondPart.start(29.0);