function imgTagWithAltAttritubeRule(dom) {
  return new Promise(resolve => {
    let countAlt = 0;
    let countSrc = 0;
    const report = [];
    const elements = dom.window.document.querySelectorAll('img');

    elements.forEach(element => {
      if (!element.alt) {
        countAlt++;
      }
      if (!element.src) {
        countSrc++;
      }
    });

    if (countSrc > 0) {
      report.push(`There are ${countSrc} <img> tag without src attribute`);
    }

    if (countAlt > 0) {
      report.push(`There are ${countAlt} <img> tag without alt attribute`);
    }

    if (countSrc || countAlt) {
      resolve(report);
    }

    resolve(null);
  });
}

export default imgTagWithAltAttritubeRule;
