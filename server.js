const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const port = process.env.PORT || 3000;
const root = __dirname;
const dataPath = path.join(root, 'data.json');

async function readState() {
  return JSON.parse(await fs.readFile(dataPath, 'utf8'));
}

async function writeState(state) {
  const nextState = {
    players: Array.isArray(state.players) ? state.players : [],
    games: Array.isArray(state.games) ? state.games : []
  };
  const tempPath = `${dataPath}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(nextState, null, 2)}\n`, 'utf8');
  await fs.rename(tempPath, dataPath);
  return nextState;
}

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(payload));
}

function serveFile(response, filePath, contentType) {
  return fs.readFile(filePath).then(content => {
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  }).catch(() => sendJson(response, 404, { error: 'Not found' }));
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url === '/api/state') {
      return sendJson(response, 200, await readState());
    }

    if (request.method === 'PUT' && request.url === '/api/state') {
      let body = '';
      for await (const chunk of request) body += chunk;
      if (body.length > 1024 * 1024) return sendJson(response, 413, { error: 'Payload too large' });
      return sendJson(response, 200, await writeState(JSON.parse(body)));
    }

    if (request.method === 'GET' && request.url === '/') return serveFile(response, path.join(root, 'index.html'), 'text/html; charset=utf-8');
    if (request.method === 'GET' && request.url === '/data.json') return serveFile(response, dataPath, 'application/json; charset=utf-8');
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    sendJson(response, 400, { error: 'Invalid request' });
  }
});

server.listen(port, () => console.log(`House Rules running at http://localhost:${port}`));
