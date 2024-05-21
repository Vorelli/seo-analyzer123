import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';
import { META_DESCRIPTION_LENGTH_RULE } from './config/defaults';

const metaDescriptionRule: TRuleFunc = (
  dom: JSDOM,
  options: { min: number; max: number }
): Promise<IReport[] | []> => {
  return new Promise(resolve => {
    const description = dom.window.document.querySelector(
      "meta[name='description']"
    );
    const report: IReport[] = [];
    if (!description) {
      report.push({
        errorMessage: 'Meta description tag is missing.',
        rule: 'metaDescriptionTagMissing',
        failingValue: '',
        htmlCssSelector: finder(dom, dom.window.document.head)
      });
    }
    const descriptionTags: NodeListOf<Element> =
      dom.window.document.querySelectorAll("meta[name='description']") || [];
    const descriptionContent: string | null =
      description?.getAttribute('content') ?? null;
    const descriptionLength = descriptionContent?.length || 0;
    const min = options?.min || META_DESCRIPTION_LENGTH_RULE.min;
    const max = options?.max || META_DESCRIPTION_LENGTH_RULE.max;
    if (descriptionTags.length > 1) {
      report.push({
        htmlCssSelector: finder(dom, dom.window.head),
        errorMessage: 'More than one meta description tag found.',
        failingValue: '',
        rule: 'shouldOnlyHaveOneDescriptionTag'
      });
    }
    if (
      descriptionContent &&
      (descriptionLength < min || descriptionLength > max)
    ) {
      report.push({
        rule: 'metaDescriptionLength',
        htmlCssSelector: finder(dom, descriptionTags[0]),
        failingValue: descriptionContent,
        errorMessage: `The meta description length(${descriptionLength}) should be between ${min} and ${max} characters.`
      });
    }
    resolve(report);
  });
};

export default metaDescriptionRule;
