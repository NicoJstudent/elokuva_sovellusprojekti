const db = require('../database');

const createAccount = function(accountData, callback) {
        return db.query(
                'INSERT INTO account (userNick, password, email) VALUES (?, ?, ?)',
                [accountData.userNick, accountData.password, accountData.email],
                callback
        );
};

const updateAccount = function(id, accountData, callback) {
        return db.query(
                'UPDATE account SET balance=?, debit_limit=? WHERE idAccount=?',
                [accountData.balance, accountData.debit_limit, id],
                callback
        );
};

const deleteAccount = function(id, callback) {
        return db.query('DELETE FROM account WHERE idAccount=?', [id], callback);
};

module.exports = {
    account,
    createAccount,
    updateAccount,
    deleteAccount
};
