const axios = require("axios");

let accessToken = null;
let expiryTime = 0;

/**
 * Fetch new token from HP
 */
async function refreshAccessToken() {
  try {
    const response = await axios.post(
      process.env.HP_AUTH_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "hermes.pdb.api",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.HP_CLIENT_ID,
          password: process.env.HP_CLIENT_SECRET,
        },
      }
    );

    accessToken = response.data.access_token;

    // Refresh 30 seconds before expiry
    expiryTime = Date.now() + (response.data.expires_in - 30) * 1000;

    console.log("✅ HP Token Refreshed");

    return accessToken;
  } catch (err) {
    console.error(
      err.response?.data || err.message
    );
    throw err;
  }
}

/**
 * Returns cached token if valid
 */
async function getAccessToken() {
  if (!accessToken || Date.now() >= expiryTime) {
    await refreshAccessToken();
  }

  return accessToken;
}

module.exports = {
  getAccessToken,
  refreshAccessToken,
};