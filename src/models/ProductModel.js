module.exports = async function (Sequelize, sequelize){
    return sequelize.define("products", {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4(),
            primaryKey: true,
        },
        product_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        product_price:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        }
    })
}