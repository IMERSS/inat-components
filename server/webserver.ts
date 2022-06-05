import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", (req: any, res: any) => {
    res.send("Express + TypeScript Server");

    // perhaps do a long listing of the folder here?
});

app.use(express.static("public"))

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

