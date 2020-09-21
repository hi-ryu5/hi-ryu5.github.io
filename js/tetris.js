'use strict'

// 初期設定

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const imgbl =new Image()
const imgky =new Image()
imgbl.src = 'pic/tetblock.gif'
imgky.src = 'pic/key.gif'
const BGM = new Audio('sound/katyusha.mp3')
BGM.volume = 0.1
BGM.loop = true

let field,mblock,timer,keytime,score,lines,nblock,ncase,level,hold,f_end,f_key=false


function square(x,y,a,b,c,d){
  return a<x && x<a+c && b<y && y<b+d
}




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
  
  
  
  
  canvas.addEventListener( "touchstart",
  function (e) {
    let touchObject = e.changedTouches[0]
    let clientRect = this.getBoundingClientRect()
    let x = touchObject.pageX - (clientRect.left + window.pageXOffset)
    let y = touchObject.pageY - (clientRect.top + window.pageYOffset)
    console.log(x,y)
    
    if (square(x,y,10,390,80,80))
      keydown[37] = true
    if (square(x,y,90,310,80,80))
      keydown[38] = true
    if (square(x,y,90,390,80,80))
      keydown[40] = true
    if (square(x,y,170,390,80,80))
      keydown[39] = true
    if (square(x,y,310,390,80,80))
      keydown[90] = true
    if (square(x,y,390,390,80,80))
      keydown[88] = true
    if (square(x,y,390,310,80,80))
      keydown[16] = true
    if (square(x,y,390,10,80,80))
      keydown[82] = true
  }
  ,false)
  
  canvas.addEventListener( "touchend",
  function (e) {
    let touchObject = e.changedTouches[0]
    let clientRect = this.getBoundingClientRect()
    let x = touchObject.pageX - (clientRect.left + window.pageXOffset)
    let y = touchObject.pageY - (clientRect.top + window.pageYOffset)
    console.log("end",x,y)
    
    if (square(x,y,10,390,80,80)){
      keydown[37] = false
      keypushing[37] = false
    }
    if (square(x,y,90,310,80,80)){
      keydown[38] = false
      keypushing[38] = false
    }
    if (square(x,y,90,390,80,80)){
      keydown[40] = false
      keypushing[40] = false
    }
    if (square(x,y,170,390,80,80)){
      keydown[39] = false
      keypushing[39] = false
    }
    if (square(x,y,310,390,80,80)){
      keydown[90] = false
      keypushing[90] = false
    }
    if (square(x,y,390,390,80,80)){
      keydown[88] = false
      keypushing[88] = false
    }
    if (square(x,y,390,310,80,80)){
      keydown[16] = false
      keypushing[16] = false
    }
    if (square(x,y,390,10,80,80)){
      keydown[82] = false
      keypushing[82] = false
    }
    
  }
  ,false)
  
}

















const BlockFu = {
  bldict(type,rot){
    let data,center
    
    type = (type-1)%7+1
    
    switch (type){
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
      default:
      console.log("type未指定")
      return
    }
    
    
    for (let i=0;i<4;i++){
      data[i] = [data[i][0]-center[0],data[i][1]-center[1]]
      for (let j=0;j<rot;j++)
        data[i] = [-data[i][1],data[i][0]]
      data[i] = [Math.floor(data[i][0]+center[0]),Math.floor(data[i][1]+center[1])]
    }
    
    return data
  },
  
  
  bldisp(x,y,type,rot){
    let data = this.bldict(type,rot)
    for (let i=0;i<4;i++){
      ctx.drawImage(imgbl,type%5*20,Math.floor(type/5)*20,20,20,140+(data[i][0]+x)*20,40+(data[i][1]+y)*20,20,20,)
    }
  }
  
  
  
}





class MovingBlock {
  constructor (x,y,type,rot) {
    this.x = x
    this.y = y
    this.type = type
    this.rot = rot
  }
  
  
  hittest (vx,vy,vrot) {
    let data = BlockFu.bldict(this.type,this.rot+vrot)
    
    for (let i=0;i<4;i++){
      let nx = data[i][0]+this.x+vx
      let ny = data[i][1]+this.y+vy
      
      if (field.field[ny]){
        if (field.field[ny][nx] != 0){
          return true
        }
      }
      
      if (nx<1||10<nx)
        return true
      
    }
    return false
  }
  
  disp () {
    BlockFu.bldisp(this.x-1,this.y-2,this.type,this.rot)
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
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  }
  
  disp() {
    let bl
    for (let i=0;i<20;i++){
      for (let j=0;j<10;j++){
        bl = this.field[i+2][j+1]
        ctx.drawImage(imgbl,bl%5*20,Math.floor(bl/5)*20,20,20,140+j*20,40+i*20,20,20,)
      }
    }
  }
  
  del () {
    let deln=0
    let f_bgm = false
    
    for (let i=2;i<22;i++){
      let bl=0
      for (let j=0;j<10;j++){
        if (this.field[i][j+1])
          bl++
      }
      if (bl == 10){
        this.field.splice(i,1)
        this.field.splice(0,0,[1,0,0,0,0,0,0,0,0,0,0,1])
        deln++
      }
      
      if (bl && !f_bgm){
        if (i < 6){
          BGM.playbackRate = 2.0
        }else if (i < 10){
          BGM.playbackRate = 1.5
        }else{
          BGM.playbackRate = 1.0
        }
        f_bgm = true
      }
    }
    
    lines += deln
    level = Math.floor(lines/10)+1
  }
  
}



const draw = () => {
  ctx.fillStyle = '#000'
  ctx.fillRect(0,0,480,480)
  field.disp()
  mblock.disp()
  
  for(let i=0;i<6;i++)
    BlockFu.bldisp(12,i*3,nblock[i],0)
  
  if (hold[0])
    BlockFu.bldisp(-5,0,hold[0],0)
  
  
  //ui表示
  ctx.fillStyle = '#FFF'
  ctx.font = "16px 'sans-serif'"
  ctx.fillText(`lines:${lines}`, 20, 280)
  ctx.fillText(`level:${level}`, 20, 300)
  ctx.fillText(`time:${(timer/60).toFixed(1)}`, 20, 340)
  
  let size = 60
  let x = 20
  let y = 400
  let space = 80
  
  if (!f_key){
  
    ctx.shadowColor = "#FFF"
    ctx.shadowBlur  = 0
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1
    
    ctx.drawImage(imgky,0,0,40,40,x,y,size,size)
    ctx.drawImage(imgky,40,0,40,40,x+space,y-space,size,size)
    ctx.drawImage(imgky,80,0,40,40,x+space*2,y,size,size)
    ctx.drawImage(imgky,120,0,40,40,x+space,y,size,size)
    ctx.drawImage(imgky,0,40,40,40,320,400,size,size)
    ctx.drawImage(imgky,40,40,40,40,400,400,size,size)
    ctx.drawImage(imgky,80,40,40,40,400,320,size,size)
    ctx.drawImage(imgky,120,40,40,40,400,20,size,size)
    
    
    ctx.shadowColor = "#000"
    ctx.shadowBlur  = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }
}





const main = () => {
  
  if (!f_end){
  
  let vx=0,vy=0,vrot=0,vhard=0,gf=Math.ceil(20/level)*2
  
  //next
  
  for (let i=0;i<8;i++){
    if (ncase == 0)
      ncase = [1,2,3,4,5,6,7]
    
    if (!nblock[i]){
      let a = Math.floor(Math.random()*ncase.length)
      nblock[i] = ncase[a]
      ncase.splice(a,1)
    }
  }
  
  
  //ブロック生成
  
  if (!mblock){
    mblock = new MovingBlock(4,1,nblock[0],0)
    nblock.splice(0,1)
    hold[1] -= 1
    
    if(mblock.hittest(vx,0,0)){
      f_end = true
      BGM.pause()
    }
  }
  
  
  
  draw()
  
  
  //ハードドロップ
  {
    while(!mblock.hittest(0,vhard,0))
      vhard ++
    
    vhard -= 1
    
    BlockFu.bldisp(mblock.x-1,mblock.y+vhard-2,mblock.type+7,mblock.rot)
    
  }
  
  
  
  
  // キー入力
  
  if(keydown[16]){
    if (hold[1]<=0){
      let a = hold
      hold = [mblock.type,1]
      
      if (a[0] == 0){
        mblock = new MovingBlock(4,-1,nblock[0],0)
        nblock.splice(0,1)
      }else{
        mblock = new MovingBlock(4,-1,a[0],0)
      }
    }
  }
  
  
  if(keydown[39]){
    if (keytime == 0 || keytime > 10)
      vx = 1
    keytime += 1
  }else if(keydown[37]){
    if (keytime == 0 || keytime > 10)
      vx = -1
    keytime += 1
  }else{
    vx=0
    keytime = 0
  }
  
  if(keydown[38]&&!keypushing[38]){
    vy = vhard
    keypushing[38] = true
  }
  
  if(keydown[40]){
    gf = Math.min(Math.ceil(gf/2),2)
  }
  
  if(keydown[90]&&!keypushing[90]){
    vrot = 3
    keypushing[90] = true
  }
  
  if(keydown[88]&&!keypushing[88]){
    vrot = 1
    keypushing[88] = true
  }
  
  
  
  
  
  
  
  if (timer%gf == 0){
    vy = 1
  }
  
  if(mblock.hittest(vx,0,0)){
    vx = 0
  }
  
  if(mblock.hittest(vx,vy,0)){
    vx = 0
  }
  
  
  //SRS
  
  if (vrot){
    if(mblock.hittest(0,0,vrot)){
      console.log("SRS")
      let rot0 = (mblock.rot+vrot)%4
      let vx_s = vx,vy_s=vy
      
      let out = false
      vx = 0
      vy = 0
      
      for (let i=0;i<5;i++){
        
        switch(i){
          case 0:
          
          if (mblock.type == 7){
            if (rot0 == 1){
              vx = 1
            }else if (rot0 == 3){
              vx = -1
            }else{
              vx = 2-mblock.rot
              if (rot0 == 0)
                vx *= 2
            }
          }else{
            if (rot0 == 1){
              vx = -1
            }else if (rot0 == 3){
              vx = 1
            }else{
              vx = 2-mblock.rot
            }
          }
          
          console.log(vx,mblock.rot)
          break
          
          case 1:
          
          if (mblock.type == 7){
            if (rot0 == 1){
              vx = -2
            }else if (rot0 == 3){
              vx = 2
            }else{
              vx = mblock.rot-2
              if (rot0 == 2)
                vx *= 2
            }
          }else{
            if (rot0 == 1 || rot0 == 3){
              vy = -1
            }else{
              vy = 1
            }
          }
          
          break
          
          case 2:
          
          if (mblock.type == 7){
            if (rot0 == 1){
              vx = 1
              vy = 1
            }else if (rot0 == 3){
              vx = -1
              vy = -1
            }else{
              if (mblock.rot == 1){
                vx = 2-mblock.rot
                if (rot0 == 0)
                  vx *= 2
                vy = -1
              }else{
                vx = mblock.rot-2
                if (rot0 == 2)
                  vx *= 2
                vy = 1
              }
            }
            if (vrot == 3)
              vy *= 2
            
          }else{
            if (rot0 == 1 || rot0 == 3){
              vx = 0
              vy = 2
            }else{
              vx = 0
              vy = -2
            }
          }
          
          break
          
          case 3:
          
          if (mblock.type == 7){
            if (rot0 == 1){
              vx = -2
              vy = -1
            }else if (rot0 == 3){
              vx = 2
              vy = 1
            }else{
              if (mblock.rot == 1){
                vx = mblock.rot-2
                if (rot0 == 2)
                  vx *= 2
                vy = 1
              }else{
                vx = 2-mblock.rot
                if (rot0 == 0)
                  vx *= 2
                vy = -1
              }
            }
            if (vrot == 1)
              vy *= 2
            
          }else{
            if (rot0 == 1){
              vx = -1
            }else if (rot0 == 3){
              vx = 1
            }else{
              vx = 2-mblock.rot
            }
          }
          
          break
          
          case 4:
          vx = vx_s
          vy = vy_s
          vrot = 0
          
          out = true
          break
        }
        
        
        if (out)
          break
        
        console.log(vx,vy,vrot,mblock.hittest(vx,vy,vrot))
        if (!mblock.hittest(vx,vy,vrot))
          break
      }
    }
  }
  
  
  if(mblock.hittest(0,vy,vrot)){
    vrot = 0
  }
  
  
  if(mblock.hittest(vx,vy,vrot)){
    let data = BlockFu.bldict(mblock.type,mblock.rot)
    for (let i=0;i<4;i++){
      let nx = data[i][0]+mblock.x
      let ny = data[i][1]+mblock.y
      if (field.field[ny])
        field.field[ny][nx] = mblock.type
    }
    mblock = null
    field.del()
  }else{
    mblock.x += vx
    mblock.y += vy
    mblock.rot += vrot
    mblock.rot %= 4
  }
  
  timer++
  
  }
  
  if(keydown[82]&&!keypushing[82]){
    restart()
    keypushing[82] = true
  }
  
  if (keydown[32])
    f_key = true
  
  window.requestAnimationFrame(main)
}



// 初期化
const restart = () => {
  
  timer = 0
  ctx.fillStyle = '#000'
  ctx.fillRect(0,0,480,480)
  
  score = 0
  lines = 0
  level=1
  ncase = []
  nblock = []
  mblock = 0
  hold = [0,0]
  f_end = false
  
  BGM.currentTime = 0.0
  BGM.playbackRate = 1.0
  BGM.play()
  
  
  field = new Gamefield()
  field.disp()
}

// 初回処理
const init = () => {
  window.removeEventListener('click',init,false)
  keyInputSetting()
  restart()
  main()
}

window.addEventListener('click',init,false)





/*

メモ

480x480

20x10 -> 400x200 にする

一つのピースの大きさは20x20


*/