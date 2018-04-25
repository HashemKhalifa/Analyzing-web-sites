import cheerio from 'cheerio';
import request from 'request-promise';
import { getDomainName, getUrlPatterns, getHeading, cleanStr } from './helpers';

/**
 *
 * @param url
 * @returns {Promise<{error: string}>}
 */
const getWebContent = async (url) => {
  // empty url
  if (!url) {
    return { error: 'url is required' };
  }

  return request(url)
    .then((html) => {
      const domain = getDomainName(url);
      const cheer = cheerio.load(html);
      const title = cheer('title').text();

      const docType = cheer.html().substring(0, 100);
      let version = '5';
      // doc version, todo add other veriosn
      if (docType.indexOf('<!doctype html>') >= 0) {
        version = '4.0.1';
      }

      const description = cheer('meta[name="description"]').attr('content');
      const keywords = cheer('meta[name="description"]').attr('keywords');

      // todo refactor
      const h1 = getHeading(html, 'h1').length;
      const h2 = getHeading(html, 'h2').length;
      const h3 = getHeading(html, 'h3').length;
      const h4 = getHeading(html, 'h4').length;

      const isLoginFormExist = cheer('input[type="password"]').length !== 0;
      const internalLinks = [];
      const externalLinks = [];

      cheer(html).find('a').each(function (i, elem) {
        const href = cheer(this).attr('href');
        // escape # ref
        if (href === '#') {
          return;
        }
        const linkText = cleanStr(cheer(this).text());
        const link = {
          linkText,
          href,
        };
        if (href.startsWith('/') || getUrlPatterns(url).some(domainPattern => href.indexOf(domainPattern) !== -1)) {
          internalLinks[i] = link.href;
        } else {
          externalLinks[i] = link;
        }
      });


      return {
        htmlVersion: version,
        url,
        domain,
        meta: {
          title,
          description,
          keywords,
        },
        heads: {
          h1,
          h2,
          h3,
          h4,
        },
        links: {
          internalLinks: internalLinks.filter(Boolean).length,
          externalLinks: externalLinks.filter(Boolean).length,
        },
        isLoginFormExist,
      };
    })

    .catch(err => ({
      error: 'error happens !',
      details: err.toString(),
    }));
};

export { getWebContent };
