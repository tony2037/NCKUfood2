global.se = []

const ev = require('./event/event');
ev.event({
    id: "String",
    food_name: "String",
    food_number: "String",
    deadline: "String",
    location: "String",
    image_url: "String",
    promotion:[],
    who_say_yes:[],
    who_say_no:[]
});
var s1 = Object.assign({},ev);

se.push(s1);

console.log(se);

ev.event({
    id: "S",
    food_name: "S",
    food_number: "Sng",
    deadline: "String",
    location: "String",
    image_url: "String",
    promotion:[],
    who_say_yes:[],
    who_say_no:[]
});

var s1 = Object.assign({},ev);

se.push(s1);

console.log(se);