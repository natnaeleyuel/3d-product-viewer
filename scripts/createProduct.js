/**
 * Creates a modern chair model using Three.js geometries and materials.
 * This function creates a modern chair with a seat, backrest, and four legs.
 * The chair is constructed using a combination of box and cylinder geometries,
 * with materials that simulate wood and metal textures.
 * The chair is designed to be realistic in scale and appearance, suitable for use in a 3D scene.
 * @module createChair
 * @param {Object} options - Optional parameters for customization (not used in this version).
 * @param {number} options.seatHeight - Height of the chair seat (default: 0.5).  
 * @returns {THREE.Group} A Three.js Group containing a modern chair model.
*/

export function createChair() {
  const chair = new THREE.Group();
  chair.name = "Modern Chair";

  // Chair dimensions (meters)
  const seatHeight = 0.5;  
  const legHeight = 1.2;   
  const backrestHeight = 2.0;
  const seatWidth = 2.2;
  const seatDepth = 2.2;

  // Metal material for legs
  const metalMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xA020F0, 
    roughness: 0.7,
    metalness: 0.5,
    emissive: 0x1A0033, 
    emissiveIntensity: 0.1
  });
  
  // Wood material for seat and backrest
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00CED1, 
    roughness: 0.7,
    metalness: 0.1,
    bumpScale: 0.05 
  });

  // Create four chair legs
  const legGeo = new THREE.CylinderGeometry(0.12, 0.12, legHeight, 16);
  const legPositions = [
    { x: seatWidth/2 - 0.1, z: seatDepth/2 - 0.1 },
    { x: -seatWidth/2 + 0.1, z: seatDepth/2 - 0.1 },
    { x: seatWidth/2 - 0.1, z: -seatDepth/2 + 0.1 },
    { x: -seatWidth/2 + 0.1, z: -seatDepth/2 + 0.1 }
  ];
  legPositions.forEach((pos, index) => {
    const leg = new THREE.Mesh(legGeo, metalMaterial);
    leg.position.set(pos.x, legHeight/2 - 0.5, pos.z);
    leg.castShadow = true;
    leg.userData = {
      name: `Chair Leg ${index + 1}`,
      description: 'Sturdy steel legs with rubber caps for floor protection',
      originalColor: metalMaterial.color.clone()
    };
    chair.add(leg);
  });

  // Create seat
  const seatGeo = new THREE.BoxGeometry(seatWidth, seatHeight, seatDepth);
  const seat = new THREE.Mesh(seatGeo, woodMaterial);
  seat.position.set(0, legHeight + seatHeight/2 - 0.5, 0);
  seat.castShadow = true;
  seat.receiveShadow = true;
  seat.userData = {
    name: 'Seat',
    description: 'Premium hardwood with comfortable cushioning',
    originalColor: woodMaterial.color.clone()
  };
  chair.add(seat);

  // Create backrest
  const backGeo = new THREE.BoxGeometry(seatWidth, backrestHeight, 0.25);
  const backrest = new THREE.Mesh(backGeo, woodMaterial);
  backrest.position.set(0, legHeight + seatHeight + backrestHeight/2 - 0.8, -seatDepth/2 + 0.1);
  backrest.rotation.x = -0.1;
  backrest.castShadow = true;
  backrest.userData = {
    name: 'Backrest',
    description: 'Ergonomic design with lumbar support',
    originalColor: woodMaterial.color.clone()
  };
  chair.add(backrest);

  // Set chair position at origin
  chair.position.set(0, 0, 0);

  return chair;
}