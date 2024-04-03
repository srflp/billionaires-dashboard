FROM node:lts-alpine as base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN ["corepack", "enable"]
RUN ["corepack", "prepare", "pnpm@latest", "--activate"]
RUN ["pnpm", "install"]
COPY . .

FROM base as dev
CMD ["pnpm", "dev", "--host"]

FROM base as prod
RUN ["pnpm", "build"]
CMD ["pnpm", "preview", "--host"]