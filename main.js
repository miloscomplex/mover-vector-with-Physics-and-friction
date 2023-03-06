const vehicles = [];
let movers = [];


function setup() {
  background(100);
  createCanvas(500, 500);
  for (let i=0; i < 10; i++) {
    movers[i] = new Mover(random(width), height/2, random(1,8));
  }
}

function draw() {
  background(50);

  for (let mover of movers) {
    if (mouseIsPressed) {
      let wind = createVector(0.2, 0)
      mover.applyForce(wind);
    }


    let gravity = createVector(0,0.4);



    let weightA = p5.Vector.mult(gravity, mover.mass);
    mover.applyForce(weightA);

    mover.friction();
    mover.update();
    mover.edges();
    mover.show();
  }
  
}