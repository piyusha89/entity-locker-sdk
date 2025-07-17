const auth = require('./auth');
const entity = require('./entity');
const user = require('./user');
const documents = require('./documents');

module.exports = function EntityLockerSDK(config) {
  return {
    getAuthorizationUrl: auth.getAuthorizationUrl.bind(null, config),
    getAccessToken: auth.getAccessToken.bind(null, config),
    refreshAccessToken: auth.refreshAccessToken.bind(null, config),
    revokeToken: auth.revokeToken.bind(null, config),

    getEntityDetails: entity.getEntityDetails,
    getUserDetails: user.getUserDetails,

    getSelfUploadedDocuments: documents.getSelfUploadedDocuments,
    getIssuedDocuments: documents.getIssuedDocuments,
    downloadFileFromURI: documents.downloadFileFromURI,
    downloadXmlFromURI: documents.downloadXmlFromURI,
    uploadFile: documents.uploadFile,
  };
};
