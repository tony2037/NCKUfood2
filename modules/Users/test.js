var func = require('./function.js');

var pseudo_id = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
var pseudo_probability = [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,
0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,];
var report = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var yes = {
    po : [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]
};
var no = {
    po : [0.5,0.5,0.5,0.5,0.5]
};
var nan = {
    po : [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]
};
var yes_client = [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];
var no_client = [0.5,0.5,0.5,0.5,0.5];
var nan_client = [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];

//test for selected_people
/*
for(var index = 0;index<1;index++){
    var recieve = func.selected_people(10, 2, pseudo_id, pseudo_probability);
    for (var i in recieve) {
        report[recieve[i]] ++;  
    }
}
*/
var recieve = func.selected_people(10, 2, pseudo_id, pseudo_probability);
var obj = {
    id: recieve
 };
var json = JSON.stringify(obj);
var fs = require('fs');
fs.writeFile('log.json', json, 'utf8');
//func.update_probability(yes, no, nan, 0.1, 0.1, 0.2);
yes = func.decrement_probability(yes,0.1);
console.log(yes.po);
//console.log(no.po);
//console.log(nan.po);

//console.log(report);

