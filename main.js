import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Icosahedron

const geometry = new THREE.IcosahedronGeometry(4);
const material = new THREE.MeshStandardMaterial({ color: 0x6666ff });
const icosa = new THREE.Mesh(geometry, material);
scene.add(icosa);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.125, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

for(let i=0; i<200; i++) addStar();

// Background

const spaceTexture = new THREE.TextureLoader().load(Math.random() > 0.5 ? 'space.jpg' : 'sky.jpg');
scene.background = spaceTexture;

// Avatar

const jusTexture = new THREE.TextureLoader().load('profile2.png'); // #91d8f7
const jus = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff, map: jusTexture }));
scene.add(jus);

// Sphere

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x91d8f7 })
);
scene.add(sphere);

sphere.position.z = 30;
sphere.position.x = -10;

jus.position.z = -5;
jus.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sphere.rotation.x += 0.05;
  sphere.rotation.y += 0.075;
  sphere.rotation.z += 0.05;

  jus.rotation.y += 0.01;
  jus.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  icosa.rotation.x += 0.01;
  icosa.rotation.y += 0.005;
  icosa.rotation.z += 0.01;

  sphere.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
