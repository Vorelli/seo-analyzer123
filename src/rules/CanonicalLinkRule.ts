import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';

/**
 * Checks the presence and validity of the canonical link in the provided DOM.
 * @param {import('jsdom').JSDOM} dom The JSDOM object representing the HTML document.
 * @returns {Promise<string|null>} A promise that resolves with a string indicating an error message if
 * the canonical link is missing or invalid, otherwise resolves with null.
 */
const canonicalLinkRule: TRuleFunc = (dom: JSDOM): Promise<IReport[] | []> => {
  return new Promise(resolve => {
    const element: HTMLAnchorElement | null = dom.window.document.querySelector(
      'head > link[rel="canonical"]'
    );
    const report: IReport[] = [];
    if (!element) {
      report.push({
        message:
          'This HTML is missing a <link rel="canonical" href="..."> link',
        value: '',
        htmlCssSelector: finder(dom, dom.window.document.head),
        rule: 'headTagMissingCanonicalLink',
        weight: 1,
        status: 'fail'
      });
    } else {
      if (element && !element?.href) {
        report.push({
          message: 'The canonical link is missing an href attribute',
          value: '',
          htmlCssSelector: finder(dom, element),
          rule: 'canonicalLinkMissingHrefAttribute',
          status: 'fail',
          weight: 1
        });
      } else if (element && element.href[element.href.length - 1] !== '/') {
        report.push({
          message:
            'The href attribute does not have a slash at the end of the link.',
          value: element.href,
          htmlCssSelector: finder(dom, element),
          rule: 'canonicalLinkHrefMissingTrailingSlash',
          weight: 1,
          status: 'fail'
        });
      } else {
        report.push({
          message: 'The canonical link is valid.',
          weight: 1,
          status: 'pass',
          rule: 'canonicalLinkHrefMissingTrailingSlash',
          htmlCssSelector: finder(dom, element),
          value: element.href
        });
      }
    }
    resolve(report);
  });
};

export default canonicalLinkRule;
