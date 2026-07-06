const express = require("express");

const router = express.Router();

const {
  getAccessToken,
  refreshAccessToken,
} = require("../tokenManager");

const {
  callHermes,
} = require("../hpService");

/**
 * Returns current token
 */
router.get("/token", async (req, res) => {
  try {
    const token = await getAccessToken();

    res.json({
      access_token: token,
    });
  } catch (err) {
    res.status(500).json(err.response?.data || {
      message: err.message,
    });
  }
});

/**
 * Force refresh token
 */
router.post("/refresh-token", async (req, res) => {
  try {
    const token = await refreshAccessToken();

    res.json({
      access_token: token,
    });
  } catch (err) {
    res.status(500).json(err.response?.data || {
      message: err.message,
    });
  }
});

/**
 * Proxy to HP Hermes
 */
router.post("/hermes", async (req, res) => {
  try {
    const result = await callHermes(req.body);

    res.json(result);
  } catch (err) {
    res.status(err.response?.status || 500).json(
      err.response?.data || {
        message: err.message,
      }
    );
  }
});

module.exports = router;