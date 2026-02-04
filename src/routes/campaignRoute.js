const express = require("express");
const {
  getAllCampaigns,
  createCampaign,
  getCampaign,
  getCampaignStats,
  patchCampaignStatus,
} = require("../controller/campaignController");
const router = express.Router();

router.route("/").get(getAllCampaigns).post(createCampaign);
router.route("/:id").get(getCampaign);

router.route("/:id/status").patch(patchCampaignStatus);

router.route("/:id/stats").get(getCampaignStats);

module.exports = router;
