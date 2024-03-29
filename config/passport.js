//var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		roleField: 'role',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				console.log(email);
				if(err)
				  return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already existed'));
				}		
				else{
					var newUser = new User();
					newUser.local.username = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.local.role = req.body.role;
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}		
			})
		});	
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(!user)
					return done(null, false, req.flash('loginMessage', 'No user found'));
				if(!user.validPassword(password))
					return done(null, false, req.flash('loginMessage', 'invalid password'));
				return done(null, user);
			})
		})
	}));

	passport.use('facebook', new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'email', 'gender']
	},
    function(accessToken, refreshToken, profile, done){
    	process.nextTick(function(){
    		User.findOne({'facebook.id': profile.id}, function(err, user){
    			if(err)
    				return done(err);
    			if(user)
    				return done(null, user);
    			else{
    				var newUser = new User();
    				newUser.facebook.id = profile.id;
    				console.log("id " + profile.id);
    				newUser.facebook.token = accessToken;
    				console.log("token "+accessToken);
    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
    				console.log("name "+ profile.name.givenName);
    				newUser.facebook.email = profile.emails[0].value;
    				console.log("email "+profile.emails[0].value);

    				newUser.save(function(err){
    					if(err)
    						throw err;
    					return done(null, newUser);
    				})	  				
    			}
    		});
    	});
    }
	));
    
    passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL,
        profileFields: ['id', 'email', 'gender']
	},
    function(accessToken, refreshToken, profile, done){
    	process.nextTick(function(){
    		User.findOne({'google.id': profile.id}, function(err, user){
    			if(err)
    				return done(err);
    			if(user)
    				return done(null, user);
    			else{
    				var newUser = new User();
    				newUser.google.id = profile.id;
    				newUser.google.token = accessToken;
    				newUser.google.name = profile.displayName;    				
    				newUser.google.email = profile.emails[0].value;
    				

    				newUser.save(function(err){
    					if(err)
    						throw err;
    					return done(null, newUser);
    				})	  				
    			}
    		});
    	});
    }
	));

};