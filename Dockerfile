# Stage 1: Build
FROM node:22-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set the working directory
WORKDIR /app

# Install build dependencies if needed
RUN apk add --no-cache python3 make g++

# Enable corepack for faster installs
RUN corepack enable

# Copy package.json (required)
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
# RUN npm install -g pnpm

# Install dependencies on cache
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Install dependencies
# RUN pnpm fetch

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Install dependencies
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --offline

# Check if typescript is available
# RUN pnpm exec tsc --version

# Build the application
RUN pnpm run build

# Remove development dependencies
RUN rm -rf node_modules

# Stage 2: Production
FROM node:22-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set the working directory
WORKDIR /app

COPY --from=builder /app/packages/*/dist ./packages/

# Change ownership of the app directory to the non-root user
RUN addgroup -S app && adduser -S app -G app
RUN chown -R app:app /app

# Switch to the non-root user
USER app
