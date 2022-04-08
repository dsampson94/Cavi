/**
 * SCSS (BEM Model)
 * Joins a `baseClassName` together with an array of associated class `modifiers`.
 *
 * @param {string} baseClassName - the class name of the component,
 *  also used for prefixing modifiers
 * @param {object} modifiers - object with keys being the modifier name,
 *  their values being a boolean representing whether the modifier is active
 *
 * @example <caption>Get class names for element 'button' with modifier 'hollow'.</caption>
 * getClassNames('button', { hollow: true })
 * returns 'button button--hollow'
 */
export const getClassNames = (baseClassName, modifiers = {}) => {
  const classes = [baseClassName];
  Object.entries(modifiers).forEach(([name, active]) => {
    if (!active) return;
    classes.push(`${ baseClassName }--${ name }`);
  });
  return classes.join(' ');
};

export const toBase64String = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    const reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
};

export const generateId = () => `_${ Math.random().toString(36).substring(2, 9) }`;

export const isEmptyStr = (value) => !value || value.trim().length === 0;

export const isUndefined = (value) => typeof value === 'undefined';

export const noOp = () => {
};
