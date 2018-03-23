# Development
```
# install deps
yarn install
# start ETH development node and JSON RPC server
./truffle develop
# deploy contract
./truffle.sh deploy --network development
# start webserver
yarn start
# Open http://localhost:3000/ in a browser
```

# Deploy to Ropsten

Change mnemonic in `ethereum/truffle.js` to yours and run
```
./truffle.sh deploy --network ropsten
```


# Build for Github Pages

Add this line to `package.json`
```
"homepage": "https://gornostal.github.io/demo-dapps",
```
Then run `yarn build` and `cp -r build/* docs`
