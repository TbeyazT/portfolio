// 3dRender.js
let scene, camera, renderer, container;
let cubes = [];
let scrollY = 0;
let targetRotation = 0;
let currentRotation = 0;
let scrollForce = 0;
const cubeSize = 0.3;
const forceVector = new THREE.Vector3();

function init3D() {
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  container = document.getElementById('3d-container');

  // Renderer setup
  renderer.setSize(400, 400);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x00ff88, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Container box
  const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
  const edges = new THREE.EdgesGeometry(boxGeometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff88 });
  const box = new THREE.LineSegments(edges, lineMaterial);
  scene.add(box);

  // Create cubes
  for (let i = 0; i < 30; i++) {
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
      shininess: 100
    });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    );

    cube.velocity = new THREE.Vector3();
    cubes.push(cube);
    scene.add(cube);
  }

  camera.position.z = 8;
  camera.position.y = 4;
  camera.lookAt(0, 0, 0);

  // Scroll event listeners
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    targetRotation = scrollY * 0.02;
  });

  window.addEventListener('wheel', (e) => {
    scrollForce = e.deltaY * 0.3;
  });

  animate();
}

function checkCollisions() {
  const bounce = 0.6;
  const containerSize = 2.3;
  const halfCubeSize = cubeSize / 2;

  // Container collisions
  cubes.forEach(cube => {
    // X-axis
    if (Math.abs(cube.position.x) > containerSize - halfCubeSize) {
      cube.position.x = Math.sign(cube.position.x) * (containerSize - halfCubeSize);
      cube.velocity.x *= -bounce;
    }
    // Y-axis
    if (Math.abs(cube.position.y) > containerSize - halfCubeSize) {
      cube.position.y = Math.sign(cube.position.y) * (containerSize - halfCubeSize);
      cube.velocity.y *= -bounce;
    }
    // Z-axis
    if (Math.abs(cube.position.z) > containerSize - halfCubeSize) {
      cube.position.z = Math.sign(cube.position.z) * (containerSize - halfCubeSize);
      cube.velocity.z *= -bounce;
    }
  });

  // Cube-to-cube collisions
  for (let i = 0; i < cubes.length; i++) {
    for (let j = i + 1; j < cubes.length; j++) {
      const cube1 = cubes[i];
      const cube2 = cubes[j];

      const dx = cube1.position.x - cube2.position.x;
      const dy = cube1.position.y - cube2.position.y;
      const dz = cube1.position.z - cube2.position.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance < cubeSize) {
        // Collision detected
        const normal = new THREE.Vector3(dx, dy, dz).normalize();
        const overlap = (cubeSize - distance) / 2;

        // Separate cubes
        cube1.position.add(normal.multiplyScalar(overlap));
        cube2.position.add(normal.multiplyScalar(-overlap));

        // Calculate relative velocity
        const relVel = new THREE.Vector3().subVectors(cube1.velocity, cube2.velocity);
        const velAlongNormal = relVel.dot(normal);

        if (velAlongNormal > 0) continue; // Already moving apart

        // Calculate impulse
        const restitution = 0.7;
        const impulse = -(1 + restitution) * velAlongNormal;

        // Apply impulse
        const mass1 = 1, mass2 = 1;
        const impulseScalar = impulse / (mass1 + mass2);

        cube1.velocity.add(normal.multiplyScalar(impulseScalar * mass2));
        cube2.velocity.sub(normal.multiplyScalar(impulseScalar * mass1));
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Apply scroll force
  if (scrollForce !== 0) {
    forceVector.set(0, 0, scrollForce * 0.005);
    forceVector.applyEuler(scene.rotation);

    cubes.forEach(cube => {
      cube.velocity.add(forceVector);
    });
    scrollForce = 0;
  }

  // Smooth rotation
  currentRotation += (targetRotation - currentRotation) * 0.05;

  // Apply physics to cubes
  cubes.forEach(cube => {
    // Gravity effect
    cube.velocity.y -= 0.005 * (1 + scrollY * 0.001);

    // Velocity damping
    cube.velocity.multiplyScalar(0.99);

    // Bounce off container walls
    const bounce = 0.6;
    if (Math.abs(cube.position.x) > 2.3) {
      cube.position.x = Math.sign(cube.position.x) * 2.3;
      cube.velocity.x *= -bounce;
    }
    if (Math.abs(cube.position.y) > 2.3) {
      cube.position.y = Math.sign(cube.position.y) * 2.3;
      cube.velocity.y *= -bounce;
    }
    if (Math.abs(cube.position.z) > 2.3) {
      cube.position.z = Math.sign(cube.position.z) * 2.3;
      cube.velocity.z *= -bounce;
    }

    cube.position.add(cube.velocity);
  });
  checkCollisions();

  // Rotate container based on scroll
  scene.rotation.y = currentRotation;
  scene.rotation.x = currentRotation * 0.5;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = 400 / 400;
  camera.updateProjectionMatrix();
  renderer.setSize(400, 400);
});

document.addEventListener('DOMContentLoaded', init3D);
