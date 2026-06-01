FROM nginx:1.27-alpine AS web

COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY app.js /usr/share/nginx/html/app.js
COPY bridge.js /usr/share/nginx/html/bridge.js
COPY manifest.json /usr/share/nginx/html/manifest.json
COPY icons /usr/share/nginx/html/icons
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

EXPOSE 80

FROM node:22-alpine AS bridge

WORKDIR /app
COPY server /app/server

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:8787/health', (response) => process.exit(response.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

EXPOSE 8787
CMD ["node", "server/bridge-server.js"]
