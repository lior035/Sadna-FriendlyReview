var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('connect-flash');

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
var collection;
	
//var port = process.env.PORT || 8080;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("LocalStrategy working...");
		
		collection = db.collection('users');
		collection.find({Email: username }).toArray(function(err,results)
		{
			if(!err)
			{		
				console.log("" + results.length);
				for (var j = 0 ; j < results.length; j++)
				{					
					if(results[j].FirstName == password)
					{
						console.log("results[" + j + "]="+ JSON.stringify(results[j]));	
						console.log("!!!!!!!!" + results[j].FirstName);	
						done(null,results[j]);
					}
				}
				//console.log("user name: " + username + " Password: " + result.FirstName + " " + JSON.stringify(collection.find()));				
			}
		});
    }
));

/* var app = express();

app.configure(function(){
    //app.use(express.static(__dirname + '/app'));
    app.use(express.cookieParser('big secret'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieSession()); 
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
}); */

/* app.get('/', function(req, res){

    var username = "not logged in";

    if (req.user) {
        username = req.user.username;
    }

    var body = '<html><body>';
    body = body + '<p>' + username + '</p>';
    body = body + '<a href="/login">login</a>'
    body = body + '</body></html>'

    res.send(body);
});

app.get('/login', function(req, res){

    var message = req.flash('error');
    var body = '<div><p>' + message + '</p></div>';
    body = body + '<form action="/login" method="post">';
    body = body + '<div><label>Username:</label>';
    body = body + '<input type="text" name="username"/><br/></div>';
    body = body + '<div><label>Password:</label>';
    body = body + '<input type="password" name="password"/></div>';
    body = body + '<div><input type="submit" value="Submit"/></div></form>';
    res.send(body);
}); */

//app.post('/login', autenticateUser);

/*######################################## -- Global Functions -- ##############################################*/
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
module.exports['initializePassport'] = function(app)
{
	app.use(passport.initialize());
	app.use(passport.session());
}

/*######################################## -- End Global Functions -- ##############################################*/

/*######################################## -- Logic -- #############################################################*/

module.exports['autenticateUser'] = function(req,res)
{
	console.log('befor authenticate......');
	
	/*Note: passport.authenticate() middleware invokes req.login() automatically.
	This function is primarily used when users sign up, during which req.login() 
	can be invoked to automatically log in the newly registered user.*/
	
	passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
		console.log('in authenticate......');
        res.redirect('/');
	}
}

module.exports['updateUser'] = function(req,res)
{
	var uEmail = req.params.Email;
	var uAdress = req.params.Adress;
	var uBirthdate = req.params.Birthdate;
	collection = db.collection('users');
	collection.update(	{ Email: uEmail }, 
						{ $set: { Adress: uAdress , Birthdate: uBirthdate}});
}

module.exports['logout'] = function(req,res)
{
		req.logout();
		res.redirect('/login');
}

module.exports['updatePasswordInDB'] = function(req,res)
{
	var uEmail = req.params.Email;
	var uPass = req.params.Password;
	var uVerifyPassword = req.params.VerifyPassword;
	collection = db.collection('users');
	collection.update(	{ Email: uEmail }, 
						{ $set: { Password: uPass , VerifyPassword: uVerifyPassword}});
}

module.exports['check_auth'] = function(req,res)
{
	isLoggedIn(req,res,function()
		{
			res.send(JSON.stringify({Result: 'Sucsess'}));
		}
	);
}

module.exports['checkIfUserAnswerIsCorrect'] = function(req,res)
{
	var uEmail = req.params.Email;
	var uAns = req.params.Answer;
	collection = db.collection('users');
	var result = collection.findOne({Email: uEmail });
	if(result)
	{
		if(results[j].AnsOfSecQues == uAns)
		{
			res.send(JSON.stringify({Result: 'Sucsess'}));
		}
	}
	else
		res.send(JSON.stringify({Result: 'Eror finding the user.'}));
}

module.exports['getUserFriends'] = function(req,res)
{
	var uEmail = req.params.Email;
	var uFriendsType = req.params.Type;
	collection = db.collection('users');
	var result = collection.findOne({Email: uEmail });
	if(result)
		res.send(result.FriendsList);
	else
		res.send(JSON.stringify({Result: 'Eror finding the user.'}));
}

module.exports['ChangeFriendsStatusInDB'] = function(req,res)
{
	var uEmail = req.params.Email;
	var uFriendsID = req.params.FriendsID;
	var uFriendsStatus = req.params.Status;
	collection = db.collection('users');
	var result = collection.findOne({Email: uEmail });
	if(result)
	{
		result.FriendsList.update(	{ Status: uFriendsStatus},
									{ $set: { Status: uFaceStat}});
	}
	else
		res.send(JSON.stringify({Result: 'Eror finding the user.'}));
}

module.exports['toggleFacebookStatusForUser'] = function(req,res)
{
	var uEmail = req.params.Email;
	var uFaceStat = req.params.FaceStat;
	collection = db.collection('users');
	collection.update(	{ Email: uEmail }, 
						{ $set: { EnableFacebookAccess: uFaceStat}});
}

module.exports['syncWithFacebook'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}

module.exports['RetriveAllFriendByType'] = function(req,res)
{
	var uEmail = req.params.Email;
	var uFriendsStatus = req.params.Status;
	collection = db.collection('users');
	var result = collection.findOne({Email: uEmail });
	if(result)
	{
		result.FriendsList.find({Status: uFriendsStatus}).toArray(res.send(Friendsresults));
	}
	else
		res.send(JSON.stringify({Result: 'Eror finding the user.'}));
}
/*######################################## -- End Logic -- #############################################################*/

//app.listen(port);