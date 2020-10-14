'use strict'

class MAKE10 {
  constructor () {
    this.setParameters()
    this.bindEvent()
    this.newQuestion(this)
  }
  
  setParameters () {
    this.question = document.querySelector("h2")
    this.answer = document.querySelector("input")
    this.button = document.querySelector("button")
    this.otu = document.querySelector("otu")
    this.time = new Date()
    this.score = 0
  }
  
  bindEvent () {
    this.button.addEventListener('click',() => {
      this.checkAnswer(this)
    },false)
    
  }
  
  checkAnswer (self) {
    const q = self.question.innerText.split(" ")
    let start=[],goal,ans=self.answer.value
    
    if(1+ans.search(/[^0-9+\-*\/() ]/)){
      console.log("不正なキーワード")
      self.otu.innerText = "使えない文字があるよ"
      return
    }
    
    if(!ans){
      console.log("skip")
      self.newQuestion(self)
      self.otu.innerText = "スキップしたよ"
      return
    }
    
    // 初期値、目標値の取得
    for(let i=0;i<q.length;i=i+1){
      let a = q[i]
      if (a == "で"){
        goal = +q[i+1]
        break
      }
      start.push(a)
    }
    
    // 使用している数字は初期値と同じか？
    {
      let a = ans.replace(/[+\-*\/()]/g," ").split(" ").filter(e=>e)
      if(JSON.stringify(a.sort())!=JSON.stringify(start.sort())){
        console.log("不正な数字")
        self.otu.innerText = "使っている数字がおかしいよ"
        return
      }
    }
    
    // 答えは一致しているか？
    try{
    if(window.eval(ans)!=goal){
      console.log("答えが不正")
      self.otu.innerText = `答えが間違ってるよ ${window.eval(ans)}`
      return
    }
    }catch(e){
      console.log(e)
      self.otu.innerText = `計算できないよ`
      return
    }
    
    console.log("ok")
    self.score += 1
    self.otu.innerText = `乙 ${self.score}問目 開始から${((new Date()-self.time)/100|0)/10}秒経過`
    self.newQuestion(self)
    
  }
  
  newQuestion (self) {
    let a = [rand(0,9),rand(0,9),rand(0,9),rand(0,9)]
    a.sort()
    
    self.question.innerText = `${a[0]} ${a[1]} ${a[2]} ${a[3]} で 10 を作ってください`
    self.answer.value = ""
  }
  
}

const a = new MAKE10()