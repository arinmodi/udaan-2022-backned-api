const voter = require("../models/voter");
const mongoose = require("mongoose");

module.exports = async (req,res) => {
    const awards = [
        "artist_of_the_year_female",
        "artist_of_the_year_male",
        "face_of_the_year_female",
        "face_of_the_year_male",
        "innovator_of_the_year",
        "mr_persona",
        "ms_persona",
        "rising_star_of_the_year",
        "sportsperson_of_the_year",
        "style_icon_of_the_year_female",
        "style_icon_of_the_year_male"
    ];

    const response = [];

    for(var i in awards){
        var item = awards[i];

        try{
            var data = await mongoose.connection.db.collection(item).find({}).toArray()
        }catch(e){
            res.status(500).send(e);
        }

        response.push({ [item] :  data });
    }

    res.status(200).send(response);
}