const axios = require('axios');
const qs = require('qs');
const crypto = require('crypto');

function generateCodeVerifier() {
  const randomBytes = crypto.randomBytes(64);
  return randomBytes.toString('base64url');
}

function generateCodeChallenge(verifier) {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
}

exports.getAuthorizationUrl = ({ clientId, redirectUri }, state) => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  const url = new URL("https://entity.digilocker.gov.in/public/oauth2/1/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");

  return { url: url.toString(), codeVerifier };
};

exports.getAccessToken = async ({ clientId, clientSecret, redirectUri }, code, codeVerifier) => {
  const response = await axios.post("https://entity.digilocker.gov.in/public/oauth2/1/token",
    qs.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
      code_verifier: codeVerifier,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return response.data;
};

exports.refreshAccessToken = async ({ clientId, clientSecret }, refreshToken) => {
  const response = await axios.post("https://entity.digilocker.gov.in/public/oauth2/1/token",
    qs.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
      }
    }
  );
  return response.data;
};

exports.revokeToken = async ({ clientId, clientSecret }, token, tokenType = "access_token") => {
  await axios.post("https://entity.digilocker.gov.in/public/oauth2/1/revoke",
    qs.stringify({ token, token_type_hint: tokenType }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
      }
    }
  );
};
