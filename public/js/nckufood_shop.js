var wahaha; 
var feedback = function(res) {
     if (res.success === true) {
         wahaha = res.data.link.replace("http","http");
       // document.querySelector('.status').classList.add('bg-success');
        //document.querySelector('.status').innerHTML = 
        //'Image : ' + '<br><input class="image-url" value=' + wahaha + '/>' + //'<img class="img" src=' + wahaha + '/>';
     }
    
 };

new Imgur({ 
    clientid: 'b760f5e4afab84e', //You can change this ClientID
    callback: feedback 
});




var psid;
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
      psid = aryPara.psid;
    }
    

    $('#btn').on('click',(e)=>{
      e.preventDefault();
      console.log("dd");
      $.ajax({
        url : "../nckufood_shop",
        method :"GET",
        data : {
            shop_name:$('#store_name :selected').text(),
            food_name:$("input[name=food_name]").val(),
            food_number:$("input[name=food_number]").val(),
            normal_price:$("input[name=normal_prize]").val(),
            special_price:$("input[name=special_prize]").val(),
            deadline:$("input[name=deadline]").val(),
            time_hr:$('#hr :selected').val(),
            time_min:$('#min :selected').val(),
            image_url: wahaha
        },
        dataType:'json',

        success :(data)=>{
          $('#info').show();
        },
        error : ()=>{
            alert("error");
        }
      });

    });
