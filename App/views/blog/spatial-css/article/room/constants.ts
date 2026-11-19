const SOURCE = `const desk = document.querySelector('.desk');
const button = document.querySelector('#place-in-room');

button.addEventListener('click', () => {
  desk.requestVolumetricScene();
});`;

export { SOURCE };
