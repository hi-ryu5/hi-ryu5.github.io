'use strict';

const canvas = document.querySelector('canvas');
canvas.width = 302;
canvas.height = 400;
canvas.style.backgroundColor = '#000';
const ctx = canvas.getContext('2d');

const p = document.querySelectorAll('p')[0];
const p2 = document.querySelectorAll('p')[1];
const inp = document.querySelector('input');
const btn = document.querySelectorAll('button')[0];

const imgbl =new Image();
imgbl.src = 'pic/block.gif';
const sePoint = new Audio('sound/swordman-damage2.mp3');
const seCollision = new Audio('sound/cursor7.mp3');

let start = false
let blockObj,blockArray,pl,ba
let point = 0
let fps = []

let width = 5
let height = 3

let keydown=[];

function onKeyDown(e){
	switch(e.key){
		case 'ArrowLeft'://left
		keydown[0]=true;
		e.preventDefault();
		break;
		case 'ArrowRight'://right
		keydown[1]=true;
		e.preventDefault();
		break;
		case 'z'://Z
		start=true;
		break;
		case 'r'://R
		init();
		break;
	}
}

function onKeyUp(e){
	switch(e.key){
		case 'ArrowLeft'://left
		keydown[0]=false;
		break;
		case 'ArrowRight'://right
		keydown[1]=false;
		break;
	}
}
window.addEventListener('keydown',onKeyDown,false);
window.addEventListener('keyup',onKeyUp,false);

let smafo=[];

smafo[0] = document.querySelectorAll('button')[1];
smafo[2] = document.querySelectorAll('button')[2];
smafo[3] = document.querySelectorAll('button')[3];
smafo[1] = document.querySelectorAll('button')[4];





for (let i=0;i<4;i++){
	smafo[i].addEventListener("mousedown", function(){
	keydown[i]=true;
	switch (i){
		case 2:
		start=true;
		break;
		case 3:
		init();
		break;
	}
}, false);
	smafo[i].addEventListener("mouseup", function(){
	keydown[i]=false;
}, false);
}

btn.onclick=function(){
	let val=inp.value.split(',');
	width=parseInt(val[0])
	height=parseInt(val[1])
	init();
}

class block{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	
	static draw(){
		for (let i=0; i<blockObj.length;i++){
			//UL
			let type=(blockArray[i-width]||0)+((i%width!==0)?blockArray[i-1]*2:0)+1;
			type+=(type===4&&blockArray[i-width-1]===1)?1:0;
			ctx.drawImage(imgbl,0,type*32,16,16,blockObj[i].x+1,blockObj[i].y+1,150/width,10)
			//UR
			type=(blockArray[i-width]||0)+((i%width!==width-1)?blockArray[i+1]*2:0)+1
			type+=(type===4&&blockArray[i-width+1]===1)?1:0;
			ctx.drawImage(imgbl,16,type*32,16,16,blockObj[i].x+1+150/width,blockObj[i].y+1,150/width,10)
			//DL
			type=(blockArray[i+width]||0)+((i%width!==0)?blockArray[i-1]*2:0)+1
			type+=(type===4&&blockArray[i+width-1]===1)?1:0;
			ctx.drawImage(imgbl,0,type*32+16,16,16,blockObj[i].x+1,blockObj[i].y+11,150/width,10)
			//DR
			type=(blockArray[i+width]||0)+((i%width!==width-1)?blockArray[i+1]*2:0)+1
			type+=(type===4&&blockArray[i+width+1]===1)?1:0;
			ctx.drawImage(imgbl,16,type*32+16,16,16,blockObj[i].x+1+150/width,blockObj[i].y+11,150/width,10)
			
		}
	}
	
	static collision(){
		let i=Math.floor(ba.x/(300/width))+width*Math.floor(ba.y/20);
		if (blockArray[i]===1){
			ba.vy=-ba.vy;
			blockArray[i]=0
			blockObj[i]=[-200,-200];
			point++
			sePoint.currentTime =0;
			sePoint.play();
		}
	}
}

class ball{
	constructor(x,y,vx,vy){
		this.x=x;
		this.y=y;
		this.vx=vx;
		this.vy=vy;
	}
	
	draw(){
		ctx.drawImage(imgbl,0,0,32,32,this.x-5, this.y-5,10,10)
	}
	
	collision(){
		this.x+=this.vx;
		this.y+=this.vy;
		if (this.x<5||this.x>295){
			this.vx=-this.vx
			seCollision.currentTime =0;
			seCollision.play();
		}
		if (this.y<5){
			this.vy=-this.vy
			seCollision.currentTime =0;
			seCollision.play();
		}
		if (this.y>410){
			start = false;
			p.innerHTML="press R to retry"
		}
	}
}

class bar{
	constructor(x,vx){
		this.x=x;
		this.vx=vx;
	}
	
	draw(){
		ctx.fillStyle = '#FFF';
		ctx.fillRect(this.x-25 ,298,50,5);
	}
	
	move(){
		if (keydown[0]===true){
			this.vx=-6;
		}else if (keydown[1]===true){
			this.vx=6;
		}else{
			this.vx=0;
		}
		this.x+=this.vx
	}
	
	collision(){
		if (this.x-ba.x>-25 && this.x-ba.x<25 && ba.y>298 && ba.y<302){
			ba.vx=ba.vx+this.vx/2
			ba.vy=-ba.vy;
			seCollision.currentTime =0;
			seCollision.play();
		}
	}
}

imgbl.onload=init();
imgbl.onload=loop();

function init(){
	point = 0;
	start = false;
	blockArray = [];
	blockObj = [];
	for (let i=0; i<width*height; i++){
		blockObj.push(new block(i%width*300/width, Math.floor(i/width)*20))
		blockArray.push(1)
	}
	ba = new ball(151,200,Math.random()*4-2,4)
	pl = new bar(151,0)
	p.innerHTML="press Z to start"
	p2.innerHTML="POINT:0"
}

function loop(){
	fps.push(new Date().getTime())
	let t=fps[fps.length-1]-fps[0]
	if (t>=1000){
		document.querySelector('section').innerHTML = `fps: ${Math.floor(fps.length)}`
		fps=[]
	}
	canvas.width=canvas.width
	block.draw();
	ba.draw();
	pl.move();
	pl.draw();
	if (start){
		block.collision();
		pl.collision();
		ba.collision();
		ctx.beginPath();
		p2.innerHTML=`POINT:${point}`
	}
	if (point===width*height){
		p.innerHTML="乙"
		start = false;
	}
	requestAnimationFrame(loop);
}