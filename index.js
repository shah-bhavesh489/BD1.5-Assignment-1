let express = require('express');
let cors = require('cors');
let port = 3000;
let app = express();
app.use(cors());

app.use(express.static('static'));

// Server-side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//Endpoint 1: Calculate the total price of items in the cart
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal + newItemPrice;

  res.send(result.toString());
})


// Endpoint 2 : Apply a discount based on membership status
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  let result;

  if (isMember) {
    result = cartTotal - (cartTotal * (discountPercentage / 100));
  } else {
    result = cartTotal;
  }

  res.send(result.toString());
})


// Endpoint 3 : Calculate tax on the cart total
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal * (taxRate / 100);

  res.send(result.toString());
})


// Endpoint 4 : Estimate delivery time based on shipping method
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result;

  if (shippingMethod === "express") {
    result = distance / 100;
  } else {
    result = distance / 50;
  }

  res.send(result.toString());
})

// Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;

  res.send(result.toString());
})


// Endpoint 6 : Calculate loyalty points earned from a purchase
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send((purchaseAmount * loyaltyRate).toString());
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
