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
