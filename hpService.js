const axios = require("axios");
const { getAccessToken } = require("./tokenManager");

async function callHermes(payload) {
  const token = await getAccessToken();

  const response = await axios.post(
    process.env.HP_HERMES_URL,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

async function callCatalogItems(payload) {
  const token = await getAccessToken();

  const response = await axios.post(
    process.env.HP_CATALOG_ITEMS_URL ||
      "https://hpit-gw.hpcloud.hp.com/generic-router/api/hermes/catalogitems",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

module.exports = {
  callHermes,
  callCatalogItems,
};
