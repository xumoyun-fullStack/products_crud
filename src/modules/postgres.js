const { Sequelize } = require("sequelize");
const { DB_URL } = require("../../config");
const ProductModel = require("../models/ProductModel");


const sequelize = new Sequelize(DB_URL,{
   
});

module.exports = async function(){
    try{
        const db = {}

        db.products = await ProductModel(Sequelize, sequelize);

        sequelize.sync({alter: false});

        return db;
    }catch(e){
       
    }
}