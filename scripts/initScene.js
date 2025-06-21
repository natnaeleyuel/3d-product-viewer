/**
 * Initializes the Three.js scene, camera, renderer, and controls.
 * Sets up the scene with background color, camera, renderer, and orbit controls.
 * Handles window resizing for responsive rendering.
 * @module initScene
 * @returns {Object} Contains scene, camera, renderer, and controls.
*/

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initScene() {
  // Create scene and set background color
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  
  // Set up perspective camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 5);
  camera.lookAt(0, 0, 0);

  // Create renderer and connect to existing canvas
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    canvas: document.getElementById('productCanvas')
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  
  // Set up orbit controls for camera interaction
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 2;
  controls.maxDistance = 10;
  
  // Adjust camera and renderer on window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  return { scene, camera, renderer, controls };
}