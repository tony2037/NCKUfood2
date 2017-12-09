const ev = require('./event');
const ev2 = require('./event');

ev.event({
    id: 1,
    food_name: 2,
    food_number: 3,
    deadline: 4,
    location: 5,
    image_url: 6
});
console.log(ev.id);
console.log(ev.promotion);

ev2.event({
    id: 2,
    food_name: 2,
    food_number: 2,
    deadline: 2,
    location: 2,
    image_url: 2
});
console.log(ev2.id);

ev.id = 10;
console.log(ev.id);