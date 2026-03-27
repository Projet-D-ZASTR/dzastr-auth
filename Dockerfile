# Build/runtime image for dzastr-auth (Node/Express)
FROM node:20-alpine

WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy sources
COPY . .

ENV NODE_ENV=production
ENV PORT=8081

EXPOSE 8081

CMD ["npm", "start"]

