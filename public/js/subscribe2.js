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
      {"id":'std',"value":'學生投石',"check":false},
      {"id":'str1',"value":'張景雲小吃店',"check":false},
      {"id":'std2',"value":'又沉撈撈面',"check":false}
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
          console.log("dd");
            $.ajax({
              url : "/nckufood_subscribe", ///
              method :"GET",
              data : {
                id: psid ,
                subscribe: subscribe_data ,
              },
              dataType:'json',
      
              success :(data)=>{
                $('#info').toggle();
              },
              error:()=>{
               }
            });
        }),
        $.ajax({
          url : "/nckufood_subscribe", ///
          method :"GET",
          data : {
            id: psid ,
          },
          dataType:'json',
          success :(data)=>{
            $('#info').toggle();
          },
          error:()=>{
           }
        })
    );
