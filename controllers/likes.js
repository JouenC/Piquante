// Importing constants
const Sauce = require('../models/Sauce');
const fs = require('fs');
const { STATUS_CODES } = require('http');

// Allows you to create a like or remove it
exports.createLikeSauce = (req, res) => {
    switch (req.body.like){

        // Si l'utilisateur like, ajouter 1 dans likes et son id dans usersLiked   
        case 1 :
            Sauce.updateOne({_id : req.params.id},
                { 
                    $inc : {likes: 1},
                    $push : {usersLiked: req.body.userId}
                })
                .then(res.status(201).json({message: '+1 like'}))
                .catch(error => { res.status(400).json( { error })})
        break;  

        // If the user likes, add 1 in likes and his id in usersLiked
        case -1 :
            Sauce.updateOne({_id : req.params.id},
            { 
                $inc : {dislikes: 1},
                $push : {usersDisliked: req.body.userId}
            })
            .then(res.status(201).json({message: '+1 dislike'}))
            .catch(error => { res.status(400).json( { error })})
        break;

        // Remove a like or dislike        
        case 0 :       
            Sauce.findOne({ _id: req.params.id})
                .then(sauce => {
                    if (sauce.usersLiked.includes(req.body.userId)) {

                        // Removes the like from the sauce and removes the userId from the usersLiked array
                        Sauce.updateOne({ _id: req.params.id}, 
                            {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId}
                            })
                            .then(() => res.status(200).json({ message: "Like retiré" }))
                            .catch(error => res.status(400).json({ error }));
                    } if (sauce.usersDisliked.includes(req.body.userId)) {

                        // Removes a dislike from the sauce and removes the userId from the usersDisliked array
                        Sauce.updateOne({ _id: req.params.id},
                            {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId}
                            })
                            .then(() => res.status(200).json({ message: "Dislike retiré!" }))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch(error => res.status(400).json({ error }));
        break;
    }
}