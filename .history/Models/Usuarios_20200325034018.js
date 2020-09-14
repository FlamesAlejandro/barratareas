const Sequelize = require('sequelize');
const db = require('../config/db')
const Proyectos = require('../Models/Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        //validar email - no vacio
        validate: {
            isEmail: {
                msg: 'Agrega un email válido'
            },
            notEmpty: {
                msg: 'El email no puede estar vacio'
            }
        },
        //no repetidos
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede estar vacio'
            }
        }
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    }
},
{
    // HOOKS PARA HASHEAR LA PASSWORD
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});



// Metodos personalizados
Usuarios.prototype.verificarPassword = function(password){
    // comparar las password con  bcrypt
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(proyectos);

// Usuarios.hasMany(Proyectos, {
//     as: 'proyectos',
//     foreignKey: 'usuarioId',
//     sourceKey: 'id'
// });

module.exports = Usuarios;
