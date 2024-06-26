const SeoAnalyzer = require('../dist/index.js');

// --------- Custom rules ------------ //
function customRule(dom) {
  return new Promise((resolve, reject) => {
    const paragraph = dom.window.document.querySelector('p');
    if (paragraph) {
      resolve('');
    } else {
      reject('No <p> tags found');
    }
  });
}
// -------------------------------- //

new SeoAnalyzer()
  // ------- Ignore methods ------- //
  .ignoreFolders(['example/html/contact'])
  .ignoreFiles(['example/html/team.html'])
  .ignoreUrls(['/#/product/2'])
  // ------- Input methods -------- //
  // .inputFolders(['example'])
  .inputUrls(['https://maddevs.io'])
  // .inputFiles(['example/html/index.html'])
  // .inputSpaFolder('example/spa', 'sitemap.xml')
  // .inputHTMLStrings([
  //   {
  //     source: '/myExamplePage',
  //     text: '<!DOCTYPE html><html><body><h1>title</h1><p>content</p></body></html>'
  //   }
  // ])

  // ------ Default rules -------- //
  .useRule('titleLengthRule', { min: 10, max: 50 })
  .useRule('metaBaseRule', { names: ['title', 'description'] })
  .useRule('metaSocialRule', {
    properties: [
      'og:url',
      'og:type',
      'og:site_name',
      'og:title',
      'og:description',
      'og:image',
      'og:image:width',
      'og:image:height',
      'twitter:card',
      'twitter:text:title',
      'twitter:description',
      'twitter:image:src',
      'twitter:url'
    ]
  })
  .useRule('imgTagWithAltAttributeRule')
  .useRule('aTagWithRelAttributeRule')
  .useRule('canonicalLinkRule')
  // Custom rules
  .addRule(customRule)
  // ------- Output methods ------- //
  // .outputObject(obj => console.log(obj))
  // .outputJson(json => console.log(json))
  .outputConsole()
  .run();
