/* eslint-disable consistent-return */
const {
  v4: uuidv4,
  v5: uuidv5,
} = require('uuid');
const db = require('../../config/mysql');

const show_category = (_req, res, next) => {
  const getCategory = 'select*from Category';
  db.query(getCategory, (err, data) => {
    if (err) return next(err);
    res.render('admin/management_category', {
      category: data,
    });
  });
};
const new_category = (req, res, next) => {
  const namespace = '803ef784-bf88-40c5-8c42-ee68463ac17b';
  const id = uuidv5(uuidv4(), namespace);
  const categoryID = id.split('-').join('');
  const { categoryName } = req.body;
  const createCategory = 'insert into Category (categoryID,categoryName) value(?,?)';
  db.query(createCategory, [categoryID, categoryName], (err) => {
    if (err) return next(err);
    res.redirect('/category_management');
  });
};
const delete_category = (req, res, next) => {
  const { categoryID } = req.params;
  const deleteCategory = 'delete from Category where categoryID=?';
  db.query(deleteCategory, [categoryID], (err) => {
    if (err) return next(err);
    res.redirect('/category_management');
  });
};
const detail_category = (req, res, next) => {
  const { categoryID } = req.params;
  const getCategory = 'select*from Category where categoryID=?';
  db.query(getCategory, [categoryID], (err, data) => {
    if (err) return next(err);
    res.render('admin/management_category-detail', {
      data,
    });
  });
};
const update_category = (req, res, next) => {
  const { categoryName } = req.body;
  const { categoryID } = req.params;
  const update = 'update Category set categoryName=? where categoryID=?';
  db.query(update, [categoryName, categoryID], (err) => {
    if (err) return next(err);
    res.redirect(`/category/${categoryID}`);
  });
};
module.exports = {
  show_category,
  new_category,
  delete_category,
  detail_category,
  update_category,
};
