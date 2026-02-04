const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  advertiser: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  impressions: {
    type: Number,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
