# Entity Locker SDK (Node.js)

> Simple Node.js SDK to connect with DigiLocker's Entity Locker API.

## Features
- OAuth2 Authorization with PKCE
- Access Token + Refresh Token management
- Get Entity and User Details
- Upload / Download Issued or Uploaded Documents

## Installation
```bash
# using pnpm
dpnpm add entity-locker-sdk

# or using yarn
yarn add entity-locker-sdk
```

## Usage
```js
const EntityLocker = require('entity-locker-sdk');
const sdk = EntityLocker({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'http://localhost:3000/callback'
});

const { url, codeVerifier } = sdk.getAuthorizationUrl('state');
console.log(url); // Ask user to visit

// After user logs in and gives consent...
const token = await sdk.getAccessToken('code', codeVerifier);
const entity = await sdk.getEntityDetails(token.access_token);
```

## License
MIT © 2025 Piyush Agarwal