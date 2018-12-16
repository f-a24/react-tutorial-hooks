import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
window.addEventListener('mousedown', e => {
  document.body.classList.add('mouse-navigation');
  document.body.classList.remove('kbd-navigation');
});
window.addEventListener('keydown', e => {
  if (e.keyCode === 9) {
    document.body.classList.add('kbd-navigation');
    document.body.classList.remove('mouse-navigation');
  }
});
window.addEventListener('click', e => {
  const target = e.target as HTMLElement; 
  if (target.tagName === 'A' && target.getAttribute('href') === '#') {
    e.preventDefault();
  }
});
window.onerror = (message, source, line, col, error) => {
  const text = error ? error.stack || error : message + ' (at ' + source + ':' + line + ':' + col + ')';
  const errors = document.querySelector('#errors') as HTMLElement;
  errors.textContent += text + '\n';
  errors.style.display = '';
};
