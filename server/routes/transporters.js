var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://amah:secret1@ds149960.mlab.com:49960/iporter", ["transporters"]);


//Get Single Transporter
router.get("/transporter/:id", function(req, res, next){
    db.transporters.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, transporter){
        if (err){
            res.send(err);
        }
        res.send(transporter);
    });
});

module.exports = router;
