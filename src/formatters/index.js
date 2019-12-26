import renderToTree from './toTree';
import renderToPlain from './toPlain';
import renderToJSON from './toJSON';

const mappingRender = {
  tree: renderToTree,
  plain: renderToPlain,
  json: renderToJSON,
};

export default (diffAst, format) => mappingRender[format](diffAst);
