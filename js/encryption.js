'use strict';

const hira = document.getElementById('hira')
const ango = document.getElementById('ango')
const ebtn = document.querySelectorAll('button')[0]
const dbtn = document.querySelectorAll('button')[1]

//　要素数が長いものから短いものへと並べること
const encodelist = {
	"ぁ":"パンティちゃちゃあああ",
	"ぃ":"パンティちゃーちゃあああ",
	"ぅ":"パンティちゃっちゃあああ",
	"ぇ":"パンティちゃあちゃあああ",
	"ぉ":"パンティぢゃっちゃあああ",
	"っ":"パンティちゃっ死ね",
	"ゃ":"パンティちゃキムタク",
	"ゅ":"パンティちゃっキムタク",
	"ょ":"パンティぢゃっキムタク",
	"ゎ":"パンティちゃPINK",
	
	"が":"ちゃぢゃーPPfacerightPP",
	"ぎ":"ちゃーぢゃーPPfacerightPP",
	"ぐ":"ちゃっぢゃーPPfacerightPP",
	"げ":"ちゃあぢゃーPPfacerightPP",
	"ご":"ぢゃっぢゃーPPfacerightPP",
	"ざ":"ちゃ孕めPPfacerightPP",
	"じ":"ちゃー孕めPPfacerightPP",
	"ず":"ちゃっ孕めPPfacerightPP",
	"ぜ":"ちゃあ孕めPPfacerightPP",
	"ぞ":"ぢゃっ孕めPPfacerightPP",
	"だ":"ちゃ死ねPPfacerightPP",
	"ぢ":"ちゃー死ねPPfacerightPP",
	"づ":"ちゃっ死ねPPfacerightPP",
	"で":"ちゃあ死ねPPfacerightPP",
	"ど":"ぢゃっ死ねPPfacerightPP",
	"ば":"ちゃニューピンPPfacerightPP",
	"び":"ちゃーニューピンPPfacerightPP",
	"ぶ":"ちゃっニューピンPPfacerightPP",
	"べ":"ちゃあニューピンPPfacerightPP",
	"ぼ":"ぢゃっニューピンPPfacerightPP",
	"ぱ":"ちゃニューピンPPfaceleftPP",
	"ぴ":"ちゃーニューピンPPfaceleftPP",
	"ぷ":"ちゃっニューピンPPfaceleftPP",
	"ぺ":"ちゃあニューピンPPfaceleftPP",
	"ぽ":"ぢゃっニューピンPPfaceleftPP",
	
	"あ":"ちゃちゃあああ",
	"い":"ちゃーちゃあああ",
	"う":"ちゃっちゃあああ",
	"え":"ちゃあちゃあああ",
	"お":"ぢゃっちゃあああ",
	"か":"ちゃぢゃー",
	"き":"ちゃーぢゃー",
	"く":"ちゃっぢゃー",
	"け":"ちゃあぢゃー",
	"こ":"ぢゃっぢゃー",
	"さ":"ちゃ孕め",
	"し":"ちゃー孕め",
	"す":"ちゃっ孕め",
	"せ":"ちゃあ孕め",
	"そ":"ぢゃっ孕め",
	"た":"ちゃ死ね",
	"ち":"ちゃー死ね",
	"つ":"ちゃっ死ね",
	"て":"ちゃあ死ね",
	"と":"ぢゃっ死ね",
	"な":"ちゃうんち",
	"に":"ちゃーうんち",
	"ぬ":"ちゃっうんち",
	"ね":"ちゃあうんち",
	"の":"ぢゃっうんち",
	"は":"ちゃニューピン",
	"ひ":"ちゃーニューピン",
	"ふ":"ちゃっニューピン",
	"へ":"ちゃあニューピン",
	"ほ":"ぢゃっニューピン",
	"ま":"ちゃ過疎",
	"み":"ちゃー過疎",
	"む":"ちゃっ過疎",
	"め":"ちゃあ過疎",
	"も":"ぢゃっ過疎",
	"や":"ちゃキムタク",
	"ゆ":"ちゃっキムタク",
	"よ":"ぢゃっキムタク",
	"ら":"ちゃウッホ",
	"り":"ちゃーウッホ",
	"る":"ちゃっウッホ",
	"れ":"ちゃあウッホ",
	"ろ":"ぢゃっウッホ",
	"わ":"ちゃPINK",
	"ゐ":"ちゃーPINK",
	"ゑ":"ちゃあPINK",
	"を":"ぢゃっPINK",
	"ん":"ミッシングスウェルポケット",
	
	"end":"end"
}


function encode(){
	let str = hira.value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g)||[];
	let result = "";
	for (const e of str){
		result += encodelist[e]||e;
	}
	result = result.replace(new RegExp("PPfacerightPP","g"),"(　＾ϖ＾)");
	result = result.replace(new RegExp("PPfaceleftPP","g"),"(＾ϖ＾　)");
	ango.value = result;
}

function decode(){
	let str = ango.value||"";
	let result = str;
	result = result.replace(new RegExp("\\(　＾ϖ＾\\)","g"),"PPfacerightPP");
	result = result.replace(new RegExp("\\(＾ϖ＾　\\)","g"),"PPfaceleftPP");
	for (const key of Object.keys(encodelist)){
		result = result.replace(new RegExp(encodelist[key],"g"),key);
	}
	result = result.replace(new RegExp("PPfacerightPP","g"),"(　＾ϖ＾)");
	result = result.replace(new RegExp("PPfaceleftPP","g"),"(＾ϖ＾　)");
	hira.value = result;
}

ebtn.addEventListener("click", encode, false);
dbtn.addEventListener("click", decode, false);