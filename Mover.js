class Mover {
    constructor(x, y, mass) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(3));
        this.acc = createVector(0, 0);
        this.mass = mass;
        this.r = sqrt(this.mass) * 10;
        // A = F / M
    }

    friction() {
        let diff = height - (this.pos.y + this.r);
        if (diff < 1) {
            // dirty way of doing it that doesn't take mass into account
            // this.vel.mult(0.95);

            // Friction = -1 * m * N * vel 
            // Direction of Friction
            let friction = this.vel.copy();
            friction.normalize();
            friction.mult(-1);

            let mu = 0.1;

            let normal = this.mass;
            friction.setMag(mu * normal);
            this.applyForce(friction)
        }
    }

    update() {

        // let mouse = createVector(mouseX, mouseY);
        // this.acc = p5.Vector.sub(mouse, this.pos);
        // this.acc.setMag(0.1);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);

    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    applyForce(force) {
        //force.div(this.mass);
        let f = p5.Vector.div(force, this.mass)
        this.acc.add(f);
    }

    edges() {
        if (this.pos.y >= height - this.r) {
            this.pos.y = height - this.r;
            this.vel.y *= -1;
        }

        if (this.pos.x + this.r >= width) {
            this.pos.x = width - this.r;
            this.vel.x *= -1;
        } else if (this.pos.x <= this.r) {
            this.pos.x = this.r;
            this.vel.x *= -1;
        }

    }
}