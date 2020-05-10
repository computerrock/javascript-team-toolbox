module.exports = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx,mjs}'
    ],
    setupFiles: [
        '@computerrock/react-app-polyfill/jsdom',
        '@computerrock/react-scripts/config/jest/configureEnzyme.js'
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,mjs}',
    ],
    testEnvironment: 'jest-environment-jsdom-fourteen',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs)$': '@computerrock/react-scripts/config/jest/babelTransform',
        '^.+\\.css$': '@computerrock/react-scripts/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|css|json)$)': '@computerrock/react-scripts/config/jest/fileTransform.js'
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'
    ],
    moduleNameMapper: {
        '^react-native$': 'react-native-web'
    },
    moduleFileExtensions: [
        'js',
        'jsx',
        'mjs',
        'json'
    ]
};
