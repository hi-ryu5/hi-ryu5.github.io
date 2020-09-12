'use strict';

// 初期設定

const canvas = document.querySelectorAll('canvas')
const ctxbg = canvas[0].getContext('2d')
const ctxst = canvas[1].getContext('2d')
const ctxdp = canvas[2].getContext('2d')
const ctxui = canvas[3].getContext('2d')
const ctxfg = canvas[4].getContext('2d')

const imgpl =new Image()
const imgbl =new Image()
imgpl.src = 'pic/player3.gif'
imgbl.src = 'pic/block2.gif'
const BGM = new Audio('sound/40-1.mp3')
BGM.loop = true

const stdata = [
"........................................",
"......................................aa",
"......................................aa",
"......................................aa",
"..............aaa........aaaaaaaaaaaaaaa",
"...........aaaaaaaa......aaaaaaaaaaaaaaa",
".......aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
]

let pl
let timer = 0
let rettime = 0
let retry = []
let f_save = false
let f_goal = false
let bgC = 0

// キー入力処理
let keydown = [] // keydown[(キーコード)] で入力取得
let keypushing = []
const keyInputSetting = () => {
  window.addEventListener('keydown',
  (e) => {
    e.preventDefault()
    keydown[e.keyCode] = true
  }
  ,false)
  window.addEventListener('keyup',
  (e) => {
    keydown[e.keyCode] = false
    keypushing[e.keyCode] = false
  }
  ,false)
}

function clamp(a,b,c){
  return Math.min(Math.max(a,b),c)
}

const disp = () => {
  let dx = Math.floor(clamp(0,pl.x-320,10000))
  let dy = 0
  
  ctxst.clearRect(0,0,640,480)
  
  for (let i=0;i<12;i++){
    let row = stdata[i]
    if (!row)
      break
    for (let j=0;j<100;j++){
      let a = "abcdefghijklmnopqrstuvwxyz".indexOf(row[j])+1
      ctxst.drawImage(imgbl,a%10*40,Math.floor(a/10)*40,40,40,j*40-dx,i*40-dy,40,40)
    }
  }
}

// プレイヤーの処理
class Player {
  constructor(x,y,vx,vy,anime,state,jump) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.anime = anime
    this.state = state
    this.jump = jump
    retry = [x,y]
  }
  
  draw() {
    let x = this.x
    let y = this.y
    if (x > 320)
      x = 320
    
    if (this.state == 128)
      ctxdp.drawImage(imgpl,this.anime%4*40,Math.floor(this.anime/4)*40,40,40,Math.floor(x),Math.floor(y),40,40)
    else
      ctxui.drawImage(imgpl,this.anime%4*40,Math.floor(this.anime/4)*40,40,40,Math.floor(x),Math.floor(y),40,40)
    return this
  }
  
  stoan() {
    // state
    // 0:右 1:左 2:移動 4:ジャンプ 128:死
    
    let a = this.anime
    switch (this.state) {
      case 0: // 右
        a = 0
        break
      case 1: // 左
        a = 4
        break
      case 2: // 右移動
        if (timer%6==0){
          a = (a+1)%4
        }
        break
      case 3: // 左移動
        if (timer%6==0){
          a = (a+1)%4+4
        }
        break
      case 4: // 右ジャンプ
      case 6: // 右ジャンプ
        a = 8
        if (this.vy>0)
          a = 9
        break
      case 5: // 左ジャンプ
      case 7: // 左ジャンプ
        a = 12
        if (this.vy>0)
          a = 13
        break
      default: // 死
        a = 15
    }
    this.anime = a
    return this
  }
  
  control() {
    if(keydown[82]&&!keypushing[82]){
      this.x = retry[0]
      this.y = retry[1]
      this.vx = 0
      this.vy = 0
      this.state = 0
      keypushing[82] = true
      rettime ++
      f_save = true
      bgC = 0
      ctxbg.fillStyle = '#CCC'
      ctxbg.fillRect(0,0,640,480)
    }
    
    if (this.state == 128)
      return this
    
    if(keydown[39]){
      this.vx += (this.vx<=3)?0.5:0
      this.state &= -1-1
      this.state |= 2
    }else if(keydown[37]){
      this.vx += (this.vx>=-3)?-0.5:0
      this.state |= 3
    }else{
      this.vx=0
      this.state &= -1-2
    }
    
    if(((keydown[38]&&!keypushing[38])||(keydown[90]&&!keypushing[90]))){
      if (this.jump <= -10){
        if (this.jump == -20)
          this.vx = 3
        else
          this.vx = -3
        this.vy = -6.3
        this.state |= 4
        this.jump = 0
      }else if (this.jump>0){
        this.vy = -6.3
        this.state |= 4
        this.jump -= 1
      }
      keypushing[38] = true
      keypushing[90] = true
    }
    
    if(keydown[40]&&!keypushing[40]){
      keypushing[40] = true
      let a = stdata[Math.floor((this.y+39)/40)] && stdata[Math.floor((this.y+39)/40)][Math.floor((this.x+8)/40)]
      switch(a){
        case "t":
          bgC = 1
          ctxbg.fillStyle = '#F88'
          break
        case "u":
          bgC = 2
          ctxbg.fillStyle = '#8F8'
          break
        case "v":
          bgC = 3
          ctxbg.fillStyle = '#88F'
          break
      }
      ctxbg.fillRect(0,0,640,480)
    }
    return this
  }
  
  hosei() {
    this.x = Math.max(this.x,0)
    
    if (this.state == 128)
      return this
    const ptob = (x,y) => {
      return stdata[Math.floor((y+30)/40)] && stdata[Math.floor((y+30)/40)][Math.floor((x+20)/40)]
    }
    
    this.vy+=(this.vy<=12)?0.3:0;
    let f_wall = false
    this.jump = 0
    
    { // ブロック独自の判定
      if (ptob(this.x,this.y) == "s"){
        if (!f_save){
          f_save = true
          retry = [this.x,this.y]
        }
      }else
        f_save = false
      if (ptob(this.x,this.y) == "z"){
        f_goal = true
      }
      
      switch (ptob(this.x,this.y+this.vy)){
        case "b":
          if (this.vy>0){
            this.state = 128
          }
          break
        case "c":
          if (this.vy<0){
            this.state = 128
          }
          break
      }
      switch (ptob(this.x+this.vx,this.y)){
        case "d":
          if (this.vx>0){
            this.state = 128
          }
          break
        case "e":
          if (this.vx<0){
            this.state = 128
          }
          break
      }
    }
    
    { // 特殊ブロック処理
    let a = ptob(this.x+this.vx,this.y)
    if ((a == "j" && !(bgC == 1))||(a == "k" && !(bgC == 2))||(a == "l" && !(bgC == 3)))
      this.vx = 0
    }
    
    switch (ptob(this.x+this.vx,this.y)){
      case "a":
      case "b":
      case "c":
      case "d":
      case "e":
        if (this.vx>0)
          this.jump = -10
        if (this.vx<0)
          this.jump = -20
        this.vx = 0
        f_wall = true
        break
    }
    
    {
    let a = ptob(this.x+this.vx,this.y+this.vy)
    if ((a == "j" && !(bgC == 1))||(a == "k" && !(bgC == 2))||(a == "l" && !(bgC == 3))){
      if (this.vy > 0)
        this.jump = 1
      this.y = Math.floor(this.y/40)*40+9.9
      this.vy = 0
      this.state &= -1-4
    }
    }
    
    switch (ptob(this.x+this.vx,this.y+this.vy)){
      case "a":
      case "b":
      case "c":
      case "d":
      case "e":
        if (this.vy > 0)
          this.jump = 1
        this.y = Math.floor(this.y/40)*40+9.9
        this.vy = 0
        this.state &= -1-4
        if ((this.state&2) == 2 && timer%10 == 0){
        }
        break
    }
    
    this.x += this.vx
    if (f_wall && this.vy>0)
      this.y += this.vy/3
    else
      this.y += this.vy
    
    return this
  }
}







const main = () => {
  timer ++
  ctxui.clearRect(0,0,640,480)
  pl.control().hosei().stoan().draw()
  disp()
  if (pl.y > 1000){
    BGM.pause()
    ctxfg.fillStyle = '#000'
    ctxfg.fillRect(0,0,640,480)
    ctxfg.fillStyle = '#FFF'
    ctxfg.font = "30px 'sans-serif'"
    ctxfg.textAlign = "center"
    ctxfg.fillText(`叫び声流しつつブラクラ表示する`, 320, 240)
  }else
    window.requestAnimationFrame(main)
}








// 初回処理
const init = () => {
  window.removeEventListener('click',init,false)
  keyInputSetting()
  pl = new Player(40,249.9,0,0,0,0,2)
  ctxbg.fillStyle = '#FFF'
  ctxbg.fillRect(0,0,640,480)
  main()
  BGM.play()
}

window.addEventListener('click',init,false)