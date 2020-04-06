import hljs from 'highlight.js'

let originEl ;
const highlight = function (el) {
  if (originEl !== el) {    
    originEl = el
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
const install = function (Vue) {
  Vue.directive("highlight", highlight);
};

if (window.Vue) {
  window["highlight"] = highlight;
  Vue.use(install); // eslint-disable-line
}

highlight.install = install;
export default highlight;
