[![npm](http://img.shields.io/npm/v/generator-express-web-site.svg?style=flat-square)](https://www.npmjs.com/package/generator-express-web-site)
[![npm](http://img.shields.io/npm/l/generator-express-web-site.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# generator-express-web-site
> [Yeoman](http://yeoman.io) generator

## features:
- twitter bootstrap (less)
- express (+ common packages)
- lodash
- jade
- grunt + grunto
- random baseColor for header in base template

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

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-express-web-site from npm, run:

```bash
npm install -g generator-express-web-site
```

Finally, initiate the generator:

```bash
yo node-lib
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
