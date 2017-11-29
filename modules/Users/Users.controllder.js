var func = {
    selected_people : function(food_num, multi_rate, ori_candidate_people, candidate_probability){
        //food_num requires an integer for total available food amount
        //multi_rate requires a double/integer to specify how many cilents are notified by this message
        //candidate_people requires a string array represents clients
        //candidate_probability requires a float array indicated the probability to assigned client

        //create shadow array
        var candidate_people = ori_candidate_people.slice(0);
        var candidate_total = food_num * multi_rate;
        var target_id_arr = [];
        //target_id_arr is a returning string array consists in user id 
        //target_num_arr is a int array for checking if choosing the same person
        for(;candidate_total>0;candidate_total--){
            while(1){
                var target_num = Math.floor(Math.random() * candidate_people.length);
                var target_id = candidate_people[target_num];
                var compared_num = Math.random();
                if(candidate_probability[target_num]>compared_num){
                    target_id_arr.push(target_id);
                    candidate_people.splice(target_num,1);
                    break;
                }
            }
        }
        return target_id_arr;
    },

    update_probability : function(agree_client_array, decline_client_array, noresponce_client_array, increment, decrement){
        //client_array is a object array consists of probabilties (float) and ids (string) 
        //increment / decrement is a floating number for probability
        agree_client_array.forEach(element => {
            element.
        });
    }
}
module.exports = func;
