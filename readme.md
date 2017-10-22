### Install mongodb
```
brew update
brew install mongodb
mkdir -p /data/db
sudo chown -R `id -un` /data/db
sudo mongod
```

### Install node libraries for this project and start the server
```
npm install
node server.js
```

### Add user
```
curl -X POST \
  http://localhost:3333/api/users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'username=amy&password=123456'
```

### Add client
Encode the username and password, then put that in the POST request below
``` 
echo -n 'amy:123456' | base64
```

POST request to create a client, name=my_client_name&id=my_id&secret=my_secret
```
curl -X POST \
  http://localhost:3333/api/clients \
  -H 'authorization: Basic YW15OjEyMzQ1Ngo=' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'name=my_client_name&id=my_id&secret=my_secret'
```


### Get Authorization Code
Open this link in the browser, and get the authorization code in the redirected uri
http://localhost:3333/api/oauth2/authorize?client_id=my_id&response_type=code&redirect_uri=http://localhost:3333

### Get Access token

Encode the username(client_id) and password(client_secret), then put that in the POST request below
``` 
echo -n 'my_id:my_secret' | base64
```

```
curl -X POST \
  http://localhost:3333/api/oauth2/token \
  -H 'authorization: Basic bXlfaWQ6bXlfc2VjcmV0' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'code=y4tXJ88cVvbPn6Wb&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3333'
```

### Reference
https://github.com/scottksmith95/beerlocker/tree/master/beerlocker-4
http://scottksmith.com/blog/2014/07/02/beer-locker-building-a-restful-api-with-node-oauth2-server/


