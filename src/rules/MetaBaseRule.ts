import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';
import { META_BASE_RULE } from './config/defaults';

const metaBaseRule: TRuleFunc = (
  dom: JSDOM,
  options?: { names: string[] }
): Promise<IReport[] | []> => {
  return new Promise(resolve => {
    const report: IReport[] = [];
    const list = options?.names || META_BASE_RULE.names;
    for (const name of list) {
      const element: HTMLHeadElement | null =
        dom.window.document.querySelector('head');
      const headMetaElement: HTMLMetaElement | null =
        element?.querySelector(`meta[name="${name}"]`) ?? null;
      if (!headMetaElement) {
        report.push({
          message: `This HTML is missing a <meta name="${name}"> tag`,
          htmlCssSelector: finder(dom, dom.window.document.head),
          value: '',
          rule: 'headTagMissingMetaTag',
          status: 'fail',
          weight: 1
        });
      } else if (!headMetaElement.content) {
        report.push({
          message: `The content attribute for the <meta name="${name}" content=""> tag is empty`,
          htmlCssSelector: finder(dom, headMetaElement),
          value: '',
          rule: 'metaTagMissingContentAttribute',
          weight: 1,
          status: 'warn'
        });
      } else {
        report.push({
          message: 'You have a content attribute for the <meta name="${name}">',
          status: 'pass',
          weight: 1,
          rule: 'metaTagMissingContentAttribute',
          value: headMetaElement.content,
          htmlCssSelector: finder(dom, headMetaElement)
        });
      }
    }
    resolve(report);
  });
};

export default metaBaseRule;
