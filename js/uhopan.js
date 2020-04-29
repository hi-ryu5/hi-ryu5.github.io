'use strict';


const section = document.querySelector('section');
const botmsgdatauho = ["(　＾ϖ＾)ｳｯﾎ!ｳｯﾎ!","(　＾ϖ＾)ｳｯﾎ!ｳｯﾎ!","(　＾ϖ＾)ｳｯﾎ!ｳｯﾎ!","(　＾ϖ＾)ｳｯﾎ!ｳｯﾎ!","(　＾ϖ＾)ｳｯﾎ!ｳｯﾎ!","(　＾ϖ＾)ｳｯﾎ!!ｳｯﾎ!!","(　＾ϖ＾)","(　＾ϖ＾)ｳｯ…!ｳｯ…!(発作)","(　＾ϖ＾)ｳﾎｰｰｰｰ!!","(　＾ϖ＾)ｳｯ!ｳｯ!","(　＾ϖ＾)ﾎｯ…","(　＾ϖ＾)ｳｯ!","(　＾ϖ＾)ｳﾎｰﾘﾝ","(　＾ϖ＾)ｳﾎｰｰｰｯ!","(　＾ϖ＾)ｳﾎ!",`(　＾ϖ＾)ｳｯｳｯｳｯ……





(　＾ϖ＾)ﾎｰｰｰｰｰｰｰｰｰ!!!!!!`,"(　＾ϖ＾)！？","(　＾ϖ＾)ｳﾎｰｯ!ｳﾎｯﾎ!","(　＾ϖ＾)ｳﾎﾎﾎﾎｰｰｰｯ!","(　＾ϖ＾)パーンティ"]
const botmsgdatapan = ["パンティ","パンティ","パンティ","パンティ","パンティ"]
const botmsgdatarare = ["(　＾ー＾)","(　＾ー＾)ｳｯ!","(　＾ー＾)ｳｯ!　　　　　ﾎ","(　＾ー＾)ﾝｯ…!ﾝｯ…!"]

let resnumber = 1;
var timedata

function ran(max,min=0){
	return Math.floor(Math.random()*(max-min)+min);
}

function nowtime(){
	let now = new Date();
	let millitime = now.getMilliseconds();
	let nows = now + "";
	timedata = nows.split(" ");
	switch(timedata[1]){
		case'Jan':
		timedata[1]="01";
		break;
		case'Feb':
		timedata[1]="02";
		break;
		case'Mar':
		timedata[1]="03";
		break;
		case'Apr':
		timedata[1]="04";
		break;
		case'May':
		timedata[1]="05";
		break;
		case'Jun':
		timedata[1]="06";
		break;
		case'Jul':
		timedata[1]="07";
		break;
		case'Aug':
		timedata[1]="08";
		break;
		case'Sep':
		timedata[1]="09";
		break;
		case'Oct':
		timedata[1]="10";
		break;
		case'Nov':
		timedata[1]="11";
		break;
		case'Dec':
		timedata[1]="12";
		break;
	}
	
	switch(timedata[0]){
		case'Sun':
		timedata[0]="日";
		break;
		case'Mon':
		timedata[0]="月";
		break;
		case'Tue':
		timedata[0]="火";
		break;
		case'Wed':
		timedata[0]="水";
		break;
		case'Thu':
		timedata[0]="木";
		break;
		case'Fri':
		timedata[0]="金";
		break;
		case'Sat':
		timedata[0]="土";
		break;
	}
	
	let time=`${timedata[3]}/${timedata[1]}/${timedata[2]}(${timedata[0
	]}) ${timedata[4]}.${millitime}`;
	return time;
}

function kakiko(name,mail,msg){
	let time=nowtime();
	let id=Math.random().toString(36).slice(-9);
	let header = document.createElement('p');
	header.textContent = `${resnumber} 名前:${name} ${mail} ${time} ID:${id}`;
	let message = document.createElement('p');
	message.textContent = msg;
	section.appendChild(header);
	section.appendChild(message);
	resnumber++;
}

function write(){
	let name = document.getElementById('name').value||"名無しさん＠ピンキー";
	let mail = document.getElementById('mail').value;
	let msg = document.getElementById('message').value;
	kakiko(name,mail,msg);
	window.setTimeout(res, ran(500));
}

function res(){
	let mail =(ran(2)===0)?"":"sage";
	let msg = (ran(10)===0)?botmsgdatarare[ran(botmsgdatarare.length)]:(ran(2)===0)?botmsgdatauho[ran(botmsgdatauho.length)]:botmsgdatapan[ran(botmsgdatapan.length)];
	kakiko("名無しさん＠ピンキー",mail,msg)
}

document.querySelector('button').onclick=write;