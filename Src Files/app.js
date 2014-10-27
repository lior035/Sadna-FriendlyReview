var express = require('express');
var app = express();
var logic = require('./logic.js');
var fs = require('fs');

//there is a very importent meaning of the order for the use's please do not change - Yosi!!!!!
app.use(express.logger());
app.use(express.methodOverride());
app.use("/public",express.static(__dirname + '/public'));
app.use(express.cookieParser('big secret'));
app.use(express.bodyParser());
 app.use(express.session({ secret: 'keyboard cat' }));
logic.initializePassport(app);
app.use(app.router);


app.get('/', logic.returnEmptyJSON);
app.get('/user/getUser/:userId',logic.getUserByID);

app.post('/SignUp/:userEmail', logic.signupNewUser);				   				// 3.1.1
app.post('/checkAuth', logic.check_auth);					   					
app.post('/user/:userId', logic.updateUser);					   						// 3.1.3
app.post('/Home/logout', logic.logout);				   					// 3.1.4
app.post('/user/UpdatePasswordInDB/:userId', logic.updatePasswordInDB);		   		// 3.1.5 
app.post('/user/ChangePasswordInDB/:Email', logic.changePasswordInDB);	
app.post('/user/changeAddressOfUser/:userId',logic.changeUserAddressCP);
app.post('/user/toggleFacebookStatus/:userId',logic.toggleFacebookStatusForUser);  	// 3.1.6
app.post('/user/setFacebookTokenForUser/:userId',logic.setFacebookUrlForUser);
app.post('/user/CheckForCorrectAnswer/:Email', logic.checkIfUserAnswerIsCorrect); 	// 3.1.7
app.post('/reviews/syncwithfacebook/:userId', logic.syncWithFacebook);		   			// 3.2.1
app.post('/reviews/updateFriendsList/:userId', logic.updateFriendsList);
app.get('/friends/:userId', logic.getUserFriends);				   				// 3.2.2
app.put('/friends/favoritesstatus/:userId', logic.ChangeFriendsStatusInDB);  	  		// 3.2.3 and 3.2.4
app.post('/friends/type/:userId', logic.RetriveAllFriendByType);		   		// 3.2.5
app.get('/user/RetriveQesByMail/:email',logic.RetriveQesByMail);
app.post('/user/AddFriend/:userId',logic.AddFriendToUser);
app.post('/user/RemoveFriend/:userId',logic.RemoveFriendFromUser);


app.get('/reviews/:businessId', logic.getReviews);				   					// 3.3.1
app.post('/reviews/addReview', logic.addReview);				   					// 3.3.2
app.delete('/review/:reviewId', logic.removeReview);				   				// 3.3.3
app.post('/businesses/filter', logic.filterBusinesses);				   				// 3.4.1
app.get('/business/:businessId', logic.getBusiness);				   				// 3.4.2

//3.4.3 local function in logic.js

app.post('/business/RetrieveAverageScore/:businessId', logic.RetriveAvarageRating); 	// 3.4.4
//app.put('/business/UpdateAverageScore/:businessId,type', logic.UpdateAverageBusinessScore);	//3.4.5
// update is done on addreview and removerewview.
app.post('/business/MeetMeUpInvite/:businessId', logic.meetMeUp);	// 3.4.6 

app.get('/business/calculateAverage/:businessId',logic.calculateBusinessOfFriendsAverage); 	// 3.4.7
app.post('/businesses/geofilter', logic.geoFilterBusiness);
app.get('/friends/getHashFriends/:uid', logic.getHashFriends); 									// 3.4.8
app.post('/', function (req,res){console.log(req.body);res.send(JSON.stringify(req.body.TextInput))});

// Handle Not Found pages.

app.use(function(req,res){
	res.redirect('public/index.html#404page');	
});

var port = 8000;
//var host = '10.0.0.8';

console.log('server is listening, port:' + port);
app.listen(port);

