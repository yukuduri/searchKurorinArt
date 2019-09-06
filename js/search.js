class Search {
  constructor(){
    this.tag = $('input[name="tag"]').val();
    this.userName = $('input[name="userName"]').val().replace(/[@＠]/g, '').replace(/[　 ]$/, '');
    this.word = $('input[name="word"]').val();
    this.wordIsAnd = $('input[name="wordIsAnd"]').val();
    this.beginDate = $('input[name="beginDate"]').val();
    this.endDate = $('input[name="endDate"]').val();
  }

  jumpURL(){
    const userNameAry = this.userName.split(/[ 　]/);
    const wordAry = this.word.split(/[ 　]/);
    const URL = 'https://twitter.com/search?q=';

    let keyWord = this.tag;

    if(this.word != ''){
      keyWord += ' (' + wordAry[0] + ') ';
      if (wordAry.length > 1){
        for (let i = 1; i < wordAry.length; i++){
          if (this.wordIsAnd == 0) keyWord += 'OR';
          keyWord += ' (' + wordAry[i] + ') ';
        }
      }
    }

    if(this.userName != ''){
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

    keyWord = keyWord.replace(/[#＃♯]/g, '#');  //ハッシュタグ#の置換
    keyWord = encodeURI(keyWord);             //URLエンコード
    keyWord = keyWord.replace(/#/g, '%23');   //ハッシュタグ#のURLエンコード
    window.open(URL+keyWord);
  }
}



const run = () => {
  const search = new Search();
  search.jumpURL();
}