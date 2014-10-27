var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
    flash = require('connect-flash');

var mongodb = require('mongodb');
var Server = new mongodb.Server('localhost','27017',{});
var ObjectID = mongodb.ObjectID;
var db = new mongodb.Db("FriendlyReviews", Server , {auto_reconnect:true, safe:false});
db.open(function (err,client){
	if (!err)
	{		
		//console.log("Connected to DB - Passport");
	}
});	
var collection;
	

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


var FACEBOOK_APP_ID = '278436405666940';
var FACEBOOK_APP_SECRET = '36b49daaab280379105cb352ba542f01';
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    collection.findOne({Email: profile.value }, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

/*######################################## -- Global Functions -- ##############################################*/
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	else
		res.send({'Status' : 'Not logged in user.'});
}
module.exports['initializePassport'] = function(app)
{
	app.use(passport.initialize());
	app.use(passport.session());	

	app.post('/login',
	  passport.authenticate('local'),
	  function(req, res) {
		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		res.send(req.user);
	  });
	  
	  app.get('/auth/facebook', passport.authenticate('facebook'));
	  app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/' }));	
}

/*######################################## -- End Global Functions -- ##############################################*/

/*######################################## -- Logic -- #############################################################*/

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
		collection = db.collection('users');
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

module.exports['signupNewUser'] = function(req,res) 
{ 
	isLoggedIn(req,res,function()
	{	
		var userInfo = req.body; 
		var userEmail = req.body.Email; 
		  
		console.log("Adding user {" + JSON.stringify(userInfo) + "}"); 
		  
		collection = db.collection('users'); 
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
							console.log("Added user: {"+JSON.stringify(result[0]) + "}"); 
							
							//logIn to the Server!!!!!
							
							
							res.send({'Status' : 'Success'}); 
						} 
					}); 
			} 
		}); 
	});
}

module.exports['logout'] = function(req,res)
{
		req.logout();
		res.send({'Status' : 'Success'});
		//res.redirect('/');
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
		
		collection = db.collection('users');
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
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uAns = bodyInfo.Answer;
		collection = db.collection('users');
		collection.findOne({_id: new ObjectID(uId) },function(err,result)
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
	});
}

module.exports['getUserFriends'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		collection = db.collection('users');
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

module.exports['ChangeFriendsStatusInDB'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var bodyInfo = req.body;
		var uFriendsID = bodyInfo.FriendsID;
		var uFriendsType = bodyInfo.Type;
		collection = db.collection('users');
 	 	collection.update(	{ _id: new ObjectID(uId), "FriendsList.id": uFriendsID} ,
							{  $set: { 'FriendsList.$.Type': uFriendsType }},
							function(err,result)
							{
								if(!err)
								{
									if(result)								
										//res.send({'Status' : 'Sucsess'});
										res.send(result);
									else
										res.send({'Status' : 'Eror finding the user.'});
								}								
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
		collection = db.collection('users');
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
	isLoggedIn(req,res,function()
	{
		var empty = {};
		res.send(JSON.stringify(empty));
	});
}

module.exports['RetriveAllFriendByType'] = function(req,res)
{
	isLoggedIn(req,res,function()
	{
		var uId = req.params.userId;
		var uFriendsType = req.params.friendtype;
		collection = db.collection('users');
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
			collection.findOne({ _id: new ObjectID(uId) , FriendsList: { $elemMatch: {Type : uFriendsType}}} , 
				function(err,result)
				{
					if(!err)
						res.send(result);
					else
						res.send({'Status' : 'Eror finding the user.'});
				}
			);
		}
	});
}
/*######################################## -- End Logic -- #############################################################*/