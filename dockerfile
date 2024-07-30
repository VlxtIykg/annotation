# Use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory to cache them
FROM base AS install
COPY package.json bun.lockb /temp/
WORKDIR /temp

# Troubleshooting steps
RUN bun --version
RUN ls -la
RUN cat package.json

# Try running bun install with verbose logging and error output
RUN bun install --verbose 2>&1 | tee install_log.txt
RUN cat install_log.txt

# If the above fails, this RUN command won't execute
RUN echo "bun install completed successfully"

# Build the project to ensure the output directory exists
RUN bun run build

# Debug: List the contents of the build output directory
RUN ls -la /temp

# Copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/node_modules node_modules
COPY . .

# Debug: List the contents of the source directory to ensure everything is in place
RUN ls -la /usr/src/app/.github/lazy_workflow

# Ensure the build output directory exists
RUN mkdir -p /usr/src/app/.github/lazy_workflow/dist

# Run the app
USER bun
EXPOSE 3000/tcp

# Health check to ensure the container is running properly
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

# Run the
