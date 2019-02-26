/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var less = require('less'),
    dirname = typeof module === 'undefined' ? function(s) {return s;} : require('path').dirname; // Browser compat

/**
 * Minify CSS. Also compiles LESS stylesheets.
 *
 * @param options {Object} Ignored.
 * @param blob {Object} Incoming blob.
 * @param done {Function} Callback on task completion.
 */
exports.cssminify = exports.less = async (options, blob, done) => {
    options = options || {};

    if (typeof blob.name === "string") {
        options.paths = [dirname(blob.name)];
    }

    // Need to make sure to compress since we pass options directly through to Less
    if (options.compress === undefined && options.yuicompress === undefined) {
        options.compress = true;
    }

    try {
        const rendered = await less.render(blob.result, options);
        done(null, new blob.constructor(rendered.css, blob));
    } catch (err) {
        done(err);
    }
};
