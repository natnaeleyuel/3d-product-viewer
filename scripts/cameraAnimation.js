/**
 * Camera Animation Module
 * This module sets up a camera animation with auto-rotation and subtle effects.
 * It includes a toggle for auto-rotation and smooth zooming in and out.
 * * @module cameraAnimation
 * * @param {THREE.PerspectiveCamera} camera - The camera to animate.
 * * @param {OrbitControls} controls - The controls to manage camera interactions.
 * * @returns {Object} An object containing the update function and toggle function for auto-rotation.
*/

import * as THREE from 'three';
export function setupCameraAnimation(camera, controls) {
  let autoRotate = true;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = 1.0;
  
  // Track animation timing and pulse direction
  const clock = new THREE.Clock();
  let pulseDirection = 1;
  
  // Toggle camera auto-rotation on or off
  function toggleAutoRotation() {
    autoRotate = !autoRotate;
    controls.autoRotate = autoRotate;
  }
  
  // Update camera animation each frame
  function updateAnimation() {
    const delta = clock.getDelta();
    
    if (autoRotate) {
      // Subtle vertical bobbing effect
      camera.position.y += Math.sin(performance.now() * 0.001) * 0.0005;
      
      // Smooth zoom in and out effect
      const zoomDelta = 0.1 * delta * pulseDirection;
      camera.fov = THREE.MathUtils.clamp(camera.fov + zoomDelta, 50, 70);
      if (camera.fov <= 50 || camera.fov >= 70) pulseDirection *= -1;
      camera.updateProjectionMatrix();
    }
  }
  
  return { updateAnimation, toggleAutoRotation };
}