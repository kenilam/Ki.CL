const SOURCE = `#mug {
  transform: translateX(30cm);
  transition: transform 0.6s ease-out;
}

#mug.moved {
  transform: translateX(-10cm);
}

@media (prefers-reduced-motion: reduce) {
  #mug {
    transition: none;
  }
}`;

export { SOURCE };
