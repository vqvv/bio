$(document).ready(function() {
    var audio = $('#background-music')[0];
    var video = $('#background-video')[0];
    var isPlaying = false;

    // Preload video metadata to reduce initial loading time
    video.preload = 'metadata';

    // Start playing the video and audio when the video is loaded
    video.oncanplay = function() {
        video.play();
        audio.play();
        isPlaying = true;
    };

    // Handle video loading errors
    video.onerror = function() {
        console.error('Error loading video');
        // You can display a message to the user or retry loading the video
    };

    // Handle button click
    $('#enter-button').click(function() {
        $('#enter-site').fadeOut('slow', function() {
            $('#content').fadeIn('slow', function() {
                // Play both audio and video
                audio.play();
                video.play();
            });
        });
    });

    // Handle tab visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            if (isPlaying) {
                audio.play();
                video.play();
            }
        } else {
            if (!audio.paused) {
                audio.pause();
            }
            if (!video.paused) {
                video.pause();
            }
        }
    });

    // Optional: Handle when audio ends to stop the video as well
    audio.onended = function() {
        video.pause();
        isPlaying = false;
    };

    // Optional: Handle when video ends to stop the audio as well
    video.onended = function() {
        audio.pause();
        isPlaying = false;
    };
});
