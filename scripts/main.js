/**
 * Main entry point for the Three.js product viewer application.
 * This script initializes the scene, camera, renderer, and controls,
 * creates a modern chair model, sets up lighting, and handles user interactions.
 * It also manages UI elements for rotating the model, resetting the view, and toggling fullscreen mode.
*/

import { initScene } from './initScene.js';
import { createChair } from './createProduct.js';
import { setupLights } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { setupCameraAnimation } from './cameraAnimation.js';

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const rotateToggle = document.getElementById('rotate-toggle');
const resetView = document.getElementById('reset-view');
const fullscreenBtn = document.getElementById('fullscreen');
const partNameElement = document.getElementById('partName');
const partDescriptionElement = document.getElementById('partDescription');

// Initialize core Three.js elements
const { scene, camera, renderer, controls } = initScene();

// Create and add chair to scene
const chair = createChair();
scene.add(chair);

// Set up lighting
setupLights(scene);

// Enable mouse interaction
const onPartClick = (partName, partDescription) => {
  partNameElement.textContent = partName;
  partDescriptionElement.textContent = partDescription;
};
setupInteraction(scene, camera, renderer, chair, onPartClick);

// Configure camera animation
const { updateAnimation, toggleAutoRotation } = setupCameraAnimation(camera, controls);

// Hide loading overlay when everything is ready
setTimeout(() => {
  loadingOverlay.classList.add('hidden');
}, 1500);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update auto-rotation if active
  updateAnimation();
  
  // Required for controls damping
  controls.update();
  
  renderer.render(scene, camera);
}

// Start animation
animate();

// Event listeners for UI controls
rotateToggle.addEventListener('click', () => {
  rotateToggle.classList.toggle('active');
  toggleAutoRotation();
});

resetView.addEventListener('click', () => {
  controls.reset();
});

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    renderer.domElement.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

// Handle window resize for responsive rendering
window.addEventListener('resize', () => {
  // Update camera aspect ratio and projection
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // Adjust renderer size to match new window dimensions
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hide loading overlay and trigger resize after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('hidden');
    // Ensure Three.js canvas fits the window
    window.dispatchEvent(new Event('resize'));
  }, 500);
});

// Optional: Reset camera position button
document.addEventListener('keypress', (e) => {
  if (e.key === 'r') {
    controls.reset();
  }
});