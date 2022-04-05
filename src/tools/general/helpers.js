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
export function getClassNames(baseClassName, modifiers = {}) {
  const classes = [baseClassName];
  Object.entries(modifiers).forEach(([name, active]) => {
    if (!active) return;
    classes.push(`${ baseClassName }--${ name }`);
  });
  return classes.join(' ');
}

export const noOp = () => {
};
