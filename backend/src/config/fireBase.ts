
import admin from 'firebase-admin'
import {ServiceAccount} from 'firebase-admin'

// Define the custom service account interface
interface Serviceaccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain : string;
}

const serviceAccount: Serviceaccount = {
  type: process.env.TYPE!,
  project_id: process.env.PROJECT_ID!,
  private_key_id: process.env.PRIVATE_KEY_ID!,
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSkKMi4KLcPYTP\nfY3x/ZUWEnZm+nXrLP3KonIue04X1mkt3+/yam5yN4KXt36H8BmJt4fPlEqfp7L+\nSAyepURH1q7YUi3BrCCl+KkyFo2udaCtTB/e3VzexD1rvq8luCAKQlmUsGHsBr+/\n6Ua/mW1wDqM6QLpYIy5MtnxNvN/zlRaExVo6YQjHKzBSFOLz8hvgQvh5g3UjhkC1\nLxB/NW64QcLOSkvVC23+Mk25cxATkzxWy3PBXJWnGD1m/ERU6NBoPCTIJSLj7uyq\neHg0Fpj8LSFDaxWw4MYQP8v5bu1IESVQEqPy3AHY207LkLQnq003kz1OOls3o6ND\n+igElD7xAgMBAAECggEAS8wsJYh2p9BvaB+6wqM1kTn5LE25t/w8qb57WtchP/x7\nZTupDPsaIfxwgrvXjQi1sLkD5wnrKPi9usJl5I/6ed/ClfVTKlYTdJuEEJdEzkni\nmq9+A4RtA3Xh5FDCjNHwmrDSvW8W+NdfHC7VvG/3ELD8OiKF0edsKcpBCdzVQ0G/\nFRF50c1j8CIopRS/w1Vf9Iz7fBeF/ZUQ1gxJvfPYPxo7jhRrfrq+Qn4oT7uo9xh0\n+Ar5hzPZl4itRZCsWpQZkjyP8ypHFWdBgA+Y+82wGZJlDUrrr6BxEpP1lKaJlYjK\n0DpNXjzqmqmnh4CpCOB0ToQAJs8dlAB2sL3vHyPOJwKBgQDwc58zbL3nS7VOsB1a\nBZxWeqHwkFzAhmHXi87q6abaiH1sGWeSFvpCatuCQ0cK1QvBai8OSK2ts97IO3fg\nRn28kS6E+Zt3i2oYQXfx92OFeCK+fcJ0WXAqqH6eMgJ94fXkueeex0ouBlhRPj0c\n2ik3QdoDDgetitmK/ktvNm6NwwKBgQDgLkdlXSInfmDhhukDFBinLqKOHTzXZvSQ\nBOW5VtctgZCU1o7F7UolOvjKoJLwKENX/8fNEqpZyD1AmnTpiUcnBYiZyuv64P+M\ngtD+sZrXO876iu5xVww+++cMYfpxxkcswsxn9el2+4sWwhFJ7TwlkH+ow13KyFA/\nh7vBgHfxOwKBgDaNtQAA2vEgLymEMZScE0VXm2guCK0xj/9MXAzWKCIKt5IQDXyK\ntArfnZ/nTbX6cilWwwhVmvn/Bjudqmv68koXElvfGdO8kLyiFemS/ERq5k8bz0OA\niz9SbS/NHt2ap6RWPWO7yWu5ys3b9heWs6UyzpjE1R8dko/DdC/uRJTrAoGAOOcm\nUjFYqQOoHba70H86Xr00n7QGLHrCmwfTM786MR/RDiaD6PN5PYgBfJVTlsfxiBWx\npnkVamKsQYizIlApEluSN89NJMoVs5nE6NE2B2nz+J5pNbWtsxMHq5n3EwgMKu1r\nKvw9fWkN/gHWl5gzCynpbXHhjcZYsDeIze4JA98CgYABRNtnP8Wu+7SNgw8IeXQh\n0hRVQ/u+76QX+E2d71jktEdCK5AgAtxfW3w/B3rRNciHAoIiRjlWreD7qUBiTTxV\nAIh3uxgez3BlW4pNnHny/LWbc0Mq6HQlHnETHWTkSnyf1tfSoBg3CQ/HsjwEj+tB\nUvGjmg7jA7niRulGn18XJA==\n-----END PRIVATE KEY-----\n",
  client_email: process.env.CLIENT_EMAIL!,
  client_id: process.env.CLIENT_ID!,
  auth_uri: process.env.AUTH_URI!,
  token_uri: process.env.TOKEN_URI!,
  auth_provider_x509_cert_url:process.env.AUTH_PROVIDER_x509_CERT_URL!,
  client_x509_cert_url: process.env.CLIENT_x509_CERT_URL!,
  universe_domain: process.env.UNIVERSE_DOMAIN!
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount), 
});

export default admin;