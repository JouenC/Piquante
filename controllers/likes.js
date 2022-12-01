// Importation des constantes
const Sauce = require('../models/Sauce');
const fs = require('fs');
const { STATUS_CODES } = require('http');

// Permet de créer un like ou de le retirer
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

        // Si l'utilisateur dislike, retirer un like ajouter 1 dans dislikes et son id dans usersDisliked
        case -1 :
            Sauce.updateOne({_id : req.params.id},
            { 
                $inc : {dislikes: 1},
                $push : {usersDisliked: req.body.userId}
            })
            .then(res.status(201).json({message: '+1 dislike'}))
            .catch(error => { res.status(400).json( { error })})
        break;

        // Retirer un like ou un dislike        
        case 0 :       
            Sauce.findOne({ _id: req.params.id})
                .then(sauce => {
                    if (sauce.usersLiked.includes(req.body.userId)) {

                        // Retire le like de la sauce et supprime l'userId du tableau usersLiked
                        Sauce.updateOne({ _id: req.params.id}, 
                            {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId}
                            })
                            .then(() => res.status(200).json({ message: "Like retiré" }))
                            .catch(error => res.status(400).json({ error }));
                    } if (sauce.usersDisliked.includes(req.body.userId)) {

                        // Retire un dislike de la sauce et supprime l'userId du tableau usersDisliked
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

// exports.createLikeSauce = (req, res) => {
//     const userId = req.body.userId;
//     const sauceId = req.params.id;
//     const likeState = req.body.like;

//     switch (likeState) {
//         //si like=1 on incrémente l'attribut likes de la sauce et on ajoute l'id de l'utilisateur dans le tableau usersLiked
//         case 1:
//             Sauce.updateOne({ _id: sauceId }, { $inc: { likes: 1 }, $push: { usersLiked: userId } })
//                 .then(() => res.status(200).json({ message: "Like ajouté à la sauce" }))
//                 .catch((error) => res.status(400).json({ error }));
//             break;
//             //si like=0 alors on étudie les deux tableaux usersLiked et usersDisliked et on mets à jour les attributs likes et dislikes ainsi que les tableaux eux meme selon la présence de l'userId dans l'un des deux
//         case 0:
//             //retourne le tableau correspondant a sauceId
//             Sauce.findOne({ _id: sauceId })
//                 .then(sauce => {
//                     if (sauce.usersLiked.includes(userId)) {
//                         //décrémente l'attribut likes de la sauce et supprime l'userId du tableau usersLiked
//                         Sauce.updateOne({ _id: sauceId }, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
//                             .then(() => res.status(200).json({ message: "Vous avez enlever votre like !" }))
//                             .catch(error => res.status(400).json({ error }));
//                     } else if (sauce.usersDisliked.includes(userId)) {
//                         //décrémente l'attribut dislikes de la sauce et supprime l'userId du tableau usersDisliked
//                         Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
//                             .then(() => res.status(200).json({ message: "Vous avez enlever votre dislike !" }))
//                             .catch(error => res.status(400).json({ error }));
//                     }
//                 })
//                 .catch(error => res.status(400).json({ error }));
//             break;
//             //si like=-1 on incrémente l'attribut dislikes de la sauce et on ajoute l'id de l'utilisateur dans le tableau usersDisliked
//         case -1:
//             Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } })
//                 .then(() => res.status(200).json({ message: "dislike ajouté à la sauce" }))
//                 .catch((error) => res.status(400).json({ error }));
//             break;
//     }
// }