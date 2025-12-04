const express = require("express");
const cors = require("cors");
const path = require("path");
const get_balance = require("./getbalance");

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname)));

app.use('/contracts', express.static(path.join(__dirname, 'contracts')));
app.get("/balance", async (req, res) => {
    try {
        const data = await get_balance();
        res.json(data); // { address: "...", balance: "..." }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));


//  How this renders JSON
// Browser makes an HTTP request:
// fetch("http://localhost:3000/balance")
// This triggers the /balance route in server.js.
// Server runs get_balance():
// const data = await get_balance();
// Returns something like:
// { "address": "0x5FbD...", "balance": "0.001" }
// Server sends JSON back:
// res.json(data);
// res.json() automatically:
// Converts the JS object to a JSON string
// Sets the HTTP header Content-Type: application/json
// Sends it as the HTTP response
//  Browser receives JSON
// const res = await fetch("http://localhost:3000/balance");
// const data = await res.json(); // parses the JSON automatically
// console.log(data.address, data.balance);


// data now contains the object { address: "...", balance: "..." }

// Browser still doesn’t “render” it until you insert it into the DOM:

// document.getElementById("contractAddress").textContent = data.address;
// document.getElementById("contractBalance").textContent = data.balance;