var everydata = [
    {name:'張景雲',department:'國立成功大學資訊工程學系',readme:'一個無聊的人打著無聊的code',img:"https://i.imgur.com/a3xR7wy.jpg",job:"領導者/最浪費食物的人"},
    {name:'盧柏翔',department:'國立成功大學工程科學學系',readme:'我是喜歡打排球的工科人',img:"https://i.imgur.com/Hd5IZEl.jpg",job:"後端工程師"},
    {name:'劉宥辰',department:'國立成功大學電機工程學系',readme:' 我是一個熱愛生活的電機人',img:"https://i.imgur.com/TAS7SBI.jpg",job:"後端工程師"},
    {name:'王祥宇',department:'國立成功大學電機工程學系',readme:'我是熱愛打桌球的電機人',img:"https://i.imgur.com/pHZPMiP.jpg",job:"前端工程師"},
    {name:'陳奕熹',department:'國立成功大學電機工程學系',readme:'我只是一個單純，不喜歡Sedra Smith的電機人',img:"https://i.imgur.com/ZA2q9Pr.jpg",job:"後端工程師"}
  ]
  
  var everyone = new Vue({
    el: '#namecard',
    data: {
      everyone: everydata
    }
  })
    