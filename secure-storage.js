var Generator = require('generate-js');

var SecureStorage = Generator.generate(
    function SecureStorage(storage, options) {
        var _ = this;

        _.storage = storage;
        if (options) {
            _.hash = options.hash;
            _.encrypt = options.encrypt;
            _.decrypt = options.decrypt;
        }
    }
);

function through(data) {
    return data;
}

SecureStorage.definePrototype({
    hash: through,
    encrypt: through,
    decrypt: through,
}, {
    writable: true
});

SecureStorage.definePrototype({
    getItem: function getItem(key) {
        var _ = this;

        key = _.hash(key);

        var value = _.storage.getItem(key);

        if (typeof value !== 'string') {
            return value;
        }

        value = _.decrypt(value);

        return JSON.parse(value);
    },

    setItem: function setItem(key, value) {
        var _ = this;

        key = _.hash(key);

        value = JSON.stringify(value);

        value = _.encrypt(value);

        return _.storage.setItem(key, value);
    },

    removeItem: function removeItem(key) {
        var _ = this;

        key = _.hash(key);

        return _.storage.removeItem(key);
    },

    clear: function clear() {
        var _ = this;

        return _.storage.clear();
    },

    key: function key(id) {
        var _ = this;

        return _.storage.key(id);
    },

    length: {
        get: function getLength() {
            var _ = this;
            return _.storage.length;
        }
    }
});

module.exports = SecureStorage;
