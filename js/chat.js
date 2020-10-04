'use strict'

class CHAT {
  constructor () {
    this.setParameters()
    this.bindEvent()
  }

  setParameters () {
    this.name = document.getElementById("name")
    this.message = document.getElementById("message")
    this.board = document.getElementById("board")
    this.send = document.getElementById("send")
    this.resn = 0

    //データベースと接続する。各自登録時に出たコードに書き換え。
    this.chatDataStore = new Firebase('https://testchat-f0fb3.firebaseio.com');
  }

  bindEvent () {
    var self = this;
    this.send.addEventListener('click',() => {
      this.sendMsg(this)
      
    },false)

    //DBの「talks」から取り出す
    this.chatDataStore.child('talks').on('child_added',(data) =>{
      var json = data.val();
      self.addText(json['user'],json['message'],json['date']);
    });
  }

  //ユーザー、メッセージ送信
  sendMsg (self) {
    if (self.message.value == ''){ return }
    
    var name = self.name.value;
    var text = self.message.value;
    var date = (new Date).toString()
    

    //データベースの中の「talks」に値を送り格納（'talks'は各自任意に設定可能）
    self.chatDataStore.child('talks').push({user:name, message:text, date:date});
    self.message.value = "";
  }

  //受け取り後の処理
  addText (user,message,date) {
    const dic_date = {
      Jan:"01",
      Feb:"02",
      Mar:"03",
      Apr:"04",
      May:"05",
      Jun:"06",
      Jul:"07",
      Aug:"08",
      Sep:"09",
      Oct:"10",
      Nov:"11",
      Dec:"12",
      Sun:"日",
      Mon:"月",
      Tue:"火",
      Wed:"水",
      Thu:"木",
      Fri:"金",
      Sat:"土",
    }
    
    user = user||"テスト名無し"
    
    const el = date.split(" ")
    
    if (el.length >= 5)
      date = `${el[3]}/${dic_date[el[1]]}/${el[2]}(${dic_date[el[0]]}) ${el[4]}`
    
    const p = />>\d+/g
    let respar = []
    let a
    
    while (a = p.exec(message)) {
      respar.push(a)
    }
    
    for (let i=0;i<respar.length;i++){
      let a = respar[i][0]
      let n = a.slice(2)
      message = message.replace(a,`<a href="#res${n}">${a}</a>`)
    }
    
    const res = document.createElement('div')
    res.id = "res"+this.resn
    
    res.innerHTML = `${this.resn} 名前：<user>${user}</user>：${date}
${message}

`
    this.board.appendChild(res)
    this.resn ++
  }
}

new CHAT()