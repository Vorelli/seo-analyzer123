import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';
import { TITLE_LENGTH_RULE } from './config/defaults';

const titleLengthRule: TRuleFunc = (
  dom: JSDOM,
  options?: { min?: number; max?: number; failMin?: number; failMax?: number }
): Promise<IReport[] | []> => {
  const rule = 'titleLengthRule';
  return new Promise(resolve => {
    const titleElement = dom?.window?.document?.querySelector('title');
    const report: IReport[] = [];
    if (!titleElement) {
      report.push({
        rule,
        htmlCssSelector: '',
        value: '',
        message: 'This HTML is missing a <title> tag',
        status: 'fail',
        weight: 1
      });
    } else {
      const titleText = titleElement?.text;
      const titleLength = titleText?.length || 0;
      const failMin = options?.failMin ?? TITLE_LENGTH_RULE.failMin;
      const failMax = options?.failMax ?? TITLE_LENGTH_RULE.failMax;
      const min = options?.min || TITLE_LENGTH_RULE.min;
      const max = options?.max || TITLE_LENGTH_RULE.max;
      const weight = 1;
      if (titleLength < min) {
        if (titleLength < failMin) {
          report.push({
            rule,
            message: `<title> too short: ${titleLength}. The minimum length should be at least ${min} characters long.`,
            htmlCssSelector: finder(dom, titleElement),
            value: titleText ?? '',
            status: 'fail',
            weight
          });
        } else {
          report.push({
            rule,
            message: `<title> possibly too short: ${titleLength}. The minimum length should be at least ${min} characters long.`,
            weight: 1,
            status: 'warn',
            htmlCssSelector: finder(dom, titleElement),
            value: titleText ?? ''
          });
        }
      } else if (titleLength > max) {
        if (titleLength > failMax) {
          report.push({
            rule,
            message: `<title> possibly too long: ${titleLength}. The maximum length should be at least ${max} characters long.`,
            value: titleText ?? '',
            htmlCssSelector: finder(dom, titleElement),
            status: 'fail',
            weight: 1
          });
        } else {
          report.push({
            rule,
            message: `<title> too long: ${titleLength}. The maximum length should be at least ${max} characters long.`,
            value: titleText ?? '',
            htmlCssSelector: finder(dom, titleElement),
            weight: 1,
            status: 'warn'
          });
        }
      } else {
        report.push({
          rule,
          status: 'pass',
          htmlCssSelector: finder(dom, titleElement),
          value: titleText,
          weight: 1,
          message: 'Title is of sufficient length.'
        });
      }
    }
    resolve(report);
  });
};

export default titleLengthRule;
