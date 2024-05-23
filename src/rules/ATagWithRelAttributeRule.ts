import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';

const ATagWithRelAttributeRule: TRuleFunc = (
  dom: JSDOM
): Promise<IReport[] | []> => {
  return new Promise(resolve => {
    const report: IReport[] = [];
    const elements = dom.window.document.querySelectorAll('a');
    for (const element of elements) {
      if (!element.rel) {
        report.push({
          message: 'This <a> tags is missing a rel attribute',
          rule: 'tagMissingRelAttribute',
          value: '',
          htmlCssSelector: finder(dom, element),
          status: 'fail',
          weight: 1
        });
      } else {
        report.push({
          message: 'This <a> tags has a rel attribute',
          rule: 'tagMissingRelAttribute',
          value: element.rel,
          htmlCssSelector: finder(dom, element),
          status: 'pass',
          weight: 1
        });
      }
    }
    resolve(report);
  });
};

export default ATagWithRelAttributeRule;
