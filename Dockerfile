FROM node:20-alpine AS builder

WORKDIR /app

RUN mkdir -p uploads
RUN mkdir -p logs
RUN mkdir -p prisma/db

COPY conf ./conf
COPY logs ./logs
COPY uploads ./uploads
COPY modules ./modules
COPY prisma ./prisma
COPY src ./src
COPY static ./static
COPY themes ./themes
COPY .env .
COPY gsap-bonus.tgz .
COPY package.json .
COPY postcss.config.cjs .
COPY server.js .
COPY svelte.config.js .
COPY tailwind.config.cjs .
COPY tsconfig.json .
COPY vite.config.ts .
COPY entrypoint.sh .

RUN npm install -g pnpm
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN pnpm install
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN pnpm run build

FROM node:20-alpine AS deployer

WORKDIR /app

COPY --from=builder /app/conf ./conf
COPY --from=builder /app/modules ./modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build-node ./build-node
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/logs ./logs
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/server.js .
COPY --from=builder /app/entrypoint.sh .

ENV BODY_SIZE_LIMIT=Infinity
RUN chmod -R 777 ./entrypoint.sh
RUN ./entrypoint.sh

ENTRYPOINT chmod -R 777 ./entrypoint.sh && ./entrypoint.sh && node server.js
#chmod -R 777 ./entrypoint.sh && ./entrypoint.sh
#CMD ["node", "server.js"]
#ENTRYPOINT tail -f /dev/null #If debug
#docker exec -it CMS sh #If debug