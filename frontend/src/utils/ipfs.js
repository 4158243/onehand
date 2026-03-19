/**
 * IPFS upload via Pinata. Uploads a file and returns the public gateway URL.
 * Requires VITE_PINATA_JWT and VITE_PINATA_GATEWAY in .env.
 */

const PINATA_PIN_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

function normalizeGatewayBase(rawGateway) {
  let g = String(rawGateway || '').trim();
  if (!g) return 'https://gateway.pinata.cloud/ipfs/';

  // If user pasted only the host (common with Pinata dedicated gateways), add scheme.
  if (!/^https?:\/\//i.test(g)) g = `https://${g}`;

  // Pinata gateways typically serve content under /ipfs/<CID>
  const needsIpfsPath =
    /pinata\.cloud/i.test(g) || /mypinata\.cloud/i.test(g);
  if (needsIpfsPath && !/\/ipfs(\/|$)/i.test(g)) {
    g = g.replace(/\/+$/, '');
    g = `${g}/ipfs/`;
  }

  // Normalize trailing slash.
  if (!g.endsWith('/')) g = `${g}/`;
  // Normalize ".../ipfs" -> ".../ipfs/"
  g = g.replace(/\/ipfs\/?$/i, '/ipfs/');
  return g;
}

/**
 * Upload a file to IPFS via Pinata; returns the gateway URL for the pinned file.
 * @param {File} file - File to upload (e.g. image from input)
 * @param {number} [timeoutMs] - Request timeout
 * @returns {Promise<string>} - Full URL (e.g. https://gateway.pinata.cloud/ipfs/Qm...)
 */
export async function uploadFileToIpfs(file, timeoutMs = 15000) {
  const jwt = import.meta.env.VITE_PINATA_JWT;
  const gateway = normalizeGatewayBase(import.meta.env.VITE_PINATA_GATEWAY);

  if (!jwt || !jwt.trim()) {
    throw new Error('IPFS upload is not configured. Add VITE_PINATA_JWT to your .env.');
  }

  const form = new FormData();
  form.append('file', file);

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(PINATA_PIN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: form,
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(res.status === 401 ? 'Invalid IPFS credentials.' : errBody || `Upload failed (${res.status}).`);
    }

    const data = await res.json();
    const hash = data.IpfsHash || data.ipfsHash;
    if (!hash) throw new Error('No IPFS hash in response.');

    return `${gateway}${hash}`;
  } catch (err) {
    clearTimeout(id);
    if (err.name === 'AbortError') throw new Error('Upload timed out.');
    throw err;
  }
}
