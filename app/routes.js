var User = require('./models/user.js');
//var passport = require('../config/passport.js');
//var passport = require("passport");
var ObjectId = require('mongodb').ObjectID;
module.exports = function(app, passport){
	app.get('/', function(req,res){
		//res.send("Hello world");
		res.render("../views/index.ejs");
	});

    app.get('/doctors', function(req, res){
        User.find({"local.role": "doctor"}, function(err, docs){
            if(err) res.json(err);
            else res.render('doctors.ejs', {users: docs});
        });        
    });

    app.get('/login', function(req, res){
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/docprofile',
        failureRedirect: '/login',
        failureFlash: true
    }));

	app.get('/signup', function(req, res){
		res.render('../views/signup.ejs', {message: req.flash('signupMessage')});
	});

    app.get('/doctors/:id', function(req, res){
        //res.send(req.params.id.valueOf());
        //res.send({"_id": req.params.var}); 
        res.send("hello");
             
    });

    app.get('/docprofile/editregistration', function(req, res){
        res.render('../views/editregistration.ejs');
    });

    app.post('/docprofile/editregistration', function(req, res){        
            User.update({_id: req.user._id}, 
                        {  
                            "registration.number": req.body.registrationnumber,
                            "registration.name": req.body.name,               
                            "registration.year": req.body.year           
                        }, function(err){                                   
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });       
    });

    app.get('/docprofile/editaddress', function(req, res){
        res.render('../views/editaddress.ejs');
    });

    app.post('/docprofile/editaddress', function(req, res){        
            User.update({_id: req.user._id}, 
                        {  
                            "address.fulladdress": req.body.fulladdress,
                            "address.pin": req.body.pin,               
                            "address.city": req.body.city,   
                            "address.country": req.body.country,
                            "address.latitude": req.body.latitude,
                            "address.longitude": req.body.longitude       
                        }, function(err){                               
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });       
    });

    app.get('/docprofile/editaward', function(req, res){
        res.render('../views/editaward.ejs');
    });

    app.post('/docprofile/editaward', function(req, res){        
            User.update({_id: req.user._id}, 
                        {  
                            "award.name": req.body.name,
                            "award.year": req.body.year           
                        }, function(err){                                    
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });       
    });

    app.get('/docprofile/editmembership', function(req, res){
        res.render('../views/editmembership.ejs');
    });

    app.post('/docprofile/editmembership', function(req, res){        
            User.update({_id: req.user._id}, 
                        {  
                            "membership.name": req.body.name                                     
                        }, function(err){                                    
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });       
    });

    app.get('/docprofile/editorganisation', function(req, res){
        res.render('../views/editorganisation.ejs');
    });

  

    app.post('/docprofile/editorganisation', function(req, res){        
            User.update({_id: req.user._id}, 
                        {  
                            "organisation.name": req.body.name,
                            "organisation.address": req.body.address,
                            "organisation.phone": req.body.phone,
                            "organisation.mobile": req.body.mobile
                        }, function(err){                                    
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });       
    });

    app.get('/docprofile/editqualification', function(req, res){
        res.render('../views/editqualification.ejs');
    });

    app.post('/docprofile/editqualification', function(req, res){        
            User.update({_id: req.user._id}, 
                        {  
                            "qualification.degree": req.body.degree,
                            "qualification.college": req.body.college,
                            "qualification.year": req.body.year                                                               
                        }, function(err){                                    
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });       
    });

    app.get('/docprofile/editservice', function(req, res){
        res.render('../views/editservice.ejs');
    });

    app.post('/docprofile/editservice', function(req, res){        
            User.update({_id: req.user._id}, 
                        {  
                            "service.name": req.body.name                                                                                           
                        }, function(err){                                    
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });       
    });

    app.get('/docprofile/editspecialization', function(req, res){
        res.render('../views/editspecialization.ejs');
    });

    app.post('/docprofile/editspecialization', function(req, res){        
            User.update({_id: req.user._id}, 
                        {  
                            "specialization.name": req.body.name                                                                                           
                        }, function(err){                                                        
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });       
    });

	//app.post('/signup', function(req, res){
	//	var newUser = new User();
    //	newUser.local.username = req.body.email;
    //	newUser.local.password = req.body.password;
    //  newUser.local.role = req.body.role;
    //  console.log(newUser.local.username + " " + newUser.local.password + " " + newUser.local.role);
    //	newUser.save(function(err){
    //		if(err)
    //			throw err;    		
    //	});
    //	res.redirect('/');

	//});

    //app.post('/signup', function(req, res){
   	//res.send("hello");
   	//res.end();
    //});
    
    app.post('/signup', passport.authenticate('local-signup', {
    	successRedirect: '/docreg',
    	failureRedirect: '/signup',
    	failureFlash: true
    }));

    app.get('/docreg', function(req, res){             
        res.render('../views/docreg.ejs');
    });

    app.post('/docreg', function(req, res){     
            User.update({_id: req.user._id}, 
                        {  
                            "doctorname": req.body.doctorname,
                            "practicename": req.body.practicename,
                            "accupuncture": req.body.accupuncture,
                            "mobilenumber": req.body.mobilenumber, 
                            "country": req.body.country,
                            "city": req.body.city
                        }, function(err){            
            if(err) res.json(err);
            else res.redirect('/docprofile');
        });    
    });

    app.get('/docprofile', function(req, res){
        res.render('../views/docprofile.ejs', { user: req.user });
    });

    app.post('/docprofile', function(req, res){
        res.send("doctor's profile is updated");
    });



    //app.post('/docreg', function(req, res){
      //var newUser = new User();
    //  newUser.local.doctorname = req.body.doctorname;     
    //  newUser.local.practicename = req.body.practicename;
    //  newUser.local.doctorname = req.body.doctorname;
    //  newUser.local.doctorname = req.body.doctorname;
    //  newUser.local.doctorname = req.body.doctorname;
    //  newUser.local.doctorname = req.body.doctorname;
    //  console.log(newUser.local.doctorname);
    //  newUser.save(function(err){
      //    if(err)
        //      throw err;          
    //  });
    //  res.redirect('/');
    //});


    app.get('/profile', isLoggedIn, function(req, res){
        res.render('../views/profile.ejs', { user: req.user });
    });

    // app.get('/:username/:password', function(req, res){
    //	var newUser = new User();
    //	newUser.local.username = req.params.username;
    //	newUser.local.password = req.params.password;
    //	console.log(newUser.local.username + " " + newUser.local.password);
    //	newUser.save(function(err){
    //		if(err)
    //			throw err;
    //	});
    //	res.send("successfull");
    // });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
       // passReqToCallback:true
    }));


    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
       // passReqToCallback:true
    }));    

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/login');
}