# Install dependencies only when needed
FROM node:18.7.0-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package.json ./root-package.json
COPY dist/apps/api/package*.json ./
COPY apps/api/prisma ./prisma
RUN PRISMA_VERSION=$(node -e "console.log(require('./root-package.json').devDependencies['prisma'])")
RUN npm install -g prisma@$PRISMA_VERSION
RUN npm install --only=production
RUN npx prisma generate --schema='./prisma/schema.prisma'

# Production image, copy all the files and run nest
FROM node:18.7.0-alpine as runner
LABEL maintainer="Gustavo Perdomo <gperdomor@gmail.com>"
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
COPY --chown=nestjs:nodejs dist/apps/api .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
USER nestjs
EXPOSE 3000
ENV PORT 3000
CMD ["dumb-init", "node", "main.js"]
