var http = require('http'),
    express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('connect-flash');

var port = process.env.PORT || 8080;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("LocalStrategy working...");
        return done(null, { id: 1, username: 'Joe', password: 'schmo'});
    }
));

var app = express();

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
});

app.get('/', function(req, res){

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
});

app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/');
});

app.listen(port);