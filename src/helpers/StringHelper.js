const StringHelper = {
  toUpperCase: value => (value ? value.toUpperCase() : ''),
  toLowerCase: value => (value ? value.toLowerCase() : ''),
  toCapitalize: value => (value ? value.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : ''),
  toAbbreviation: value => (value ? value.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase()) : ''),
  joinArrayObjectItem: (arr, key, separator) => {
    let ret = '';
    if (!arr && arr.length === 0) return ret;
    const { length } = arr;
    arr.forEach((item, index) => {
      ret += item[key];
      if (index !== length - 1) {
        ret += separator;
      }
    });
    return ret;
  },
  serialize: (params) => {
    const str = [];
    if (!params) return '';
    Object.keys(params).forEach((key) => {
      const value = params[key];
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
    return str.join('&');
  },
  queriedURL: (url, params) => {
    const query = StringHelper.serialize(params);
    if (query) {
      if (url.indexOf('?') === -1) {
        return `${url}?${query}`;
      }
      return `${url}&${query}`;
    }
    return url;
  }
};

export default StringHelper;
