"use strict";var Sequelize=require("sequelize"),db=require("../config/db"),Proyectos=require("../Models/Proyectos"),bcrypt=require("bcrypt-nodejs"),Usuarios=db.define("usuarios",{id:{type:Sequelize.INTEGER,primaryKey:!0,autoIncrement:!0},email:{type:Sequelize.STRING(60),allowNull:!1,validate:{isEmail:{msg:"Agrega un email válido"},notEmpty:{msg:"El email no puede estar vacio"}},unique:{args:!0,msg:"Usuario ya registrado"}},password:{type:Sequelize.STRING(60),allowNull:!1,validate:{notEmpty:{msg:"El password no puede estar vacio"}}},activo:{type:Sequelize.INTEGER,defaultValue:0},token:Sequelize.STRING,expiracion:Sequelize.DATE},{hooks:{beforeCreate:function(e){e.password=bcrypt.hashSync(e.password,bcrypt.genSaltSync(10))}}});Usuarios.hasMany(Proyectos),Usuarios.prototype.verificarPassword=function(e){return bcrypt.compareSync(e,this.password)},module.exports=Usuarios;