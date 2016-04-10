// Setup scene, camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75,
  window.innerWidth/window.innerHeight, 0.1, 1000 );
var clock = new THREE.Clock();

// Make a renderer, add it to the html
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Make a cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Make a light
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 5);
scene.add(light);

camera.position.z = 5;

var controls = undefined;

function setOrientationControls(e) {
  if (!e.alpha) {
    return;
  }

  controls = new THREE.DeviceOrientationControls(camera, true);
  controls.connect();
  controls.update();

  element.addEventListener('click', fullscreen, false);

  window.removeEventListener('deviceorientation', setOrientationControls, true);
}
window.addEventListener('deviceorientation', setOrientationControls, true);

// Render
var render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    camera.updateProjectionMatrix();
    if(controls) controls.update(clock.getDelta());

    renderer.render(scene, camera);
};

render();
