// THREE objects
var scene;
var camera;
var clock;
var renderer;
var controls;

function setupThree() {
    clock = new THREE.Clock();
    
    // Make a renderer, add it to the html
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( 500, 500 );
    var container = $('#container');
    var element = renderer.domElement;
    container.append( element );

    // Setup scene, camera
    var size = renderer.getSize();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 1000);
    
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

function newCube(x, y, z, w, h, d, color) {
    var geometry = new THREE.BoxGeometry( w, h, d );
    var material = new THREE.MeshBasicMaterial( { color: color } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return cube;
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
