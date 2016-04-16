// Setup scene, camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75,
  window.innerWidth/window.innerHeight, 0.1, 1000 );
var clock = new THREE.Clock();

// Make a renderer, add it to the html
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = undefined;

function setOrientationControls(e) {
  if (!e.alpha) {
    return;
  }

  controls = new THREE.DeviceOrientationControls(camera, true);
  controls.connect();
  controls.update();

  window.removeEventListener('deviceorientation', setOrientationControls, true);
}
window.addEventListener('deviceorientation', setOrientationControls, true);

// Render
var render = function () {
    requestAnimationFrame( render );

    camera.updateProjectionMatrix();
    if(controls) controls.update(clock.getDelta());

    renderer.render(scene, camera);
};

render();
