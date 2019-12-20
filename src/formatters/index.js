import renderToTree from './toTree';
import renderToPlain from './toPlain';
import renderToJSON from './toJSON';
import parse from '../parsers';

const mappingRender = {
  tree: renderToTree,
  plain: renderToPlain,
  json: renderToJSON,
};

export default (file1, file2, format) => mappingRender[format](parse(file1, file2));
