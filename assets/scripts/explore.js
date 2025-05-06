window.addEventListener('DOMContentLoaded', init);

function init() {
  const voiceSelect = document.getElementById('voice-select');
  const synth = window.speechSynthesis;
  const textInput = document.getElementById('text-to-speak');
  const talkButton = document.querySelector('button');
  const faceImage = document.querySelector('img');

  // Load voices function - MODIFIED to preserve voice loading
  function loadVoices() {
    const voices = synth.getVoices();
    console.log('Available voices:', voices);
    
    // Clear existing options except the default
    while (voiceSelect.options.length > 1) {
      voiceSelect.remove(1);
    }
    
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });
  }

  // Initial load
  loadVoices();
  
  // Keep this listener but add debouncing
  let voiceTimeout;
  synth.onvoiceschanged = () => {
    clearTimeout(voiceTimeout);
    voiceTimeout = setTimeout(loadVoices, 200);
  };

  // SINGLE click handler - MODIFIED to prevent duplicates
  let isSpeaking = false;
  talkButton.addEventListener('click', () => {
    if (isSpeaking) {
      synth.cancel();
      isSpeaking = false;
      return;
    }
    
    const text = textInput.value;
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set selected voice
    const selectedOption = voiceSelect.selectedOptions[0];
    if (selectedOption) {
      const voiceName = selectedOption.getAttribute('data-name');
      utterance.voice = synth.getVoices().find(voice => voice.name === voiceName);
    }

    // Face animation
    utterance.onstart = () => {
      isSpeaking = true;
      faceImage.src = 'assets/images/smiling-open.png';
    };
    
    utterance.onend = utterance.onerror = () => {
      isSpeaking = false;
      faceImage.src = 'assets/images/smiling.png';
    };
    
    synth.speak(utterance);
  });
}