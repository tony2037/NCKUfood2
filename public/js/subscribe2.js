'use strict'
var wahaha; 
var feedback = function(res) {
     if (res.success === true) {
         wahaha = res.data.link.replace("http","http");
        document.querySelector('.status').classList.add('bg-success');
        //document.querySelector('.status').innerHTML = 
        //'Image : ' + '<br><input class="image-url" value=' + wahaha + '/>' + //'<img class="img" src=' + wahaha + '/>';
        $('.dropzone').find("p").text("照片上傳成功！");
    }
    
 };

new Imgur({ 
    clientid: 'b760f5e4afab84e', //You can change this ClientID
    callback: feedback 
});




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
    

    
    $(document).ready(
        $('#btn').on('click',(e)=>{
            e.preventDefault();
            console.log("dd");
            $.ajax({
              url : "/nckufood_subscribe", ///
              method :"GET",
              data : {
                id: psid ,
                food_name:$("input[name=food_name]").val(),
                food_number:$("input[name=food_number]").val(),
                deadline:$("input[name=deadline]").val(),
                location:$("input[name=location]").val(),
                image_url: wahaha
              },
              dataType:'json',
      
              success :(data)=>{
                $('#info').toggle();
              },
              error:()=>{
               }
            });
      
          });
    );