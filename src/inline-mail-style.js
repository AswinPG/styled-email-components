import createHash from 'styled-components/lib/vendor/glamor/hash';
import flatten from 'styled-components/lib/utils/flatten';
import parse from 'postcss-safe-parser';
import cssToStyle from './css-to-style';

let generated = {};

export const resetStyleCache = () => {
  generated = {};
};

export default stylesheet => {
  return class InlineMailStyle {
    constructor(rules) {
      this.rules = rules;
    }

    generateStyleObject(executionContext) {
      const flatStyles = flatten(this.rules, executionContext).join('');
      const hash = createHash(flatStyles);
      if (!generated[hash]) {
        const rules = [];
        parse(flatStyles).each(node => {
          switch (node.type) {
            case 'decl':
              rules.push([node.prop, node.value]);
              return;
            case 'comment':
              return;
            default:
              if (process.env.NODE_ENV !== 'production') {
                console.warn(
                  `Node of type ${node.type} not supported as an inline style`,
                );
              }
          }
        });
        const styles = cssToStyle(rules);
        const instance = stylesheet.create({ generated: styles });
        generated[hash] = instance.generated;
      }
      return generated[hash];
    }
  };
};
