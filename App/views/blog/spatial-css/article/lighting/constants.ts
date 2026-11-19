const SOURCE = `@environment-map {
  name: "studio";
  format: equirectangular;
  src: url("studio.hdr");
}

@environment-map {
  name: "night";
  format: equirectangular;
  src: url("night.hdr");
}

.desk {
  environment-map: "studio";
}

@media (prefers-color-scheme: dark) {
  .desk {
    environment-map: "night";
  }
}`;

export { SOURCE };
