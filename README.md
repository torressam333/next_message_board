This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the application with Docker

### Prerequisites:

Ensure you have Docker and Docker Compose installed on your system.

Steps:

- Pull the image from Docker Hub:

  ```
    docker pull torrressam/react-message-board:latest
  ```

- Start the application with Docker Compose:

  ```
    docker-compose up -d
  ```

- Issues with writting to the sqlite db make sure you rebuild the image with no cache and then run

  ```
    docker-compose build --no-cache
    docker compose up
  ```

- Accessing the application:

The application should be accessible at http://localhost:3000 (or the specified port mapping in your docker-compose.yml file).

- Additional notes:

If you encounter issues, check the logs of the containers using docker-compose logs.
For more information about Docker Compose, refer to the official documentation: [(https://docs.docker.com/compose/)]
