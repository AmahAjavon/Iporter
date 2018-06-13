var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds149960.mlab.com:49960/iporter`, ["transportersLocation"]);


//upadate transporter socket id

router.put("/transporterLocationSocket/:id", function(req, res, next){

	var io = req.app.io;
	if(!req.body){
		res.status(400);
		res.json({
			"error":"Bad data"
		});

	}else{
		db.transportersLocation.update({_id:mongojs.ObjectId(req.params.id)},
			{$set: {socketId:req.body.socketId}}, function(err, updateDetails){
				if(err){
					res.send(err);

				}else{
					res.send(updateDetails);
				}
		});
	}
});


//get nearby transporter
router.get("/transporterLocation", function(req, res, next){
	db.transportersLocation.ensureIndex({"coordinate":"2dsphere"});
	db.transportersLocation.find({
			"coordinate":{
				"$near":{
					"$geometry":{
						"type":"Point",
						"coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
					},
					"$maxDistance":10000
				}
			}
		}, function(err, location){
			if(err){
				res.send(err);

			}else{
				res.send(location);
			}
	});

});

//Get Single Transporter and emit track by user to transporter
router.get("/transporterLocation/:id", function(req, res, next){
	var io = req.app.io;
    db.transportersLocation.findOne({transporterId: req.params.id},function(err, location){
        if (err){
            res.send(err);
        }
        res.send(location);
        io.emit("trackTransporter", location);
    });
});

//Update Location by transporter to user
router.put("/transporterLocation/:id", function(req, res, next){
    var io = req.app.io;
    var location = req.body;
    var latitude = parseFloat(location.latitude);
    var longitude = parseFloat(location.longitude);
    if (!location){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.transportersLocation.update({_id: mongojs.ObjectId(req.params.id)},{ $set: {
        	socketId:location.socketId,
        	coordinate:{
                "type": "Point",
        		coordinates:[
                    longitude,
        			latitude
    			]
    		}
    	}}, function(err, updateDetails){
        if (err){
            console.log(updateDetails);
            res.send(err);
        }
        if (updateDetails){

            //Get updated location
            db.transportersLocation.findOne({_id:  mongojs.ObjectId(req.params.id)},function(error, updatedLocation){
                if (error){
                    res.send(error);
                }
                res.send(updatedLocation);
                io.emit("action", {
                    type:"UPDATE_DRIVER_LOCATION",
                    payload:updatedLocation
                });
            });
        }
    });
    }
});

module.exports = router;
