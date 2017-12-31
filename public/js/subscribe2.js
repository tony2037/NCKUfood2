'use strict'

var psid;
    $('#info').hide();
    var strUrl = location.search;
    var getPara, ParaVal;
    var aryPara = [];
    if (strUrl.indexOf("?") != -1) {
      var getSearch = strUrl.split("?");
          getPara = getSearch[1].split("&");
      for (var i = 0; i < getPara.length; i++) {
          ParaVal = getPara[i].split("=");
          aryPara.push(ParaVal[0]);
          aryPara[ParaVal[0]] = ParaVal[1];
      }
     // alert("psid:"+aryPara.psid);
      psid = aryPara.psid;
    }
    var subscribe_data = [
      {"id":'free',"value":'學生投食',"check":false}
     // {"id":'store1',"value":'張景雲小吃店',"check":false},
    //  {"id":'store2',"value":'宥辰撈撈面',"check":false}
    ]
    var app = new Vue({
      el:'#app',
      data:{
       store_name:subscribe_data 
      }
    })
    $(document).ready(
       $('#btn').on('click',(e)=>{
          e.preventDefault();
            $.ajax({
              url : "/nckufood_subscribe", ///
              method :"GET",
              data : {
                id: psid ,
                subscribe: subscribe_data ,
              },
              dataType:'json',
      
              success :(data)=>{
                if(data === true){
                  alert("訂閱成功")
                }
                else{
                  alert("訂閱失敗")
           //       console.log(err)
                }
              },
              error:(err)=>{
                  alert("訂閱失敗")
            //      console.log(err)
               }
            });
        }),
        $.ajax({
          url : "/rending", ///
          method :"GET",
          data : {
            id: psid ,
          },
          dataType:'json',
          success :(data)=>{
            if(data === false){}
            else {
              for(var i=0;i<data.length;i++){
                for(var j=0;j<subscribe_data.length;j++){
                  if(data[i].value === subscribe_data[j].id)
                    subscribe_data[j].check = data[i].check
               }
              }
              
            }
          },
          error:(err)=>{
            alert(err)
           }
        })
    );
