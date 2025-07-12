import './style.css';
import { animate } from 'animejs';

const message = 'HAPPY BIRTHDAY';
const container = document.getElementById('message');
const after = document.getElementById('after-animation');
const replayButton = document.getElementById('replay');

if (replayButton) {
  replayButton.addEventListener('click', () => {
    window.location.reload();
  });
}
if (container && after) {
  const letters = message.split('');
  const letterCount = message.replace(/\s+/g, '').length;
  let letterIndex = 0;
  const animations: Promise<void>[] = [];
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
    const rotations = 2 + Math.random();

    span.style.transform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`;

    const anim = animate(span, {
      duration: 4000,
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
    // anime.js exposes a `finished` promise
    animations.push((anim as any).finished);
  });

  Promise.all(animations).then(() => {
    after.classList.add('visible');
  });
}
