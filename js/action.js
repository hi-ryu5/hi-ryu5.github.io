'use strict';

const ctxsf = document.getElementById('stagefg').getContext('2d');
const ctxpl = document.getElementById('player').getContext('2d');
const ctxen = document.getElementById('enemy').getContext('2d');
const ctxne = document.getElementById('needle').getContext('2d');
const ctxsb = document.getElementById('stagebg').getContext('2d');

const imgpl =new Image();
const imgbl =new Image();
imgpl.src = 'acplayer.gif';
imgbl.src = 'acblock.gif';

let death=0;
let pushingkey=[];
let cdeltime = 0;

let keydown=[];
let smafo = [];

function stagedata(stNo){
	let stdata=""
	let pl = []
	let retry = []
	let timer = 0
	switch (stNo){
		case 0:
		pl=new Player(48,415.9,0,0,[0,3,0],[0,0]);
		retry=[48,415.9];
		stdata=
`
aaaaaaaaaaaaaaaaaaaa
a..................a
a..................a
a..................a
a..................a
a..................a
a..................a
a..................a
a..................a
a..................a
a....w.....w.......a
a...aaa...aaa......a
a..................a
a..................a
aaaaaaaaaaaaaaaaaaaa
`
		break;
		case 1:
		stdata=
`
aaaaaaaaaaaaaaaaaaaa
a............a.....a
a.....b.b.s..a.....a
a...aaabaaaa.a.....a
a..a..a......a.....a
a.....a......a.....a
a....saaaaa....b...a
a..baaa........a...a
a..............a...a
a..............a.g.a
a..aaa..aba....aaaaa
a...........aa.....a
a..................a
a................s.a
aaaaaabbbbbbaaaaaaaa
`
		break;
	}

	let starray=[];
	for (const element of stdata.split('\n')) {
		if (element!==""){
			starray.push(Array.from(element));
		}
	}
	let bl= (new Array(15)).fill("").map(() => (new Array(20)).fill(""));
	for (let i=0;i<15;i++) {
		for (let j=0;j<20;j++) {
			bl[i][j]=new Block(j*32,i*32,0,0,[0,0,0],0);
			switch(starray[i][j]){
				case '.':
				bl[i][j].type=0;
				break;
				case 'a':
				bl[i][j].type=1;
				break;
				case 'b':
				bl[i][j].type=11;
				break;
				case 'c':
				bl[i][j].type=21;
				break;
				case 'd':
				bl[i][j].type=31;
				break;
				case 'e':
				bl[i][j].type=41;
				break;
				case 's':
				bl[i][j].type=10;
				break;
				case 'g':
				bl[i][j].type=20;
				break;
				case 'w':
				bl[i][j].type=90;
				bl[i][j].anime[1]=3;
				break;
			}
			bl[i][j].anime[0] = bl[i][j].anime[0]||bl[i][j].type
		}
	}
	return { pl,retry,bl,timer }
}

function onKeyDown(e){
	e.preventDefault();
	switch(e.key){
		case 'ArrowLeft'://left
		keydown[0]=true;
		break;
		case 'ArrowRight'://right
		keydown[1]=true;
		break;
		case 'ArrowUp'://up
		case 'z'://Z
		keydown[2]=true;
		break;
		case 'r'://r
		keydown[3]=true;
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
		case 'ArrowUp'://up
		case 'z'://Z
		keydown[2]=false;
		break;
		case 'r'://r
		keydown[3]=false;
		break;
	}
}
window.addEventListener('keydown',onKeyDown,false);
window.addEventListener('keyup',onKeyUp,false);

smafo[0] = document.querySelectorAll('button')[0];
smafo[1] = document.querySelectorAll('button')[1];
smafo[3] = document.querySelectorAll('button')[2];
smafo[2] = document.querySelectorAll('button')[3];

for (let i=0;i<4;i++){
	smafo[i].addEventListener("touchstart", function(){
	keydown[i]=true;
}, false);
	smafo[i].addEventListener("touchend", function(){
	keydown[i]=false;
}, false);
}

const die = function(){
	pl.x=retry[0];
	pl.y=retry[1];
	pushingkey[20]=1;
	death++
}

function Chara(x,y,vx,vy,anime) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.anime = anime;//(chipNo.,アニメーション枚数=0,animeNo.)
}

function Block(x,y,vx,vy,anime,type) {
	Chara.call(this,x,y,vx,vy,anime);
	this.type=type
	this.draw=function(){
		if (timer%6 === 1){
			this.anime[2] = (this.anime[2]+1)%(this.anime[1]+1)
		}
		let a = this.anime[0] + this.anime[2]
		ctxsb.drawImage(imgbl,a%10*32,Math.floor(a/10)*32,32,32,this.x,this.y,32,32);
	}
}

function Player(x,y,vx,vy,anime,state) {
	Chara.call(this,x,y,vx,vy,anime);
	this.state=state//(jump,jump回数,move)
	this.draw=function(){
		ctxpl.clearRect(0,0,640,480);
		this.x+=this.vx
		this.y+=this.vy
		if (timer%6===1){
			this.anime[2]=(this.anime[2]>=this.anime[0]+this.anime[1])?this.anime[0]:this.anime[2]+1;
		}
		ctxpl.drawImage(imgpl,this.anime[2]%4*32,Math.floor(this.anime[2]/4)*32,32,32,this.x,this.y,32,32);
	}
	this.control=function(){
		if(keydown[1]){
			this.vx+=(this.vx<=3)?1:0;
			this.anime=[0,3,this.anime[2]%4]
			this.state[2]=1
		}else if(keydown[0]){
			this.vx-=(this.vx>=-3)?1:0;
			this.anime=[4,3,this.anime[2]%4+4]
			this.state[2]=1
		}else{
			this.vx=0;
			this.state[2]=0
		}
		if(keydown[2]){
			if (pushingkey[0]===0 && this.state[1]>=1){
				pushingkey[0]=1;
				this.state[1]-=1;
			}
			if (this.state[0]<=this.state[1]*2.5 && pushingkey[0]===1){
				this.vy=-6;
				this.state[0]++
			}
		}else{
			pushingkey[0]=0;
			this.state[0]=0;
			this.state[1]=(this.state[1]===-1)?2:this.state[1];
		}
		this.vy+=(this.vy<=12)?0.3:0;
		
		if(keydown[3]){
			if (pushingkey[1]===0){
				pushingkey[1]=1
				die();
			}
		}else{
			pushingkey[1]=0
		}
	}
	this.block=function(){
		function bltype(x, y){
			return bl[Math.floor(y/32)][Math.floor(x/32)].type
		}
		if (bltype(this.x+16, this.y+16)===10){
			if(pushingkey[20]===0){
				retry=[this.x,this.y]
				pushingkey[20]=1;
				ctxsf.font = "12px 'sans-serif'";
				ctxsf.fillStyle = "#FFF"
				ctxsf.textAlign = "center";
				ctxsf.fillText(`save`, this.x+16, this.y-5);
				cdeltime = timer + 16
			}
		}else{
			pushingkey[20]=0
		}
		if (bltype(this.x+16, this.y+16)===20){
			if(pushingkey[21]!==1){
				retry=[this.x,this.y]
				pushingkey[21]=1;
			}
		}
		if (bltype(this.x+this.vx+16, this.y+20)%10===1){
			if (bltype(this.x+this.vx+16, this.y+20)===31&&this.vx>0){
				die();
			}
			if (bltype(this.x+this.vx+16, this.y+20)===41&&this.vx<0){
				die();
			}
			this.vx=0;
		}
		if (bltype(this.x+16, this.y+this.vy+20)%10===1){
			if (bltype(this.x+16, this.y+this.vy+20)===21&&this.vy<0){
				die();
			}
			if (this.vy<0){this.vy=0};
			if (this.state[2]===0){
				this.anime=[Math.floor(this.anime[0]/4)%2*4,0,Math.floor(this.anime[0]/4)%2*4]
			}
		}
		if (bltype(this.x+16, this.y+this.vy+32)%10===1){
			if (bltype(this.x+16, this.y+this.vy+32)===11&&this.vy>0){
				die();
			}
			this.vy=0;
			this.y=Math.floor(this.y/32)*32+31.9;
			this.state[1]=(this.state[1]!==2)?-1:this.state[1];;
			if (this.state[2]===0){
				this.anime=[Math.floor(this.anime[0]/4)%2*4,0,Math.floor(this.anime[0]/4)%2*4]
			}
		}
		if (bltype(this.x+this.vx+16, this.y+this.vy+32)%10===1){
			this.vx=0;
		}
		if (this.vy<0){
			this.anime=[Math.floor(this.anime[0]/4)%2*4+8,0,Math.floor(this.anime[0]/4)%2*4+8];
		}else if(this.vy>0){
			this.anime=[Math.floor(this.anime[0]/4)%2*4+9,0,Math.floor(this.anime[0]/4)%2*4+9];
		}
	}
}


let { pl,retry,bl,timer } = stagedata(0)

function loop(){
	
	pl.control();
	pl.block();
	pl.draw();
	timer++
	for (let i=0;i<15;i++) {
		for (let j=0;j<20;j++) {
			if (bl[i][j].anime[1] >0){
				bl[i][j].draw();
			}
		}
	}
	if (timer === cdeltime){
		ctxsf.clearRect(0,0,640,480)
	}
	if (pushingkey[21]!==1){
		window.requestAnimationFrame(loop);
	}else{
		ctxsf.fillStyle = '#000';
		ctxsf.fillRect(180,120,280,180)
		ctxsf.fillStyle = '#FFF';
		ctxsf.font = "30px 'sans-serif'";
		ctxsf.textAlign = "center";
		ctxsf.fillText(`CLEAR!`, 320, 180);
		ctxsf.fillText(`RECORD: ${Math.round(timer*10/6)/100}s`, 320, 240);
	}
}

imgbl.onload=function(){
	for (let i=0;i<15;i++) {
		for (let j=0;j<20;j++) {
			bl[i][j].draw();
		}
	}
}


loop();