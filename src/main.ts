import './style.css';
import { animate } from 'animejs';
import * as Tone from 'tone';

const message = document.title;
const container = document.getElementById('message');
const after = document.getElementById('after-animation');
const replayButton = document.getElementById('replay');
const startButton = document.getElementById('start-btn');
const animationDuration = 8000; // Extended to match song duration

// Happy Birthday tune notes (C major scale)
const happyBirthdayNotes = [
  { note: 'C4', duration: '4n' },
  { note: 'C4', duration: '4n' },
  { note: 'D4', duration: '2n' },
  { note: 'C4', duration: '2n' },
  { note: 'F4', duration: '2n' },
  { note: 'E4', duration: '1n' },
  
  { note: 'C4', duration: '4n' },
  { note: 'C4', duration: '4n' },
  { note: 'D4', duration: '2n' },
  { note: 'C4', duration: '2n' },
  { note: 'G4', duration: '2n' },
  { note: 'F4', duration: '1n' },
  
  { note: 'C4', duration: '4n' },
  { note: 'C4', duration: '4n' },
  { note: 'C5', duration: '2n' },
  { note: 'A4', duration: '2n' },
  { note: 'F4', duration: '2n' },
  { note: 'E4', duration: '2n' },
  { note: 'D4', duration: '1n' },
  
  { note: 'A#4', duration: '4n' },
  { note: 'A#4', duration: '4n' },
  { note: 'A4', duration: '2n' },
  { note: 'F4', duration: '2n' },
  { note: 'G4', duration: '2n' },
  { note: 'F4', duration: '1n' }
];

async function playHappyBirthday() {
  // Start the audio context (required for browser audio)
  await Tone.start();
  
  // Create a synth
  const synth = new Tone.Synth().toDestination();
  
  // Calculate timing for each note
  let currentTime = 0;
  let totalDuration = 0;
  
  for (const note of happyBirthdayNotes) {
    const duration = Tone.Time(note.duration).toSeconds();
    totalDuration += duration;
    
    setTimeout(() => {
      console.log(`Playing note: ${note.note}, duration: ${note.duration}`);
      synth.triggerAttackRelease(note.note, note.duration);
    }, currentTime * 1000);
    
    currentTime += duration;
  }
  console.log('Scheduled all notes for Happy Birthday tune.');
  console.log(`Total tune duration: ${totalDuration} seconds`);
  
  // Update animation duration to match the music
  return totalDuration * 1000; // Convert to milliseconds
}


function startAnimationAndAudio() {
  if (!container || !after) return;
  console.log('Starting animation and audio playback...');
  playHappyBirthday().then(tuneDuration => {
    const letters = message.split('');
    const letterCount = message.replace(/\s+/g, '').length;
    let letterIndex = 0;
    document.documentElement.style.setProperty(
      '--message-chars',
      letterCount.toString(),
    );
  
    letters.forEach((char) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = char === ' ' ? '\u00A0' : char;
      if (char !== ' ') {
        const hue = (letterIndex / (letterCount - 1)) * 360;
        const color = `hsl(${hue}, 100%, 65%)`;
        span.style.color = color;
        span.style.textShadow = `0 0 10px ${color}`;
        letterIndex += 1;
      }
      container.appendChild(span);

      const angle = Math.random() * Math.PI * 2;
      const radius = 800 + Math.random() * 200;
      const rotations = 4 + Math.random() * 2; // Increased from 2 to 4-6 rotations

      span.style.transform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`;

      animate(span, {
        duration: tuneDuration, // Use the actual tune duration
        easing: 'linear',
        onUpdate: (anim: any) => {
          const progress = anim.progress;
          const r = radius * (1 - progress);
          const theta = angle + rotations * Math.PI * 2 * progress;
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          span.style.transform = `translate(${x}px, ${y}px)`;
        },
      });
    });

    window.setTimeout(() => {
      after.classList.add('visible');
    }, tuneDuration);
  });
}

if (startButton) {
  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    startAnimationAndAudio();
  });
}

if (replayButton) {
  replayButton.addEventListener('click', () => {
    window.location.reload();
  });
}
