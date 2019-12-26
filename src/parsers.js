import yaml from 'js-yaml';
import ini from 'ini';

const mappingTypeParse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (type, data) => mappingTypeParse[type](data);
