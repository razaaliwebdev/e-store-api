import express from 'express';
import "dotenv/config";
import connectDB from './src/db/db.js';
import authRouter from './src/routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRouter);

// DB Connectoin
connectDB().then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on the PORT:${PORT}`);
    });
}).catch((error) => {
    console.log("Failed to connect DB.", error);
    process.exit(1);
});


