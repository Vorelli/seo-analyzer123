import { finder } from '../finder';
import type { JSDOM } from 'jsdom';
import type { IReport, TRuleFunc } from '../interfaces';

const headingsStructureRule: TRuleFunc = (
  dom: JSDOM
): Promise<IReport[] | []> => {
  return new Promise(resolve => {
    const headings = dom.window.document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6'
    );
    const report: IReport[] = [];
    let previousLevel = 0;
    if (headings.length) {
      for (const heading of headings) {
        const level = Number.parseInt(heading.tagName.substring(1), 10);
        if (level < previousLevel) {
          report.push({
            errorMessage: `Incorrect headings structure: ${
              heading.tagName
            } follows ${previousLevel ? `H${previousLevel}` : 'no heading'}.`,
            failingValue: heading.tagName,
            rule: 'incorrect-headings-structure',
            htmlCssSelector: finder(dom, heading)
          });
        }
        previousLevel = level;
      }
    }

    resolve(report);
  });
};

export default headingsStructureRule;
