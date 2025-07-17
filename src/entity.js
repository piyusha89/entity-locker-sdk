const axios = require('axios');

exports.getEntityDetails = async (accessToken) => {
  const res = await axios.get("https://entity.digilocker.gov.in/public/oauth2/1/entity", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};
