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
          errorMessage: `This HTML is missing a <meta name="${name}"> tag`,
          htmlCssSelector: finder(dom, dom.window.document.head),
          failingValue: '',
          rule: 'headTagMissingMetaTag'
        });
      } else if (!headMetaElement.content) {
        report.push({
          errorMessage: `The content attribute for the <meta name="${name}" content=""> tag is empty`,
          htmlCssSelector: finder(dom, headMetaElement),
          failingValue: '',
          rule: 'metaTagMissingContentAttribute'
        });
      }
    }
    resolve(report);
  });
};

export default metaBaseRule;
