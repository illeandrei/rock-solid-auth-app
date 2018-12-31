# Setup:
 - run the following commands:
 ```
    cd server
    npm install
    echo "exports.secret = '<someRandomString>';" >> config.js
 ```
 - remove "" from config.js`s generated line and replace someRandomString with gibberish 😁
 - install MongoDB [guide](https://treehouse.github.io/installation-guides/windows/mongo-windows.html)

# Start project:
- open cmd and start mongo deamon: 
```
    "c:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"
```

- open new/another cmd and start mongo: 
```
    "c:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"
```

- start server:
```
    cd server
    npm run dev
```