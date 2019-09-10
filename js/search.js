class Search {
  constructor(){
    this.tag = $('input[name="tag"]').val();
    this.userName = $('input[name="userName"]').val().replace(/[@＠]/g, '').replace(/[　 ]+$/, '');
    this.word = $('input[name="word"]').val();
    this.wordIsAnd = $('input[name="wordIsAnd"]').val();
    this.beginDate = $('input[name="beginDate"]').val();
    this.endDate = $('input[name="endDate"]').val();
    this.option = $('select[name="searchOption"]').val();
  }

  makeSearchURL(){
    const URL = 'https://twitter.com/search?q=';

    let keyWord = this.tag;

    if(this.word != ''){
      const wordAry = this.word.split(/[ 　]+/);
      keyWord += ' (' + wordAry[0] + ') ';
      if (wordAry.length > 1){
        for (let i = 1; i < wordAry.length; i++){
          if (this.wordIsAnd == 0) keyWord += 'OR';
          keyWord += ' (' + wordAry[i] + ') ';
        }
      }
    }

    if(this.userName != ''){
      const userNameAry = this.userName.split(/[ 　]+/);
      keyWord += ' (from:' + userNameAry[0] + ')';
      if (userNameAry.length > 1){
        for (let i = 1; i < userNameAry.length; i++){
          keyWord += 'OR(from:' + userNameAry[i] + ')';
        }
      }
    }
    
    //時間指定しないと日本時間で検索できない
    if(this.beginDate != ''){
      keyWord += ' since:' + this.beginDate + '_00:00:00_JST';
    }
    if(this.endDate != ''){
      keyWord += ' until:' + this.endDate + '_23:59:59_JST';
    }
    
    switch(this.option){
      case 'images':
      case 'videos':
        keyWord += ' filter:' + this.option;
    }

    keyWord = keyWord.replace(/[#＃♯]/g, '#');  //ハッシュタグ#の置換
    keyWord = encodeURI(keyWord);             //URLエンコード
    keyWord = keyWord.replace(/#/g, '%23');   //ハッシュタグ#のURLエンコード
    
    return URL+keyWord;
  }
  
  makeShareURL(option){
    if(option == 'twitter'){
      return this.makeSearchURL();
    }else{
      //本番環境
      const URL = `https://yukuduri.github.io/searchKurorinArt/`;
      
      let keyWord = '?option=' + this.option + '&wordIsAnd='+ this.wordIsAnd;

      if(this.word != ''){
        keyWord += '&word=' + this.word;
      }

      if(this.userName != ''){
        keyWord += '&userName=' + this.userName;
      }

      if(this.beginDate != ''){
        keyWord += '&beginDate=' + this.beginDate;
      }
      if(this.endDate != ''){
        keyWord += '&endDate=' + this.endDate;
      }

      keyWord = keyWord.replace(/[#＃♯]/g, '#');  //ハッシュタグ#の置換
      keyWord = encodeURI(keyWord);             //URLエンコード
      keyWord = keyWord.replace(/#/g, '%23');   //ハッシュタグ#のURLエンコード

      return URL+keyWord;
    }
  }
}



const run = () => {
  const search = new Search();
  window.open(search.makeSearchURL());
}

const share = () => {
  const option = $('select[name="shareOption"]').val();
  const search = new Search();
  $('input[name="shareURL"]').val(search.makeShareURL(option));
  $('#shareText').html('↑を長押しや右クリック等でコピーしてください');
}

const tweet = () => {
  const shareURL = $('input[name="shareURL"]').val();
  let text = 'https://twitter.com/share?text=%23くろりんアート簡単検索ツール%20'
  if(shareURL != ''){
    text += ' 検索結果:%0a&url=';
    text += encodeURIComponent(shareURL);
  }else{
    text += '%0a&url=https://yukuduri.github.io/searchKurorinArt/';
  }
  window.open(text);
}