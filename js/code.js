// THREE objects
var scene;
var camera;
var clock;
var renderer;
var controls;

function setupThree() {
    // Setup scene, camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    clock = new THREE.Clock();
    
    // Make a renderer, add it to the html
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
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
}

function render() {
    requestAnimationFrame( render );

    camera.updateProjectionMatrix();
    if(controls) {
        controls.update(clock.getDelta());
    }

    renderer.render(scene, camera);
}

function setup() {
    setupThree();
    render();
}

setup();
