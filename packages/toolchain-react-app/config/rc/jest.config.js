module.exports = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx,mjs}',
        '!src/**/*.stories.{js,jsx,mjs}'
    ],
    setupFiles: [
        '@computerrock/react-app-polyfill/jsdom',
        '@computerrock/toolchain-react-app/config/jest/configureEnzyme.js',
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,mjs}',
    ],
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost',
    },
    transform: {
        '^.+\\.(js|jsx|mjs|cjs)$': '@computerrock/toolchain-react-app/config/jest/babelTransform',
        '^.+\\.css$': '@computerrock/toolchain-react-app/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|cjs|css|json)$)': '@computerrock/toolchain-react-app/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
        `[/\\\\]node_modules[/\\\\]/(?!${['lodash-es', 'nanoid'].join('|')})`,
    ],
    moduleNameMapper: {
        "^nanoid(/(.*)|$)": "nanoid$1",
        '^react-native$': 'react-native-web',
        '^react$': '<rootDir>/node_modules/react',
        '^react-dom$': '<rootDir>/node_modules/react-dom',
        '^react-dom/server$': '<rootDir>/node_modules/react-dom/server',
        '^react-dom/test-utils': '<rootDir>/node_modules/react-dom/test-utils',
        '^warning': '<rootDir>/node_modules/warning',
    },
    moduleFileExtensions: [
        'js',
        'jsx',
        'mjs',
        'json',
    ],
};
