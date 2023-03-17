const mongoose = require("mongoose");

const EconomySchema = new mongoose.Schema({
    _id:{type:mongoose.SchemaTypes.String,required:true},
    username:{type:mongoose.SchemaTypes.String,required:true},
    messages:{type: mongoose.SchemaTypes.Number,required:true},
    credits:{type: mongoose.SchemaTypes.Number,required:true}
});

module.exports = mongoose.model("Economy", EconomySchema);