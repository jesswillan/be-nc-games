const db = require('../connection');

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then((res) => {
    // console.log(res.rows, '<<<res')
    return res.rows; 
  });
};
