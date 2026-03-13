const express = require("express");
const proxy = require("express-http-proxy");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => res.send("Gateway running"));

// /customer -> http://localhost:8002
app.use("/customer", proxy(process.env.CUSTOMER_URL, {
  proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/customer/, "")
}));

// /product -> http://localhost:8001
app.use("/product", proxy(process.env.PRODUCT_URL, {
  proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/product/, "")
}));

// /management -> http://localhost:8003
app.use("/management", proxy(process.env.MANAGEMENT_URL, {
  proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/management/, "")
}));

app.listen(PORT, () => {
  console.log(`Gateway is running on Port ${PORT}`);
});
