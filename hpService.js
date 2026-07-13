const axios = require("axios");
const { getAccessToken } = require("./tokenManager");

async function callHermes(endpoint, payload) {
  const token = await getAccessToken();
  const baseUrl =
    process.env.HP_BASE_URL ||
    "https://hpit-gw.hpcloud.hp.com/generic-router/api/hermes";

  const response = await axios.post(`${baseUrl}/${endpoint}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

module.exports = { callHermes };
