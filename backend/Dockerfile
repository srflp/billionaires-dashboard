FROM node:lts-alpine as base

# HEALTHCHECK --interval=5s --timeout=3s --retries=10 \
#   CMD wget --no-verbose --tries=1 --spider http://localhost:8000/docs/static/index.html || exit 1

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN ["corepack", "enable"]
RUN ["corepack", "prepare", "pnpm@latest", "--activate"]
RUN ["pnpm", "install"]
COPY . .

FROM base as dev

CMD ["pnpm", "dev"]

FROM base as prod
RUN ["pnpm", "build"]
CMD ["pnpm", "start"]