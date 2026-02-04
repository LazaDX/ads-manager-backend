const asyncHandler = require("express-async-handler");
const Campaign = require("../models/campaignModel");

//@desc Get all campaigns
//@route GET /campaigns
//@access public
const getAllCampaigns = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }
  const campaigns = await Campaign.find(filter);
  res.status(200).json(campaigns);
});

//@desc Create campaign
//@route POST /campaigns
//@access public
const createCampaign = asyncHandler(async (req, res) => {
  const { name, advertiser, budget, startDate, endDate, impressions, clicks } =
    req.body;

  if (
    (!name, !advertiser, !budget, !startDate, !endDate, !impressions, !clicks)
  ) {
    res.status(400);
    throw new Error("Les informations sont incomplet");
  }

  if (impressions < 0 || clicks < 0 || budget < 0) {
    res.status(400);
    throw new Error(
      "Les valeurs de impressions, clicks ou budget sont invalides",
    );
  }

  if (clicks > impressions) {
    res.status(400);
    throw new Error(
      "Le nombre de clics ne peut pas dépasser les impressions !",
    );
  }

  const campaign = await Campaign.create({
    name,
    advertiser,
    budget,
    startDate,
    endDate,
    impressions,
    clicks,
  });

  res.status(201).json(campaign);
});

//@desc Get campaign
//@route GET /campaigns/:id
//@access public
const getCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) {
    res.status(400);
    throw new Error("Les campagnes sont introuvables");
  }

  res.status(200).json(campaign);
});

//@desc Get campaign status
//@route GET /campaigns/:id/status
//@access public
const getCampaignStats = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const campaign = await Campaign.findById(id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campagne non trouvé");
  }
  const { impressions, clicks, budget } = campaign;

  if (impressions < 0 || clicks < 0 || budget < 0) {
    res.status(400);
    throw new Error(
      "Les valeurs de impressions, clicks ou budget sont invalides",
    );
  }

  if (clicks > impressions) {
    res.status(400);
    throw new Error("Le nombre de clics ne peut pas dépasser les impressions");
  }

  const ctr = impressions ? (clicks / impressions) * 100 : 0;

  const cpc = clicks ? budget / clicks : 0;

  res.status(200).json({
    id: campaign._id,
    name: campaign.name,
    advertiser: campaign.advertiser,
    budget: campaign.budget,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    status: campaign.status,
    impressions: campaign.impressions,
    clicks: campaign.clicks,
    ctr: Number(ctr.toFixed(2)),
    cpc: Number(cpc.toFixed(2)),
  });
});

//@desc Patch campaign status
//@route Patch /campaigns/:id/status
//@access public
const patchCampaignStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "paused", "finished"].includes(status)) {
    res.status(400);
    throw new Error("Status invalide");
  }

  const campaign = await Campaign.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );

  if (!campaign) {
    res.status(404);
    throw new Error("La campagne n'existe pas");
  }
  res.status(200).json(campaign);
});

module.exports = {
  getAllCampaigns,
  createCampaign,
  getCampaign,
  patchCampaignStatus,
  getCampaignStats,
};
