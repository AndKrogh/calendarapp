import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes";

const app = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

// Event routes
app.use("/events", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});