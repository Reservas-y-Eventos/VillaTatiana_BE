const User = require('../models/user');
const { generateJWT } = require('../helper/jwt');
const bcrypt = require('bcryptjs');
const password = require('../helper/generate-password');
const sendEmail = require('../helper/nodemailer');

const signUp = async (req, res) => {
    const { email } = req.body;
    try {
        let validation = await User.findOne({ email }, { password: 0, oldPassword: 0 });
        if (validation) {
            return res.status(400).json({
                succes: false,
                error: `The user already exists try with a new one ${email}`,
                error: 'The email already exists'
            });
        }
        validation = new User(req.body);
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(validation.password, salt);
        validation.password = pass
        await validation.save();
        validation.oldPassword.push(validation.password);
        await validation.save().then((usuario) => {
            res.json({ mensaje: "Usuario creado correctamente", usuario });
        })
        .catch((error) => console.error(error));;
        await sendEmail({
            email: validation.email,
            subject: 'Welcome to NOTES',
            message: `Hi ${validation.name} ${validation.lastName},we send you the password to enter ---${password}---- remember that you must change the password in the first login, thank you for registering in our web application.`
        })
        const token = await generateJWT(
            validation.id,
            validation.name,
            validation.lastName,
            validation.phone,
            validation.email,
            validation.userName,
            validation.firstLogin,
            validation.state
        )


        
        return res.status(200).json({
            succes: true,
            validation,
            token,
        });
    

    } catch (error) {
        return res.status(500).json({
            succes: false,
            error: error.message
        })

    }
}
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validation = await User.findOne({ email });//,{password: 0, oldPassword: 0}
        
        if (!validation) {
            return res.status(400).json({
                succes: false,
                error: 'the email entered is not registered please check it',
                namError: 'mail not found'
            });
        }
        
   
        const compareValidation2 = bcrypt.compare(password, validation.password);
        const compareValidation = bcrypt.compareSync(password, validation.password);

        if (!compareValidation && validation.state == true) {
            if (validation.attempts < 3) {
                validation.attempts += 1;
                if (validation.attempts === 3) {
                    validation.state = false;
                }
                await validation.save();
            }
            return res.status(400).json({
                succes: false,
                error: 'the password entered is incorrect',
                error: 'Incorrect password'
            });
        }
        if (validation.state === false) {
            return res.status(400).json({
                    succes: false,
                    error: 'ha escrito mal tres veces la contraseña su usuario sera descativado',
                }) 
        }
        validation.attempts = 0;
        await validation.save();
        const token = await generateJWT(
            validation.name,
            validation.lastName,
            validation.phone,
            validation.email,
            validation.userName,
            validation.firstLogin,
            validation.state
        );
        return res.status(200).json({
            succes: true,
            validation,
            token
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            error: error.message
        });
    }


}



const changeOfPassword = async (req, res) => {
    const { email } = req.params;
    const { newPassword } = req.body;
    try {
        const validation = await User.findOne({ email });//,{password: 0, oldPassword: 0}
        if (!validation) {
            return res.status(400).json({
                succes: false,
                error: 'the email entered does not exist'
            });
        }
        const result = validation.oldPassword.some(old => bcrypt.compareSync(newPassword, old)); // boolean
        if (result) {
            return res.status(400).json({
                succes: false,
                error: 'The password entered has already been used, please enter a different one',
            });
        } else {
            if (validation.oldPassword.length === 2) {
                validation.oldPassword.pop();
            }
        }
        const salt = bcrypt.genSaltSync(10);
        validation.password = bcrypt.hashSync(newPassword, salt);
        validation.oldPassword.unshift(validation.password);
        validation.firstLogin = false;
        await validation.save();
        return res.status(200).json({
            succes: true,
            newPassword
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            error: error.message
        });
    }
}

const forgotPassword =async(req,res)=>{
    try {
        const {email} = req.body;
        const user  = await User.findOne({email});
    if (!user) {
        return res.status(400).json({
            succes: false,
            error: 'the email entered does not exist'
        });
    }
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    await sendEmail({
        email: user.email,
        subject: 'ForgotPassword',
        message: `Hi your new password is ${password} `
    })
    return res.status(200).json({
        succes: true,
        message: 'the password has been sent to your email'
    });
        
    } catch (error) {
        res.status(500).json({
            succes:false,
            message: error.message
        })
    }
    


}
const validationToken  =async (req,res)=>{
    try {
        res.status(200).json({
            succes:true,
            message:' toke is valid'
        })
    } catch (error) {
        res.status(200).json({
            succes:false,
            error: message.error
        }) 
    }
}
module.exports = {
    signUp,
    signIn,
    changeOfPassword,
    forgotPassword,
    validationToken
}