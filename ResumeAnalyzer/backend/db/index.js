const {Pool}=require('pg')
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.query('select now()', (err, res)=> {
    if(err){
        console.log("Error: ", err.stack)
    }else{
        console.log("Database connected!!")
    }
});

module.exports=pool