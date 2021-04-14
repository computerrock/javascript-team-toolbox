/**
 * Global class names cache
 *
 * @type {Object}
 */
const globalClassNames = {};

/**
 * Enables usage of styles from CSS module
 *
 * @param props
 * @param styles
 */
const useStyles = (props, styles) => {
    const createClassNameResolver = blockName => {
        return className => {
            // skip if classname is global
            if (className.includes('global!') || typeof globalClassNames[className] !== 'undefined') {
                return className;
            }

            const elementModifierIndex = className.indexOf('__') !== -1
                ? className.indexOf('__')
                : (className.indexOf('--') !== -1 ? className.indexOf('--') : -1);

            const bemClassName = blockName + (elementModifierIndex !== -1
                ? className.substr(elementModifierIndex, className.length) : '');

            return (styles && styles[bemClassName])
                || (styles && styles[className])
                || className;
        };
    };

    const classNames = (...classArguments) => {
        const classes = [];
        const classNameResolver = typeof props.classNameResolver === 'function'
            ? props.classNameResolver
            : (classArgument => (styles && styles[classArgument]) || classArgument);

        // go trough classname arguments and parse them into classes depending on type
        classArguments.forEach(classArgument => {
            if (typeof classArgument === 'string' && classArgument.includes(' ')) {
                classes.push(classNames(...classArgument.split(' ')));
            }

            if ((typeof classArgument === 'string' && !classArgument.includes(' '))
                || typeof classArgument === 'number') {
                classes.push(classNameResolver(classArgument));
            }

            if (Array.isArray(classArgument)) {
                classes.push(classNames(...classArgument));
            }

            if (!Array.isArray(classArgument)
                && typeof classArgument === 'object'
                && classArgument !== null) {
                Object.keys(classArgument).forEach(classKey => {
                    if (classArgument[classKey]) {
                        classes.push(classNameResolver(classKey));
                    }
                });
            }
        });

        classes.forEach(className => {
            if (typeof className === 'string' && className.includes('global!')) {
                globalClassNames[className.replace('global!', '')] = className;
            }
        });

        // get classes from component's className prop
        const classesFromClassNameProp = (typeof props.className === 'string'
            ? props.className.split(' ') : []).filter(className => !!className);

        const resultClasses = [
            ...classes.map(className => (typeof className === 'string'
                ? className.replace('global!', '') : className)),
            ...classesFromClassNameProp,
        ];

        // check if rendering on mobile
        if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
            return resultClasses;
        }

        // check if rendering on web
        if (typeof window !== 'undefined') {
            return resultClasses.join(' ');
        }

        // rendering on Node server
        return resultClasses.join(' ');
    };

    return {
        classNames,
        cx: classNames,
        createClassNameResolver,
    }
};

export default useStyles;
