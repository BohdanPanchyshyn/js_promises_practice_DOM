'use strict';

const body = document.querySelector('body');

const successHandler = (text) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = text;

  body.appendChild(div);
};

const errorHandler = (err) => {
  const div = document.createElement('div');

  const text = err instanceof Error ? err.message : String(err);

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = text;

  body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved');
    },
    { once: true },
  );

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.then(successHandler).catch(errorHandler);

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();

      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'click',
    (e) => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

secondPromise.then(successHandler);

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener(
    'click',
    () => {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

thirdPromise.then(successHandler);
