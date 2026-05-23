/**
 * Vercel Serverless Function — Ollama Cloud Proxy
 * Proxies chat completion requests to Ollama Cloud,
 * keeping the API key secure on the server side.
 *
 * Route: /api/chat (mapped from /api/ollama/* via vercel.json)
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;
  const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'https://ollama.com/v1';
  const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gpt-oss:120b-cloud';

  if (!OLLAMA_API_KEY) {
    return res.status(500).json({ error: 'OLLAMA_API_KEY not configured' });
  }

  try {
    const { messages, temperature, max_tokens } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const response = await fetch(`${OLLAMA_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OLLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        temperature: temperature ?? 0.7,
        max_tokens: max_tokens ?? 200,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Ollama API Error:', response.status, errText);
      return res.status(response.status).json({
        error: 'Ollama API error',
        detail: errText,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
