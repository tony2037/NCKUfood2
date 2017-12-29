module.exports = (array,number,Magnification)=>{
  var select = []
  var temp_array = []
  if(number*Magnification >= array.length){
    for(var i=0;i<array.length;i++){
      select.push(array[i].id)
    }
    return select
  }
  else {
    var send_number = number*Magnification
    for(var i=0;i<array.length;i++){
      temp_array.push(array[i].id)
    }
    for(var i=0;i<send_number;i++){
      random_index = Math.floor(Math.random()*temp_array.length)
      var random_item = temp_array[random_index]
      temp_array.splice(random_index,1)
      select.push(random_item)
    }
    return select
  }
}


  


