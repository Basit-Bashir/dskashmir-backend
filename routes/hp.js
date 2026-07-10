const express = require("express");

const router = express.Router();

const {
  getAccessToken,
  refreshAccessToken,
} = require("../tokenManager");

const {
  callHermes,
  callCatalogItems,
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

/**
 * Proxy to HP Hermes catalog items
 */
router.post("/catalogitems", async (req, res) => {
  try {
    const result = await callCatalogItems(req.body);

    res.json(result);
  } catch (err) {
    res.status(err.response?.status || 500).json(
      err.response?.data || {
        message: err.message,
      }
    );
  }
});

// const axios = require("axios");
// const { getAccessToken } = require("./tokenManager");
//
// async function callHermes(payload) {
//   const token = await getAccessToken();
//
//   const response = await axios.post(
//       process.env.HP_HERMES_URL,
//       {
//         "sku": [
//           "715A5A"
//         ],
//         "countryCode": "IN",
//         "languageCode": "EN",
//         "layoutName": "ALL-Specs",
//         "requestor": "DSKASHMIR-PRO"
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//   );
//
//   return response.data;
// }
//
// module.exports = {
//   callHermes,
// };


module.exports = router;
