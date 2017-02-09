# SecureStorage

[![GitHub release](https://img.shields.io/github/release/Mike96angelo/Secure-Storage.svg?maxAge=21600)](https://github.com/Mike96Angelo/Secure-Storage/releases)
[![npm version](https://img.shields.io/npm/v/secure-web-storage.svg?maxAge=21600)](https://www.npmjs.com/package/secure-web-storage)
[![npm downloads](https://img.shields.io/npm/dm/secure-web-storage.svg?maxAge=604800)](https://npm-stat.com/charts.html?package=secure-web-storage&from=2017-02-8)
[![npm downloads](https://img.shields.io/npm/dt/secure-web-storage.svg?maxAge=604800)](https://npm-stat.com/charts.html?package=secure-web-storage&from=2017-02-8)

A simple wrapper for localStorage/sessionStorage that allows one to encrypt/decrypt the data being stored.

### Install:
```
$ npm install secure-web-storage
```
# What SecureStorage Looks Like
<!-- * [Docs](docs/javascript-api.md) -->
<!-- * [JSFiddle](https://jsfiddle.net/fypyk2jp/4/) -->

### app.js:

```JavaScript
var CryptoJS = require("crypto-js");

var SECRET_KEY = 'my secret key';

var secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);

        data = data.toString();

        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
});

var data = {
    secret: 'data'
};

// there is no need to stringify/parse you objects before and after storing.

secureStorage.setItem('data', data);
// stores in localStorage like:
// key => value
// "ad36d572..." => "w1svi6n..."

var decryptedData = secureStorage.getItem('data');
// returns { secret: 'data' }

secureStorage.removeItem('data');
// removes the entry 'data'

secureStorage.key(id)
// returns the hashed version of the key you passed into setItem with the given id.

secureStorage.clear();
// clears all data in the underlining sessionStorage/localStorage.

secureStorage.length;
// the number of entries in the underlining sessionStorage/localStorage.

```
