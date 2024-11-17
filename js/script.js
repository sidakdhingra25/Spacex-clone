const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
let scrollStarted = false;

btn.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);

function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

function scrollPage() {
  const scrollPos = window.scrollY;

  if (scrollPos > 100 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
  }
}

function countUp() {
  counters.forEach((counter) => {
    counter.innerText = '0';

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const c = +counter.innerText;
      const diff = target - c;
      const increment = Math.ceil(diff / 20);

      if (c < target) {
        counter.innerText = `${c + increment}`;
        setTimeout(updateCounter, 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

describe('reset function', () => {
  test('should set the innerHTML of each element with the class of counter to 0', () => {
    const counters = document.querySelectorAll('.counter');

    reset(counters);

    counters.forEach((counter) => {
      expect(counter.innerHTML).toBe('0');
    });
  });
});
