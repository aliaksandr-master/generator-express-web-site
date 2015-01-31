# generator-express-web-site
yeoman generator express (+ common packages), lodash, bootstrap-less, jade

## tech:
- twitter bootstrap (less)
- expressjs
- lodash
- jade
- grunt + grunto

### Build
```shell
$ npm i
$ bower i
$ grunt build
```

### Server Management

#### Development
```shell
$ grunt
```
#### Production
need `forever` npm package
```shell
$ npm i -g forever
```
run
```shell
$ npm start
```
stop
```shell
$ npm stop
```
status
```shell
$ npm run status
```
