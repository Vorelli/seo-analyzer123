import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';
import { TITLE_LENGTH_RULE } from './config/defaults';

const titleLengthRule: TRuleFunc = (
  dom: JSDOM,
  options?: { min: number; max: number }
): Promise<IReport[] | []> => {
  const rule = 'titleLengthRule';
  return new Promise(resolve => {
    const titleElement = dom?.window?.document?.querySelector('title');
    const titleText = titleElement?.text;
    const report: IReport[] = [];
    if (!titleElement) {
      report.push({
        rule,
        htmlCssSelector: '',
        failingValue: '',
        errorMessage: 'This HTML is missing a <title> tag'
      });
    } else {
      const titleLength = titleText?.length || 0;
      const min = options?.min || TITLE_LENGTH_RULE.min;
      const max = options?.max || TITLE_LENGTH_RULE.max;
      if (titleLength < min) {
        report.push({
          rule,
          errorMessage: `<title> too short(${titleLength}). The minimum length should be ${min} characters.`,
          htmlCssSelector: finder(dom, titleElement),
          failingValue: titleText ?? ''
        });
      }
      if (titleLength > max) {
        report.push({
          rule,
          errorMessage: `<title> too long(${titleLength}). The maximum length should be ${max} characters.`,
          failingValue: titleText ?? '',
          htmlCssSelector: finder(dom, titleElement)
        });
      }
    }
    resolve(report);
  });
};

export default titleLengthRule;
