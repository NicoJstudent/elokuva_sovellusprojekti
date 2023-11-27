const express = require('express');
const app = express();
const cors = require('cors');

app.post("/login", async (req, res) => {

    try {
     // käyttäjän inputti
     const { userNick, password } = req.body;
 
     // tarkasta käyttäjän tiedot
     if (!(userNick && password)) {
       res.status(400).send("Täytä kaikki tiedot");
     }
     // katso löytyykö käyttjäjä tiedostoista
     const user = await User.findOne({ userNick });
 
     if (user && (await bcrypt.compare(password, user.password))) {
       // tekee tokenin
       const token = jwt.sign(
         { user_id: user._id, email },
         process.env.TOKEN_KEY,
         {
           expiresIn: "5h",
         }
       );
 
       // tallentaa tokenin käyttäjälle
       user.token = token;
       
       // käyttäjän tiedot
       return res.status(200).json(user);
     } 
   } catch (err) {
     console.log(err);
   } 
});