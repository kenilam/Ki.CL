import {THREE} from '@/Component/WebGL';
import * as IWebGL from "@/Component/WebGL/spec";

const RADIUS = 200;
const INCREMENT = 0.1;
const SEGMENTS = 32;
const RINGS = 32;
const TILE = 23.5;

const globe = new THREE.Group();
const content = new THREE.Group();
const light = new THREE.SpotLight(0xffffff, 0.5);
const loader = new THREE.TextureLoader();
const sphere = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS );

let angle = 0;

content.rotation.x = THREE.Math.degToRad(TILE);

globe.add(content);
globe.position.z = -300;

light.position.x = 10;
light.position.y = 50;
light.position.z = 400;

loader.load( '/asset/image/globe.jpg', map => {
  content.add(
    new THREE.Mesh(
      sphere,
      [
        new THREE.MeshBasicMaterial({ map })
      ]
    )
  );
});

const Globe: IWebGL.Scene[] = [
  { graphic: light },
  {
    graphic: globe,
    render() {
      angle += INCREMENT;
      
      if (angle > 360) {
        angle = 0;
      }
      
      globe.rotation.y = THREE.Math.degToRad(angle);
    }
  }
];

export default Globe;
