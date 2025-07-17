const axios = require('axios');

exports.getSelfUploadedDocuments = async (accessToken) => {
  const res = await axios.get("https://entity.digilocker.gov.in/public/oauth2/1/entity/files", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};

exports.getIssuedDocuments = async (accessToken) => {
  const res = await axios.get("https://entity.digilocker.gov.in/public/oauth2/2/entity/files/issued", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};

exports.downloadFileFromURI = async (accessToken, uri) => {
  const res = await axios.get(`https://entity.digilocker.gov.in/public/oauth2/1/entity/file/${uri}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    responseType: 'arraybuffer'
  });
  return res.data;
};

exports.downloadXmlFromURI = async (accessToken, uri) => {
  const res = await axios.get(`https://entity.digilocker.gov.in/public/oauth2/1/entity/xml/${uri}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};

exports.uploadFile = async (accessToken, buffer, path, mimeType, hmac) => {
  const res = await axios.post("https://entity.digilocker.gov.in/public/oauth2/1/file/upload", buffer, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": mimeType,
      "path": path,
      "hmac": hmac
    }
  });
  return res.data;
};
