const jwt = require('jsonwebtoken'); // ใช้ jsonwebtoken เพื่อจัดการ token

const config = process.env; // เข้าถึง environment variables

const verifyToken = (req, res, next) => {
    // รับ token จาก body, query, หรือ headers
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // ถ้าไม่มี token ให้ตอบกลับด้วย status 403
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        // ตรวจสอบและถอดรหัส token
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded; // เก็บข้อมูลที่ถอดรหัสไว้ใน req.user
    } catch (err) {
        // ถ้า token ไม่ถูกต้อง ให้ตอบกลับด้วย status 401
        return res.status(401).send("Invalid Token");
    }

    return next(); // ดำเนินการ middleware ถัดไป
};

module.exports = verifyToken; // ส่งออกฟังก์ชัน
