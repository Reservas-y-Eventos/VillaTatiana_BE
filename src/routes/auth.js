const {Router} = require('express');
const { check } = require('express-validator');
const {signUp, signIn, changeOfPassword, forgotPassword, validationToken } = require('../controller/auth');
const { validateResult } = require('../helper/validation');
const { validator } = require('../middleware/valdiator');


const router = Router();
//registro
router.post('/signUp', signUp );
//inicio de sesion
router.post('/signIn', signIn );

router.put('/firsLogin/:email',[check('newPassword').isStrongPassword({
        minLowercase: 1,
        minUppercase: 1, 
        minNumbers: 1, 
        minSpecialChar: 1,
}).withMessage("La contraseña debe ser mayor que 8 y contener al menos una letra mayúscula, una letra minúscula y un número"),validateResult],changeOfPassword);
router.post('/forgotpassword',forgotPassword);
router.get('/validationToken',validator,validationToken)


module.exports= router;