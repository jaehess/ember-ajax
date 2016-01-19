/* global require, module */

const absoluteUrlRegex = /^(http|https)/;

/*
 * Isomorphic URL parsing
 * Borrowed from
 * http://www.sitepoint.com/url-parsing-isomorphic-javascript/
 */
const isNode = (typeof module === 'object' && module.exports);
const url = (isNode ? require('url') : document.createElement('a'));

/**
 * Parse a URL string into an object that defines its structure
 *
 * The returned object will have the following properties:
 *
 *   href: the full URL
 *   protocol: the request protocol
 *   hostname: the target for the request
 *   port: the port for the request
 *   pathname: any URL after the host
 *   search: query parameters
 *   hash: the URL hash
 *
 * @private
 * @return {Object} URL structure
 */
function parseUrl(str) {
  let fullObject;
  if (isNode) {
    fullObject = url.parse(str);
  } else {
    url.href = str;
    fullObject = url;
  }
  const desiredProps = {};
  desiredProps.href = fullObject.href;
  desiredProps.protocol = fullObject.protocol;
  desiredProps.hostname = fullObject.hostname;
  desiredProps.port = fullObject.port;
  desiredProps.pathname = fullObject.pathname;
  desiredProps.search = fullObject.search;
  desiredProps.hash = fullObject.hash;
  return desiredProps;
}

/**
 * RequestURL
 *
 * Converts a URL string into an object for easy comparison to other URLs
 *
 * @public
 */
export class RequestURL {
  constructor(url) {
    this.url = url;
  }

  get url() {
    return this._url;
  }

  get isAbsolute() {
    return this.url.match(absoluteUrlRegex);
  }

  set url(value) {
    this._url = value;

    const explodedUrl = parseUrl(value);
    for (let prop in explodedUrl) {
      this[prop] = explodedUrl[prop];
    }

    return this._url;
  }
}
