import aTagWithRelAttributeRule from './ATagWithRelAttributeRule';
import canonicalLinkRule from './CanonicalLinkRule';
import headingsStructureRule from './HeadingsStructureRule';
import imgTagWithAltAttributeRule from './ImgTagWithAltAttributeRule';
import metaBaseRule from './MetaBaseRule';
import metaDescriptionRule from './MetaDescriptionRule';
import metaSocialRule from './MetaSocialRule';
import titleLengthRule from './TitleLengthRule';

const defaultRules = {
  titleLengthRule,
  metaDescriptionRule,
  imgTagWithAltAttributeRule,
  aTagWithRelAttributeRule,
  canonicalLinkRule,
  metaBaseRule,
  metaSocialRule,
  headingsStructureRule
};

export const cssPath = (el: Element | null): string => {
  if (!el) return '';
  const path: string[] = [];
  let runningElement: Element | null = el;
  while (runningElement && runningElement.nodeType === 1) {
    let selector = runningElement.nodeName.toLowerCase();
    if (runningElement.id) {
      selector += `#${runningElement.id}`;
    } else {
      let sib: Element | null = runningElement;
      let nth = 1;
      while (sib?.nodeType === 1) {
        sib = sib.previousElementSibling;
        nth++;
      }
      selector += `:nth-child(${nth})`;
    }
    path.unshift(selector);
    runningElement = runningElement.parentElement;
  }
  return path.length === 0 ? '' : path.join(' > ');
};

export default defaultRules;
