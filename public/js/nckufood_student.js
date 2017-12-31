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

var student_input={
    name:"",
    number:"",
    deadline:"",
    location:""
}

var app=new Vue({
    el:'#app',
    data :{
        input:student_input
    }
})


var psid;
    $('#info').hide();
    $('#empty').hide();
    $('#loading').hide();
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
    

    $('#btn').on('click',(e)=>{
      e.preventDefault();
        if (student_input.deadline == "" || student_input.location == "" || student_input.name == "" || student_input.number == "") {
            $('#empty').show();
            $('#loading').hide();
        }
        else if (!parseInt(student_input.number)){
          alert("食物數量請輸入阿拉伯數字整數")
        }
        else {
            $.ajax({
                url: "../nckufood_student",
                method: "GET",
                data: {
                    id: psid,
                    food_name: student_input.name,
                    food_number: parseInt(student_input.number),
                    deadline: student_input.deadline,
                    location: student_input.location,
                    image_url: wahaha
                },
                dataType: 'json',

                success: (data) => {
                    $('#info').toggle();
                    $('#empty').hide();
                    $('#loading').hide();
                    $('#btn').html('送出');
                },
                error: () => {
                }
            });
            $('#loading').show();
            $('#empty').hide();
            $('#btn').html('正在傳送...');
        }
        
    });
