# Use the official Bun image
# See all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory to cache them
FROM base AS install
COPY package.json bun.lockb /temp/
RUN cd /temp && bun install --frozen-lockfile 

# Copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=development
RUN bun test
RUN bun run build

# Run the app
USER bun
EXPOSE 3003/tcp
ENTRYPOINT ["bun", "run", "preview"]

