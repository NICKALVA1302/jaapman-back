import {Sequelize} from 'sequelize'

//cambiar a jaapman
const db= new Sequelize('jaapman', 'root', 'admin',{
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    define:{
        freezeTableName:true
    }
    //logging:false,
});



export default db;