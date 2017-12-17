var event = {
    id: String,
    food_name: String,
    food_number: String,
    deadline: String,
    location: String,
    image_url: String,
    promotion:[],
    who_say_yes:[],
    who_say_no:[]
}

exports.event = (body)=>{
    this.id = body.id;
    this.food_name = body.food_name;
    this.food_number = body.food_number;
    this.deadline = body.deadline;
    this.location = body.location;
    this.image_url = body.image_url;
    this.promotion = body.promotion;
    this.who_say_yes = body.who_say_yes;
    this.who_say_no = body.who_say_no;
};
