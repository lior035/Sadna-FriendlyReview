/* ************************** MongoDB ************************** */
var mongodb = require('mongodb');
var Server = new mongodb.Server('localhost','27017',{});
var ObjectID = mongodb.ObjectID;
var db = new mongodb.Db("FriendlyReviews", Server , {auto_reconnect:true, safe:false});
db.open(function (err,client){
	if (!err)
	{		
		console.log("connection to database established");
	}
});

/* *********************** OtherPackages *********************** */
var nodemailer = require("nodemailer");

/* ****** Collections Declerations****** */
var Businesses = require('./businesses.js');
var bussinesses = Businesses.BusinessesArr;

var Users = require('./users.js');
var users = Users.UsersArr;

var Reviews = require('./reviews.js');
var reviews = Reviews.ReviewsArr;
/* ****** End Collections Declerations ****** */

/*	
var collection = db.collection('businesses');
for (var i = 0; i < bussinesses.length; i++)
{
	collection.insert(bussinesses[i],function(err,res){
		if (err){
			console.log("Error: in inserting to collection");
		}
	});
}
	
collection = db.collection('users');
for (var i = 0; i < users.length; i++)
{
	collection.insert(users[i],function(err,res){
		if (err){
			console.log("Error: in inserting to collection");
		}
	});
}
	


collection = db.collection('reviews');
for (var i = 0; i < reviews.length; i++)
{
	collection.insert(reviews[i],function(err,res){
		if (err){
			console.log("Error: in inserting to collection");
		}
	});
}
*/	
/* ************************** End MongoDB ************************** */

// Local functions
function CalculateAverageOfBusinessScore()	// 3.4.3
{
}

function sendMail(MailEmailsArr,Mailsubject,Mailbody)
{
	var returnvalue = 0;
	var smtp = nodemailer.createTransport("SMTP",{
		service: "Gmail",	
		auth: {
			user: "FriendlyReviewsTeam@gmail.com",
			pass: "friendlyreviews888"
		}
	});

	if (MailEmailsArr.length <=0)
	{
		returnvalue = -1;
		console.log("Error in Sending mail, Array of email addresses is empty");
	}
	else
	{
		var mailOptions = {
			from: "FriendlyReviewsTeam@gmail.com",
			to: MailEmailsArr.toString(),
			subject: Mailsubject,
			text: Mailbody,
			html: ""
		};

		smtp.sendMail(mailOptions, function (err,response){
			if (err)
			{
				returnvalue = -2;
				console.log(err);
			}
			else
			{
				console.log("Message sent:" + response.message); 
			}
		}); 
	}

	return returnvalue;
}

/* ************************** Modules ************************** */
module.exports['returnEmptyJSON'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['signupNewUser'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['getReviews'] = function(req,res)
{
	var empty = {};
	var bid = req.params.businessId;
	collection = db.collection('reviews');
	//collection.find({ BusinessId: ObjectID(bid)},{_id:1}).toArray(function(err,results)
	collection.find({ BusinessId: bid}).toArray(function(err,results)
	{
		if (!err)
		{
			var ids = [];
			for (var j = 0 ; j < results.length; j++)
			{
				console.log("results[" + j + "]="+ JSON.stringify(results[j]));

				if (results[j])
				{
					ids.push(results[j]);
				}
			}

			console.log("Ids = " + ids.toString());
			res.send(JSON.stringify(ids));
		}
		else
		{
			console.log("Error in converting the results to array, " + err);
			res.send(JSON.stringify(empty));

		}
	});

}

module.exports['addReview'] = function(req,res)
{

	var review = req.body;
	if (	(! review.OverallRate) 	|| 
		(! review.QualityRate) 	|| 
		(! review.PriceRate) 	|| 
		(! review.ParkingRate) 	|| 
		(! review.Comments) 	|| 
		(! review.SourceId) 	|| 
		(! review.BusinessId) 	|| 
		(! review.ReviewerId) 		)
	{
		var error = {"Error": "one or more fileds are missing"};
		res.send(JSON.stringify(error));
	}
	else
	{
		var date = new Date();
		review.CreationTime = date.toString();
		var collection = db.collection('reviews');
		collection.insert(review,function(err,res){
			if (err){
				console.log("Error: in inserting to collection");
				var error = {"Error":"Cannot insert review to collection"};
				res.send(JSON.stringify(error));
				}
			else
			{
				var empty = {};
				res.send(JSON.stringify(empty));
			}
		});
	}
}

module.exports['removeReview'] = function(req,res)
{
	var empty = {};
	var rid = req.params.reviewId;
	var collection = db.collection('reviews');
	collection.remove({_id: new ObjectID(rid)},function(err,results){
		if (!err)
		{
			res.send(JSON.stringify(empty));
		}
		else
		{
			console.log("ERROR: Cannot remove review from the collection");
			var error = {"ERROR":"Cannot remove review from the collection"};
			res.send(JSON.stringify(error));
		}	
	});
}

module.exports['filterBusinesses'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['calculateBusinessOfFriendsAverage'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['getBusiness'] = function(req,res)
{
	var empty = {};
	var bid = req.params.businessId;
	collection = db.collection('businesses');
	collection.findOne({_id: new ObjectID(bid)},function(err,results){
		if (!err)
		{
			if (!results)
			{
				res.send(JSON.stringify(empty));
			}
			else
			{
				res.send(JSON.stringify(results));
			}
		}
		else
		{
			res.send(JSON.stringify(empty));
		}	
	});
	
}


module.exports['geoFilterBusiness'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['RetriveAllFriendByType'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['RetriveAvarageRating'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['UpdateAverageBusinessScore'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['meetMeUp'] = function(req,res)
{
	var bid = req.params.businessId;
	var friends_ids_arr = req.body.FriendsArr;
	var MailBody = req.body.TextInput;
	var MailSubject = "Friendly Reviews Invite!";
	var Emails = [];
	if (! friends_ids_arr)
	{
		var error = {"Error": "empty friends list"};
		res.send(JSON.stringify(error));
	}
	else
	{
		console.log("meetMeUp, recieving emails for friends");
	
		var IdsArr = [];
		for (var i = 0; i < friends_ids_arr.length; i++)
		{
			var fid = friends_ids_arr[i];
			IdsArr.push(ObjectID(fid));

		}

		console.log("IdsArr:" + JSON.stringify(IdsArr));
		collection = db.collection('users');
		collection.find({ _id: { $in: IdsArr}},{Email:1}).toArray(function(err,results)
		{
			if (!err)
			{
				for (var j = 0 ; j < results.length; j++)
				{
					console.log("results[" + j + "]="+ JSON.stringify(results[j]));

					if (results[j].Email)
					{
						Emails.push(results[j].Email);
						console.log("Email for friend=" + results[j].Email);
					}
				}

				console.log("Emails = " + Emails.toString());

				sendMail(Emails,MailSubject,MailBody);
			}
			else
			{
				console.log("Error in converting the results to array, " + err);
			}
		});
//		}


//		if (! Mails)
//		{
			var empty = {};
			res.send(JSON.stringify(empty));
/*		}
		else
		{
			res.send(Mails);
		}
*/
	}
}
/* ************************** Modules ************************** */
// END of Modules






