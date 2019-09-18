const express = require("express");
const router = express.Router();
const TeamModel = require("../../models/models");

router.get("/", async (req, res, next) => {
  let data = await TeamModel.find();
  res.json(data);
});

router.post("/addteam", async (req, res) => {
  let _newTeam = req.body.teamName.toLowerCase();

  /// Check to see if post data is undefined or empty
  if (_newTeam) {
    let data = await TeamModel.find();

    /// Check to see if the team name exist in the db...
    /// teamNameCheck gets an array, if its len>0 then a match was found.
    let teamNameCheck = data.filter(
      team => team.teamName.toLowerCase() === _newTeam
    );
    if (teamNameCheck && teamNameCheck.length) {
      // array and array.length are truthy then...
      // That team exist already.
      console.log("That team name exist! [msg: Express]");
      res.json({ msg: "That team name exist! [msg: Express]" });
    } else {
      teamModel = new TeamModel({
        teamName: _newTeam
      });

      let outcome = await teamModel.save();

      /// If a teamName exist after the save, then...
      /// it was successful
      if (outcome.teamName) {
        data = await TeamModel.find();
        res.json(data);
      }
      /// The save was unsuccessful
      else {
        res.json({ msg: "Problem saving the data. [msg: Express]" });
      }
    }
  }
  /// Check to see if post data is undefined or empty
  else {
    res.json({ message: "The task cannot be blank! [msg: Express]" });
  }
});

router.post("/addplayer", async (req, res) => {
  let _newTeam = req.body.teamName.toLowerCase();
  let _newPlayer = req.body.player.toLowerCase();
  let data = await TeamModel.find();

  if (_newPlayer) {
    const searched = data.find(team => team.teamName === _newTeam);

    /// We perform a check to make sure the team name exist
    if (searched) {
      await TeamModel.updateOne(
        { teamName: _newTeam },
        { $push: { players: _newPlayer } }
      );
      data = await TeamModel.find();
      res.json(data);
    } else {
      res.json({ msg: "There was a problem adding the player [msg: Express]" });
    }
  }
});

router.delete("/deleteteam", async (req, res) => {
  let _newTeam = req.body.teamName.toLowerCase();
  let outcome = await TeamModel.deleteOne({ teamName: _newTeam });

  /// if outcome.n is 1, then a document was successfully deleted
  if (outcome.n) {
    let data = await TeamModel.find();
    res.json(data);
  } else {
    console.log(outcome.n);
    res.json({
      msg: "There was a problem, Nothing was deleted. [msg: Express]"
    });
  }
});

router.delete("/deleteplayer", async (req, res) => {
  let _newTeam = req.body.teamName.toLowerCase();
  let _newPlayer = req.body.player.toLowerCase();

  let outcome = await TeamModel.updateOne(
    { teamName: _newTeam },
    { $pull: { players: _newPlayer } }
  );
  if (outcome.nModified) {
    let data = await TeamModel.find();
    res.json(data);
  } else {
    res.json({ msg: "Nothing was modified. [msg: Express]" });
  }
});

module.exports = router;
