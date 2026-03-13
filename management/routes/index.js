var express = require('express');
var router = express.Router();
const db = require('../models');

// Helper to render simple HTML table
function renderTable(title, rows) {
  if (!rows || rows.length === 0) {
    return `<h1>${title}</h1><p>No results</p><p><a href="/management">Back</a></p>`;
  }

  const cols = Object.keys(rows[0]);
  const thead = cols.map(c => `<th>${c}</th>`).join('');
  const tbody = rows.map(r =>
    `<tr>${cols.map(c => `<td>${r[c] ?? ''}</td>`).join('')}</tr>`
  ).join('');

  return `
    <h1>${title}</h1>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead><tr>${thead}</tr></thead>
      <tbody>${tbody}</tbody>
    </table>
    <p><a href="/management">Back</a></p>
  `;
}

/* Management home with links */
router.get('/', function(req, res) {
  // Always show gateway-safe links
  res.send(`
    <h1>Welcome to Management service</h1>
    <ul>
      <li><a href="/management/querya">Query A</a></li>
      <li><a href="/management/queryb">Query B</a></li>
      <li><a href="/management/queryc">Query C</a></li>
      <li><a href="/management/queryd">Query D</a></li>
      <li><a href="/management/querye">Query E</a></li>
	  <li><a href="/management/queryf">Query F (Export)</a></li>
	  <li><a href="/management/queryg">Query G (Export)</a></li>
	  <li><a href="/management/queryh">Query H (Export)</a></li>
    </ul>
  `);
});

/* Query A */
router.get('/querya', async (req, res) => {
  const sql = `
    SELECT DISTINCT Name AS ProductCategoryName
    FROM SalesLT.ProductCategory
    WHERE ParentProductCategoryID IS NULL
    ORDER BY Name ASC;
  `;
  const [rows] = await db.sequelize.query(sql);
  res.send(renderTable("Query A", rows));
});

/* Query B */
router.get('/queryb', async (req, res) => {
  const sql = `
    SELECT
      pc.Name AS ProductCategory,
      AVG(p.ListPrice) AS AvgListPrice
    FROM SalesLT.Product p
    INNER JOIN SalesLT.ProductCategory pc
      ON p.ProductCategoryID = pc.ProductCategoryID
    GROUP BY pc.Name
    ORDER BY AvgListPrice DESC;
  `;
  const [rows] = await db.sequelize.query(sql);
  res.send(renderTable("Query B", rows));
});

/* Query C */
router.get('/queryc', async (req, res) => {
  const sql = `
    SELECT
      parent.Name AS ParentCategory,
      AVG(p.ListPrice) AS AvgListPrice
    FROM SalesLT.Product p
    INNER JOIN SalesLT.ProductCategory child
      ON p.ProductCategoryID = child.ProductCategoryID
    INNER JOIN SalesLT.ProductCategory parent
      ON child.ParentProductCategoryID = parent.ProductCategoryID
    GROUP BY parent.Name
    ORDER BY AvgListPrice ASC;
  `;
  const [rows] = await db.sequelize.query(sql);
  res.send(renderTable("Query C", rows));
});

/* Query D */
router.get('/queryd', async (req, res) => {
  const sql = `
    SELECT COUNT(DISTINCT CustomerID) AS CustomerCount
    FROM SalesLT.SalesOrderHeader
    WHERE OrderDate >= '20080601'
      AND OrderDate <  '20080616';
  `;
  const [rows] = await db.sequelize.query(sql);
  res.send(renderTable("Query D", rows));
});

/* Query E */
router.get('/querye', async (req, res) => {
  const sql = `
    SELECT CustomerID, FirstName, LastName
    FROM SalesLT.Customer
    WHERE FirstName LIKE 'a%'

    INTERSECT

    SELECT CustomerID, FirstName, LastName
    FROM SalesLT.Customer
    WHERE LastName LIKE '%e';
  `;
  const [rows] = await db.sequelize.query(sql);
  res.send(renderTable("Query E", rows));
});

/* Query F */
router.get('/queryf', async (req, res) => {
  const sql = `
    SELECT
      c.Title,
      c.FirstName,
      c.MiddleName,
      c.LastName,
      c.CompanyName,
      a.City,
      a.CountryRegion,
      a.StateProvince
    FROM SalesLT.Customer c
    INNER JOIN SalesLT.CustomerAddress ca
      ON c.CustomerID = ca.CustomerID
    INNER JOIN SalesLT.Address a
      ON ca.AddressID = a.AddressID
    ORDER BY a.CountryRegion, a.StateProvince, a.City, c.LastName, c.FirstName;
  `;
  const [rows] = await db.sequelize.query(sql);
  res.render('queryf', { query: rows });
});

/* Query G */
router.get('/queryg', async (req, res) => {
  const sql = `
    SELECT
      p.ProductNumber,
      pm.Name AS ProductName,
      p.Color
    FROM SalesLT.Product p
    INNER JOIN SalesLT.ProductModel pm
      ON p.ProductModelID = pm.ProductModelID
    WHERE p.Color IS NOT NULL AND LTRIM(RTRIM(p.Color)) <> ''
    ORDER BY pm.Name, p.ProductNumber;
  `;
  const [rows] = await db.sequelize.query(sql);
  res.render('queryg', { query: rows });
});

/* Query H */
router.get('/queryh', async (req, res) => {
  const sql = `
    SELECT
      p.Name AS ProductName,
      sod.UnitPrice,
      sod.OrderQty,
      sod.LineTotal
    FROM SalesLT.SalesOrderDetail sod
    INNER JOIN SalesLT.Product p
      ON sod.ProductID = p.ProductID
    ORDER BY p.Name;
  `;
  const [rows] = await db.sequelize.query(sql);
  res.render('queryh', { query: rows });
});


module.exports = router;
