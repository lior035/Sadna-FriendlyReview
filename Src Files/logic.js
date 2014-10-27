/* ************************** Passport ************************** */
var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy;


/* ************************** MongoDB ************************** */
var mongodb = require('mongodb');
var Server = new mongodb.Server('localhost','27017',{});
var ObjectID = mongodb.ObjectID;
var db = new mongodb.Db("FriendlyReviews", Server , {auto_reconnect:true, safe:false});
db.open(function (err,client){
	if (!err)
	{		
		db.collection('businesses', function(err, collection) {
		collection.ensureIndex( {geoLocCoords : "2dsphere"}, function(err, result) {
		console.log("inside geolocation index allocation");
		});
		});
		console.log("connection to database established");
	}
});
/* ************************** Passport ************************** */
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
	collection = db.collection('users');
	collection.findOne({_id: new ObjectID(_id) },function(err,result)
	{
		done(err, result);
	});
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("LocalStrategy working...");
		
		collection = db.collection('users');
		collection.findOne({Email: username },function(err,user)
		{
			if(err) 	{ return done(err); }
			if (!user)	{ return done(null, false, { message: 'Incorrect username.' }); }
			if(user) 	
			{
				if(user.Password != password)
					 return done(null, false, { message: 'Incorrect password.' });
				else
					return done(null, user);
			}
		});
    }
));
/*######################################## -- Global Functions Passport -- ##############################################*/
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) 
{

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	else
		res.send({'LoginStatus' : 'Not logged in user.'});
}
module.exports['initializePassport'] = function(app)
{
	app.use(passport.initialize());
	app.use(passport.session());	

/* 	app.post('/login',
	  passport.authenticate('local'),
	  function(req, res) {
		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		res.send(req.user);
	  }); */
	  
	  app.post('/login', function(req, res, next) {
		  passport.authenticate('local', 
		  function(err, user, info) 
		  {
			if (err) 	{ return next(err); }
			if (!user) 	{ return res.send(info); }
			req.logIn(user, function(err) 
							{
								if (err) { return next(err); }								
								return res.send(user);
							}
			);
		  })(req, res, next);	
		});
	  
	  app.get('/auth/facebook', passport.authenticate('facebook'));
	  app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/' }));	
}

/*######################################## -- End Global Functions Passport -- ##############################################*/

/*######################################## -- Logic Passport-- #############################################################*/

module.exports['autenticateUser'] = function(req,res)
{
}

module.exports['updateUser'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uAddress = bodyInfo.Address;
		var collection = db.collection('users');
		collection.update(	{  _id: new ObjectID(uId) }, 
							{ $set: { Address: uAddress }},function(err,result)
			{
				if(!err)
					res.send({'Status' : 'Sucsess'});
				else
					res.send({'Status' : 'Faliure'});
			}	
		);
	});	
}

module.exports['getUserByID'] = function(req, res){
	
	isLoggedIn(req,res,function()
	{
		console.log('in');
		var userID = req.params.userId;
		console.log("Retriving user" + userID);
		var i = 0;
			
		var collection = db.collection('users');
		collection.findOne({_id : new ObjectID(userID)}, function(err, result){

			if (!err){
				res.send(result);
			} else{
				res.send({'Status' : 'Failure'});
			}
		});
	});	
	
	
}

module.exports['signupNewUser'] = function(req,res) 
{ 	
		var userInfo = req.body; 
		var userEmail = req.body.Email; 
		  
		console.log("Adding user {" + JSON.stringify(userInfo) + "}"); 
		  
		var collection = db.collection('users'); 
		collection.count({ 'Email' : userEmail}, function(err, count){ 
			if (err){ 
				res.send({'Status' : 'Failure', 'Error' : 'Error in signupNewUser count query'}); 
			} else if (count > 0){ 
				console.log("User with the following E-mail:" + userEmail + " already exists in the database"); 
				res.send({'Status' : 'Failure', 'Error' : 'User with same E-Mail already exists in database'}); 
			} else { 
					collection.insert(userInfo, {safe:true}, function(err, result){ 
						if (err){ 
							console.log("User {" + userEmail + "} insertion into database failed"); 
							res.send({'Status' : 'Failure', 'Error' : "signupNewUser method error in insert - " + err }); 
						} else { 
							console.log("Added user: {" + JSON.stringify(result[0]) + "}"); 
							
							//logIn to the Server!!!!!
							
							
							res.send({'Status' : 'Success'}); 
						} 
					}); 
			} 
		}); 
}

module.exports['logout'] = function(req,res)
{
		req.logout();
		res.send({'Status' : 'Success'});
		//res.redirect('/');
}

module.exports['changePasswordInDB'] = function(req,res)
{
	console.log('in updatePasswordInDB...');
	var uId = req.params.Email;
	var bodyInfo = req.body;	
	var uPass = bodyInfo.Password;
	var uVerifyPassword = bodyInfo.VerifyPassword;
	
	console.log('in updatePasswordInDB...' + uId);
	
	var collection = db.collection('users');
	collection.update(	{ Email: uId }, 
						{ $set: { Password: uPass , VerifyPassword: uVerifyPassword}},function(err,result)
		{
			if(!err)
				res.send({'Status' : 'Success'});
			else
				res.send({'Status' : 'Faliure'});
		}	
	);
}

module.exports['updatePasswordInDB'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		console.log('in updatePasswordInDB...');
		var uId = req.params.userId;
		var bodyInfo = req.body;	
		var uPass = bodyInfo.Password;
		var uVerifyPassword = bodyInfo.VerifyPassword;
		
		console.log('in updatePasswordInDB...' + uId);
		
		var collection = db.collection('users');
		collection.update(	{ _id: new ObjectID(uId) }, 
							{ $set: { Password: uPass , VerifyPassword: uVerifyPassword}},function(err,result)
			{
				if(!err)
					res.send({'Status' : 'Success'});
				else
					res.send({'Status' : 'Faliure'});
			}	
		);
	});
}

module.exports['check_auth'] = function(req,res)
{
	isLoggedIn(req,res,function()
		{
			res.send({'Status' : 'Success'});
		}
	);
}

module.exports['checkIfUserAnswerIsCorrect'] = function(req,res)
{
		var uEmail = req.params.Email;
		var bodyInfo = req.body;
		var uAns = bodyInfo.Answer;
		var collection = db.collection('users');
		collection.findOne({Email: uEmail },function(err,result)
			{
				if(!err)
				{
					if(result.AnsOfSecQues == uAns)
						res.send({'Status' : 'Success'});		
					else
						res.send({'Status' : 'user answer is not correct'});
				}
				else
					res.send({'Status' : 'Eror finding the user.' + result});
			}
		);
}

module.exports['getUserFriends'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var collection = db.collection('users');
		collection.findOne({ _id: new ObjectID(uId)},function(err,result)
		{
				console.log('in getUserFriends!!!!');
				if(!err)
				{
					if(result)
						res.send(result.FriendsList);
					else
						res.send({'Status' : 'No freinds found for user'});
				}
				else
					res.send({'Status' : 'Eror finding the user.'});
		}
		);
	});
}


//change to get a list of friends to change....
module.exports['ChangeFriendsStatusInDB'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uFriendsID = bodyInfo.FriendsID;
		var uFriendsType = bodyInfo.Type;
		var collection = db.collection('users');		
		collection.findOne( {_id: new ObjectID(uId)} , 
						 function(err,result)
						 {
							if(!err)	
							{					
								console.log('in ChangeFriendsStatusInDB, is '+JSON.stringify(uFriendsID)+'\n');
								var resSplit = uFriendsID.split(",");
								for(var j=0; j<resSplit.length; j++)
								{
									for(var i=0; i<result.FriendsList.length; i++)
									{
										if(result.FriendsList[i].ID == resSplit[j])
											result.FriendsList[i].Type = uFriendsType;
									}
								}				
								console.log('in ChangeFriendsStatusInDB\nresult is'+JSON.stringify(result.FriendsList));
								
								
								collection.update(	{ _id: new ObjectID(uId) }, 
													{ $set: {FriendsList: result.FriendsList}},
													function(err,resultI)
														{
															if(!err)
																res.send({'Status' : 'Success'});
															else
																res.send({'Status' : 'Faliure'});
														});		
								
							}
							else
								res.send({'Status' : 'Eror finding the user.'});
						 }		
		);
	});
}

module.exports['changeUserAddressCP'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var address = bodyInfo.Address;
		var collection = db.collection('users');
		collection.update(	{  _id: new ObjectID(uId) }, 
							{ $set: { Address: address}},function(err,result)
			{
				if(!err)
					res.send({'Status' : 'Sucsess'});
				else
					res.send({'Status' : 'Faliure'});
			}	
		);
	});
}

module.exports['toggleFacebookStatusForUser'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uFaceStat = bodyInfo.FaceStat;
		var collection = db.collection('users');
		collection.update(	{  _id: new ObjectID(uId) }, 
							{ $set: { EnableFacebookAccess: uFaceStat}},function(err,result)
			{
				if(!err)
					res.send({'Status' : 'Sucsess'});
				else
					res.send({'Status' : 'Faliure'});
			}	
		);
	});
}

module.exports['syncWithFacebook'] = function(req,res)
{
			console.log('starting 0\n');

	isLoggedIn(req,res,function()
	{
		console.log('starting 1\n');
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var urlArr = bodyInfo.FriendsList
		var uFaceUrl = bodyInfo.userFacebookURL;				
		var collection = db.collection('users');
		collection.findOne({ _id: new ObjectID(uId)},function(err,result)
		{			
					console.log('starting 2\n');

			if(!err)
			{				
				console.log('Found user: ' + result.FirstName + ' With url of facebook: ' + uFaceUrl+'\n');
				console.log('Found user: ' + result.FirstName + ' With Array: ' + urlArr+'\n');
				
				//var myJson;
				var arr = new Array();
				var j=0;
						console.log('urlArr.length is : '+urlArr.length+ '\n');

				for(var i=0; i<urlArr.length;i++)
				{
					console.log('looking for:' + urlArr[i]);
					collection.findOne({FacebookUserPageURL: urlArr[i]},function(err,resultFriend)
					{
						if(!err && resultFriend)
						{					
							console.log("{ 'Type': Reg , 'ID': " +resultFriend._id+ ", 'Name': "+resultFriend.FirstName+resultFriend.LastName+"}");

							var strName = resultFriend.FirstName+" "+resultFriend.LastName;
							//var jsontext = '{"Type":"Reg","ID":'+'"'+resultFriend._id+'"'+',"Name":'+'"'+strName+'"'+'}';
							
							var userFriend = {
								   ID: resultFriend._id,
								   Name: strName,
								   Type: "Reg"
							   }
				   
							//console.log(jsontext);

							//arr[j] = JSON.parse(jsontext);
							arr[j] = userFriend;
							console.log("parsedJSON is", arr[j]);

							j++;
						}			
						else if(err)
						{
												console.log('in err\n');

						}
						else if (!resultFriend)
						{
												console.log('!resultFriend\n');

						}
					});
				}
				
				
				
							   
				collection.update(	{  _id: new ObjectID(uId) }, 
									{ $set: { FacebookUserPageURL: uFaceUrl}},function(err,resultUser)
					{
						if(!err){
							res.send(arr); //arr
						}
						else
							res.send({'Status' : 'Faliure inserting new friends to array.'});
					}	
				);				
			}
			else
				res.send({'Status' : 'Faliure, user id not found'});
		});
	});
}

module.exports['updateFriendsList'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var friendsArr = bodyInfo.FriendsList;
		var collection = db.collection('users');
		console.log('in updatefriendlist where arr is \n'+JSON.stringify(friendsArr));
		collection.update(	{  _id: new ObjectID(uId) },{$set: {FriendsList: friendsArr}},function(err)
		{			
				if(!err)
					res.send({'Status' : 'Sucsess'});
				else
					res.send({'Status' : 'Faliure'});
		});
	});
}

module.exports['setFacebookUrlForUser'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uFaceUrl = bodyInfo.userFacebookURL;
		var collection = db.collection('users');
		collection.update(	{  _id: new ObjectID(uId) }, 
							{ $set: { FacebookUserPageURL: uFaceUrl}},function(err,result)
			{
				if(!err)
					res.send({'Status' : 'Sucsess'});
				else
					res.send({'Status' : 'Faliure'});
			}	
		);
	});
}

module.exports['RetriveAllFriendByType'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uFriendsType = bodyInfo.friendType;
		var collection = db.collection('users');
		if(uFriendsType == 'All')
		{
			collection.findOne({ _id: new ObjectID(uId)},function(err,result)
			{
					if(!err)
						res.send(result.FriendsList);
					else
						res.send({'Status' : 'Eror finding the user.'});
			}
			);
		}
		else
		{
			collection.findOne({ _id: new ObjectID(uId)},function(err,result)
				{
					if(!err)
					{								
						if(result)
						{
							var arr= new Array();
							for(var i=0; i<result.FriendsList.length; i++)
							{
								if(result.FriendsList[i].Type == uFriendsType)
								{
									arr[i] = result.FriendsList[i]; 									
								}
							}
							res.send(arr);						
						}
						else
							res.send({'Status' : 'Eror finding the users friend list.'});
					}
					else
						res.send({'Status' : 'Eror finding the user.'});
				}
			);
		}
	});
}
module.exports['RetriveQesByMail'] = function(req,res)
{
		var uEmail = req.params.email;
		var collection = db.collection('users');
		collection.findOne({ Email: uEmail},function(err,result)
		{				
				if(!err)
				{
					if(result)
						res.send(result.SecQuesId);
					else
						res.send({'Status' : 'No question found for user'});
				}
				else
					res.send({'Status' : 'Eror finding the user.'});
		}
		);
}
module.exports['AddFriendToUser'] = function(req,res)
{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uFriendInfo = bodyInfo.FriendInfo;
		
		var collection = db.collection('users');
		collection.update({ _id: new ObjectID(uId)} , {$push: {FriendsList: JSON.parse(uFriendInfo)}},
		function(err,result)
		{
				if(!err)
					res.send({'Status' : 'Sucsess'});
				else
					res.send({'Status' : 'Faliure'});
		});						
}
module.exports['RemoveFriendFromUser'] = function(req,res)
{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uFriendID = bodyInfo.FriendID;
		
		var collection = db.collection('users');
		collection.update({ _id: new ObjectID(uId)} , {$pull: {"FriendsList.id": uFriendID}},
		function(err,result)
		{
				if(!err)
					res.send({'Status' : 'Sucsess'});
				else
					res.send({'Status' : 'Faliure'});
		});						
}
/*######################################## -- End Logic Passport-- #############################################################*/
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


db.collection('businesses', function(err, collection) {
    collection.ensureIndex( {geoLocCoords : "2dsphere"}, function(err, result) {
        console.log("inside geolocation index allocation");
    });
});

/* ************************** End MongoDB ************************** */




// Local functions


// This function runs after the function that updates the quantity in DB.
// otherwise, the calculation of the average, should be changed.
// remove review is 1 , if we use it in remove review, 0 otherwise.
function BusinessAverageRating(review,removereview)	// 3.4.3
{
	var bid = ObjectID(String(review.BusinessId));

	var collection = db.collection('businesses');
	collection.findOne({_id: bid},function(err,results){
	if (results)
	{
		var setValues = {};

		var avgOverall = Number(results.avgOverallRat);
		var avgPrice = Number(results.avgPriceRat);
		var avgQuality = Number(results.avgQualityRat);
		var avgParking = Number(results.avgParkingRat);
		var qualityRatingTotal = Number(results.qualityRatingFromReviewsTotal);
		var parkingRatingTotal = Number(results.parkingRatingFromReviewsTotal);
		var priceRatingTotal = Number(results.priceRatingFromReviewsTotal);
		var overallRatingTotal = Number(results.ratingFromReviewsTotal);
		

		var newAvgOverall = 0;
		var newAvgQuality = 0;
		var newAvgPrice = 0;
		var newAvgParking = 0;

		if (review.OverallRate)
		{
			if (!removereview)
			{
				if (overallRatingTotal > 0)
				{
					newAvgOverall = 
					((avgOverall * (overallRatingTotal -1 )) + Number(review.OverallRate))/
					overallRatingTotal;
				}
				else
				{
					overallRatingTotal = 0;
					newAvgOverall = 0;
				}
			}
			else
			{
				if (overallRatingTotal > 0)
				{
					newAvgOverall = 
					((avgOverall * (overallRatingTotal + 1)) - Number(review.OverallRate))/
					overallRatingTotal;
				}
				else
				{
					overallRatingTotal = 0;
					newAvgOverall = 0;
				}
			}

			setValues['avgOverallRat'] = newAvgOverall.toFixed(2);
		}


		if (review.QualityRate)
		{
			if (!removereview)
			{
				if (qualityRatingTotal > 0)
				{

					newAvgQuality = 
					((avgQuality * (qualityRatingTotal - 1)) + Number(review.QualityRate))/
					qualityRatingTotal;
				}
				else
				{
					qualityRatingTotal = 0;
					newAvgQuality = 0;
				}
			}
			else
			{
				if (qualityRatingTotal > 0)
				{
					newAvgQuality = 
					((avgQuality * (qualityRatingTotal + 1)) - Number(review.QualityRate))/
					qualityRatingTotal;
				}
				else
				{
					qualityRatingTotal = 0;
					newAvgQuality = 0;
				}
			}

			setValues['avgQualityRat'] = newAvgQuality.toFixed(2);
		}

		if (review.PriceRate)
		{
			if (!removereview)
			{
				if (priceRatingTotal > 0)
				{
					newAvgPrice = 
					((avgPrice * (priceRatingTotal - 1)) + Number(review.PriceRate))/
					priceRatingTotal;
				}
				else
				{
					priceRatingTotal = 0;
					newAvgPrice = 0;
				}
			}
			else
			{
				if (priceRatingTotal > 0)
				{
					newAvgPrice = 
					((avgPrice * (priceRatingTotal + 1)) - Number(review.PriceRate))/
					priceRatingTotal;
				}
				else
				{
					priceRatingTotal = 0;
					newAvgPrice = 0;
				}
			}

			setValues['avgPriceRat'] = newAvgPrice.toFixed(2);
		}

		if (review.ParkingRate)
		{
			if (!removereview)
			{
				if (parkingRatingTotal > 0)
				{
					newAvgParking = 
					((avgParking * (parkingRatingTotal - 1)) + Number(review.ParkingRate))/
					parkingRatingTotal;
				}
				else
				{
					parkingRatingTotal = 0;
					newAvgParking = 0;
				}
			}
			else
			{
				if (parkingRatingTotal > 0)
				{
					newAvgParking = 
					((avgParking * (parkingRatingTotal + 1)) - Number(review.ParkingRate))/
					parkingRatingTotal;
				}
				else
				{
					parkingRatingTotal = 0;
					newAvgParking = 0;			
				}
			}

			setValues['avgParkingRat'] = newAvgParking.toFixed(2);
		}
			
		console.log("UPDATE AVERAGE RATING new values");
		console.log("setValues = " + JSON.stringify(setValues));

		if (setValues)
		{
			collection.update({"_id":bid}, {$set: setValues},
			function(err,results) {	
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
	}
	});
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

function increaseRatingToBusinessAndUpdateLastUpdateInBusiness(review)
{
	var bid = ObjectID(String(review.BusinessId));
	var mongoCellOption = {};
	if (review.OverallRate)
	{
		if (review.OverallRate == 1)
		{
			mongoCellOption['ratingFromReviewsOne'] = 1;
		}
		else if (review.OverallRate == 2)
		{
			mongoCellOption['ratingFromReviewsTwo'] = 1;
		}
		else if (review.OverallRate == 3)
		{
			mongoCellOption['ratingFromReviewsThree'] = 1;
		}
		else if (review.OverallRate == 4)
		{
			mongoCellOption['ratingFromReviewsFour'] = 1;
		}
		else
		{
			mongoCellOption['ratingFromReviewsFive'] = 1;
		}
		
		mongoCellOption['ratingFromReviewsTotal'] = 1;
	}


	if (review.QualityRate)
	{
		mongoCellOption['qualityRatingFromReviewsTotal'] = 1;
	}

	if (review.PriceRate)
	{
		mongoCellOption['priceRatingFromReviewsTotal'] = 1;
	}

	if (review.ParkingRate)
	{
		mongoCellOption['parkingRatingFromReviewsTotal'] = 1;
	}	

	var collection = db.collection('businesses');
	var lastUpdateDate = {};
	lastUpdateDate['LastUpdate'] = review.CreationTime;
	collection.update({"_id":bid}, {
						$inc: mongoCellOption,
						$set: lastUpdateDate
					},
	function(err,results) {	
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

function decreaseRatingOfBusiness(review)
{
	var bid = ObjectID(String(review.BusinessId));
	var mongoCellOption = {};

	if (review.OverallRate)
	{
		if (review.OverallRate == 1)
		{
			mongoCellOption['ratingFromReviewsOne'] = -1;
		}
		else if (review.OverallRate == 2)
		{
			mongoCellOption['ratingFromReviewsTwo'] = -1;
		}
		else if (review.OverallRate == 3)
		{
			mongoCellOption['ratingFromReviewsThree'] = -1;
		}
		else if (review.OverallRate == 4)
		{
			mongoCellOption['ratingFromReviewsFour'] = -1;
		}
		else
		{
			mongoCellOption['ratingFromReviewsFive'] = -1;
		}
		
		mongoCellOption['ratingFromReviewsTotal'] = -1;
	}

	if (review.QualityRate)
	{
		mongoCellOption['qualityRatingFromReviewsTotal'] = -1;
	}

	if (review.PriceRate)
	{
		mongoCellOption['priceRatingFromReviewsTotal'] = -1;
	}

	if (review.ParkingRate)
	{
		mongoCellOption['parkingRatingFromReviewsTotal'] = -1;
	}	



	var collection = db.collection('businesses');
	collection.update({"_id":bid}, {$inc: mongoCellOption},function(err,results) {	
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

function increaseQuantityOfBusinessRankedToUser(review)
{
	var uid = ObjectID(String(review.ReviewerId));
	var mongoCellOption = {};		
	mongoCellOption['RankedBusinessesQuantity'] = 1;

	var collection = db.collection('users');
	collection.update({"_id":uid}, {$inc: mongoCellOption},function(err,results) {	
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

function decreaseQuantityOfBusinessRankedToUser(review)
{
	var uid = ObjectID(String(review.ReviewerId));
	var mongoCellOption = {};		
	mongoCellOption['RankedBusinessesQuantity'] = -1;

	var collection = db.collection('users');
	collection.update({"_id":uid}, {$inc: mongoCellOption},function(err,results) {	
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
	isLoggedIn(req,res,function()
	{
	var empty = {};
	res.send(JSON.stringify(empty));
	});
}

module.exports['getReviews'] = function(req,res)
{
	isLoggedIn(req,res,function()
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
	});
}



module.exports['addReview'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{

	var reviewuser = req.body;


	if (	(! reviewuser['addScore-overall']) 	|| 
		(! reviewuser['addScore-quality']) 	|| 
		(! reviewuser['addScore-price']) 	|| 
		(! reviewuser['addScore-parking']) 	|| 
		(! reviewuser['userCommentToAdd']) 	|| 
		(! reviewuser['BusinessId']) 	|| 
		(! reviewuser['ReviewerId']) 		)
	{
		var error = {"Error": "one or more fileds are missing"};
		res.send(JSON.stringify(error));
	}
	else
	{
		var review = {};
		review['OverallRate'] = reviewuser['addScore-overall'];
		review['QualityRate'] = reviewuser['addScore-quality'];
		review['PriceRate'] = reviewuser['addScore-price'];
		review['ParkingRate'] = reviewuser['addScore-parking'];		
		review['Comments'] = reviewuser['userCommentToAdd'];
		review['BusinessId'] = reviewuser['BusinessId'];
		review['ReviewerId'] = reviewuser['ReviewerId'];
		review['ReviewerFirstName'] = reviewuser['ReviewerFirstName'];
		review['ReviewerLastName'] = reviewuser['ReviewerLastName'];

		// Updating creating time.
		var d = new Date();
		var month = d.getMonth() + 1
		var day = d.getDate();
		var year = d.getFullYear();
		var date = day.toString() + "/" + month.toString() + "/" + year.toString();
		review.CreationTime = date;

		// Updating reviewer id.
		var rid = review.ReviewerId;
		review.ReviewerId = ObjectID(String(rid));
		console.log(JSON.stringify(review));

		// Updating Business.
		var bid = review.BusinessId;
		review.BusinessId = ObjectID(String(bid));

		var rc1 = addReviewToReviews(review);
		var rc2 = increaseRatingToBusinessAndUpdateLastUpdateInBusiness(review);
		var rc3 = increaseQuantityOfBusinessRankedToUser(review);
		var rc4 = BusinessAverageRating(review,0);
		var err = {};

		if (rc1)
		{
			err["ERROR"] = "addReviewToReviews returned errors";
		}
		else if (rc2)
		{
			err["ERROR"] = "increaseRatingToBusinessAndUpdateLastUpdateInBusiness returned errors";
		}
		else if (rc3)
		{
			err["ERROR"] = "increaseQuantityOfRestRankedToUser returned errors";
		}

		res.send(JSON.stringify(err));
	}
	});
}

module.exports['removeReview'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{

	var empty = {};
	var rid = req.params.reviewId;
	rid = ObjectID(String(rid));
	var collection = db.collection('reviews');

	collection.findOne({_id: rid},function(err,results){
		if (results)
		{
			decreaseRatingOfBusiness(results);
			decreaseQuantityOfBusinessRankedToUser(results);
			BusinessAverageRating(results,1);
		}
	});

	collection.remove({_id: rid},function(err,results){
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
	});
}

module.exports['filterBusinesses'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{

	var category = req.body.businessTypeFindBusiness;
	var city = req.body.businessCityFindBusiness;
	var rating = req.body.minimumRatingFindBusiness;
	var searchstring = req.body.specificNameFindBusiness;
	var searchAndArr = [];
	var empty = {};

	if (searchstring)
	{
		// Ignore anything else, and search only by string.
		var c = {};
		c['name']= { '$regex' : searchstring, '$options': 'i'};
		searchAndArr.push(c);
		
	}
	else if ((city == "all") && (category == "all"))
	{
		// Ignore city and category in search.
		// no searchstring.
		// Search only by rating.
		var c = {'avgOverallRat' : { $gte: rating }};	
		searchAndArr.push(c);
	}
	else if (city == "all")
	{
		// Ignore city in search.
		// no searchstring.
		// Search by rating and by category.
		var c = {'avgOverallRat' : { $gte: rating }};	
		searchAndArr.push(c);
		var c2 = {'type' : category};
		searchAndArr.push(c2);
	}
	else if (category == "all")
	{
		// Ignore category in search.
		// no searchstring.
		// Search by rating and by city.
		var c = {'avgOverallRat' : { $gte: rating }};	
		searchAndArr.push(c);
		var c2 = {'city' : city};
		searchAndArr.push(c2);
		
	}
	else
	{	
		// No search string.
		// Nothing to ignore.
		// Search by city, rating and category.
		var c = {'avgOverallRat' : { $gte: rating }};	
		searchAndArr.push(c);
		var c2 = {'city' : city};
		searchAndArr.push(c2);
		var c3 = {'type' : category};
		searchAndArr.push(c3);
		
	}

	var searchOptions = {'$and': searchAndArr};

	// Now we have the search filter we need, 
	// and we can just search with it .
	collection = db.collection('businesses');
	collection.find(searchOptions).toArray(function(err,results)
	{
		if ((!err) && (results))
		{
			res.send(JSON.stringify(results));
		}
		else
		{

			console.log("Error in converting the results to array, " + err);
			res.send(JSON.stringify(empty));

		}
	});
	});
}

module.exports['calculateBusinessOfFriendsAverage'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{

	var empty = {};
	res.send(JSON.stringify(empty));
	});
}

module.exports['getBusiness'] = function(req,res)
{
	isLoggedIn(req,res,function()
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
	});
}


module.exports['geoFilterBusiness'] = function(req, res) {
isLoggedIn(req,res,function()
{

    console.log("geofilterBusinesses method invoked {" + JSON.stringify(req.body) + "}");

    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    db.collection('businesses', function(err, collection) {
        if (err) {
            res.send({'Status' : 'Failure', 'Error' : "getBusinessesInRadius method error in collection - " + err });    
        } else {
            collection.find( { geoLocCoords : { $near :
                           		{ 
								$geometry :
                              		{ 
									type : "Point" ,
                                 	coordinates: [ parseFloat(longitude) , parseFloat(latitude) ] } ,
                             	$maxDistance : 3000
                			}}}).toArray(function(err, items){
					            if (err) {
					                res.send({'Status' : 'Failure', 'Error' : "getBusinessesInRadius method error in find - " + err });    
					            } else {
					                res.send(items);    
					            }
            });    
        }
    });
});
};

module.exports['RetriveAvarageRating'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{

	var empty = {};
	var bid = req.params.businessId;
	var type = req.body.type;
	var overalltype = 1;
	var parkingtype = 2;
	var pricetype = 3;
	var qualitytype = 4;
	var alltype = 5;
	
	var retrieveOptions = {};

	if (type == alltype)
	{
		retrieveOptions = {avgOverallRat:1, avgParkingRat:1, avgPriceRat:1, avgQualityRat:1};
	}
	else if (type == overalltype)
	{
		retrieveOptions = {avgOverallRat:1};
	}
	else if (type == parkingtype)
	{
		retrieveOptions = {avgParkingRat:1};
	}
	else if (type == pricetype)
	{
		retrieveOptions = {avgPriceRat:1};
	}
	else if (type == qualitytype)
	{
		retrieveOptions = {avgQualityRat:1};
	}


	collection = db.collection('businesses');
	collection.findOne(	{_id: new ObjectID(String(bid))},retrieveOptions,
				function(err,results){
				if (!err)
				{
					if (results)
					{
						res.send(JSON.stringify(results));
					}
					else 
					{
						res.send(JSON.stringify(empty));
					}
				}
				else
				{
					res.send(JSON.stringify(empty));
				}
	});
	});
}



module.exports['getHashFriends'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{

	var uid = req.params.uid;
	collection = db.collection('users');
	collection.findOne({_id: new ObjectID(uid)},{FriendsList:1},function(err,results){
		if (!err)
		{
			if (!results)
			{
				res.send(JSON.stringify(empty));
			}
			else
			{
				var hashedValues = {};
				var favcnt = 0;
				var regcnt = 0;
				var favoriteFriendType = "Fav"; 	// If favorite type is changed in DB
									// this value should be changed.
				var friends = results.FriendsList;
				for (var i = 0; i < friends.length; i++)
				{
					var fid = String(friends[i].ID); // If id of friends is not _id 
									  // this line should be changed.

					if (friends[i].Type == favoriteFriendType)
					{
						favcnt++;
						hashedValues[fid] = 1;
					}
					else
					{
						regcnt++;
						hashedValues[fid] = 0;
					}
				}


				hashedValues['valueOfRegularFriend'] = 100 / (regcnt + (favcnt * 2));

				res.send(JSON.stringify(hashedValues));
			}
		}
		else
		{
			res.send(JSON.stringify(empty));
		}	
	});
	
	});	
}


module.exports['meetMeUp'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{

	var bid = req.params.businessId;
	console.log('In meet me up, bid is: ' +bid);
	var friends_ids_arr = req.body.FriendsArr;
		
	console.log('In meet me up, Friends array is: ' +JSON.stringify(friends_ids_arr));

	var MailBody = req.body.TextInput;
		console.log('In meet me up, mail body is: ' +MailBody);

	var MailSubject = req.body.Subject;
		console.log('In meet me up, mail subject is: ' +MailSubject);

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
									
		var resSplit = friends_ids_arr.split(",");

		for(var j=0; j<resSplit.length; j++)
		{
			
			var fid = resSplit[j];
			IdsArr.push(new ObjectID(fid));
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
	});
}
/* ************************** Modules ************************** */// END of Modules






