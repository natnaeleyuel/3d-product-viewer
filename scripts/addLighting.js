/**
 * Add lighting module
 * Sets up lighting for a Three.js scene.
 * This function adds ambient, key, and fill lights to the scene to create a well-lit environment
 * suitable for rendering 3D objects with depth and detail.
 * @module addLighting
 * @param {THREE.Scene} scene - The Three.js scene to which lights will be added.
 * @returns {void}
*/

export function setupLights(scene) {
  // Add soft white ambient light for general illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  // Add a strong directional key light to create shadows and highlights
  const keyLight = new THREE.DirectionalLight(0xfff4e6, 1.2);
  keyLight.position.set(5, 10, 7);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Add a weaker fill light to soften shadows
  const fillLight = new THREE.DirectionalLight(0x667788, 0.5);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
}