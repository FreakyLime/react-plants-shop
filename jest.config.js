export default {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
};
