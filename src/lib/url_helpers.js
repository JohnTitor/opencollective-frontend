import { pickBy, isEmpty } from 'lodash';

export const invoiceServiceURL = process.env.INVOICES_URL;

// ---- Utils ----

/**
 * Transorm an object into a query string. Strips undefined values.
 *
 * ## Example
 *
 *    > objectToQueryString({a: 42, b: "hello", c: undefined})
 *    "?a=42&b=hello"
 */
export const objectToQueryString = options => {
  const definedOptions = pickBy(options, value => value !== undefined);
  if (isEmpty(definedOptions)) {
    return '';
  }

  const encodeValue = value => {
    if (Array.isArray(value)) {
      return value.concat.map(encodeURIComponent).join(',');
    }
    return encodeURIComponent(value);
  };

  return `?${Object.entries(definedOptions)
    .map(([key, value]) => `${key}=${encodeValue(value)}`)
    .join('&')}`;
};

// ---- Routes to other Open Collective services ----

export const collectiveInvoiceURL = (collectiveSlug, hostSlug, startDate, endDate, format) => {
  return `${invoiceServiceURL}/collectives/${collectiveSlug}/${hostSlug}/${startDate}/${endDate}.${format}`;
};

export const transactionInvoiceURL = transactionUUID => {
  return `${invoiceServiceURL}/transactions/${transactionUUID}/invoice.pdf`;
};

// ---- Routes to external services ----

/**
 * @param opts {object} With the following attributes:
 *  - text: Tweet text
 *  - url: A URL to share in the tweet
 *  - via: A Twitter username to associate with the Tweet, such as your site’s Twitter account
 */
export const tweetURL = opts => {
  return `https://twitter.com/intent/tweet${objectToQueryString(opts)}`;
};

/**
 * Generate a URL from a twitter handle
 */
export const twitterProfileUrl = twitterHandle => {
  return `https://twitter.com/${twitterHandle}`;
};

/**
 * Generate a URL from a Github handle
 */
export const githubProfileUrl = githubHandle => {
  return `https://github.com/${githubHandle}`;
};

/**
 * @param opts {object} With the following attributes:
 *  - u: A URL to share in the tweet
 */
export const facebooKShareURL = opts => {
  return `https://www.facebook.com/sharer/sharer.php${objectToQueryString(opts)}`;
};
