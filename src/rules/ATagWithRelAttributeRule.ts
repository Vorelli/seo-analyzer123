import type { JSDOM } from 'jsdom';
import { cssPath } from '.';
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
          errorMessage: 'This <a> tags is missing a rel attribute',
          rule: 'tagMissingRelAttribute',
          failingValue: '',
          htmlCssSelector: cssPath(element)
        });
      }
    }
    resolve(report);
  });
};

export default ATagWithRelAttributeRule;
