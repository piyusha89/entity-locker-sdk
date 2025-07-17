const axios = require('axios');

exports.getUserDetails = async (accessToken) => {
  const res = await axios.get("https://entity.digilocker.gov.in/public/oauth2/1/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};
