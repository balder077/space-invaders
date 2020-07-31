let spiller;
let aliens = [];
let bullets = [];
let alienBullets = [];
let alienImage;
let spillerImage;
let bakrundenImage;
let gameoverImage;
let gameover = false;
let score = 0;
let level = 1;
let myStorge = window.localStorage
let liv = 3;

function getHighscore() {
	return myStorge.getItem("highscore");
}

function setHighscore() {
	if (getHighscore() == null || parseInt(getHighscore()) < score)
		{
	myStorge.setItem("highscore", "" + score);
 }
}
function preload() {
    spillerImage = loadImage(spillerpng);
    alienImage = loadImage(alienspng);
	bakrundenImage = loadImage(bakrundpng);
	gameoverImage = loadImage(gameoverpng);
}

function setup() {
    createCanvas(400, 400);
    spiller = new Spiller(200, 300);
    setupAliens();
}

function setupAliens() {
	gameover = false;
	aliens= [];
	alienBullets = [];
	 for (let index = 0; index < 7; index++) {
       for (let rad = 0; rad < 4; rad++) {
	   aliens.push(new Alien(50 + index * 50, 50 + rad * 30));
    }
  }
}

function drawAliens() {
    let aliensKollidert = false;
    for (let index = 0; index < aliens.length; index++) {
        if (aliens[index].harKolidert()) {
            aliensKollidert = true;
        }
    
	
	  if (aliens[index].pos.y >= 360) {
		  gameover = true;
		  level = 1;
		  score = 0;
	      setTimeout(setupAliens, 5000);
	  }
	}	
	
	
for (let index = aliens.length - 1; index >= 0; index--) {
        if (aliensKollidert) {
            aliens[index].snu();
        }

        

        aliens[index].show();
        aliens[index].update();

        for (let indexb = bullets.length - 1; indexb >= 0; indexb--) {
            if (aliens[index].getCenter().dist(bullets[indexb].pos) < 12) {
                //aliens.splice(index, 1);
                //bullets.splice(indexb, 1);
				score++;
				aliens[index].skalSlettes = true;
				aliens[index].skalSlettes = true;
            }
        }
    }
}
function tegnKuler() {
 for (let index = bullets.length - 1; index >= 0; index--) {
        bullets[index].show();
        bullets[index].update();

        if (bullets[index].pos.y < 0) {
            //bullets.splice(index);
			bullets[index].skalSlettes = true;
        }
    }	
	

for (let index = alienBullets.length - 1; index >= 0; index--) {
        alienBullets[index].show();
        alienBullets[index].update();

        if (alienBullets[index].pos.y > height) {
            //bullets.splice(index);
			alienBullets[index].skalSlettes = true;
        }
    }	
}
 function slettFigur() {
	 for (let indexa = aliens.length - 1; indexa >= 0; indexa--){
		if(aliens[indexa].skalSlettes) {
		aliens.splice(indexa, 1);
		}		
	 }
 
for (let indexb = bullets.length - 1; indexb >= 0; indexb--){
		if(bullets[indexb].skalSlettes) {
		bullets.splice(indexb, 1);
		}		
	 }
 }
function draw() {
	if (gameover) {
		background(0);
		image(gameoverImage, 0, 0);
	}else{
    rectMode(CENTER);
	background(bakrundenImage);
    fill(255)
	
	
    spiller.show();
    spiller.update();
	if(spiller.isHit()) {
		liv--;
		if (liv <= 0) {
		
		gameover = true;
		level = 1;
		score = 0;
		liv = 3;
		setTimeout(setupAliens, 5000);
		
		}
		
		alienBullets = []
	}

    drawAliens();
    tegnKuler();
	
   fill(255);
   textSize(15);
    text("poengsum: " + score, 20, 20);
	text("level " + level, 20, 50);
	text("highscore: " + getHighscore(), 20, 80);
	text("liv: " + liv, 20, 110);
	setHighscore();
	
	if(aliens.length == 0) {
		level++;
		setupAliens();
	}

   slettFigur();
	}
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        spiller.settHastighet(-1);
    }

    if (keyCode === RIGHT_ARROW) {
        spiller.settHastighet(1);
    }

    if (keyCode === UP_ARROW) {
        console.log("bullet");
        if (bullets.length <= 4) {
            bullets.push(new Bullet(spiller.pos.x + 25, spiller.pos.y, 4));
        }
    }

    if (key === ' ') {
        spiller.settHastighet(0);
    }
}
