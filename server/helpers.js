import cheerio from "cheerio";
import URL from 'url';

/**
 *
 * @param url
 * @returns {string}
 */
const getDomainName = (url) => {
    return URL.parse(url).hostname;
};

const getUrlPatterns = (url) => {
    let { hostname, href, pathname, protocol} = URL.parse(url);
    let patterns = [];
    if (hostname.startsWith('www')) {
        let withoutW = hostname.slice(4);
        patterns = [url,  hostname, href, withoutW, `http://${withoutW}${pathname}`, `https://${withoutW}${pathname}`];
        if (protocol === 'http:') {
            patterns.push(`https://www.${withoutW}`);
            patterns.push(`https://${withoutW}`);
        } else {
            patterns.push(`http://${withoutW}`);
        }
    } else {
        patterns = [url,  hostname, href, `http://www.${hostname}${pathname}`, `https://www.${hostname}${pathname}`];
        if (protocol === 'http:') {
            patterns.push(`https://www.${hostname}`);
            patterns.push(`https://${hostname}`);
        } else {
            patterns.push(`http://www.${hostname}`);
        }
    }
    return patterns;
}

/**
 *
 * @param str
 * @returns {*}
 */
const cleanStr = (str) => {
    if (!str) return '';
    return str.replace(/(\r\n|\t\n|\t|\n|\r)/gm, '')
};
/**
 *
 * @param html
 * @param heading
 * @returns {Array}
 */
const getHeading = (html, heading) => {
    let h = [];
    const $ = cheerio.load(html);

    $(html)
        .find(heading)
        .each((i, elem) => {
            h[i] = cleanStr($(elem).text());
        });
    return h;
};
 export {getDomainName, getHeading , getUrlPatterns, cleanStr}
