import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import starTexture from '../img/starTexture.jpg';
import Sun from '../img/Sun.jpg';
import Mercury from '../img/Mercury.jpg';
import Saturn from '../img/Saturn.jpg';
import SaturnRing from '../img/SaturnRing.jpg';
import Venus from '../img/Venus.jpg';
import Earth from '../img/Earth.jpg';
import Mars from '../img/Mars.jpg';
import Jupiter from '../img/Jupiter.jpg';
import Uranus from '../img/Uranus.jpg';
import UranusRing from '../img/UranusRing.jpg';
import Neptune from '../img/Neptune.jpg';
import Pluto from '../img/Pluto.jpg';

const renderer = new THREE.WebGLRenderer();

const textureLoader = new THREE.TextureLoader();
const boxTextureLoader = new THREE.CubeTextureLoader();
const scene = new THREE.Scene();
// scene.background = textureLoader.load(stars2);
scene.background = boxTextureLoader.load(
  [
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture
  ]
)

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

renderer.setSize(window.innerWidth, window.innerHeight);

const orbit = new OrbitControls(camera, renderer.domElement);
document.body.appendChild(renderer.domElement);



camera.position.set(-100, 100, 20);
orbit.update();

const sunGeo = new THREE.SphereGeometry(50, 150, 150);
const sunMaterial = new THREE.MeshBasicMaterial(
  {
    map: textureLoader.load(Sun)
  }
);

const sun = new THREE.Mesh(sunGeo, sunMaterial);
scene.add(sun);

function createObj(x, y, z, position, texture) {
  const objGeo = new THREE.SphereGeometry(x, y, z);
  const objMaterial = new THREE.MeshStandardMaterial(
    {
      map: textureLoader.load(texture)
    }
  );
  const objPath = new THREE.Object3D()
  const obj = new THREE.Mesh(objGeo, objMaterial);
  objPath.add(obj);
  obj.position.x = position;
  return {obj, objPath};
}

const mercury = createObj(2, 8, 8, 70, Mercury);
scene.add(mercury.objPath);

const saturnRingGeo = new THREE.RingGeometry(3, 20, 40);
const saturnRingMaterial = new THREE.MeshBasicMaterial(
  {
    map: textureLoader.load(SaturnRing),
    side: THREE.DoubleSide
  }
);
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMaterial);

saturnRing.rotation.x = 0.5 * Math.PI;

const saturn = createObj(10, 30, 30, 250, Saturn);
scene.add(saturn.objPath);
saturn.obj.add(saturnRing);

const venus = createObj(4, 12, 12, 80, Venus);
scene.add(venus.objPath)

const earth = createObj(5, 16, 16, 100, Earth);
scene.add(earth.objPath);

const jupiter = createObj(30, 80, 80, 180, Jupiter);
scene.add(jupiter.objPath);

const uranusRingGeo = new THREE.RingGeometry(3, 20, 40);
const uranusRingMaterial = new THREE.MeshBasicMaterial(
  {
    map: textureLoader.load(UranusRing),
    side: THREE.DoubleSide
  }
);

const uranusRing = new THREE.Mesh(uranusRingGeo, uranusRingMaterial);

const uranus = createObj(7, 20, 20, 300, Uranus);
scene.add(uranus.objPath);
uranus.obj.add(uranusRing);

const neptune = createObj(8, 22, 22, 350, Neptune);
scene.add(neptune.objPath);

const pluto = createObj(2, 4, 4, 370, Pluto);
scene.add(pluto.objPath);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 1000);
scene.add(pointLight);

renderer.render(scene, camera);

function animate(time) {
  mercury.obj.rotateY(0.002);
  venus.obj.rotateY(0.02);
  earth.obj.rotateY(0.009);
  jupiter.obj.rotateY(0.06);
  neptune.obj.rotateY(0.006);
  pluto.obj.rotateY(0.01);
  sun.rotateY(0.004);

  mercury.objPath.rotateY(0.01);
  venus.objPath.rotateY(0.007);
  saturn.objPath.rotateY(0.001);
  earth.objPath.rotateY(0.005)
  jupiter.objPath.rotateY(0.002)
  uranus.objPath.rotateY(0.00097);
  neptune.objPath.rotateY(0.00087);
  pluto.objPath.rotateY(0.0008);

  orbit.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth/window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
})
