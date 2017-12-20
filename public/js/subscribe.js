
    $(document).ready(()=>{
    
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
            var store_name = [];
            
            $('input:checkbox:checked[name="checkarea"]').each(function (i) {
                store_name[i] = this.value;          
            });

            $.ajax({
              url : "../subscribe",
              method :"GET",
              data : {
                id: psid ,
                subscribe: store_name
              },
              dataType:'json',
      
              success :(data)=>{
                $('#info').show();
              },
              error:()=>{
                alert("error!");
              }
            });
      
          });
    });
