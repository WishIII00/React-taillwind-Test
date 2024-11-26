const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,       // แก้ไข typo
        useUnifiedTopology: true,   // แก้ไข typo
        //useCreateIndex: true,      // เลิกใช้ใน Mongoose รุ่นใหม่
        //useFindAndModify: false,   // เลิกใช้ใน Mongoose รุ่นใหม่
    })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Error connecting to database");
        console.error(error);
        process.exit(1); // ออกจากโปรแกรมหากเชื่อมต่อไม่ได้
    });
};
