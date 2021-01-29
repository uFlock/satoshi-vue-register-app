# satoshi-register-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
Warning: won't work without .env.development.local file
```
npm run serve
```
.env.development.local example:
```dotenv
VUE_APP_REGISTER_API_URL=http://localhost:1337/api/user/register
VUE_APP_NEXT_CONTAINER_URL=http://localhost:8081/
```
### Compiles and minifies for production
Warning: won't work without .env.production.local file
```
npm run build
```
.env.production.local example:
```dotenv
VUE_APP_REGISTER_API_URL=http://localhost:1337/api/user/register
VUE_APP_NEXT_CONTAINER_URL=http://localhost:8081/
```
### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Build Container
```
docker build -t vue-app-register .
```

### Run Container In docker
```
docker run --name vue-app-register -d -p 8080:80 vue-app-register
```

### Deploy To Kubernetes
Use your own deployment configs

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
