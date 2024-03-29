# Specify the base image
FROM node:18-alpine

# Create a directory for the app
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app files
COPY . .

#Use ARG command to define a build-time variable for each environment variable I want to pass.
ARG FRONTEND_URL 
ARG JWT_ACTIVATE_SECRET_KEY  
ARG MONGO_URL
ARG ACCESS_TOKEN_SECRET_PRIVATE
ARG ACCESS_TOKEN_SECRET_PUBLIC
ARG REFRESH_TOKEN_SECRET_PRIVATE
ARG REFRESH_TOKEN_SECRET_PUBLIC
ARG MAILGUN_API_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_ACCESS_KEY_SECRET
ARG STRIPE_SECRET_KEY
ARG WEBHOOK_SIGNING_SECRET
ARG OPENAI_API_KEY
ARG EVERYPIXEL_ID
ARG EVERYPIXEL_API_KEY
# Use  ENV command to set the environment variables inside the container
ENV FRONTEND_URL=${FRONTEND_URL}
ENV JWT_ACTIVATE_SECRET_KEY=${JWT_ACTIVATE_SECRET_KEY}
ENV MONGO_URL=${MONGO_URL}
ENV ACCESS_TOKEN_SECRET_PRIVATE=${ACCESS_TOKEN_SECRET_PRIVATE}
ENV ACCESS_TOKEN_SECRET_PUBLIC=${ACCESS_TOKEN_SECRET_PUBLIC}
ENV REFRESH_TOKEN_SECRET_PRIVATE=${REFRESH_TOKEN_SECRET_PRIVATE}
ENV REFRESH_TOKEN_SECRET_PUBLIC=${REFRESH_TOKEN_SECRET_PUBLIC}
ENV MAILGUN_API_KEY=${MAILGUN_API_KEY}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_ACCESS_KEY_SECRET=${AWS_ACCESS_KEY_SECRET}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV WEBHOOK_SIGNING_SECRET=${WEBHOOK_SIGNING_SECRET}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV EVERYPIXEL_ID=${EVERYPIXEL_ID}
ENV EVERYPIXEL_API_KEY=${EVERYPIXEL_API_KEY}

# Build the app
RUN npm run build 

# Backed server is running at 9090
EXPOSE 9090

# Start the app

CMD ["npm", "start"]
