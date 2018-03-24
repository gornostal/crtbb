# Demo ÐApps made with Truffle, Web3, Create React App, Redux, React-Bootstrap

## Development

1. Install deps `yarn install`
1. Start ETH development node and JSON RPC server `./truffle.sh develop`
1. Deploy contract `./truffle.sh deploy --network development`
1. Start Webserver `yarn start`
1. Open http://localhost:3000/ in a browser

## Deploy to Ropsten

Change mnemonic in `ethereum/truffle.js` to yours and run
```
./truffle.sh deploy --network ropsten
```


## Build for Github Pages

```
yarn build
cp -r build/* docs

git add -A
git commit
git push origin master
```
