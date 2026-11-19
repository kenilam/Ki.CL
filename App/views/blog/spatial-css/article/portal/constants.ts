const SOURCE = `<figure class="desk">
  <model id="desk" src="desk.usdz"></model>
  <model id="lamp" src="lamp.usdz"></model>
  <model id="mug" src="mug.usdz"></model>
</figure>

<style>
  .desk {
    spatial: portal;
  }

  #lamp {
    transform: translateX(-40cm);
  }

  #mug {
    transform: translateX(30cm);
  }
</style>`;

export { SOURCE };
