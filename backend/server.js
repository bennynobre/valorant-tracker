// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const cache = new NodeCache({ stdTTL: 60 });

const H_KEY = process.env.HENRIKDEV_API_KEY;
console.log(`[DEBUG] Chave de API que será usada: "${H_KEY}"`);
if (!H_KEY) {
  console.error('HENRIKDEV_API_KEY not set in .env');
  process.exit(1);
}

const H_BASE = 'https://api.henrikdev.xyz/valorant';

async function henrikGet(path) {
  const url = `${H_BASE}${path}`;
  const cached = cache.get(url);
  if (cached) return cached;
  const resp = await axios.get(url, { headers: { Authorization: H_KEY } });
  cache.set(url, resp.data);
  return resp.data;
}

app.get('/api/player/:name/:tag', async (req, res) => {
  try {
    const { name, tag } = req.params;
    const data = await henrikGet(`/v2/account/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
    res.json(data);
  } catch (err) {
    console.error(err?.response?.status, err?.message);
    res.status(err?.response?.status || 500).json({ error: err?.message || 'internal' });
  }
});

app.get('/api/mmr/:region/:name/:tag', async (req, res) => {
  try {
    const { region, name, tag } = req.params;
    const data = await henrikGet(`/v1/mmr/${encodeURIComponent(region)}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
    res.json(data);
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err?.message });
  }
});

app.get('/api/matches/:region/:name/:tag', async (req, res) => {
  try {
    const { region, name, tag } = req.params;
    const data = await henrikGet(`/v3/matches/${encodeURIComponent(region)}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
    res.json(data);
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err?.message });
  }
});

app.get('/api/esports/schedule', async (req, res) => {
  try {
    const { league } = req.query;
    let path = '/v1/esports/schedule';
    if (league) {
      path += `?league=${league}`;
    }

    const data = await henrikGet(path);
    res.json(data);
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err?.message });
  }
});

app.get('/api/content', async (req, res) => {
  try {
    const data = await henrikGet(`/v1/content`); 
    res.json(data);
  } catch (err) {
    console.error("ERRO AO BUSCAR NA API EXTERNA:", err.response?.data || err.message);
    res.status(err?.response?.status || 500).json({ error: err?.message });
  }
});

app.get('/api/matches/by-puuid/:region/:platform/:puuid', async (req, res) => {
  try {
    const { region, platform, puuid } = req.params;
    
    const data = await henrikGet(`/v4/by-puuid/matches/${region}/${platform}/${puuid}?size=100`);

    res.json(data);
  } catch (err) {
    console.error("ERRO NO BACKEND AO BUSCAR HISTÓRICO POR PUUID (v4):", err.response?.data || err.message);
    res.status(err?.response?.status || 500).json({ error: err?.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
