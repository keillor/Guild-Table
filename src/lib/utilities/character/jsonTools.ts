export function traverseJson(obj: any, path = '') {
    let result = {};
  
    for (const key in obj) {
      const value = obj[key];
      const newPath = path ? `${path}.${key}` : key;
  
      if (typeof value === 'string') {
        result[newPath] = value;
      } 
      else if (Array.isArray(value) && value.every(v => typeof v === 'string')) {
        result[newPath] = value;
      } 
      else if (typeof value === 'object' && value !== null) {
        Object.assign(result, traverseJson(value, newPath));
      }
    }
  
    return result;
  }
  