const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

router.post('/send-notification', async (req, res, next) => {
    try {
        const { token, title, body } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!token || !title || !body) {
            return res.status(400).send({
                success: false,
                message: "Token, title, and body are required"
            });
        }

        // Cấu hình thông báo
        const message = {
            notification: {
                title: title,
                body: body
            },
            token: token
        };

        // Gửi thông báo
        try {
            const response = await admin.messaging().send(message); // Thêm await
            console.log('Successfully sent message:', response);
            return res.status(200).send({
                success: true,
                message: "Notification sent successfully"
            });
        } catch (err) {
            console.error('Error sending notification:', err);
            next(err);
        }

    } catch (err) {
        next(err);
    }
});

module.exports = router;
