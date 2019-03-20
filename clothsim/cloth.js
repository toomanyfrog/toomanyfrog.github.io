var CONSTANTS = {
	MASS: 0.1,
	TIMESTEP: 0.1,
	DAMPING: 0,
	CONSTRAINT_ALPHA: 0.1,
	CONSTRAINT_ITERS: 5,
	SPRING_CONST: 2,
	DAMPING_CONST: 0.2,
	GRAVITY: 9.81
}
var TIMESTEP_2 = CONSTANTS.TIMESTEP * CONSTANTS.TIMESTEP;
var WEIGHT = new THREE.Vector3( 0, -CONSTANTS.GRAVITY, 0 ).multiplyScalar( CONSTANTS.MASS );

var lastTime;
var elapsedTime = 0;
var leftoverTime = 0;

function index(u,v,cols) {
	// PlaneBufferGeometry iterates v then u
	return u + v*(cols+1);
}
function recalculateDependentConstants() {
	TIMESTEP_2 = CONSTANTS.TIMESTEP * CONSTANTS.TIMESTEP;
	WEIGHT = new THREE.Vector3( 0, -CONSTANTS.GRAVITY, 0 ).multiplyScalar( CONSTANTS.MASS );
}

class Cloth {
    constructor(mesh, opts) {
		// a PlaneBufferGeometry object
		var geometry = mesh.geometry;
		var meshVertices = geometry.getAttribute('position');
		this.opts = opts;
        this.width = geometry.parameters.slices;
        this.height = geometry.parameters.stacks;
		this.particles = []; 	//array of VerletParticle
		this.constraints = [];	//array of index pairs and dist-constraint
		this.pins = [];
		this.sampleRestDist = 0;
		var u,v;
		for (v=0; v<=this.height; v++) {
			for (u=0; u<=this.width; u++) {
				var i = index(u,v,this.width);
				var vertPos = new THREE.Vector3();
				vertPos.set(meshVertices.getX(i),
							meshVertices.getY(i),
							meshVertices.getZ(i));
				if (this.opts.integrator_type == "positionverlet") this.particles.push( new VerletParticle(vertPos, CONSTANTS.MASS) );
				if (this.opts.integrator_type == "expliciteuler") this.particles.push( new ExplicitEulerParticle(vertPos, CONSTANTS.MASS) );
			}
		}
		this.addConstraints(this.opts.constraint_types);
    }
	addConstraints(types) {
		var u,v,i_uv, i_uv1, i_u1v, restDist1, restDist2;
		if (types.indexOf('st') > -1) {
			// Structural constraints
			for (v=0; v<this.height; v++ ) {
				for ( u=0; u<this.width; u++ ) {
					i_uv = index(u,v,this.width);
					i_uv1 = index(u,v+1,this.width);
					i_u1v = index(u+1,v,this.width);
					restDist1 = this.particles[i_uv].position.distanceTo(this.particles[i_uv1].position);
					restDist2 = this.particles[i_uv].position.distanceTo(this.particles[i_u1v].position);
					this.constraints.push([this.particles[i_uv], this.particles[i_uv1],
						restDist1]);
					this.constraints.push([this.particles[i_uv], this.particles[i_u1v],
						restDist2]);
				}
			}
			for (v=0; v<this.height; v++) {
				i_uv = index(this.width, v, this.width);
				i_uv1 = index(this.width, v+1, this.width);
				restDist1 = this.particles[i_uv].position.distanceTo(this.particles[i_uv1].position);
				this.constraints.push([	this.particles[i_uv],this.particles[i_uv1],restDist1 ]);
			}
			for (u=0; u<this.width; u++) {
				i_uv = index(u, this.height, this.width);
				i_u1v = index(u+1, this.height, this.width);
				restDist2 = this.particles[i_uv].position.distanceTo(this.particles[i_u1v].position);
				this.constraints.push([	this.particles[i_uv], this.particles[i_u1v], restDist2] );
				if (u==0) this.sampleRestDist = restDist2;
			}
		}
		if (types.indexOf('sh') > -1) {
		//Shear constraints
		var i_u1v1, diagonalDist;
			for (v=0; v<this.height; v++ ) {
				for ( u=0; u<this.width; u++ ) {
					i_uv = index(u,v,this.width);
					i_u1v1 = index(u+1,v+1,this.width);
					diagonalDist = this.particles[i_uv].position.distanceTo(this.particles[i_u1v1].position);
					i_u1v = index(u+1,v,this.width);
					i_uv1 = index(u,v+1,this.width);
					this.constraints.push([this.particles[i_uv],this.particles[i_u1v1],diagonalDist]);
					diagonalDist = this.particles[i_u1v].position.distanceTo(this.particles[i_uv1].position)
					this.constraints.push([this.particles[i_u1v],this.particles[i_uv1],diagonalDist]);
				}
			}
		}
		if (types.indexOf('b') > -1) {
			//Bend constraints
			for (v=0; v<this.height-1; v++ ) {
				for ( u=0; u<this.width-1; u++ ) {
					i_uv = index(u,v,this.width);
					i_uv1 = index(u,v+2,this.width);
					i_u1v = index(u+2,v,this.width);
					restDist1 = this.particles[i_uv].position.distanceTo(this.particles[i_uv1].position);
					restDist2 = this.particles[i_uv].position.distanceTo(this.particles[i_u1v].position);
					this.constraints.push([this.particles[i_uv], this.particles[i_uv1],
						restDist1]);
					this.constraints.push([this.particles[i_uv], this.particles[i_u1v],
						restDist2]);
				}
			}
			for (v=0; v<this.height-1; v++) {
				i_uv = index(this.width, v, this.width);
				i_uv1 = index(this.width, v+2, this.width);
				restDist1 = this.particles[i_uv].position.distanceTo(this.particles[i_uv1].position);
				this.constraints.push([	this.particles[i_uv],this.particles[i_uv1],restDist1 ]);
			}
			for (u=0; u<this.width-1; u++) {
				i_uv = index(u, this.height, this.width);
				i_u1v = index(u+2, this.height, this.width);
				restDist2 = this.particles[i_uv].position.distanceTo(this.particles[i_u1v].position);
				this.constraints.push([	this.particles[i_uv], this.particles[i_u1v], restDist2] );
			}
		}
	}
	addPin(uv) {
		this.pins.push(this.particles[index(uv[0],uv[1],this.width)]);
	}
	removePin(uv) {
		var offender = this.particles[index(uv[0],uv[1],this.width)];
		for (var i=0; i<this.pins.length; i++) {
			if (this.pins[i] == offender) {
				this.pins.splice(i,1);
			}
		}
	}
	addForce(f, opt) {
		switch(opt) {
			case "uniform":
				for (var i=0; i<this.particles.length; i++) {
					this.particles[i].addForce(f);
				}
				break;
			case "array":
				for (var i=0; i<this.particles.length; i++) {
					this.particles[i].addForce(f[i]);
				}
				break;
			case "aero":
				//loop over triangles and use face normal
				break;
			default:
		}
	}
	addSpringForces() {
		var p1, p2, dist, restLength;
		var f1 = new THREE.Vector3();
		var f2 = new THREE.Vector3();
		var v1 = new THREE.Vector3();
		var v2 = new THREE.Vector3();
		var delta_v = new THREE.Vector3();
		var directionTo2 = new THREE.Vector3();
		for (var i=0; i<this.constraints.length; i++) {
			// p1, p2, spring rest length
			// direction of change in x
			//  [ k(dist(x1,x2)-r) + d(v1-v2 dot  normdir(x1,x2)) ] * dir(x1,x2)
			p1 = this.constraints[i][0];
			p2 = this.constraints[i][1];
			if (this.opts.integrator_type == "positionverlet") {
				v1.subVectors(p1.position, p1.previousPos);
				v2.subVectors(p2.position, p2.previousPos);
			}
			if (this.opts.integrator_type == "expliciteuler") {
				v1 = p1.velocity;
				v2 = p2.velocity;
			}
			restLength = this.constraints[i][2];
			dist = p1.position.distanceTo(p2.position);
			var f_d = directionTo2.subVectors(p2.position, p1.position).divideScalar(dist).clone();
			delta_v.subVectors(v2, v1);
			f1.addVectors(	directionTo2.multiplyScalar(CONSTANTS.SPRING_CONST).multiplyScalar(dist-restLength),
							delta_v.projectOnVector(f_d).multiplyScalar(CONSTANTS.DAMPING_CONST) );
			f2.copy(f1).negate();
			p1.addForce(f1); p2.addForce(f2);
		}
	}
	integrationStep() {
		for (var i=0; i<this.particles.length; i++) {
			this.particles[i].integrate();
		}
	}
	simulate(time, floor, type, selfCollisions) { // Date.now()
		//add forces, integrate, solve for constraints
		if (!lastTime) {
			lastTime = time;
			return;
		}
		this.addForce(WEIGHT, "uniform");
		if (type == "springmass") this.addSpringForces();
		this.integrationStep();
		this.putPinsBack();
		if (type == "springmass") {
			this.addSpringForces();
			this.integrationStep();
		}
		if (floor != null) this.putClothOnFloor(floor);
		if (type == "constraints") this.satisfyConstraints(CONSTANTS.CONSTRAINT_ITERS);
		if (selfCollisions) this.correctSelfCollisions(type);

		/*
		elapsedTime = time - lastTime + leftoverTime;
		lastTime = time;
		var numSteps = Math.floor(elapsedTime/TIMESTEP);
		leftoverTime = elapsedTime - numSteps*TIMESTEP;
		for (var i=0; i<numSteps; i++) {
			this.integrationStep();
			//this.satisfyConstraints(5);
			for ( var i = 0; i < this.particles.length; i ++ ) {
				var pos = this.particles[i].position;
				if ( pos.y < - 250 ) {
					pos.y = - 250;
				}
			}
		}*/
	}
    satisfyConstraints(iterations) {
		var diff = new THREE.Vector3();
		function fix(p1, p2, restLength) {
			diff.subVectors(p2.position, p1.position);
			var currentDist = diff.length();
			if (currentDist === 0) return;
			var correction = diff.multiplyScalar(1 - restLength/currentDist)
								.multiplyScalar(0.5)
								.multiplyScalar(CONSTANTS.CONSTRAINT_ALPHA);
			p1.position.add(correction);
			p2.position.sub(correction);
		}
		for (var iteration=0; iteration < iterations; iteration++) {
			for (var i=0; i<this.constraints.length; i++) {
				fix(this.constraints[i][0], this.constraints[i][1], this.constraints[i][2]);
			}
		}
	}
	putPinsBack() {
		var p;
		for (var i=0; i<this.pins.length; i++) {
			p = this.pins[i];
			p.position.copy(p.originalPos);
		}
	}
	putClothOnFloor(floorYPos) {
		for ( var i = 0; i < this.particles.length; i ++ ) {
			var pos = this.particles[i].position;
			if ( pos.y < floorYPos ) {
				pos.y = floorYPos;
			}
		}
	}
	correctSelfCollisions(type) { /*
		var p1, p2, dist, diff;
		var targetDist = this.sampleRestDist*2;
		for (var i=0; i<this.particles.length; i++) {
			for (var j=0; j<this.particles.length; j++) {
				p1 = this.particles[i]; p2 = this.particles[j];
				if (j > i+1 || j < i-1)
				var awayFromJ = new THREE.Vector3();
				dist = p1.position.distanceTo(p2.position);
				awayFromJ.subVectors(p1.position, p2.position).divideScalar(dist);
				if ( dist < targetDist) {
					diff = (targetDist - dist)/2;
					p1.position.add(awayFromJ.clone().multiplyScalar(diff));
					p2.position.add(awayFromJ.clone().multiplyScalar(diff).negate());
				}
			}
		} */
		var u,v,u1,v1,i,j;
		var p1, p2, dist, diff;
		var targetDist = this.sampleRestDist*2;
		for (v=0; v<this.height; v++ ) {
			//for ( u=0; u<this.width; u++ ) {
				for (v1=0; v1<this.height; v1++ ) {
				//	for ( u1=0; u1<this.width; u1++ ) {
						if (Math.abs(v-v1)> 1) { //&& Math.abs(u-u1)>1) {
							p1 = this.particles[i]; p2 = this.particles[j];
							if (j > i+1 || j < i-1)
							var awayFromJ = new THREE.Vector3();
							dist = p1.position.distanceTo(p2.position);
							awayFromJ.subVectors(p1.position, p2.position).divideScalar(dist);
							if ( dist < targetDist) {
								diff = (targetDist - dist)/2;
								p1.position.add(awayFromJ.clone().multiplyScalar(diff));
								p2.position.add(awayFromJ.clone().multiplyScalar(diff).negate());
							}
						}
					}
				//}
			//}
		}
	}
}


class VerletParticle {
	// position verlet
	constructor(pos, mass) {
		this.position = pos;
		this.mass = mass; this.massInv = 1/mass;
		this.previousPos = pos.clone(); // previous position
		this.originalPos = pos.clone(); // original position
		this.acceleration = new THREE.Vector3();
		this.direction = new THREE.Vector3();
		this.force = new THREE.Vector3();
	}

	addForce(f) {
		// acceleration = force / mass
		// f is a THREE.Vector3()
		this.acceleration.add(
			this.force.copy(f).multiplyScalar(this.massInv)
		);
	}

	integrate() {
		// squared timestep
		var newPos = this.direction.subVectors(this.position, this.previousPos);
		newPos.multiplyScalar(1-CONSTANTS.DAMPING).add(this.position).add(this.acceleration.multiplyScalar(TIMESTEP_2));
		this.direction = this.previousPos;
		this.previousPos = this.position;
		this.position = newPos;
		this.acceleration.set(0,0,0);
	}
}

class ExplicitEulerParticle {
	constructor(pos, mass) {
		this.position = pos;
		this.originalPos = pos.clone(); // original position
		this.mass = mass; this.massInv = 1/mass;
		this.velocity = new THREE.Vector3();
		this.acceleration = new THREE.Vector3();
		this.direction = new THREE.Vector3();
		this.force = new THREE.Vector3();
	}

	addForce(f) {
		// acceleration = force / mass
		// f is a THREE.Vector3()
		this.acceleration.add(
			this.force.copy(f).multiplyScalar(this.massInv)
		);
	}

	integrate() {
		this.velocity.add(this.acceleration.clone().multiplyScalar(CONSTANTS.TIMESTEP));
		this.position.add(this.velocity.clone().multiplyScalar(CONSTANTS.TIMESTEP));
		this.acceleration.set(0,0,0);
	}
}
