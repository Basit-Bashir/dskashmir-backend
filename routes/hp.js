const express = require("express");
const router = express.Router();
const { getAccessToken, refreshAccessToken } = require("../tokenManager");
const { callHermes } = require("../hpService");

router.get("/token", async (req, res) => {
  try {
    res.json({ access_token: await getAccessToken() });
  } catch (err) {
    res.status(500).json(err.response?.data || { message: err.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    res.json({ access_token: await refreshAccessToken() });
  } catch (err) {
    res.status(500).json(err.response?.data || { message: err.message });
  }
});

const hermesEndpoints = [
  "productcontent",
  "companions",
  "images",
  "richmedia",
  "itempartnerdocs",
  "hierarchy",
  "plc",
  "catalogitems",
  "catalogfacetfilters",
  "itemsbyfacetvalues",
];

hermesEndpoints.forEach((endpoint) => {
  router.post(`/${endpoint}`, async (req, res) => {
    try {
      const result = await callHermes(endpoint, req.body);
      res.json(result);
    } catch (err) {
      res.status(err.response?.status || 500).json(
        err.response?.data || { message: err.message }
      );
    }
  });
});

module.exports = router;