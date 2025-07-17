const EntityLocker = require('../src');

const sdk = EntityLocker({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'http://localhost:3000/callback'
});

(async () => {
  try {
    // Step 1: Start OAuth2 Flow
    const { url, codeVerifier } = sdk.getAuthorizationUrl('test-state');
    console.log('Visit the URL to authorize:', url);

    // Step 2: Manually fetch the authorization code from callback
    const authCode = 'AUTH_CODE_FROM_CALLBACK';
    const token = await sdk.getAccessToken(authCode, codeVerifier);

    // Step 3: Use the token to get data
    const entity = await sdk.getEntityDetails(token.access_token);
    console.log('Entity Details:', entity);

    const user = await sdk.getUserDetails(token.access_token);
    console.log('User Details:', user);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err);
  }
})();