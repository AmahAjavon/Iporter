var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs(process.env.MONGO_DB_URL, ["bookings"]);

router.get("/bookings", function(req, res, next){
	db.bookings.find(function(err, bookings){
		if(err){
			res.send(err);

		}
		res.json(bookings);
	})
}); 

router.post("/bookings", function(req, res, next){
	var booking = req.body.data;
	var nearByTransporter = req.body.nearByTransporter;
	var io = req.app.io;

	if(!booking.userName){
		res.status(400);
		res.json({
			error:"Bad data"
		});	
	} else {
		db.bookings.save(booking, function(err, savedBooking){
			if(err){
				res.send(err);
			}
			res.json(savedBooking);
			if(nearByTransporter.socketId){
				io.emit(nearByTransporter.socketId + "transporterRequest", savedBooking);
			}else{
				console.log("Transporter not connected");
			}
		});
	}
});

// Transporter  Update Booking done on transporter side
router.put("/bookings/:id", function(req, res, next){
    var io = req.app.io;
    var booking = req.body;
    if (!booking.status){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.bookings.update({_id: mongojs.ObjectId(req.params.id)},{ $set: { 
        	transporterId: booking.transporterId,
        	status: booking.status 
        }}, function(err, updatedBooking){
        if (err){
            res.send(err);
        }
        if (updatedBooking){
            //Get Confirmed booking
            db.bookings.findOne({_id:  mongojs.ObjectId(req.params.id)},function(error, confirmedBooking){
                if (error){
                    res.send(error);
                }
                res.send(confirmedBooking);
                io.emit("action", {
                    type:"BOOKING_CONFIRMED",
                    payload:confirmedBooking
                });
            });
        }
    });
    }
});




module.exports = router;
