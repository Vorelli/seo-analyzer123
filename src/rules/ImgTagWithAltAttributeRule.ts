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
          errorMessage: 'This image tag is missing an alt attribute',
          failingValue: '',
          htmlCssSelector: finder(dom, element)
        });
        countAlt++;
      }
      if (!element.src) {
        report.push({
          rule: 'imgMissingSrcAttribute',
          errorMessage: 'This image tag is missing a src attribute',
          failingValue: '',
          htmlCssSelector: finder(dom, element)
        });
        countSrc++;
      }
    }
    resolve(report);
  });
};

export default imgTagWithAltAttributeRule;
