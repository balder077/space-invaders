class Boss {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.hastighet = 1 + (level / 10);
        this.w = 25;
        this.h = 25;
        this.skalSlettes = false;
	    this.farge = createVector(random(255), random(255), random(255));
	}
	
	getCenter() {
		return createVector(this.pos.x, this.pos.y + this.h/2);
	}

    settHastighet(hastighet) {
        this.hastighet = hastighet;
    }

    snu() {
        this.hastighet *= -1;
        this.pos.y += 10;
    }

    harKolidert() {
        if (this.hastighet > 0 && this.pos.x > width - this.w) {
            return true;
        }

        if (this.hastighet < 0 && this.pos.x < 0) {
            return true;
        }

        return false;
    }
    show() {
        fill(255, 0, 0);
        //rect(this.pos.x, this.pos.y, this.w, this.h);
		noTint();
        image(bossImage, this.pos.x, this.pos.y);	
		
   }

    update() {
		this.pos.x += this.hastighet;
    }
}
