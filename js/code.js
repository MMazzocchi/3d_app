// THREE objects
var scene;
var camera;
var clock;
var renderer;
var controls;

// World constants
var base = -100;
var towers;
var block = false;

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

    var midy = base + (height/2.0);

    var tower = {
        x: x,
        z: z,
        y: base + height,
        height: height
    };

   tower.cube = newCube(x, midy, z, w, height, w, "#0000FF");
   return tower;
}

var hopper;

function render() {
//    requestAnimationFrame( render );

    camera.updateProjectionMatrix();
    var dt = clock.getDelta();
    if(controls) {
        controls.update(dt);
    }

    renderer.render(scene, camera);
}

function fieldSetup() {
    var fieldHalf = 10;
    var dh = 50;

    towers = [];

    for(var x = -fieldHalf; x <= fieldHalf; x++) {
        towers.push([]);
        for(var z = -fieldHalf; z <= fieldHalf; z++) {
            var height = -base - 10;
            if(x != 0 || z != 0) {
                height -= Math.random()*dh;
            }

            var tower = newTower(x*10, z*10, height);
            scene.add(tower.cube);
            towers[towers.length-1].push(tower);
        }
    }
}

function getTower(x,z) {
    return towers[Math.floor(x/10)+10][Math.floor(z/10)+10];
}

function hopperStep() {
    this.dy += this.ay;
    this.cube.position.y += this.dy;
    var tower = getTower(this.getX(), this.getZ());
    if(this.cube.position.y - 2 <= tower.y) {
        this.dy = 10;
        this.cube.position.y = tower.y + 2;
    }
}

function newHopper(tower) {
    var w = 2;
    var hopper = {
       ay: -1,
       dy: 10,
       step: hopperStep,
       getX: function() { return this.cube.position.x; },
       getY: function() { return this.cube.position.y; },
       getZ: function() { return this.cube.position.z; }
    };

    hopper.cube = newCube(tower.x, tower.y+(w/2), tower.z, w, w, w, "#FFFFFF");
    return hopper;
}

function step() {
    if(!block) {
        block = true;
        hopper.step();
        render();
        block = false;
    }
}

function setup() {
    setupThree();
    fieldSetup();
    var tower = towers[10][5];
    hopper = newHopper(tower);
    scene.add(hopper.cube);

    setInterval(step, 50);

    render();
}

setup();
