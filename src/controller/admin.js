const User = require('../models/user');
const unlockUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                succes: false,
                error: 'el correo ingresado no existe'
            });
        }
        user.status = true;
        user.attemps = 0;
        await user.save();
        return res.status(200).json({
            succes: true,
            message: 'El usuario ha sido desbloqueado(masculino)'
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: 'El usuario no ha sido desbloqueado.',
            error: error.message,
        })
    }
}
const unlocked = async (req, res) => {
    try {
        const user = await User.find({ status: false });
        if (!user || user.length === 0) return res.status(400).json({
            success: false,
            message: 'Aquí no hay usuarios bloqueados'
        });

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error servidor',
            error: error.message
        });
    }
}

module.exports = {
    unlockUser,
    unlocked
}