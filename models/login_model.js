
const login = {
    checkPassword: function(login_username, callback) {
        return db.query('userNick and password', login_username, callback);
    }
};

export default login;
module.exports=login;