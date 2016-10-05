# Social feeds

Feed aggregator from various social sources.

#### Available feeds
- [x] Facebook: [helper for the access](https://www.slickremix.com/docs/how-to-get-api-keys-and-tokens-for-twitter/)
- [x] Twitter: [helper for the access](https://developers.facebook.com/quickstarts/)
- [x] Instagram: [helper for the access](https://medium.com/@bkwebster/how-to-get-instagram-api-access-token-and-fix-your-broken-feed-c8ad470e3f02#.26agswzvx)
- [ ] Google+

---

## Install
```js
npm install --save git://github.com/Sendoushi/social-feeds.git
```

## Library usage

**Note:** This library uses [es6-promises](https://github.com/stefanpenner/es6-promise#readme) polyfill.

```js
var config = {
    facebook: {
        access: {
            appId: '',
            appSecret: ''
        },
        query: {
            type: '', // Defaults to 'feed'. Available 'page'
            pageId: '',
            fields: '', // Defaults to 'id,message,created_time,likes,comments'
            feed: '', // Defaults to 'feed'
            limit: 1 // Defaults to 50
        }
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
            excludeReplies: '',
            limit: 1 // Defaults to 50
        }
    },
    instagram: {
        access: {
            token: '',
            proxy: false
        },
        query: {
            userId: '',
            limit: 1 // Defaults to 50
        }
    }  
};

// To get social feeds based on the config object keys
socialFeeds.get(config)
.then(function (data) {
    // Data available here...
});

// To get [feedName]'s feed
socialFeeds[feedName].get(config[feedName])
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

For better javascript size and minor footprint, I would recommend to import directly the specific modules you need.

```js
var feed = require('social-feeds/modules/' + feedName);
feed.get(...);
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
