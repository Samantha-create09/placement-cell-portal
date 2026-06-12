const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const express = require("express");
const app = express();
app.use(cors());

app.use(express.json());
const path = require("path");

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes =
require("./routes/uploadRoutes");

app.use(
  "/api/upload",
  uploadRoutes
);

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/mentors", mentorRoutes);
app.use( "/api/admin", adminRoutes );

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Placement Cell Portal Backend Running");
});

const PORT = process.env.PORT || 5000;

app.get(
    "/api/dashboard",
    authMiddleware,
    (req, res) => {

        res.json({
            message: "Protected Dashboard",
            user: req.user
        });

    }
);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});