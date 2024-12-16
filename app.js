const express = require("express")
const app = express()
const { User } = require("./models")

app.use(express.json());

app.get("/test", (req, res) => {
    res.send("masuk")
})

app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newUser = await User.create({ name, email, password });
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = app;