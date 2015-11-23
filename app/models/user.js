var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({ 
        doctorname: String, 
        practicename: String,
        accupuncture: String,
        mobilenumber: Number,
        country: String,
        city: String,
    registration: {
            number: Number,
            name: String,
            year: Number
        },
    award: {
        name: String,
        year: Number
    },
    address: {
        fulladdress: String,
        pin: Number,
        city: String,
        country: String,
        latitude: Number,
        longitude: Number
    },
    membership: {
        name: String
    },
    organisation: {
        name: String,
        address: String,
        phone: Number,
        mobile: Number
    },
    qualification: {
        degree: String,
        college: String,
        year: Number
    },
    service: {
        name: String
    },
    specialization: {
        name: String
    },
    local: {       
    	username: String,
    	password: String,
        role: String  
    },
    facebook: {
    	id: String,
    	token: String,
    	email: String,
    	name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);

//appID = 430193130520332
//appSecret = 4e3f8e017b965f2ef745f896a8c792d4