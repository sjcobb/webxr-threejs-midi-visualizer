import Store from './Store.js';
import Tone from 'Tone';

/*
 *** USER INTERFACE ***
 */

//-----SETTINGS CONTAINER------//

/* Chrome autoplay on gesture bug */
// https://github.com/Tonejs/Tone.js/issues/341
document.documentElement.addEventListener(
    "mousedown",
    function() {
        const mouse_IsDown = true;
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
    }
);

if (Store.view.songAutoStart === true) {
    setTimeout(function() {
        Tone.Transport.start();
    }, Store.view.autoStartTime);
    // }, 9000);
} else {
    // controlsId.classList.toggle('show');
}

document.addEventListener("visibilitychange", function() {
    if (document.hidden){
        console.log("visibilitychange -> Browser tab is hidden");
        Tone.Transport.stop();
        console.log("Tone.Transport stopped......");
    } else {
        console.log("visibilitychange -> Browser tab is visible");
    }
});
