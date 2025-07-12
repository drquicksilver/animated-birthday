import './style.css';
import { animate } from 'animejs';

const message = 'HAPPY BIRTHDAY';
const container = document.getElementById('message');

if (container) {
  message.split('').forEach((char) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = char === ' ' ? '\u00A0' : char;
    container.appendChild(span);

    const angle = Math.random() * Math.PI * 2;
    const radius = 800 + Math.random() * 200;
    const rotations = 2 + Math.random();

    span.style.transform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`;

    animate(span, {
      duration: 4000,
      easing: 'linear',
      onUpdate: (anim: any) => {
        const progress = anim.progress / 100;
        const r = radius * (1 - progress);
        const theta = angle + rotations * Math.PI * 2 * progress;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        span.style.transform = `translate(${x}px, ${y}px)`;
      },
    });
  });
}
