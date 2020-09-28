var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$name = $('#jsi-name');
    this.$textArea = $('#jsi-msg');
    this.$board = $('#jsi-board');
    this.$button = $('#jsi-button');

    //データベースと接続する。各自登録時に出たコードに書き換え。
    this.chatDataStore = new Firebase('https://testchat-f0fb3.firebaseio.com');
  },

  bindEvent:function(){
    var self = this;
    this.$button.on('click',function(){
      self.sendMsg();
    });

    //DBの「talks」から取り出す
    this.chatDataStore.child('talks').on('child_added',function(data){
      var json = data.val();
      self.addText(json['user']);
      self.addText(json['message']);
      self.addText(json['date']);
    });
  },

  //ユーザー、メッセージ送信
  sendMsg:function(){
    var self = this;
    if (this.$textArea.val() == ''){ return }

    var name = this.$name.val();
    var text = this.$textArea.val();
    var date = (new Date).toString()
    

    //データベースの中の「talks」に値を送り格納（'talks'は各自任意に設定可能）
    self.chatDataStore.child('talks').push({user:name, message:text, date:date});
    self.$textArea.val('');
  },

  //受け取り後の処理
  addText:function(json){
   var msgDom = $('<li>');
   msgDom.html(json);
   this.$board.append(msgDom[0]);
   this.$board.append(msgDom[1]);
  }
}

$(function(){
  CHAT.fire.init();
});