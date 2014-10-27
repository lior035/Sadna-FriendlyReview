var express = require('express');
var app = express();
var logic = require('./logic.js');
var passportConfig = require('./passport.js');
var flash = require('connect-flash');


app.use(express.logger());
app.use(express.bodyParser());
app.use(app.router);
app.use("/public",express.static(__dirname + '/public'));
app.use(express.cookieParser('big secret'));
app.use(express.methodOverride());
app.use(express.cookieSession()); 
app.use(flash());
passportConfig.initializePassport(app);
app.use(app.router);


app.get('/', logic.returnEmptyJSON);
app.post('/SignUp/:userEmail',  logic.signupNewUser);
app.get('/login', function(req, res){

    var message = 'test';
    var body = '<div><p>' + message + '</p></div>';
    body = body + '<form action="/login" method="post">';
    body = body + '<div><label>Username:</label>';
    body = body + '<input type="text" name="username"/><br/></div>';
    body = body + '<div><label>Password:</label>';
    body = body + '<input type="password" name="password"/></div>';
    body = body + '<div><input type="submit" value="Submit"/></div></form>';
    res.send(body);
});
app.post('/login', passportConfig.autenticateUser);									   				// 3.1.1
//app.post('/Login/:userEmail', passportConfig.autenticateUser);				   				// 3.1.2
app.post('/user/:uid', passportConfig.updateUser);					   						// 3.1.3
app.post('/Home/Logout/:userEmail', passportConfig.logout);				   					// 3.1.4
app.post('/user/UpdatePasswordInDB/:userId', passportConfig.updatePasswordInDB);		   		// 3.1.5 
app.post('/user/toggleFacebookStatus/:userId',passportConfig.toggleFacebookStatusForUser);  	// 3.1.6
app.post('/user/CheckForCorrectAnswer/:userId', passportConfig.checkIfUserAnswerIsCorrect); 	// 3.1.7
app.post('/reviews/syncwithfacebook/:uid', passportConfig.syncWithFacebook);		   			// 3.2.1
app.get('/friends/:userEmail', passportConfig.getUserFriends);				   				// 3.2.2
app.put('/friends/favoritesstatus/:uid', passportConfig.ChangeFriendsStatusInDB);  	  		// 3.2.3 and 3.2.4
app.get('/friends/type/:uid,friendtype', passportConfig.RetriveAllFriendByType);		   		// 3.2.5
app.get('/reviews/:businessId', logic.getReviews);				   					// 3.3.1
app.post('/reviews/addReview', logic.addReview);				   					// 3.3.2
app.delete('/review/:reviewId', logic.removeReview);				   				// 3.3.3
app.post('/businesses/filter', logic.filterBusinesses);				   				// 3.4.1
app.get('/business/:businessId', logic.getBusiness);				   				// 3.4.2

//3.4.3 local function in logic.js

app.get('/business/RetrieveAverageScore/:businessId,type', logic.RetriveAvarageRating); 	// 3.4.4
app.put('/business/UpdateAverageScore/:businessId,type', logic.UpdateAverageBusinessScore);	//3.4.5

app.post('/business/MeetMeUpInvite/:businessId', logic.meetMeUp);	// 3.4.6 

app.get('/business/calculateAverage/:businessId',logic.calculateBusinessOfFriendsAverage); 	// 3.4.7
app.get('/businesses/geofilter', logic.geoFilterBusiness); 									// 3.4.8
app.post('/', function (req,res){console.log(req.body);res.send(JSON.stringify(req.body.TextInput))});

var port = 8000;
//var host = '10.0.0.8';

console.log('server is listening, port:' + port);
app.listen(port);

