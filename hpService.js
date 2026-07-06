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

module.exports = {
  callHermes,
};