require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());

// Route สำหรับการลงทะเบียน
app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // ตรวจสอบว่า input ครบถ้วนหรือไม่
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    // ตรวจสอบว่าผู้ใช้มีอยู่ในระบบหรือไม่
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exists. Please login");
    }

    // เข้ารหัสรหัสผ่าน
    const encryptedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // สร้าง token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // เพิ่ม token ให้ผู้ใช้
    user.token = token;

    // ส่งข้อมูลผู้ใช้กลับ
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route สำหรับการเข้าสู่ระบบ
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ตรวจสอบว่า input ครบถ้วนหรือไม่
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await User.findOne({ email });

    // ตรวจสอบรหัสผ่าน
    if (user && (await bcrypt.compare(password, user.password))) {
      // สร้าง token
      const token = jwt.sign(
        { user_id: user._id, email }, // payload
        process.env.TOKEN_KEY, // secret key
        {
          expiresIn: "2h", // อายุของ token
        }
      );

      // เพิ่ม token ให้ผู้ใช้
      user.token = token;

      // ส่งข้อมูลผู้ใช้กลับ
      return res.status(200).json(user);
    }

    // ถ้าข้อมูลผิด
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Protected Route
app.post('/welcome', auth, (req, res) => {
  res.status(200).send("Welcome KUB");
});

module.exports = app;
