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
module.exports = {
  show_category,
  new_category,
  delete_category
}