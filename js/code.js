// THREE objects
var scene;
var camera;
var clock;
var renderer;
var controls;

// World constants
var base = -100;


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

    var light = new THREE.PointLight( 0xFFFFFF, 2, 100);
    light.position.set(0,0,0);
    scene.add(light);
 
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
    var material = new THREE.MeshLambertMaterial( { color: color } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return cube;
}

function newTower(x, z, height) {
    var w = 10;

    var tower = {
        x: x,
        z: z,
        height: height
    };

   var midy = base + (height/2.0);
   tower.cube = newCube(x, midy, z, w, height, w, "#0000FF");
   return tower;
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

    var fieldHalf = 10;
    var dh = 50;
    for(var x = -fieldHalf; x <= fieldHalf; x++) {
        for(var z = -fieldHalf; z <= fieldHalf; z++) {
            var height = -base - 10;
            if(x != 0 || z != 0) {
                height -= Math.random()*dh;
            }

            var tower = newTower(x*10, z*10, height);
            scene.add(tower.cube);
        }
    }

    render();
}

setup();
