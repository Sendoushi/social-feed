# Social feeds

Feed aggregator from various social sources.

#### Available feeds
- [ ] Facebook
- [x] Twitter: [helper for the access](https://www.slickremix.com/docs/how-to-get-api-keys-and-tokens-for-twitter/)
- [x] Instagram
- [ ] Google+

---

## Install
```js
// TODO: Set the package in npm
npm install --save ...
```

## Library usage

**Note:** This library uses [es6-promises](https://github.com/stefanpenner/es6-promise#readme) polyfill.

```js
var config = {
    facebook: {
    },
    twitter: {
        access: {
            consumerKey: '',
            consumerSecret: '',
            token: '',
            tokenSecret: ''
        },
        query: {
            screenName: '',
            count: 10
        }
    },
    instagram: {
        query: {
            screenName: '',
            limit: 10
        }
    }  
};

// To get social feeds based on the config object keys
socialFeeds.get(config)
.then(function (data) {
    // Data available here...
});

// To get [feed]'s feed
socialFeeds[feed].get(config[feed])
.then(function (data) {
    // Data available here...
});
```

### Import...
#### Window global
```html
    ...
    <script src="node_modules/social-feeds/build/social-feeds.min.js"></script>
</body>
</html>
```
```js
window.socialFeeds.get(...);
```

#### Webpack / Requirejs
```js
var socialFeeds = require('social-feeds');
socialFeeds.get(...);
```

---

## Contribution development

If you want to help out with this module please follow next steps and pull request your changes.

### Installation

- Install [node](http://nodejs.org)
- `npm install`

### Running
- `npm run build # builds dev`
- `npm run build-prod # builds prod`

### Test

- `npm run test`

**Note:** You should have in your IDE a linter for ESLint and Editorconfig and never commit without checking `test` script first.
