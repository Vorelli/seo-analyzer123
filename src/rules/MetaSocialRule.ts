import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';
import { META_SOCIAL_RULE } from './config/defaults';

const metaSocialRule: TRuleFunc = (
  dom: JSDOM,
  options?: { properties: string[] }
): Promise<IReport[] | []> => {
  const rule = 'metaSocialRule';
  return new Promise(resolve => {
    const report: IReport[] = [];
    const list = options?.properties || META_SOCIAL_RULE.properties;
    for (const property of list) {
      const element: HTMLMetaElement | null = dom.window.document.querySelector(
        `head > meta[property="${property}"]`
      );
      if (!element) {
        report.push({
          rule,
          message: `This HTML is missing a <meta property="${property}"> tag`,
          value: '',
          htmlCssSelector: finder(dom, dom.window.document.head),
          status: 'fail',
          weight: 1
        });
      } else if (!element.content) {
        report.push({
          rule,
          message: `The content attribute for the <meta property="${property}" content=""> tag is empty`,
          value: '',
          htmlCssSelector: finder(dom, element),
          weight: 1,
          status: 'fail'
        });
      } else {
        report.push({
          rule,
          message: 'The content attribute for the <meta> tag is present',
          value: element.content,
          htmlCssSelector: finder(dom, element),
          weight: 1,
          status: 'pass'
        });
      }
    }
    resolve(report);
  });
};

export default metaSocialRule;
