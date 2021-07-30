const bcrypt = require('bcrypt');

class Helper {
    passwordCheck(loginData, databaseData){
        return(loginData && databaseData) ? (bcrypt.compareSync(loginData, databaseData)):false;
    } 
      }

    //exporting module
module.exports = new Helper();