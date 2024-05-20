import type { JSDOM } from 'jsdom';
import { cssPath } from '.';
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
        htmlCssSelector:
          cssPath(dom.window.document.querySelector('head')) ??
          cssPath(dom.window.document.rootElement)
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
        htmlCssSelector: cssPath(descriptionTags[0].parentElement),
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
        htmlCssSelector: cssPath(descriptionTags[0]),
        failingValue: descriptionContent,
        errorMessage: `The meta description length(${descriptionLength}) should be between ${min} and ${max} characters.`
      });
    }
    resolve(report);
  });
};

export default metaDescriptionRule;
