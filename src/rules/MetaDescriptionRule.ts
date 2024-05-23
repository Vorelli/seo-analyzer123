import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';
import { META_DESCRIPTION_LENGTH_RULE } from './config/defaults';

const metaDescriptionRule: TRuleFunc = (
  dom: JSDOM,
  options: { min?: number; max?: number; failMin?: number; failMax?: number }
): Promise<IReport[] | []> => {
  return new Promise(resolve => {
    const description = dom.window.document.querySelector(
      "meta[name='description']"
    );
    const report: IReport[] = [];
    if (!description) {
      report.push({
        message: 'Meta description tag is missing.',
        rule: 'metaDescriptionTagMissing',
        value: '',
        htmlCssSelector: finder(dom, dom.window.document.head),
        weight: 1,
        status: 'fail'
      });
    }
    const descriptionTags: NodeListOf<Element> =
      dom.window.document.querySelectorAll("meta[name='description']") || [];
    const descriptionContent: string | null =
      description?.getAttribute('content') ?? null;
    const descriptionLength = descriptionContent?.length || 0;
    const min = options?.min || META_DESCRIPTION_LENGTH_RULE.min;
    const max = options?.max || META_DESCRIPTION_LENGTH_RULE.max;
    const failMin = options?.failMin || META_DESCRIPTION_LENGTH_RULE.failMin;
    const failMax = options?.failMax || META_DESCRIPTION_LENGTH_RULE.failMax;
    if (descriptionTags.length > 1) {
      report.push({
        htmlCssSelector: finder(dom, dom.window.head),
        message: 'More than one meta description tag found.',
        value: '',
        rule: 'shouldOnlyHaveOneDescriptionTag',
        status: 'fail',
        weight: 1
      });
    }
    if (descriptionContent && descriptionLength < min) {
      if (descriptionLength < failMin) {
        report.push({
          rule: 'metaDescriptionLength',
          htmlCssSelector: finder(dom, descriptionTags[0]),
          value: descriptionContent,
          message: `You may want the meta description length (${descriptionLength}) to be at least ${min} characters long.`,
          weight: 1,
          status: 'fail'
        });
      } else {
        report.push({
          rule: 'metaDescriptionLength',
          htmlCssSelector: finder(dom, descriptionTags[0]),
          value: descriptionContent,
          message: `The meta description length (${descriptionLength}) should be between at minimum ${failMin} characters long.`,
          weight: 1,
          status: 'warn'
        });
      }
    } else if (descriptionContent && descriptionLength > max) {
      if (descriptionLength > failMax) {
        report.push({
          rule: 'metaDescriptionLength',
          htmlCssSelector: finder(dom, descriptionTags[0]),
          value: descriptionContent,
          message: `The meta description length (${descriptionLength}) should be between at most ${failMax} characters long.`,
          weight: 1,
          status: 'fail'
        });
      } else {
        report.push({
          rule: 'metaDescriptionLength',
          htmlCssSelector: finder(dom, descriptionTags[0]),
          value: descriptionContent,
          message: `You may want the meta description length (${descriptionLength}) to be at most ${max} charactes long.`,
          weight: 1,
          status: 'warn'
        });
      }
    } else if (descriptionContent) {
      report.push({
        rule: 'metaDescriptionLength',
        htmlCssSelector: finder(dom, descriptionTags[0]),
        value: descriptionContent,
        message: `Your meta description length is within standard. ${descriptionLength} characters long`,
        weight: 1,
        status: 'pass'
      });
    }
    resolve(report);
  });
};

export default metaDescriptionRule;
