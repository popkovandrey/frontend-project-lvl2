import renderToTree from './toTree';
import renderToPlain from './toPlain';
import renderToJSON from './toJSON';
import getDiffAST from '../parsers';

const mappingRender = {
  tree: renderToTree,
  plain: renderToPlain,
  json: renderToJSON,
};

export default (file1, file2, format) => mappingRender[format](getDiffAST(file1, file2));
