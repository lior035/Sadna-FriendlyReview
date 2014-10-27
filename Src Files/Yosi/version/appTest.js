var express = require('express');
var app = express();

var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
/***********************************************************************/
/*
var user       		= require('./users');

	passport.use('local-signup', new LocalStrategy({       
        usernameField : 'Email',
        passReqToCallback : true
    },
	    function(req, email, password, done) {		
			console.log('in local signup.....');
		}
));
    passport.use('local-login', new LocalStrategy({
        usernameField : 'Email',
        passReqToCallback : true 
    },
    function(req, email, password, done) 
	{
		console.log('in local signup.....');
	}
));

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
		console.log('Serializing....');
        done(null, user.Email);
    });

    passport.deserializeUser(function(id, done) {
		console.log('De-serializing....');
        User.findById(Email, function(err, user) {
            done(err, user);
        });
    });
};

  
 passport.use(new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password'
  },
  function(username, password, done) {
    User.findOne({ Email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
)); */

 passport.use(new LocalStrategy({
    usernameField: 'Email',
  },
  function(username, done) {
    User.findOne({ Email: username }, function(err, user) {
	console.log('in use of passport2....');
      if (err) { return done(err); }
      if (!user) {
		console.log('in use of passport1....');
        return done(null, false, { message: 'Incorrect username.' });
      }
	  console.log('in use of passport2....');
      return done(null, user);
    });
  }
));

/* app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',}));	 */						   

app.post('/login', { failureRedirect: '/loginerror'},function(req,res)
{
	console.log('in authentication......');
	passport.authenticate('local', function(req,res)
		{
				//var empty = {};
				//res.send(JSON.stringify(empty));
		}
	);
	console.log('after authentication......');
});								   
								   
app.get('/loginerror') function(req,res) {
    console.log("login error!!!!");
    res.redirect('/login');
}

var port = 5000;
//var host = '10.0.0.8';

console.log('server is listening, port:' + port);
app.listen(port);