//Get Images
let p1 = new Image();
p1.src = "sprites.png";
let dead = new Image();
dead.src = "dead.png";


//Get all Canvas and Context
let bgCanvas = document.getElementById("backgroundCanvas");
let bgCtx = bgCanvas.getContext("2d");

let spriteCanvas = document.getElementById("spriteCanvas");
let spriteCtx = spriteCanvas.getContext("2d");

let interfaceCanvas = document.getElementById("interfaceCanvas");
let interfaceCtx = interfaceCanvas.getContext("2d");

//Class Sprite and Lane
class Sprite {
    constructor(width,height,ix,iy,x){
        this.width = width;
        this.height = height;
        this.ix = ix;
        this.iy = iy;
        this.x = x;
    }
}

class Lane {
    constructor(direction,speed,sprites,y,isInRiver){
        //1 for moving to right and -1 for moving to left
        this.direction = direction;
        this.speed = speed;
        //an array of elements that move on this lane
        this.sprites = sprites;
        this.y = y;
        //true or false option - if true frog can touch - if false frog can't touch
        this.isInRiver = isInRiver;
    }
}

//Creating Sprites, Lanes and lanes array
let greencar1 = new Sprite(28,26,43,264,120);
let greencar2 = new Sprite(28,26,43,264,320);
let truck1 = new Sprite(46,20,105,301,84);
let yellowcar = new Sprite(27,30,80,262,270);
let truck3 = new Sprite(46,20,105,301,350);
let redcar1 = new Sprite(25,23,10,300,100);
let redcar2 = new Sprite(25,23,10,300,240);
let redcar3 = new Sprite(25,23,10,300,380);
let pinkcar1 = new Sprite(31,22,8,266,50);
let pinkcar2 = new Sprite(31,22,8,266,200);
let pinkcar3 = new Sprite(31,22,8,266,360);
let redcar01 = new Sprite(25,23,10,300,150);
let greencar3 = new Sprite(28,26,43,264,290);
let redcar02 = new Sprite(25,23,10,300,30);
let truck01 = new Sprite(46,20,105,301,100);
let truck02 = new Sprite(46,20,105,301,300);

let road1 = new Lane(1,5,[greencar1,greencar2],320,false);
let road2 = new Lane(-1,2,[truck1,yellowcar,truck3],347,false);
let road3 = new Lane(1,6,[redcar1,redcar2,redcar3],373,false);
let road4 = new Lane(-1,4,[pinkcar1,pinkcar2,pinkcar3],405,false);
let road5 = new Lane(1,6,[redcar01,greencar3,redcar02],433,false);
let road6 = new Lane(-1,2,[truck01,truck02],471,false);

let bigLog1 = new Sprite(180,21,6,166,20);
let bigLog2 = new Sprite(180,21,6,166,230);
let mediumLog1 = new Sprite(117,20,6,199,0);
let mediumLog2 = new Sprite(117,20,6,199,155);
let mediumLog3 = new Sprite(117,20,6,199,310);
let smallLog1 = new Sprite(85,19,6,230,0);
let smallLog2 = new Sprite(85,19,6,230,190);
let smallLog3 = new Sprite(85,19,6,230,320);
let bigLog01 = new Sprite(180,21,6,166,20);
let bigLog02 = new Sprite(180,21,6,166,230);
let mediumLog01 = new Sprite(117,20,6,199,0);
let mediumLog02 = new Sprite(117,20,6,199,155);
let mediumLog03 = new Sprite(117,20,6,199,310);
let smallLog01 = new Sprite(85,19,6,230,0);
let smallLog02 = new Sprite(85,19,6,230,190);
let smallLog03 = new Sprite(85,19,6,230,320);

let river1 = new Lane(1,6,[bigLog1,bigLog2],108,true);
let river2 = new Lane(-1,4,[mediumLog1,mediumLog2,mediumLog3],138,true);
let river3 = new Lane(1,2,[smallLog1,smallLog2,smallLog3],170,true);
let river4 = new Lane(-1,6,[bigLog01,bigLog02],200,true);
let river5 = new Lane(1,3,[mediumLog01,mediumLog02,mediumLog03],230,true);
let river6 = new Lane(-1,2,[smallLog01,smallLog02,smallLog03],260,true);

let lanes = [road1,road2,road3,road4,road5,road6,river1,river2,river3,river4,river5,river6];

//Add event on click
interfaceCanvas.addEventListener("click",startGame);

//Defining functions
function isPointCollision(px,py,bx,by,bw,bh){
    if(px>bx && px<bx+bw && py>by && py<by+bh){
        return true;
    }
    else{
        return false;
    }
}

function isBoxCollision(b1x, b1y, b1w, b1h, b2x, b2y, b2w, b2h){
    let center1X = b1x+b1w/2;
    let center1Y = b1y+b1h/2;
    let center2X = b2x+b2w/2;
    let center2Y = b2y+b2h/2;
    let distance = Math.sqrt((center1X-center2X)**2+(center1Y-center2Y)**2);
    if (distance<(b1w/2 + b2w/2) && distance<(b1h/2 + b2h/2)){
        return true;
    }
    else{
        return false;
    }

}

function showStartScreen(){
    interfaceCtx.fillStyle = "black";
    interfaceCtx.fillRect(0,0,400,565);
    interfaceCtx.drawImage(p1,0,0,350,50,0,100,400,50);
    interfaceCtx.fillStyle = "green";
    interfaceCtx.fillRect(170,210,60,30);
    interfaceCtx.fillStyle = "black";
    interfaceCtx.font = "20px Georgia";
    interfaceCtx.fillText("Start",180,230);

}

let jogo;
let timer;

function startGame(event){
    let startx= event.offsetX;
    let starty= event.offsetY;
    switch(player.state){
        case "start":
            if(isPointCollision(startx,starty,170,210,60,30)){
                player.state = "playing";
                player.time = 60;
                player.lives = 5;
                player.score = 0;
                frog.x = 188;
                frog.y = 497;
                player.safeHomes = [true,true,true,true];
                frog.direction = "up";
                interfaceCtx.clearRect(0, 0, 400, 565);
                renderBackground();
                renderFrog();
                renderLives();
                renderScore();
                renderTime();
                renderSprites();
                jogo = setInterval(renderGame,100);
                timer = setInterval(countdown,1000);
            }
            break;
        case "end":
            if(isPointCollision(startx,starty,140,250,120,30)){
                player.state = "playing";
                player.time = 60;
                player.lives = 5;
                player.score = 0;
                frog.x = 188;
                frog.y = 497;
                player.safeHomes = [true,true,true,true];
                frog.direction = "up";
                interfaceCtx.clearRect(0, 0, 400, 565);
                renderBackground();
                renderFrog();
                renderLives();
                renderScore();
                renderTime();
                renderSprites();
                jogo = setInterval(renderGame,100);
                timer = setInterval(countdown,1000);
            }
    } 
}

let frog = {
    x : 188,
    y : 497,
    direction : "up",
    speed : 30,
    height : 24,
    width : 24};

let player = {
    time : 60,
    lives : 5,
    //options are start end or playing
    state : "start",
    score : 0,
    safeHomes: [true,true,true,true]};

function renderBackground(){
    bgCtx.fillStyle = "black";
    bgCtx.fillRect(0,0,400,565);
    
    //Title
    bgCtx.drawImage(p1,0,0,350,50,25,0,350,50);

    //River
    bgCtx.fillStyle = "blue";
    bgCtx.fillRect(0,60,400,225);

    //Safe Grass Area
    bgCtx.drawImage(p1,28,54,340,54,0,50,400,54);

    //Purple divisions
    bgCtx.drawImage(p1,0,118,400,35,0,280,400,35);
    bgCtx.drawImage(p1,0,118,400,35,0,493,400,35);
}

function renderFrog(){
    let d = frog.direction;
    switch(d){
        case "up":
            interfaceCtx.drawImage(p1, 12, 368, frog.width, frog.height, frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
            break;
        case "down":
            interfaceCtx.drawImage(p1, 80, 368, frog.width, frog.height, frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
            break;
        case "right":
            interfaceCtx.drawImage(p1, 12, 334, frog.width, frog.height, frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
            break;
        case "left":
            interfaceCtx.drawImage(p1, 81, 334, frog.width, frog.height,frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
        }}

function renderLives(){
    position = 0;
    for(let i=0;i<player.lives;i++){
        bgCtx.drawImage(p1,0,335,40,30,position,530,30,20);
        position += 18;
    }
}

function renderScore(){
    bgCtx.fillStyle = "yellow";
    bgCtx.font = "16px Arial";
    bgCtx.fillText(`Score: ${player.score}`,10,560);
}

function renderTime(){
    bgCtx.fillStyle = "yellow";
    bgCtx.font = "28px Arial";
    bgCtx.fillText(`Time: ${player.time}`,270,555);
}

//QL10: Lab 2
document.addEventListener("keydown",moveFrog);

function moveFrog(event){
    if(player.state == "playing"){
        if(event.key == "ArrowDown"){
            frog.direction = "down";
            if(frog.y<490){
                frog.y = frog.y + frog.speed;}
        }
        if(event.key == "ArrowLeft"){
            frog.direction = "left";
            if(frog.x>8){
                frog.x = frog.x - frog.speed;}
        }
        if(event.key == "ArrowRight"){
            frog.direction = "right";
            if(frog.x<340){
                frog.x = frog.x + frog.speed;}
        }
        if(event.key == "ArrowUp"){
            frog.direction = "up";
            if(frog.y>110){
                frog.y = frog.y - frog.speed;}
            else if(frog.y>70){
                if(frog.x==38 || frog.x==128 || frog.x==218 || frog.x==248 || frog.x==338){
                    frog.y = frog.y - frog.speed;
                }
            }
        }
        interfaceCtx.clearRect(0,0,400,565);
        renderFrog();}
}

function renderSprites(){
    for(let i=0;i<lanes.length;i++){
        for(let j=0;j<lanes[i].sprites.length;j++){
            let obj = (lanes[i].sprites)[j];
            spriteCtx.drawImage(p1,obj.ix,obj.iy,obj.width,obj.height,obj.x,lanes[i].y,obj.width,obj.height);
        }
    }
}

function renderGame() {
    //Moving Sprites
    for(let i=0;i<lanes.length;i++){
        for(let j=0;j<lanes[i].sprites.length;j++){
            if(lanes[i].direction == -1){
                if(lanes[i].sprites[j].x>0-(lanes[i].sprites)[j].width){
                    (lanes[i].sprites)[j].x = (lanes[i].sprites)[j].x - lanes[i].speed;
                }
                else{
                    (lanes[i].sprites)[j].x = 400;
                }
            }
            else{
                if(lanes[i].sprites[j].x<400){
                    (lanes[i].sprites)[j].x = (lanes[i].sprites)[j].x + lanes[i].speed;
                }
                else{
                    (lanes[i].sprites)[j].x = 0-(lanes[i].sprites)[j].width;
                }}
        }}
    spriteCtx.clearRect(0,0,400,565);
    renderSprites();

    //Collisions
    let r;
    let counter = false;
    switch(frog.y){
        case 107:
            r = lanes[6].sprites;
            for(let i=0;i<r.length;i++){
                if(frog.x>=r[i].x && frog.x<r[i].x+r[i].width){
                    counter = true;}
            }
            if(!counter){
                isDeadFrog();
            }
            break;
        case 137:
            r = lanes[7].sprites;
            for(let i=0;i<r.length;i++){
                if(frog.x>=r[i].x && frog.x<r[i].x+r[i].width){
                counter = true;
            }}
            if(!counter){
                isDeadFrog();
            }
            break;
        case 167:
            r = lanes[8].sprites;
            for(let i=0;i<r.length;i++){
                if(frog.x>=r[i].x && frog.x<r[i].x+r[i].width){
                    counter = true;
            }}
            if(!counter){
                isDeadFrog();
            }
            break;
        case 197:
            r = lanes[9].sprites;
            for(let i=0;i<r.length;i++){
                if(frog.x>=r[i].x && frog.x<r[i].x+r[i].width){
                    counter = true;
            }}
            if(!counter){
                isDeadFrog();
            }
            break;
        case 227:
            r = lanes[10].sprites;
            for(let i=0;i<r.length;i++){
                if(frog.x>=r[i].x && frog.x<r[i].x+r[i].width){
                    counter = true;
            }}
            if(!counter){
                isDeadFrog();
            }
            break;
        case 257:
            r = lanes[11].sprites;
            for(let i=0;i<r.length;i++){
                if(frog.x>=r[i].x && frog.x<r[i].x+r[i].width){
                    counter = true;
            }}
            if(!counter){
                isDeadFrog();
            }
            break;
        case 317:
            r = lanes[0].sprites;
            for(let i=0;i<r.length;i++){
                if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,r[i].x,lanes[0].y,r[i].width,r[i].height)){
                    isDeadFrog();
            }}
            break;
        case 347:
            r = lanes[1].sprites;
            for(let i=0;i<r.length;i++){
                if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,r[i].x,lanes[1].y,r[i].width,r[i].height)){
                    isDeadFrog();
            }}
            break;
        case 377:
            r = lanes[2].sprites;
            for(let i=0;i<r.length;i++){
                if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,r[i].x,lanes[2].y,r[i].width,r[i].height)){
                    isDeadFrog();
            }}
            break;
        case 407:
            r = lanes[3].sprites;
            for(let i=0;i<r.length;i++){
                if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,r[i].x,lanes[3].y,r[i].width,r[i].height)){
                    isDeadFrog();
            }}
            break;
        case 437:
            r = lanes[4].sprites;
            for(let i=0;i<r.length;i++){
                if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,r[i].x,lanes[4].y,r[i].width,r[i].height)){
                    isDeadFrog();
            }}
            break;
        case 467:
            r = lanes[5].sprites;
            for(let i=0;i<r.length;i++){
                if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,r[i].x,lanes[5].y,r[i].width,r[i].height)){
                    isDeadFrog();
            }}
            break;
        case 77:
            switch(frog.x){
                case 38:
                    if(player.safeHomes[0]==true){
                        player.safeHomes[0] = false;
                        player.score += 100;
                        bgCtx.drawImage(p1, 12, 368, frog.width, frog.height, frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
                    }
                    else{
                        isDeadFrog();
                    }
                    break;
                case 128:
                    if(player.safeHomes[1]==true){
                        player.safeHomes[1] = false;
                        player.score += 100;
                        bgCtx.drawImage(p1, 12, 368, frog.width, frog.height, frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
                    }
                    else{
                        isDeadFrog();
                    }
                    break;
                case 218:
                    if(player.safeHomes[2]==true){
                        player.safeHomes[2] = false;
                        player.score += 100;
                        bgCtx.drawImage(p1, 12, 368, frog.width, frog.height, frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
                    }
                    else{
                        isDeadFrog();
                    }
                    break;
                case 248:
                    if(player.safeHomes[2]==true){
                        player.safeHomes[2] = false;
                        player.score += 100;
                        bgCtx.drawImage(p1, 12, 368, frog.width, frog.height, frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
                    }
                    else{
                        isDeadFrog();
                    }
                    break;
                case 338:
                    if(player.safeHomes[3]==true){
                        player.safeHomes[3] = false;
                        player.score += 100;
                        bgCtx.drawImage(p1, 12, 368, frog.width, frog.height, frog.x,frog.y, 1.3*frog.width, 1.3*frog.height);
                    }
                    else{
                        isDeadFrog();
                    }
            }
            frog.x = 188;
            frog.y = 497;
            renderFrog();
        }
    bgCtx.clearRect(0,530,200,35);
    bgCtx.fillStyle = "black";
    bgCtx.fillRect(0,530,200,35);
    renderLives();
    renderScore();
    if(player.score==400){
        showEndScreen();
    }  
}

function isDeadFrog(){
    interfaceCtx.clearRect(0,0,400,565);
    interfaceCtx.drawImage(dead,frog.x,frog.y);
    player.lives -= 1;
    if(player.lives>0){
        frog.x = 188;
        frog.y = 497;
        renderFrog();
    }
    else{
        showEndScreen();
    }
}

function countdown(){
    player.time -= 1;
    if(player.time>=0){
        bgCtx.clearRect(200,530,200,35);
        bgCtx.fillStyle = "black";
        bgCtx.fillRect(200,530,200,35);
        renderTime();}
    else{
        showEndScreen();
    }
}

function showEndScreen(){
    if(player.state=="playing"){
        clearInterval(jogo);
        clearInterval(timer);
        interfaceCtx.fillStyle = "black";
        interfaceCtx.fillRect(80,110,240,200);
        interfaceCtx.fillStyle = "yellow";
        interfaceCtx.font = "40px Georgia";
        if(player.score != 400){
            interfaceCtx.fillText("Game Over",105,160);
            interfaceCtx.fillText('Score:' + `${player.score}`,110,215);
        }
        else{
            interfaceCtx.fillText("You Won!",120,160);
            interfaceCtx.fillText('Score:' + `${player.score + player.time*10}`,110,215);

        }
        interfaceCtx.fillStyle = "green";
        interfaceCtx.fillRect(140,250,120,30);
        interfaceCtx.fillStyle = "black";
        interfaceCtx.font = "20px Georgia";
        interfaceCtx.fillText("Play Again",153,270);
        player.state = "end";
    }
}
