// // import * as THREE from 'three';
// import Store from './Store.js';
// import Tone from 'Tone';

// export default class Recording {

//     constructor() {
//         // super();
//     }

//     // activeSources = [];

//     initSample() {
//         console.log('Recording -> initSample()');
//         // const player = new Tone.Player("./assets/song/aintno_vocals_01.wav").toMaster();
//         // player.autostart = true;

//         Store.recording.playerFirst = new Tone.Player("./assets/song/aintno_vocals_01.wav").toMaster();

//         setTimeout(function() {
//             // Tone.Transport.start();
//             // player.start();
//             // Store.recording.playerFirst.start();
//         }, 6000);
        
//     }

//     initInstruments() {
//         console.log('Recording -> initInstruments - SampleLibrary: ', SampleLibrary);
//         var violin = SampleLibrary.load({
//             instruments: "violin"
//         });
            
//         violin.toMaster();
//         violin.triggerAttack("A3");
          

//         var instruments = SampleLibrary.load({
//             // instruments: ["piano", "harmonium", "violin"],
//             instruments: ["violin"]
//         });

//         console.log({instruments});

//         // Tone.Buffer.on('load', function() {
//         //     instruments['violin'].toMaster();
//         //     instruments['violin'].triggerAttack("A3");
//         // });
//     }

//     initManualPlayer() {
//         console.log('Recording -> initManualPlayer()');
//         // https://www.html5rocks.com/en/tutorials/webaudio/intro/

//         this.activeSources = [];

//         // 
//         function BufferLoader(context, urlList, callback) {
//             this.context = context;
//             this.urlList = urlList;
//             this.onload = callback;
//             this.bufferList = new Array();
//             this.loadCount = 0;
//         }
        
//         BufferLoader.prototype.loadBuffer = function(url, index) {
//             // Load buffer asynchronously
//             var request = new XMLHttpRequest();
//             request.open("GET", url, true);
//             request.responseType = "arraybuffer";
        
//             var loader = this;
        
//             request.onload = function() {
//             // Asynchronously decode the audio file data in request.response
//             loader.context.decodeAudioData(
//                 request.response,
//                 function(buffer) {
//                 if (!buffer) {
//                     alert('error decoding file data: ' + url);
//                     return;
//                 }
//                 loader.bufferList[index] = buffer;
//                 if (++loader.loadCount == loader.urlList.length)
//                     loader.onload(loader.bufferList);
//                 },
//                 function(error) {
//                 console.error('decodeAudioData error', error);
//                 }
//             );
//             }
        
//             request.onerror = function() {
//             alert('BufferLoader: XHR error');
//             }
        
//             request.send();
//         }
        
//         BufferLoader.prototype.load = function() {
//             for (var i = 0; i < this.urlList.length; ++i)
//             this.loadBuffer(this.urlList[i], i);
//         }

//         // 

//         // window.onload = initRecording;
//         var context;
//         var bufferLoader;

//         function initRecording() {
//             // Fix up prefixing
//             window.AudioContext = window.AudioContext || window.webkitAudioContext;
//             context = new AudioContext();

//             bufferLoader = new BufferLoader(
//                 context,
//                 [
//                     './assets/song/aintno_vocals_01.wav',
//                 ],
//                 finishedLoading
//             );

//             bufferLoader.load();
//         }

//         function finishedLoading(bufferList) {
//             // Create two sources and play them both together.
//             var source1 = context.createBufferSource();
//             var source2 = context.createBufferSource();
//             source1.buffer = bufferList[0];
//             source2.buffer = bufferList[1];

//             source1.connect(context.destination);
//             source2.connect(context.destination);
//             source1.start(0);
//             source2.start(0);

//             // this.activeSources.append(source1);
//             // this.activeSources.append(source2);

//             // source1.stop(0);
//             // source2.stop(0);
//         }
    
//         initRecording();
//         // this.stopAll(this.activeSources);
//     }

//     // stopAll(sourcesArr) {
//     stopAll() {
//         // source1.stop(0);
//         // source2.stop(0);
//         console.log('Recording -> stopAll()');
//         console.log(this);
//         // this.activeSources.each(function(item) {
//         // sourcesArr.each(function(item) {
        
//         // sourcesArr.forEach((element) => {
//         //     element.stop(0);
//         // });
//     }

// }