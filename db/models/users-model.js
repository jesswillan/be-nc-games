const db = require('../connection');

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then((res) => {
    return res.rows;
  });
};
