'use strict'

// 初期設定

const canvas = document.querySelectorAll('canvas')
const ctxui = canvas[0].getContext('2d')
const ctxma = canvas[1].getContext('2d')

const imgbl =new Image()
imgbl.src = 'pic/tetblock.gif'
//const BGM = new Audio('sound/40-1.mp3')


let field,mblock,timer


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


class MovingBlock {
  constructor (x,y,type,rot) {
    this.x = x
    this.y = y
    this.type = type
    this.rot = rot
  }
  
  bldict () {
    let data,center
    switch (this.type){
      case 1:
      data = [[0,1],[1,0],[1,1],[2,1]]
      center = [1,1]
      break
      case 2:
      data = [[0,1],[1,0],[1,1],[2,0]]
      center = [1,1]
      break
      case 3:
      data = [[0,0],[1,0],[1,1],[2,1]]
      center = [1,1]
      break
      case 4:
      data = [[0,1],[1,1],[2,0],[2,1]]
      center = [1,1]
      break
      case 5:
      data = [[0,0],[0,1],[1,1],[2,1]]
      center = [1,1]
      break
      case 6:
      data = [[1,0],[1,1],[2,0],[2,1]]
      center = [1.5,0.5]
      break
      case 7:
      data = [[0,1],[1,1],[2,1],[3,1]]
      center = [1.5,1.5]
      break
    }
    
    
    for (let i=0;i<4;i++){
      data[i] = [data[i][0]-center[0],data[i][1]-center[1]]
      for (let j=0;j<this.rot;j++)
        data[i] = [-data[i][1],data[i][0]]
      data[i] = [Math.floor(data[i][0]+center[0]),Math.floor(data[i][1]+center[1])]
    }
    
    return data
  }
  
  hittest (vx,vy,vrot) {
    this.rot += vrot
    let data = this.bldict()
    this.rot -= vrot
    
    for (let i=0;i<4;i++){
      let nx = data[i][0]+this.x+vx
      let ny = data[i][1]+this.y+vy
      
      if (field.field[ny]){
        if (field.field[ny][nx] != 0){
          return true
        }
      }
    }
    return false
  }
  
  disp () {
    ctxma.clearRect(0,0,480,480)
    let data = this.bldict()
    for (let i=0;i<4;i++){
      ctxma.drawImage(imgbl,this.type%5*20,Math.floor(this.type/5)*20,20,20,140+(data[i][0]+this.x-1)*20,40+(data[i][1]+this.y)*20,20,20,)
    }
  }
  
}



class Gamefield {
  constructor() {
    this.field = 
    [
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  }
  
  disp() {
    ctxui.fillRect(0,0,480,480)
    let bl
    for (let i=0;i<20;i++){
      for (let j=0;j<10;j++){
        bl = this.field[i][j+1]
        ctxui.drawImage(imgbl,bl%5*20,Math.floor(bl/5)*20,20,20,140+j*20,40+i*20,20,20,)
      }
    }
  }
  
  del () {
    for (let i=0;i<20;i++){
      let bl=0
      for (let j=0;j<10;j++){
        if (this.field[i][j+1])
          bl++
      }
      if (bl == 10){
        this.field.splice(i,1)
        this.field.splice(0,0,[1,0,0,0,0,0,0,0,0,0,0,1])
      }
      
      
    }
  }
  
}









const main = () => {
  let vx=0,vy=0,vrot=0,fre=20
  
  if (!mblock)
    mblock = new MovingBlock(4,-1,Math.floor( Math.random() * 7 ) + 1,0)
  
  field.disp()
  mblock.disp()
  
  if(keydown[39]&&!keypushing[39]){
    vx = 1
    keypushing[39] = true
  }else if(keydown[37]&&!keypushing[37]){
    vx = -1
    keypushing[37] = true
  }else{
    vx=0
  }
  
  if(keydown[40]){
    fre = 2
  }
  
  if(keydown[90]&&!keypushing[90]){
    vrot = 3
    keypushing[90] = true
  }
  
  if(keydown[88]&&!keypushing[88]){
    vrot = 1
    keypushing[88] = true
  }
  
  
  if (timer%fre == 0){
    vy = 1
  }
  
  if(mblock.hittest(vx,0,0)){
    vx = 0
  }
  
  if(mblock.hittest(0,0,vrot)){
    vrot = 0
  }
  
  if(mblock.hittest(vx,vy,vrot)){
    let data = mblock.bldict()
    for (let i=0;i<4;i++){
      let nx = data[i][0]+mblock.x
      let ny = data[i][1]+mblock.y
      field.field[ny][nx] = mblock.type
    }
    mblock = null
    field.del()
  }else{
    mblock.x += vx
    mblock.y += vy
    mblock.rot += vrot
  }
  
  
  
  
  
  timer++
  window.requestAnimationFrame(main)
}



// 初期化
const restart = () => {
  
  timer = 0
  ctxui.fillStyle = '#000'
  ctxui.fillRect(0,0,480,480)
  
  field = new Gamefield()
  field.disp()
  
  main()
}

// 初回処理
const init = () => {
  window.removeEventListener('click',init,false)
  keyInputSetting()
  restart()
  //BGM.play()
}

window.addEventListener('click',init,false)





/*

メモ

480x480

20x10 -> 400x200 にする

一つのピースの大きさは20x20


*/