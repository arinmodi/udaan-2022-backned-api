const voter = require("../models/voter");
const { ErrorHandler } = require('../helpers/errors');
const constants = require('../constants');
const mongoose = require("mongoose");

module.exports = async (req,res) => {
    const voterId = req.body.voterId.trim().toUpperCase();
    const result = await voter.findOne({ voterId : voterId });

    console.log(result);

    var dovote = false;

    if(result != null){
        dovote = false;
    }else{
        dovote = true;
    }

    if(dovote){

        // step 1 : Update the user voted collection
        
        try{
            await voter.create({
                voterId : voterId,
            });

        }catch(e){

            const error = new ErrorHandler(constants.ERRORS.DATABASE, {
                statusCode: 500,
                message: 'Mongo Error: Insertion Failed',
                errStack: e,
            });

            res.status(500).send(error);
        }

        // Step 2 : Update the Votes

        console.log(req.body.votes);

        req.body.votes.forEach(async (element) => {
            try {
                await mongoose.connection.db.collection(element.awardName.trim().toLowerCase()).findOneAndUpdate(
                    { name : element.nominiName.trim().toLowerCase() },
                    { $inc : {
                        votes : 1
                    }}
                )
            }catch(e){

                const error = new ErrorHandler(constants.ERRORS.DATABASE, {
                    statusCode: 500,
                    message: 'Mongo Error: Updation Failed',
                    errStack: e,
                });
                
                console.log(e);

                res.status(500).send(error);
            }
        });


        res.status(200).send({
            message : "Your vote is submitted successfully!"
        });
    }else{
        res.status(400).send({
            message : "Your vote is already registered !"
        });
    }
}