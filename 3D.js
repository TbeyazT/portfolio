let scene, camera, renderer, model;
let isDragging = false, previousMousePosition = { x: 0, y: 0 };
const Sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// oh god someone help me please i fucking hate myself like i dont have anything to do with my life so i just keep on doing 

function init() {
  scene = new THREE.Scene();

  const container = document.getElementById('3d-container');

  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, -5, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  const loader = new THREE.GLTFLoader();
  loader.load('roblox_dummy.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
  }, undefined, function (error) {
    console.error(error);
  });

  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  const container = document.getElementById('3d-container');

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

function onMouseDown(event) {
  isDragging = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseMove(event) {
  if (!isDragging || !model) return;

  let deltaX = event.clientX - previousMousePosition.x;
  let deltaY = event.clientY - previousMousePosition.y;

  model.rotation.y += deltaX * 0.005;

  previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseUp() {
  isDragging = false;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
Sleep(100)
animate();
onWindowResize();
