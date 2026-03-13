var express = require('express');
var router = express.Router();
const db = require('../models');

/* Home page */
router.get('/', function(req, res) {
  res.send("Welcome to Customer service");
});

/* GET customers by last name prefix */
router.get('/:prefix', async function(req, res) {
  const prefix = (req.params.prefix || '').trim();

  const sql = `
    SELECT
      Title,
      FirstName,
      LastName,
      EmailAddress,
      Phone
    FROM SalesLT.Customer
    WHERE LastName LIKE :prefix
    ORDER BY LastName, FirstName;
  `;

  try {
    const [rows] = await db.sequelize.query(sql, {
      replacements: { prefix: `${prefix}%` }
    });

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
