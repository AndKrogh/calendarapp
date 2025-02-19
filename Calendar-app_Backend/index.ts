const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Event routes
app.use("/events", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
