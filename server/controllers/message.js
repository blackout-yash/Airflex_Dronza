import { asyncError } from "../middlewares/errorMiddleware.js";
import { message } from "../models/message.js";

export const contact = asyncError(
    async (req, res, next) => {
        const { name, email, mess } = req.body;

        await message.create({ name, email, message: mess });

        res.status(200).json({
            success: true,
            message: "Message Sent"
        })
    }
);