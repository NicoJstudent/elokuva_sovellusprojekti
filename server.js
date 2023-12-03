
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

app.use(cors());
app.use(express.json());

app.listen(8001, () => {
    console.log("Listening on port 8001")
});

app.get("/login", (req, res) => {
    const customers = [
        {userNick: "John", email: 30, password: "New York", userID: 0},
        { userNick: "Eeva", email: 30, password: "New York", userID: 0},
        { userNick: "Mikko", email: 30, password: "New York", userID: 0},
    ];
    console.log(customers);
    res.json(customers);
});

app.get("/group", (req, res) => {
    const group = [
        {userID: "John", groupID: 30, password: "New York"},
        { userID: "Eeva", groupID: 30, password: "New York"},
        { userID: "Mikko", groupID: 30, password: "New York"},
    ];
    console.log(group);
    res.json(group);
});

app.get("/reviews", (req, res) => {
    const review = [
        {userNick: "John", reviewID: 30},
        { userNick: "Eeva", reviewID: 30},
        { userNick: "Mikko", reviewID: 30},
    ];
    console.log(review);
    res.json(review);
});



