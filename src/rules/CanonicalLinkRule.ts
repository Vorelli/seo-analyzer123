import type { JSDOM } from 'jsdom';
import { cssPath } from '.';
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
        errorMessage:
          'This HTML is missing a <link rel="canonical" href="..."> link',
        failingValue: '',
        htmlCssSelector: cssPath(dom.window.document.querySelector('head')),
        rule: 'headTagMissingCanonicalLink'
      });
    } else {
      if (element && !element?.href) {
        report.push({
          errorMessage: 'The canonical link is missing an href attribute',
          failingValue: '',
          htmlCssSelector: cssPath(element),
          rule: 'canonicalLinkMissingHrefAttribute'
        });
      } else if (element && element.href.substr(-1) !== '/') {
        report.push({
          errorMessage:
            'The href attribute does not have a slash at the end of the link.',
          failingValue: element.href,
          htmlCssSelector: cssPath(element),
          rule: 'canonicalLinkHrefMissingTrailingSlash'
        });
      }
    }
    resolve(report);
  });
};

export default canonicalLinkRule;
