import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';

const imgTagWithAltAttributeRule: TRuleFunc = (
  dom: JSDOM
): Promise<IReport[] | []> => {
  return new Promise(resolve => {
    let countAlt = 0;
    let countSrc = 0;
    const report: IReport[] = [];
    const elements = dom.window.document.querySelectorAll('img');

    for (const element of elements) {
      if (!element.alt) {
        report.push({
          rule: 'imgMissingAltAttribute',
          message: 'This image tag is missing an alt attribute',
          value: '',
          htmlCssSelector: finder(dom, element),
          weight: 0.5,
          status: 'fail'
        });
        countAlt++;
      }
      if (!element.src) {
        report.push({
          rule: 'imgMissingSrcAttribute',
          message: 'This image tag is missing a src attribute',
          value: '',
          htmlCssSelector: finder(dom, element),
          status: 'fail',
          weight: 0.5
        });
        countSrc++;
      }
      if (element.src && element.alt) {
        report.push({
          rule: 'imgMissingSrcAttribute',
          message: 'This image tag has src and alt attributes',
          value: `src=${element.src} alt=${element.alt}`,
          htmlCssSelector: finder(dom, element),
          status: 'pass',
          weight: 1
        });
      }
    }
    resolve(report);
  });
};

export default imgTagWithAltAttributeRule;
