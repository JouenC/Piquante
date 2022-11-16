const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createLikeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => { res.status(400).json( { error })})
}