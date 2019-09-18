import mongoose from "mongoose";

const TeamsSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, "A team name is missing!"]
  },
  players: {
    type: [String]
  }
});

module.exports = mongoose.model("Team", TeamsSchema);
