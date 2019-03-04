// We use eslint-loader so even warnings are very visible.
// This is why we mostly use "WARNING" level for potential errors,
// and avoid "ERROR" level.

// The rules below are listed in the order they appear on the eslint
// rules page. All rules are listed to make it easier to keep in sync
// as new ESLint rules are added.
// https://eslint.org/docs/rules/
// https://github.com/yannickcr/eslint-plugin-react
module.exports = {
    plugins: [
        'react',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.json'],
            },
        },
        'react': {
            pragma: 'React',
            version: '16.3',
        },
        'propWrapperFunctions': [
            'forbidExtraProps', // https://www.npmjs.com/package/airbnb-prop-types
            'exact', // https://www.npmjs.com/package/prop-types-exact
            'Object.freeze', // https://tc39.github.io/ecma262/#sec-object.freeze
        ],
    },
    rules: {
        // Main list of rules

        // Enforces consistent naming for boolean props
        'react/boolean-prop-naming': ['warn', {rule: '^(is|has|are)[A-Z]([A-Za-z0-9]?)+'}],

        // Forbid "button" element without an explicit "type" attribute
        'react/button-has-type': 'warn',

        // Prevent extraneous defaultProps on components
        'react/default-props-match-prop-types': ['warn', {allowRequiredDefaults: false}],

        // Rule enforces consistent usage of destructuring assignment in component
        'react/destructuring-assignment': 'off',

        // Prevent missing displayName in a React component definition
        'react/display-name': 'off',

        // Forbid certain props on Components
        'react/forbid-component-props': 'off',

        // Forbid certain props on DOM Nodes
        'react/forbid-dom-props': 'off',

        // Forbid certain elements
        'react/forbid-elements': 'off',

        // Forbid certain propTypes
        'react/forbid-prop-types': 'off',

        // Forbid foreign propTypes
        'react/forbid-foreign-prop-types': 'off',

        // Prevent using this.state inside this.setState
        'react/no-access-state-in-setstate': 'warn',

        // Prevent using Array index in key props
        'react/no-array-index-key': 'off',

        // Prevent passing children as props
        'react/no-children-prop': 'warn',

        // Prevent usage of dangerous JSX properties
        'react/no-danger': 'off',

        // Prevent problem with children and props.dangerouslySetInnerHTML
        'react/no-danger-with-children': 'warn',

        // Prevent usage of deprecated methods, including component lifecycle methods
        'react/no-deprecated': 'warn',

        // Prevent usage of setState in componentDidMount
        'react/no-did-mount-set-state': 'off',

        // Prevent usage of setState in componentDidUpdate
        'react/no-did-update-set-state': 'warn',

        // Prevent direct mutation of this.state
        'react/no-direct-mutation-state': 'warn',

        // Prevent usage of findDOMNode
        'react/no-find-dom-node': 'warn',

        // Prevent usage of isMounted
        'react/no-is-mounted': 'warn',

        // Prevent multiple component definition per file
        'react/no-multi-comp': ['warn', {ignoreStateless: true}],

        // Prevent usage of shouldComponentUpdate when extending React.PureComponent
        'react/no-redundant-should-component-update': 'warn',

        // Prevent usage of the return value of React.render
        'react/no-render-return-value': 'warn',

        // Prevent usage of setState
        'react/no-set-state': 'off',

        // Prevent common casing typos
        'react/no-typos': 'warn',

        // Prevent using string references in ref attribute
        'react/no-string-refs': 'warn',

        // Prevent using this in stateless functional components
        'react/no-this-in-sfc': 'warn',

        // Prevent invalid characters from appearing in markup
        'react/no-unescaped-entities': 'warn',

        // Prevent usage of unknown DOM property
        'react/no-unknown-property': 'warn',

        // Prevent definitions of unused prop types
        'react/no-unused-prop-types': 'warn',

        // Prevent definitions of unused state properties
        'react/no-unused-state': 'warn',

        // Prevent usage of setState in componentWillUpdate
        'react/no-will-update-set-state': 'warn',

        // Enforce ES5 or ES6 class for React Components
        'react/prefer-es6-class': ['warn', 'always'],

        // Enforce stateless React Components to be written as a pure function
        'react/prefer-stateless-function': ['warn', {ignorePureComponents: true}],

        // Prevent missing props validation in a React component definition
        'react/prop-types': [
            'warn',
            {
                ignore: ['children'],
                customValidators: [],
                skipUndeclared: false,
            },
        ],

        // Prevent missing React when using JSX
        'react/react-in-jsx-scope': 'warn',

        // Enforce a defaultProps definition for every prop that is not a required prop
        'react/require-default-props': ['warn', {forbidDefaultForRequired: true}],

        // Enforce React components to have a shouldComponentUpdate method
        'react/require-optimization': 'off',

        // Enforce ES5 or ES6 class for returning value in render function
        'react/require-render-return': 'warn',

        // Prevent extra closing tags for components without children
        'react/self-closing-comp': 'warn',

        // Enforce component methods order
        'react/sort-comp': 'warn',

        // Enforce propTypes declarations alphabetical sorting
        'react/sort-prop-types': 'off',

        // Enforce style prop value being an object
        'react/style-prop-object': 'warn',

        // Prevent void DOM elements (e.g. <img />, <br />) from receiving children
        'react/void-dom-elements-no-children': 'warn',

        // JSX-specific rules

        // Enforce boolean attributes notation in JSX
        'react/jsx-boolean-value': 'off',

        // Detect missing inline elements spacing
        'react/jsx-child-element-spacing': 'warn',

        // Validate closing bracket location in JSX
        'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],

        // Validate closing tag location in JSX
        'react/jsx-closing-tag-location': 'warn',

        // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
        'react/jsx-curly-spacing': ['warn', 'never', {allowMultiline: true}],

        // Enforce or disallow spaces around equal signs in JSX attributes
        'react/jsx-equals-spacing': ['warn', 'never'],

        // Restrict file extensions that may contain JSX
        'react/jsx-filename-extension': ['warn', {extensions: ['.js']}],

        // Enforce position of the first prop in JSX
        'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],

        // Enforce event handler naming conventions in JSX
        'react/jsx-handler-names': 'off',

        // Validate JSX indentation
        'react/jsx-indent': ['warn', 4],

        // Validate props indentation in JSX
        'react/jsx-indent-props': ['warn', 4],

        // Validate JSX has key prop when in array or iterator
        'react/jsx-key': 'warn',

        // Validate JSX maximum depth
        'react/jsx-max-depth': 'off',

        // Limit maximum of props on a single line in JSX
        'react/jsx-max-props-per-line': ['warn', {maximum: 1, when: 'multiline'}],

        // Prevent usage of .bind() and arrow functions in JSX props
        'react/jsx-no-bind': [
            'warn',
            {
                ignoreRefs: true,
                allowArrowFunctions: true,
                allowBind: false,
            },
        ],

        // Prevent comments from being inserted as text nodes
        'react/jsx-no-comment-textnodes': 'warn',

        // Prevent duplicate props in JSX
        'react/jsx-no-duplicate-props': ['warn', {ignoreCase: true}],

        // Prevent usage of unwrapped JSX strings
        'react/jsx-no-literals': 'off',

        // Prevent usage of unsafe target='_blank'
        'react/jsx-no-target-blank': 'warn',

        // Disallow undeclared variables in JSX
        'react/jsx-no-undef': 'warn',

        // Limit to one expression per line in JSX
        'react/jsx-one-expression-per-line': 'off',

        // Enforce curly braces or disallow unnecessary curly braces in JSX
        'react/jsx-curly-brace-presence': ['warn', {props: 'never', children: 'never'}],

        // Enforce PascalCase for user-defined JSX components
        'react/jsx-pascal-case': ['warn', {allowAllCaps: true, ignore: []}],

        // Disallow multiple spaces between inline JSX props
        'react/jsx-props-no-multi-spaces': 'warn',

        // Enforce default props alphabetical sorting
        'react/jsx-sort-default-props': 'off',

        // Enforce props alphabetical sorting'
        'react/jsx-sort-props': 'off',

        // Validate spacing before closing bracket in JSX
        // off in favor of jsx-tag-spacing
        'react/jsx-space-before-closing': 'off',

        // Validate whitespace in and around the JSX opening and closing brackets
        'react/jsx-tag-spacing': [
            'warn',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never',
            },
        ],

        // Prevent React to be incorrectly marked as unused
        'react/jsx-uses-react': 'warn',

        // Prevent variables used in JSX to be incorrectly marked as unused
        'react/jsx-uses-vars': 'warn',

        // Prevent missing parentheses around multilines JSX
        'react/jsx-wrap-multilines': ['warn', {
            'declaration': 'parens-new-line',
            'assignment': 'parens-new-line',
            'return': 'parens-new-line',
            'arrow': 'parens-new-line',
            'condition': 'parens-new-line',
            'logical': 'parens-new-line',
            'prop': 'parens-new-line',
        }],
    },
};
