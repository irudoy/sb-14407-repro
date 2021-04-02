import * as webpack from 'webpack';

module.exports = {
    core: {
        builder: 'webpack5',
    },
    addons: ['@storybook/addon-essentials', '@storybook/addon-knobs/register', '@storybook/addon-storysource'],
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    managerWebpack: (config: webpack.Configuration) => {
        const finalConfig = {
            ...config,
            plugins: config?.plugins?.filter(({ constructor: { name } }) => {
                if (name === 'DefinePlugin') return false;
                if (name === 'Dotenv') return false;
                return true;
            }),
        };
        return finalConfig;
    },
    webpackFinal: (config: webpack.Configuration) => {
        const finalConfig = {
            ...config,
            module: {
                ...config.module,
                parser: {
                    javascript: {
                        strictExportPresence: true
                    }
                },
                rules: [
                    {
                        test: /\.((js|ts)x?)$/,
                        use: 'babel-loader',
                    }
                ]
            },
            plugins: (config.plugins || []).filter(({ constructor: { name } }) => {
                if (name === 'DefinePlugin') return false;
                if (name === 'Dotenv') return false;
                return true;
            })
        };
        return finalConfig;
    },
};
