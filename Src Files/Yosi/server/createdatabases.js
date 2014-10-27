/* ****** Collections Declerations****** */
var Businesses = require('./businesses.js');
var bussinesses = Businesses.BusinessesArr;

var Users = require('./users.js');
var users = Users.UsersArr;

var Reviews = require('./reviews.js');
var reviews = Reviews.ReviewsArr;
/* ****** End Collections Declerations ****** */


/* ************************** MongoDB ************************** */
var mongodb = require('mongodb');
var Server = new mongodb.Server('localhost','27017',{});
var ObjectID = mongodb.ObjectID;
var db = new mongodb.Db("FriendlyReviews", Server , {auto_reconnect:true, safe:false});
db.open(function (err,client){
	if (!err)
	{
		
		console.log("connection to database established");
		var bcollection = db.collection('businesses');
		for (var i = 0; i < bussinesses.length; i++)
		{
			bcollection.insert(bussinesses[i], {safe:true}, function(err,res){
				if (err){
					console.log("Error: in inserting to collection");
				}
			});
		}
	
		var ucollection = db.collection('users');
		for (var i = 0; i < users.length; i++)
		{
			ucollection.insert(users[i], {safe:true}, function(err,res){
				if (err){
					console.log("Error: in inserting to collection");
				}
			});
		}
	


		     db.collection('businesses').findOne(function(errorrs,resssss){
			var bid = ObjectID(String(resssss._id));
			db.collection('users').findOne(function(err,res){
				var rcollection = db.collection('reviews');
				for (var i = 0; i < reviews.length; i++)
				{
					reviews[i].BusinessId = bid;					
					reviews[i].ReviewerId = ObjectID(String(res._id));
//					console.log(reviews[i]);
//					console.log(String(res._id));
					rcollection.insert(reviews[i], {safe:true}, function(err,res){
					if (err){
						console.log("Error: in inserting to collection");
					}
					});
				}
			});
		     });
		}
});




	
/* ************************** End MongoDB ************************** */

