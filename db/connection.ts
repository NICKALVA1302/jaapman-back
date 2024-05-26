import {Sequelize} from 'sequelize'

const db= new Sequelize('jaapmanprueba', 'root', 'admin',{
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    define:{
        freezeTableName:true
    }
    //logging:false,
});



export default db;