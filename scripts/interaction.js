/**
 * Sets up mouse interaction for a Three.js scene.
 * - Highlights chair parts on hover.
 * - Triggers a callback and pulse animation on click.
 * @param {THREE.Scene} scene - The Three.js scene.
 * @param {THREE.PerspectiveCamera} camera - The camera for raycasting.
 * @param {THREE.WebGLRenderer} renderer - The renderer.
 * @param {THREE.Group} chair - The chair model group.
 * @param {Function} onPartClick - Callback for part clicks.
*/

export function setupInteraction(scene, camera, renderer, chair, onPartClick) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let lastHighlighted = null;

  // Handles mouse movement: highlights intersected chair part
  function onMouseMove(event) {
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update raycaster with mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Find intersected chair parts
    const intersects = raycaster.intersectObjects(chair.children, true);
    
    // Reset previous highlight
    if (lastHighlighted) {
      lastHighlighted.material.color.copy(lastHighlighted.userData.originalColor);
      lastHighlighted = null;
    }
    
    // Highlight new intersected part
    if (intersects.length > 0) {
      const object = intersects[0].object;
      object.material.color.set(0x00ff00); // Highlight color
      lastHighlighted = object;
    }
  }

  // Handles mouse click: triggers callback and pulse animation
  function onClick(event) {
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update raycaster with mouse position
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(chair.children, true);
    
    // If a chair part is clicked
    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object.userData) {
        onPartClick(object.userData.name, object.userData.description);
        
        // Pulse animation: briefly scale up, then restore
        const originalScale = object.scale.clone();
        object.scale.multiplyScalar(1.1);
        setTimeout(() => {
          object.scale.copy(originalScale);
        }, 200);
      }
    }
  }

  // Attach event listeners for interaction
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('click', onClick, false);
}