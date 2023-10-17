# STAGE 1: Get the base node image and set working directory
FROM node:18.16.0-alpine AS base
WORKDIR /base

# Install Python and copy root level package files
RUN apk --no-cache add python3 make g++
COPY package.json ./
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
# Copy required packages
COPY . .

# STAGE 2: Build the Next.js app
FROM base AS build
ENV NODE_ENV=production
WORKDIR /base
RUN npm run build

# STAGE 3: Create the final image
FROM node:16-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=build /base/package*.json ./
COPY --from=build /base/.next ./.next
COPY --from=build /base/public ./public
COPY --from=build /base/node_modules ./node_modules
COPY --from=build /base/next.config.js ./
COPY --from=build /base/.env ./
COPY --from=build /base/.env.local ./

USER nextjs

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
