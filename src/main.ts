import './style.css'

import { animate } from 'animejs';

animate('#box', {
  translateX: 250,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
  duration: 2000
});
