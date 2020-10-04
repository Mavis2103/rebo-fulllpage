const db = require("../../config/mysql")
const show_category = (req, res) => {
  let getCategory = "select*from Category"
  db.query(getCategory, (err, data) => {
    if (err) throw err;
    res.render("admin/management_category", {
      category: data
    })
  })
}
const new_category = (req, res) => {
  let categoryName = req.body.categoryName;
  let createCategory = "insert into Category (categoryName) value(?)";
  db.query(createCategory, [categoryName], (err, data) => {
    if (err) throw err;
    res.redirect("/category_management")
  })
}
const delete_category = (req, res) => {
  let categoryID = req.params.categoryID;
  let deleteCategory = "delete from Category where categoryID=?"
  db.query(deleteCategory, [categoryID], (err, data) => {
    if (err) throw err;
    res.redirect("/category_management")
  })
}
const detail_category = (req, res, next) => {
  let categoryID = req.params.categoryID;
  const getCategory = "select*from Category where categoryID=?";
  db.query(getCategory, [categoryID], (err, data) => {
    if (err) next(err);
    res.render("admin/management_category-detail", {
      data
    })
  })
}
const update_category = (req, res, next) => {
  let categoryName = req.body.categoryName;
  let categoryID = req.params.categoryID;
  const update = "update Category set categoryName=? where categoryID=?";
  db.query(update, [categoryName, categoryID], (err, data) => {
    if (err) next(err);
    res.redirect(`/category/${categoryID}`)
  })
}
module.exports = {
  show_category,
  new_category,
  delete_category,
  detail_category,
  update_category
}