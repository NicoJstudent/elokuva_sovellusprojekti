const express = require('express');
const app = express();
const cors = require('cors');

/////////logini juttua, lisää onko samanniminen käyttäjä olemassa
app.post("/register", async (req, res) => {

    try {
     const { userNick, password } = req.body;
 
     if (!(userNick && password)) {
       res.status(400).send("Täytä kaikki tarvittavat tiedot");
     }
 
     const oldUser = await User.findOne({ userNick });
 
     if (oldUser) {
       return res.status(409).send("Käyttäjä on jo rekisteröitynyt, ole hyvä ja kirjaudu.");
     }
 
     encryptedUserPassword = await bcrypt.hash(password, 10);
 
     // tehdään user
     const user = await User.create({
       user_nick: userNick,
       email: email.toLowerCase(), 
       password: encryptedUserPassword,
     });
 
     // tehääntoken
     const token = jwt.sign(
       { user_id: user._id, email },
       process.env.TOKEN_KEY,
       {
         expiresIn: "5h",
       }
     );
     user.token = token;
 
     // palautetaan uusi käyttäjä
     res.status(201).json(user);
   } catch (err) {
     console.log(err);
   }
 });
 
