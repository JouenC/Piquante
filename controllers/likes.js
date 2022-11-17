const Sauce = require('../models/Sauce');
const fs = require('fs');
const { STATUS_CODES } = require('http');

exports.createLikeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then((sauce) => {
            if(!objet.userLiked.includes(req.body.userId) && req.body.like === 1){
                sauce.modifySauce({_id : req.params.id},
                { 
                    $inc : {likes: 1},
                    $push : {userLiked: req.body.userId}
                })
                .then(res.status(201).json({message: '+1 like'}))
                .catch(error => { res.status(400).json( { error })})
            }
            if(objet.userLiked.includes(req.body.userId) && req.body.like === 0){
                sauce.modifySauce({_id : req.params.id},
                { 
                    $inc : {likes: -1},
                    $pull : {userLiked: req.body.userId}
                })
                .then(res.status(201).json({message: 'aucun like'}))
                .catch(error => { res.status(400).json( { error })})
            }
        })
        .catch(error => { res.status(404).json( { error })})
}