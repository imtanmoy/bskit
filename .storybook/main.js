module.exports = {
    stories: [
        './stories/**/*.stories.mdx',
        './stories/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-scss',
    ],
    webpackFinal: (config) => {
        return config;
    },
    babel: async (options) => {
        const { plugins, presets } = options;
        return {
            ...options,
            plugins: [...plugins, '@emotion/babel-plugin'],
            presets: [...presets, '@emotion/babel-preset-css-prop'],
        };
    },
};
