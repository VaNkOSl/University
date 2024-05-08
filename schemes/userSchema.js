const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true,
        validate: {
            validator: function(value) {
                // Проверка за поне една главна буква
                const hasUpperCase = /[A-Z]/.test(value);
                // Проверка за поне една малка буква
                const hasLowerCase = /[a-z]/.test(value);
                // Проверка за поне едно число
                const hasNumber = /\d/.test(value);
                // Проверка за поне един специален символ
                const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

                return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
            },
            message: props => `${props.value} Username must contain at least one uppercase letter, one lowercase letter, one number, and one special characte!`
        }
    },
    password:{
        type:String,
        required : true,
        validate: {
            validator: function(value) {
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);

                return hasUpperCase && hasLowerCase;
            },
            message: props => `${props.value} 
            The password must contain at least one lowercase letter and at least one uppercase letter!`
        }
    }
});

module.exports = userSchema;