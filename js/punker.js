'use strict';


const section = document.querySelector('section');
const botmsgdata = [
`　　　　　 ,,t＿＿
　　　 ,;*'"と）[|__]
　 　：'　,,　..ゝ'ェ'）
　　　U''U~~U''U
　ϖ>>`,
`　　　　　　＿ ＿ ＿ ＿ 从._,　　　　　　　　　Σ🌱ﾌﾞﾁｯ!
　　　 ,;*j三）[（(〓((｡ﾟ｡) 　　━　二　三　　━　━ 　━
　 　：'　,,　..ゝ'ェ'）￣￣⌒Y⌒　　　　　　　　　　)＼　>>
　　　U''U~~U''U　　　　　　　　　　　　　　　((　＾ϖ＾))ﾁﾞｬｧｧｧ`,
`>> このピクミン抜いときますねー
　　　　　
　　　　　 ∧
　　　　　（ i ）　　　　 /
　 　　　　 )　＼ 　／　　　　　　　　／
　　 　 （（　＾ϖ＾ ）)'ﾞヽﾁﾞｬｱｱｱ _／
　 　　　／iつ　　つ　 　 ,;　　 ／
　 i !　（　ヽ.　 　 ）　 ﾉ/ .:／
　　　 （＼.ﾞヽ＿（_／,ｲ／
　 i !　（＼＼＿,＿）' ﾉ
　　　 （＼＼＿,＿,）'
　 i !　 l　,i＼ ヽ　　
　　 　 し`,
`　　 　川　　　/i
　　(　'ϖ')　 //
　∩´・ ・ヽ//
　| .|）=={ヽ_）
　∪从从''
　　 U U ϖ>>`,
`　　　　　　　　　　　＿∧＿∧
　　　　　　　　／￣　（　´・_・｀）⌒＼
　　　__　 　　/　　＿|　　　　 |　　　|
　　 ヽヽ 　 /　　/　 ＼　　　 |　　　|　　　　　　　　　　 ,,,,,,,iiiiillllll!!!!!!!lllllliiiii,,,,,,,
　　　 ＼＼|　　|＿＿__|　　　.|　　 |　　　　　　 　 　 .,llllﾞﾞﾞﾞﾞ　　　　　　　　ﾞﾞﾞﾞﾞlllll,
　　　　 ＼/　　＼　　　　　　 |　　 |　　　　　　 　 　 .|!!!!,,,,,,,,　　　　　　 ,,,,,,,,,!!!!|
　　　　　| ヽ＿「＼　　　　　　|　　 |､　　　　　　　　　|　 ﾞﾞﾞﾞ!!!!llllliiiiiiiiiilllll!!!!ﾞﾞﾞﾞ　.|
　　　　　|　　　 ＼ ＼――､. |　　 | ヽ　　　　　　 　 .|　　　　　.ﾞﾞﾞﾞﾞﾞﾞﾞﾞﾞ　　　　　|
　　　　　|　　　/　＼ "-､,　 ｀|　　|　　ヽ　　　　　　　|　　　　　　　　　　　 　　 |
　　＿／　　　/　　　 "-, "' （_　　ヽ　　ヽ　　　　　　.|　　　　　　　　　　　 　　 |
／　　　 ＿_ノ　　　　　　"'ｍ__｀＼ヽ_,,,, ヽ 　　　　　 |　　　　　　　　　　　 　　 |
｀ー―￣　　　　　　　　　 ヽ､__｀/ー_,,,, ﾞﾞﾞﾞ!!!!!!lllllllliiiiii|　　　　　　　　　　　　 　 |
　　　　　　　　　　　　　　　　　　　　＼ﾞﾞﾞﾞﾞﾞﾞ!!!!!lllllllliiiii|　　　　　　　　　　　 　　 |
　　　　　　　　　　　　　　　　　　　　　 ＼　　　ヽ　 　|　　　　　　　　　　　 　　 |
　　　　　　　　　　　　　　　　　　　　　　　ヽ　 　＼　 |　　　　　　　　　　　　 　 |
　　　　　　　　　　　　　　　　　　　　　　　　| 　 　 ＼.|　　　　　　　　　　　　 　 |
　　　　　　　　　　　　　　　　　　　　　　　　｀ヽ､,,＿ノ|　　　　　　　　　　　　 　 |
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 ﾞﾞ!!!,,,,,,,,　　　　　　 ,,,,,,,,,!!!ﾞﾞ
　　　　　　　　　　　　　　　　　　　　　　 　 　 　 　 　 　 ﾞﾞﾞﾞ!!!!llllliiiiiiiiiilllll!!!!ﾞﾞﾞﾞ
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　／.// ･ｌ|∵ ヽ＼　←>>`,
`　　　　　　　　　　　　　　　　　　　 从⌒ﾞヽ,　　
　　　　　　　　　　　　　,;　|i　 　 γﾞ⌒ヾ,　 |!　　
　　　　　　　　　　　　　　　　 _,.ノ'ﾞ⌒';､人　 l!　　　
　　　　　　　　　　　　 　 从~　　　イ　,〉　k
　　　　　　　　　　　　 γﾞ　 (´・ω・｀)/　〈,k_ノ 　
　　　　　　　　　　　　 （　　　 ﾊ.,_,ノ~r　　　　　　 　
　　　　　　　　　　　　　）'‐-‐'l　　 γ´⌒ﾞヽ､
　　　　　　　　　 ,､-ｰ''（　 　 |!～､,il　　　 　 ゝ、　　　
　　　　　　　　γ　　　 |! 　 〈 　 ヽ ﾐ、　　　　丿
　　　　 　 ゝ　（　　　　 |　　ﾉ　 _,,,..､,,ゝ、 _,.イ　　/　　　　　
　　　 ＼'´　 γﾞヽ.,_　　）　ﾞ|!￣　　　￣~ﾞil γ⌒ヽ｀(／
　　　 Σ　 　 ゝ.,＿_ﾞﾞ'k{　　ヾ ／　　　 　 !､,_＿_丿　て
　　　　　　　　　　　 >　ゝ-ｰ'ﾞっ⌒つ>>`,
`　　　 凡凡
　 。< ＾ϖ＾>
　(＿.> 　<
　 ＼　　　)
　　又￣又 　ϖ>>`,
`　从\
　　 \从
　　　　 从
　　　　　　\　　　ちゃぁ…
゜◎ 　 ／二二二二二二二ゝ
　　　∠∠(　　 ) )＿＿＿＿
　 　 ＼＿∪∪二二二二フ
　　　　从ﾉ >>
人从ﾉﾉ`,
`　　　　　 ∧＿∧
　　　　　（ ´∀｀ ） 　
　　　　 /⌒　　 ｀ヽ
　　　　/　/　　　 ﾉ.＼＿M
　　　 (　/ヽ　　　|＼＿__E）
　　　　＼ /　　　|　　 ／　 ＼
　　　 　 （　　 _ﾉ |　 / ﾁﾞｬｱｱ ヽ
　　　　　 | 　 /　/　 | （＾ϖ＾） |
　　　 　　|　 /　/　　ヽ >>　 ノ
　　　　 　(　 )　) 　　　￣￣￣
　　　　　 |　|　/
　　　　　 |　|　|.
　　　　　/　|＼ ＼
　　 　 ∠／　　￣`,
`. ╭━━━━━━╮
　┃　 ’ϖ’ 　 ┃ ﾅﾆｶﾌﾝﾀﾞ…
　┃　　　　　 　 ┃
　┃┃　　 　┃　 ┃
　┃┃　　　 ┃　 ┃
　┃┃　　 　┃　 ┃
　╰┫　　　 ╰┳╯＿＿､､　　　　　　　 __
　 　┃ 　┃　 　┃　　　／　　ー　/　　　//
　 　┃　 ┃　 　┃　 ／＼　　＿ノ　ツ　o
　 　 ┃ 　┃　　 ┃
　 ╭┛╭┛　 ┃彡３
　 ┗━┻━━━╯
　　　　　　　　　ﾌﾟﾁｯ
　　　　　　>>`,
`　　　　　　　　　　　　╭━━━━━━╮
　　　　　　　　　　　　┃　　　　　’ϖ’　 ┃　ﾅﾝｶﾌﾝﾀﾞ…
　　　　　　　　　　　　┃ 　 　 　 　 　 　 ┃
　　　　　　　　　　　　┃　 ┃ 　 　 　 ┃┃
　　　　　　　　　　　　┃　 ┃ 　 　 　 ┃┃
　　　　　　　　　　　　┃　 ┃ 　 　 　 ┃┃
　　　　　　　　　　　　╰┳╯ 　 　 　 ┣╯
　　　　　　　　　　　　 　┃ 　 　┃ 　 ┃
　 ＿＿､､　　　　　 __　 ┃　 　 ┃ 　 ┃
　　　／　　ー　/　// 　┃ 　 　┃ 　 ┃
　 ／＼　　＿ノ ッo　　 ┃　 　 ┗╮ ┗╮彡３
　 　　　　　　　　　　　　╰━━━┻-━┛
　　　　　　　　　　　　　　　　　　　ﾌﾟﾁｯ
　　　　　　　　　　　　　　　　　　　　　　>>`,
`　　　　　　　　　　　)＼
　　　　　　　　🌱
　　　　　　　　　　　　(　oϖo)　>>




　　　　　　　 .・-ﾉ)・、
　　　 三　 ノ人乚ﾋﾟﾝ　
　　 　 三 ‘从*ﾟヮﾟiﾉ　　　　　;，
　　　 三 ＿(っ⊂〓二二二⊃ 　　　　　　　　　　　
　　 三 　＼_/_i_ヽ>　ﾁｭｲｨｨｨﾝ・,'
　ﾀﾞｯ Σ,　くノ‐・´`,
`　　　　 ＿＿＿,,,,
　　　 /r彡彡彡ノ　　　
　　　 ﾐ√ﾟ∀ﾟ)　ｨｸっ　　　
　 　 /⌒＼ﾉヽ/V-'
　 　( 〈i 　 | iヽ/
　　 く__j__ノヽ)
　　 ／|＼/ﾚi
　　レ｀| ,ﾉ| ﾉ　　　　＿
　　　　| )i ﾉ　　　　 ]　[
　　　　|ﾉ( ヽ　　 　 [酸]　＾ϖ>>
　　 　ム｀￣　　　 　￣`,
`　　　 ∧
　　／　 ＼　　　　　　　　　　　　　　　　　　　　　　　
　　|　＾ϖ＾| 
　　＼　 ／　　　 ＿　　
　　／∨＼　　／iっ🍋っ
　人 // ＼/　i　i　　　っ
/　i // //／iゝヽﾉ (＾ϖ＾ )>>
i .く==m=iくヽ_／
＼川川川}
　　川川川i`,
`>>
(巛ミ彡ミ彡ミ彡ミ彡ミ彡）ミ彡ミ彡）ミ彡)
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　,,从.ノ巛ミ　　　 彡ミ彡）ミ彡ミ彡ミ彡）ミ彡)''"
　　　　　　　　　　　　　　　　　　　　　　　　　　　 人ノﾞ　⌒ヽ　　　　　　　　　彡ミ彡）ミ彡）ミ彡)'
　　∧＿∧　　　　　　　　　　　　　　　,,..､;;:～''"ﾞﾞ　　　　　　 ）　　ϖ　　　　ミ彡ミ彡）ミ彡,,）
√（:::.・∀・）　　　　　　,,..､;;:～-:''"ﾞ⌒ﾞ　　　　　　　　　　彡　,,　　　　 ⌒ヽ　　　　 ミ彡"
|　（:::..､===m==<|::::::ﾞ:ﾞ　　　　　　　　　　　　　　　　　　　　'"ﾞ　　　　　　　　ミ彡）彡''"
|_=|:::. |::.　| '　　　　｀ ﾞ⌒｀ﾞ"''～-､:;;,_　　　　　　　　　　　　　　）　　 彡,,ノ彡～''"
　（＿_）＿）　　　　　　　　　　　　　　ﾞ⌒｀ﾞ"''～-､,,　　　　 ,,彡⌒''～''"
　　　　　　　　　　　　　　　　　　　　　　　　　　　　"⌒''～"　　　　　　`,
]

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
	header.innerHTML = `<a id=res${resnumber}>${resnumber} 名前:${name} ${mail} ${time} ID:${id}</a>`;
	let message = document.createElement('p');
	message.innerHTML = msg.replace(/\n/g,'<br>');
	section.appendChild(header);
	section.appendChild(message);
	resnumber++;
}

function write(){
	let name = document.getElementById('name').value||"名無しさん＠ピンキー";
	let mail = document.getElementById('mail').value;
	let msg = document.getElementById('message').value;
	kakiko(name,mail,msg);
	if (/🌱.*\n.*\)＼.*\n.*\(.*\)/.test(msg)){
		window.setTimeout(res, ran(500),resnumber-1);
	}
}

function res(anka){
	let mail =(ran(5)===0)?"":"sage";
	let msg = botmsgdata[ran(botmsgdata.length)].replace(">>",`<a href=#res${anka}>>>${anka}</a>`);
	kakiko("CYBERPUNK",mail,msg)
}

document.querySelector('button').onclick=write;