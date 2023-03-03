const target = 'https://localhost:44395';

const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
