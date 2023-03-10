const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    username:{type: mongoose.SchemaTypes.String,required:true},
    userId:{type:mongoose.SchemaTypes.String,required: true},
    level:{type: mongoose.SchemaTypes.Number,required:true},
});

module.exports = mongoose.model("Levels", LevelSchema);