const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the number of salt rounds

    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();
    res.send('User Registered Successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Verify the password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const temp = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
        };
        res.send(temp);
      } else {
        return res.status(400).json({ message: 'Login failed' });
      }
    } else {
      return res.status(400).json({ message: 'Login failed' });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});
router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)

  } catch (error) {
    return res.status(400).json({ error });

  }
})

module.exports = router;
