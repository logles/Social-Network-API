import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3001;

// Use environment variable for the connection string if available
const connectionStringURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

// Connect to MongoDB using Mongoose
// mongoose.connect(connectionStringURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample Mongoose model for demonstration
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must be a valid email address!"],
  },
});
const User = mongoose.model("User", userSchema);

// Basic GET route
app.get("/", (req, res) => {
  res.send("Welcome to the Social Network API");
});

// Sample POST route to create a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
