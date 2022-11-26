// Importation des constantes
const Sauce = require('../models/Sauce');
const fs = require('fs');
const { STATUS_CODES } = require('http');

// Permet de créer un like ou de le retirer
exports.createLikeSauce = (req, res, next) => {
    // Sauce.findOne({ _id: req.params.id})
    //     .then((sauce) => {
            switch (req.body.like){

                // Si l'utilisateur like et n'a pas encore liker, ajouter un like    
                case 1 :
                    // if(!req.body.usersLiked.includes(req.body.userId)){
                        console.log(req.body.usersLiked)
                        console.log(req.body.userId)
                        console.log(req.params.id)
                        console.log(usersLiked)
                        Sauce.updateOne({_id : req.params.id},
                        { 
                            $inc : {likes: 1},
                            $push : {usersLiked: req.body.userId}
                        })
                        .then(res.status(201).json({message: '+1 like'}))
                        .catch(error => { res.status(400).json( { error })})
                    // }
                break;

            

            // Si l'utilisateur n'a pas encore disliker et qu'il dislike, retirer un like
                case -1 :
                    // if(!req.body.usersDisliked.includes(req.body.userId)){
                        Sauce.updateOne({_id : req.params.id},
                        { 
                            $inc : {dislikes: 1},
                            $push : {usersDisliked: req.body.userId}
                        })
                        .then(res.status(201).json({message: '+1 dislike'}))
                        .catch(error => { res.status(400).json( { error })})
                    // }
                break;

                case 0 :
                    // Si l'utilisateur a liker et qu'il retire son like
                    // if(req.body.usersLiked.includes(req.body.userId)){
                        Sauce.updateOne({_id : req.params.id},
                        { 
                            $inc : {likes: 0},
                            $pull : {usersLiked: req.body.userId}
                        })
                        .then(res.status(201).json({message: 'aucun like'}))
                        .catch(error => { res.status(400).json( { error })})
                    // }  
                    
                    // Si l'utilisateur a disliker et qu'il retire son dislike
                    // if(req.body.usersDisliked.includes(req.body.userId)){
                        Sauce.updateOne({_id : req.params.id},
                        { 
                            $inc : {dislikes: 0},
                            $pull : {usersDisliked: req.body.userId}
                        })
                        .then(res.status(201).json({message: 'aucun dislike'}))
                        .catch(error => { res.status(400).json( { error })})
                    // }
                break;
            }
        }
        // )
        // .catch(error => { res.status(404).json( { error })})
// }