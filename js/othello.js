'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let oldc,loop,level,field,Sc1,pl,timer,times,gof,endf;
let click = 0;
let offsets = [];
let numbers = [];
let fvalue = []


//素材
const imgfa = new Image();
const imgbo = new Image();
const imgpi = new Image();
imgfa.src = "pic/face.gif";
imgbo.src = "pic/oth_board.gif";
imgpi.src = "pic/oth_piece.gif";



//

canvas.addEventListener('click',(e)=>{		//キー入力取得
	offsets[0] = e.offsetX;
	offsets[1] = e.offsetY;
	click ++
	console.log(offsets)
})

function between(n,a,b){
	return a <= n && n <= b
}

function sqbet(x,y,a,b,c,d){
	return between(x,a,a+c) && between(y,b,b+d)
}

function div(n,d){
	return Math.floor(n/d)
}

function Imgpi(n,x,y){
	ctx.drawImage(imgpi,n*40,0,40,40,x,y,40,40);
}

function Imgface(n,x,y){
	ctx.drawImage(imgfa,(n%5)*40,div(n,5)*40,40,40,x,y,40,40);
}

class Scene {		//画像の表示・画像データの保持を行う
	constructor(){
		this.picdata = [];
	}
	
	add(n,data){
		this.picdata[n] = data;
	}
	
	remove(n){
		this.picdata[n] = undefined;
	}
	
	disp(){
		for(let i=0;i<this.picdata.length;i++){
			if(!this.picdata[i]){
				continue
			}
			if(this.picdata[i][0]==imgpi){
				Imgpi(this.picdata[i][1],this.picdata[i][2],this.picdata[i][3]);
			}else if(!this.picdata[i][3]){
				ctx.drawImage(this.picdata[i][0],this.picdata[i][1],this.picdata[i][2]);
			}else{
				Imgface(this.picdata[i][1],this.picdata[i][2],this.picdata[i][3]);
			}
		}
	}
}

imgfa.addEventListener('load',title)

function title(){		//タイトル
	level = 0
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,480,360);
	ctx.fillStyle = "#FFF";
	ctx.font = "24px 'メイリオ'";
	ctx.textAlign = "center";
	ctx.fillText("顔グラフィック誰かよこせください", 240, 80);
	ctx.font = "12px 'メイリオ'";
	for (let i=1;i<5;i++){
		Imgface(i,120*i-80,150)
		ctx.fillText(`LV ${i}`,120*i-60,210);
	}
	oldc = click;
	loop = setInterval(()=>{
		if (oldc != click){
			if (sqbet(offsets[0],offsets[1],40,150,40,40)){
				level = 1;
			}else if(sqbet(offsets[0],offsets[1],160,150,40,40)){
				level = 2;
			}else if(sqbet(offsets[0],offsets[1],280,150,40,40)){
				level = 3;
			}else if(sqbet(offsets[0],offsets[1],400,150,40,40)){
				level = 4;
			}
			if (level){
				clearInterval(loop);
				maingamesetting(level)
			}
			oldc = click;
		}
	},10)
}

function koma(){
	for (let i=0;i<80;i++){
		switch (field[i]){
			case -1:
				Sc1.add(i+10,[imgpi,1,i%10*40+40,div(i,10)*40+20]);
				break;
			case 1:
				Sc1.add(i+10,[imgpi,0,i%10*40+40,div(i,10)*40+20]);
				break
		}
	}
}

function maingamesetting(level){		//初期設定
	ctx.fillStyle = "#484";
	ctx.fillRect(0,0,480,360);
	Sc1 = new Scene();
	
	field = new Array(80).fill(0);
	field[34] = -1
	field[35] = 1
	field[44] = 1
	field[45] = -1
	koma();
	
	Sc1.add(0,[imgbo,80,20]);
	Sc1.add(1,[imgfa,0,20,280]);
	Sc1.add(2,[imgfa,level,420,20]);
	Sc1.add(3,[imgpi,2,20,20]);
	Sc1.disp();
	
	oldc = click;
	timer = 0;
	times = 0;
	gof = false;
	endf = false;
	
	if (Math.random()>=0.5){
		pl = -1
		teki();
	}else{
		pl = 1
	}
	numbers = [2,2]
	
	if (level==1){
		fvalue = [0,120,-20,20,5,5,20,-20,120,0,0,-20,-40,-5,-5,-5,-5,-40,-20,0,0,20,-5,15,3,3,15,-5,20,0,0,5,-5,3,3,3,3,-5,5,0,0,5,-5,3,3,3,3,-5,5,0,0,20,-5,15,3,3,15,-5,20,0,0,-20,-40,-5,-5,-5,-5,-40,-20,0,0,120,-20,20,5,5,20,-20,120,0]
	}else if(level == 2||level == 4){
		fvalue = [0,30,-12,0,-1,-1,0,-12,30,0,0,-12,-15,-3,-3,-3,-3,-15,-12,0,0,0,-3,0,-1,-1,0,-3,0,0,0,-1,-3,-1,-1,-1,-1,-3,-1,0,0,-1,-3,-1,-1,-1,-1,-3,-1,0,0,0,-3,0,-1,-1,0,-3,0,0,0,-12,-15,-3,-3,-3,-3,-15,-12,0,0,30,-12,0,-1,-1,0,-12,30,0]
	}
	
	
	mainloop()
}

function mainloop(){
	numbers = [0,0]
	for(let i=0;i<80;i++){
		switch(field[i]){
			case 1:
				numbers[0] ++
				break
			case -1:
				numbers[1] ++
				break
		}
	}
	
	ctx.fillStyle = "#484";
	ctx.fillRect(0,0,480,360);
	ctx.fillStyle = "#FFF";
	ctx.font = "12px 'メイリオ'";
	ctx.textAlign = "center";
	ctx.fillText(`time:${div(timer,60)}`, 40, 340);
	ctx.textAlign = "left";
	ctx.fillText(`黒：${numbers[0]}`, 405, 240);
	ctx.fillText(`白：${numbers[1]}`, 405, 255);
	
	if (numbers[0] == 0){
		endf = true;
		ctx.fillText("白の勝ちです", 405, 285);
	}
	
	if (numbers[1] == 0){
		endf = true;
		ctx.fillText("黒の勝ちです", 405, 285);
	}
	
	if (numbers[0]+numbers[1] == 64){
		endf = true;
		if (numbers[0] > numbers[1]){
			ctx.fillText("黒の勝ちです", 405, 285);
		}
		if (numbers[0] < numbers[1]){
			ctx.fillText("白の勝ちです", 405, 285);
		}
		if (numbers[0] == numbers[1]){
			ctx.fillText("引き分けです", 405, 285);
		}
	}
	
	ctx.fillText(`${times}手目`, 405, 315);
	switch(pl){
		case 1:
			ctx.fillText("あなた（黒）", 405, 330);
			break;
		case -1:
			ctx.fillText("あなた（白）", 405, 330);
			break;
	}
	Sc1.disp();
	
	
	if (oldc != click){
		if (sqbet(offsets[0],offsets[1],20,20,40,40)){
			title();
			return;
		}
	}
	
	
	if (okeru(1)){
		gof = false;
		if (oldc != click){
			let a = div(offsets[0]-40,40)+div(offsets[1]-20,40)*10;
			if (between(a%10,1,8)&&between(div(a,10),0,7)){
				console.log(a)
				if (oku(a,pl,true)){
					teki();
					times++
					koma();
					Sc1.disp();
				}
			}
		}
	}else{
		if (gof){
			endf = true;
			if (numbers[0] > numbers[1]){
				ctx.fillText("黒の勝ちです", 405, 285);
			}
			if (numbers[0] < numbers[1]){
				ctx.fillText("白の勝ちです", 405, 285);
			}
			if (numbers[0] == numbers[1]){
				ctx.fillText("引き分けです", 405, 285);
			}
		}else{
			gof = true;
		}
		teki();
	}
	
	oldc = click;
	if (!endf){
		timer ++
	}
	
	requestAnimationFrame(mainloop);
}

function oku(x,color,change){
	let bool = false;
	
	if (field[x]){
		return false;
	}
	const d=[-11,-10,-9,-1,1,9,10,11]
	for (let i=0;i<8;i++){
		let a = x;
		a += d[i];
		if (field[a]!=-1*color){
			continue;
		}
		while (true){
			a += d[i];
			if (field[a]==-1*color){
				continue;
			}else if (field[a]==color){
				while(a != x){
					a -= d[i];
					if (change){
						field[a] = color;
					}
				}
				bool = true;
				break;
			}else{
				break;
			}
		}
	}
	return bool;
}

function oku2(fie,x,color){
	const d=[-11,-10,-9,-1,1,9,10,11]
	for (let i=0;i<8;i++){
		let a = x;
		a += d[i];
		if (fie[a]!=-1*color){
			continue;
		}
		while (true){
			a += d[i];
			if (fie[a]==-1*color){
				continue;
			}else if (fie[a]==color){
				while(a != x){
					a -= d[i];
					fie[a] = color;
				}
			}
			break
		}
	}
	return fie;
}

function okeru(a){
	let okiba = 0;
	for(let i=0;i<8;i++){
		for(let j=1;j<9;j++){
			if (oku(i*10+j,a*pl,false)){
				okiba += 1;
			}
		}
	}
	return okiba;
}

function teki(){
	if (!okeru(-1)){
		gof = true;
		return
	}else{
		gof = false;
	}
	
	//思考ルーチン
	if (level<=2){
		let a = [0,-10000]		//手、評価値
		for(let i=0;i<8;i++){
			for(let j=1;j<9;j++){
				if (oku(i*10+j,-1*pl,false)){
					let p = 0
					let f2 = field.concat()
					f2 = oku2(f2,i*10+j,-1*pl)
					for(let k=0;k<80;k++){
						p += f2[k]*fvalue[k]*(-1)*pl
					}
					if (a[1] < p){
						a = [i*10+j,p]
					}
				}
			}
		}
		oku(a[0],-1*pl,true)
	}else if(level==3){		//端に置かない・自分の手を増やし相手の手を減らす
		let a = [0,-10000]		//手、評価値=自分の手-相手の手
		for(let i=0;i<8;i++){
			for(let j=1;j<9;j++){
				if (oku(i*10+j,-1*pl,false)){
					let p = 0
					let f2 = field.concat()
					let f3 = field.concat()
					field = oku2(f2,i*10+j,-1*pl)
					p = okeru(-1)-okeru(1)*2
					field = f3
					
					//端補正
					if (i*10+j==1 || i*10+j==8 || i*10+j==71 || i*10+j==78){
						p += 10
					}
					
					if (i*10+j==2 || i*10+j==7 || i*10+j==11 || i*10+j==18 || i*10+j==72 || i*10+j==77 || i*10+j==61 || i*10+j==68){
						p -= 10
					}
					
					if (i*10+j==12 || i*10+j==17 || i*10+j==62 || i*10+j==67){
						p -= 20
					}
					
					if (a[1] < p){
						a = [i*10+j,p]
					}
				}
			}
		}
		oku(a[0],-1*pl,true)
	}else{		//2+3+終盤完全読み
		if (times<=60){
			let a = [0,-10000]		//手、評価値
			for(let i=0;i<8;i++){
				for(let j=1;j<9;j++){
					if (oku(i*10+j,-1*pl,false)){
						let p = 0
						let f2 = field.concat()
						let f3 = field.concat()
						field = oku2(f2,i*10+j,-1*pl)
						p = okeru(-1)-okeru(1)*2
						field = f3
						
						//端補正
						if (i*10+j==1 || i*10+j==8 || i*10+j==71 || i*10+j==78){
							p += 10
						}
						
						if (i*10+j==2 || i*10+j==7 || i*10+j==11 || i*10+j==18 || i*10+j==72 || i*10+j==77 || i*10+j==61 || i*10+j==68){
							p -= 20
						}
						
						if (i*10+j==12 || i*10+j==17 || i*10+j==62 || i*10+j==67){
							p -= 30
						}
						
						if (a[1] < p){
							a = [i*10+j,p]
						}
					}
				}
			}
			oku(a[0],-1*pl,true)
		}else{
			kanzen();
		}
	}
	times++
	koma();
	Sc1.disp();
	return
}


function kanzen(){
	let okiba = [];
	for(let i=0;i<8;i++){
		for(let j=1;j<9;j++){
			if (oku(i*10+j,-1*pl,false)){
				okiba.push(i*10+j)
			}
		}
	}
}