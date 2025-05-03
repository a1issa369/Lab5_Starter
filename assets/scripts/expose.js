// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // DOM Elements
  const hornSelect = document.getElementById('horn-select');
  
  hornSelect.addEventListener('change', function() {
    const selectedValue = hornSelect.value;
    console.log("Horn selected:", selectedValue); 

    const hornImage = document.querySelector('#expose img');
    hornImage.src = `assets/images/${selectedValue}.svg`;
    hornImage.alt = `${selectedValue} image`;
    console.log("Image updated to:", hornImage.src);

    const hornSound = document.querySelector('audio');
    hornSound.src = `assets/audio/${selectedValue}.mp3`;
    
    // Preload the audio
    hornSound.load();
    console.log("Audio set to:", hornSound.src);
  });

  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const hornSound = document.querySelector('audio');

  volumeSlider.addEventListener('input', function() {
    // Get current volume (0-100)
    const volume = volumeSlider.value;
    
    // Set audio volume (0.0-1.0)
    hornSound.volume = volume / 100;
    
    // Update volume icon
    let iconLevel;
    if (volume == 0) {
      iconLevel = 0;
    } else if (volume < 33) {
      iconLevel = 1;
    } else if (volume < 67) {
      iconLevel = 2;
    } else {
      iconLevel = 3;
    }
    volumeIcon.src = `assets/icons/volume-level-${iconLevel}.svg`;
    
    console.log(`Volume: ${volume}% (level ${iconLevel})`);
  });

  const playButton = document.querySelector('button');
  const jsConfetti = new JSConfetti();

  playButton.addEventListener('click', function() {
    const hornSound = document.querySelector('audio');
    
    // Verify we have a sound loaded
    if (!hornSound.src || hornSound.src.includes('undefined')) {
      console.warn('No sound selected!');
      return;
    }

    // Play the sound
    hornSound.play()
      .then(() => {
        console.log('Playing sound at volume:', hornSound.volume);
        
        // Add confetti if it's the party horn
        if (hornSelect.value === 'party-horn') {
          jsConfetti.addConfetti();
          console.log('Party horn confetti!');
        }
      })
      .catch(error => {
        console.error('Playback failed:', error);
      });
  });
}
