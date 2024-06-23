# Marketplace for a chain of grocery stores

[Go to marketplace](http://45.142.122.22/)

## Project overview

This repository contains code and documentation for the project "Automated information system for a chain of grocery stores", developed as part of the diploma project. The system is designed to manage orders and provide an online platform for grocery stores using modern hardware and software.

## Technologies

### Server part (Web API)
- **Programming language**: C#
- **Framework**: ASP.NET Core (8.0)
- **Database**: PostgreSQL
- **ORM**: EntityFrameworkCore
- **Other tools**: AutoMapper, Identity (for authentication and authorization)
- **Deploy**: Docker, Nginx, dedicated server

### Client part (Frontend)
- **Programming language**: JavaScript
- **Framework**: React
- **Styling**: Bootstrap, HTML/CSS
- **Libraries**: YandexMaps
- **Deploy**: Docker, Nginx, dedicated server

## Installation and configuration

### Prerequisites
- Node.js
- npm or yarn
- Visual Studio 2022
- Visual Studio Code
- PostgreSQL
- Docker
- Nginx

### Setting up the server side (Web API)
1. Clone the repository (app branch): `git clone https://github.com/neemoi/SLine-API.git`
2. Go to the server part directory: `cd SLine-API`
3. Install dependencies: `dotnet restore`
4. Set up the database and configure environment variables.
5. Build the Docker image: `docker build -t marketplace-backend .`
6. Start the container: `docker run -d -p 5000:80 marketplace-backend`

### Setting up the client side (Frontend)
1. Clone the repository (dev branch): `git clone https://github.com/neemoi/SLine.git`
2. Go to the client part directory: `cd SLine`
3. Install dependencies: `npm install` or `yarn install` (Run `npm install react-icons animate.css @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @pbe/react-yandex-maps`)
4. Build the Docker image: `docker build -t marketplace-frontend .`
5. Start the container: `docker run -d -p 3000:80 marketplace-frontend`

### Setting up Nginx
1. Configure Nginx to reverse proxy requests to the server and client parts.
2. Nginx configuration example:

   ```nginx
   user nginx;
   worker_processes auto;
   error_log /var/log/nginx/error.log;
   pid /run/nginx.pid;

   events {
       worker_connections 1024;
   }

   http {
       include /etc/nginx/mime.types;
       default_type application/octet-stream;

       log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                       '$status $body_bytes_sent "$http_referer" '
                       '"$http_user_agent" "$http_x_forwarded_for"';

       access_log /var/log/nginx/access.log main;

       sendfile on;
       tcp_nopush on;
       tcp_nodelay on;
       keepalive_timeout 65;
       types_hash_max_size 2048;

       include /etc/nginx/conf.d/*.conf;

       server {
           listen 80;
           server_name server_name;

           location /api {
               proxy_pass http://slinedeploy-storelineapi-1:8080;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Proto $scheme;
           }

           location / {
               proxy_pass http://slinedeploy-storelineclient-1:3000;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Proto $scheme;
           }
       }
   }
