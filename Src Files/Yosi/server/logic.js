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


function addReviewToReviews(review)
{
	var collection = db.collection('reviews');
	collection.insert(review,function(err,results){
		if (err){
			console.log("Error: in inserting to collection");
			return (-1);
			}
		else
		{
			return (0);
		}
	});
}

function updateRatingToBusiness(review)
{
	var bid = ObjectID(String(review.BusinessId));
	var mongoDbSpecificCellToUpdate;
	if (review.OverallRate == 1)
	{
		mongoDbSpecificCellToUpdate = 'ratingFromReviewsOne';
	}
	else if (review.OverallRate == 2)
	{
		mongoDbSpecificCellToUpdate = 'ratingFromReviewsTwo';
	}
	else if (review.OverallRate == 3)
	{
		mongoDbSpecificCellToUpdate = 'ratingFromReviewsThree';
	}
	else if (review.OverallRate == 4)
	{
		mongoDbSpecificCellToUpdate = 'ratingFromReviewsFour';
	}
	else
	{
		mongoDbSpecificCellToUpdate = 'ratingFromReviewsFive';
	}
		
	var collection = db.collection('businesses');
	collection.update({"_id":bid},{$inc:{mongoDbSpecificCellToUpdate: 1}, 
					$inc:{'ratingFromReviewsTotal': 1}},function(err,results){
		if (err){
				console.log("Error: in updating the collection");
				return -1;
			}
		else
		{
				return 0;
		}
	});


}

/* ************************** Modules ************************** */
module.exports['returnEmptyJSON'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['getReviews'] = function(req,res)
{
	var empty = {};
	var bid = req.params.businessId;
	collection = db.collection('reviews');
	collection.find({ BusinessId: ObjectID(bid)}).toArray(function(err,results)
	//collection.find({ BusinessId: bid}).toArray(function(err,results)
	{
		if (!err)
		{
			var ids = [];
			for (var j = 0 ; j < results.length; j++)
			{
				console.log("results[" + j + "]="+ JSON.stringify(results[j]));

				if (results[j])
				{
					var curReview = results[j];
					var curReviewerName = curReview.ReviewerFirstName + ' ' + 
								 curReview.ReviewerLastName;
					var r = {};
					r['ReviewerName'] = curReviewerName;
					r['ReviewDetails'] = curReview;

					ids.push(r);
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
		// Updating creating time.
		var date = new Date();
		review.CreationTime = date.toString();

		// Updating reviewer id.
		var rid = review.ReviewerId;
		review.ReviewerId = new ObjectID(String(rid));
		console.log(JSON.stringify(review));

		// Updating Business id.
		var bid = review.BusinessId;
		review.BusinessId = ObjectID(String(bid));

		var rc1 = addReviewToReviews(review);
		var rc2 = updateRatingToBusiness(review);
		var err = {};

		if (rc1)
		{
			err["ERROR"] = "addReviewToReviews returned errors";
		}
		else if (rc2)
		{
			err["ERROR"] = "updateRatingToBusiness returned errors";
		}

		res.send(JSON.stringify(err));
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






