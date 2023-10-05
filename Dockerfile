# STAGE 1
# Get the base node images
FROM node:18.16.0-alpine AS base
# Set working directory
WORKDIR /base
# Install Python
RUN apk --no-cache add python3 make g++
# Copy root level package files and install any root dependency
COPY package.json ./
RUN npm install
# Copy required packages
COPY . .

# STAGE 2
# Build the nextJs app
FROM base AS build
ENV NODE_ENV=production
WORKDIR /base
RUN npm run build

# STAGE 3 - Final image
# NextJS build will create generated JS and CSS in .next directory.
# We will need this for our application to run
# All public folder contents will be needed as well. This folder contains static assets.
# Copy build output
FROM gcr.io/distroless/nodejs:16
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /base/package*.json ./
COPY --from=build /base/.next ./.next
COPY --from=build /base/public ./public
COPY --from=build /base/node_modules ./node_modules
COPY --from=build /base/next.config.js ./
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]

