const CONSUMER_KEY = 'd697dde6b9cc4bf895a0de0f43212b36';
const CONSUMER_SECRET = 'f8f3d80baa2f4c23b3a89059a93320a4';
const FATSECRET_URL = 'https://platform.fatsecret.com/rest/server.api';

function generateNonce(): string {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

function stringToBytes(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 128) {
      bytes.push(c);
    } else if (c < 2048) {
      bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    } else {
      bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
  }
  return bytes;
}

function bytesToBase64(bytes: number[]): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function rotl32(n: number, s: number): number {
  return ((n << s) | (n >>> (32 - s))) >>> 0;
}

function sha1(msgBytes: number[]): number[] {
  let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;

  const msg = [...msgBytes];
  const origLen = msg.length;
  msg.push(0x80);
  while (msg.length % 64 !== 56) msg.push(0x00);
  const bits = origLen * 8;
  msg.push(0, 0, 0, 0, (bits >>> 24) & 0xff, (bits >>> 16) & 0xff, (bits >>> 8) & 0xff, bits & 0xff);

  for (let i = 0; i < msg.length; i += 64) {
    const w: number[] = [];
    for (let j = 0; j < 16; j++) {
      w[j] = ((msg[i + j * 4] << 24) | (msg[i + j * 4 + 1] << 16) |
               (msg[i + j * 4 + 2] << 8) | msg[i + j * 4 + 3]) >>> 0;
    }
    for (let j = 16; j < 80; j++) {
      w[j] = rotl32(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
    }

    let a = h0, b = h1, c = h2, d = h3, e = h4;

    for (let j = 0; j < 80; j++) {
      let f: number, k: number;
      if      (j < 20) { f = (b & c) | (~b & d);            k = 0x5a827999; }
      else if (j < 40) { f = b ^ c ^ d;                     k = 0x6ed9eba1; }
      else if (j < 60) { f = (b & c) | (b & d) | (c & d);  k = 0x8f1bbcdc; }
      else             { f = b ^ c ^ d;                     k = 0xca62c1d6; }

      const temp = (rotl32(a, 5) + f + e + k + w[j]) >>> 0;
      e = d; d = c; c = rotl32(b, 30); b = a; a = temp;
    }

    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
  }

  const out: number[] = [];
  for (const h of [h0, h1, h2, h3, h4]) {
    out.push((h >>> 24) & 0xff, (h >>> 16) & 0xff, (h >>> 8) & 0xff, h & 0xff);
  }
  return out;
}

function hmacSha1(key: string, data: string): string {
  let k = stringToBytes(key);
  if (k.length > 64) k = sha1(k);
  while (k.length < 64) k.push(0x00);

  const ipad = k.map(b => b ^ 0x36);
  const opad = k.map(b => b ^ 0x5c);
  const inner = sha1([...ipad, ...stringToBytes(data)]);
  const outer = sha1([...opad, ...inner]);
  return bytesToBase64(outer);
}

export function buildOAuth1Request(
  requestParams: Record<string, string>
): { url: string; headers: Record<string, string> } {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = generateNonce();

  const oauthParams: Record<string, string> = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_version: '1.0',
  };

  const allParams = { ...requestParams, ...oauthParams };

  const sortedParams = Object.keys(allParams)
    .sort()
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(allParams[k])}`)
    .join('&');

  const baseString = [
    'GET',
    encodeURIComponent(FATSECRET_URL),
    encodeURIComponent(sortedParams),
  ].join('&');

  const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;
  oauthParams.oauth_signature = hmacSha1(signingKey, baseString);

  const authHeader =
    'OAuth ' +
    Object.keys(oauthParams)
      .map(k => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`)
      .join(', ');

  const url = new URL(FATSECRET_URL);
  Object.entries(requestParams).forEach(([k, v]) => url.searchParams.set(k, v));

  return { url: url.toString(), headers: { Authorization: authHeader } };
}
