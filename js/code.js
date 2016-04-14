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
var geometry = new THREE.PlaneGeometry( 100, 1000, 10, 10 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var plane = new THREE.Mesh( geometry, material );
//plane.position.z = -10;
plane.position.y = -10;
plane.rotation.x = -Math.PI/2.0;
scene.add(plane);

// Make a light
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 0);
scene.add(light);

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

//    cube.rotation.x += 0.1;
//    cube.rotation.y += 0.1;

    camera.updateProjectionMatrix();
    if(controls) controls.update(clock.getDelta());

    renderer.render(scene, camera);
};

render();
