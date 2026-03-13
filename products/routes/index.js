var express = require('express');
var router = express.Router();
const db = require('../models');

/* Home page */
router.get('/', function(req, res) {
  res.send("Welcome to Product service");
});

/* GET product by ID */
router.get('/:id', async function(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send("Invalid product id");
  }

  const sql = `
    SELECT
      p.ProductID AS ProductId,
      p.Name AS ProductName,
      pm.Name AS ProductModel,
      pc.Name AS ProductCategory,
      p.Color,
      p.Size,
      p.Weight,
      p.ListPrice,
      CONVERT(varchar(10), p.SellStartDate, 103) AS SellStartDate
    FROM SalesLT.Product p
    LEFT JOIN SalesLT.ProductModel pm
      ON p.ProductModelID = pm.ProductModelID
    LEFT JOIN SalesLT.ProductCategory pc
      ON p.ProductCategoryID = pc.ProductCategoryID
    WHERE p.ProductID = :id;
  `;

  try {
    const [rows] = await db.sequelize.query(sql, {
      replacements: { id }
    });

    if (!rows || rows.length === 0) {
      return res.status(404).send("Product has not been found");
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
