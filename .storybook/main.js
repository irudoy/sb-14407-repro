module.exports = {
    core: {
        builder: 'webpack5',
    },
    addons: ['@storybook/addon-essentials', '@storybook/addon-knobs/register', '@storybook/addon-storysource'],
    stories: ['../src/**/*.stories.js'],
    managerWebpack: (config) => {
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
    webpackFinal: (config) => {
        const finalConfig = {
            ...config,
            module: {
                ...config.module,
                parser: {
                    javascript: {
                        strictExportPresence: true
                    }
                },
            },
            plugins: (config.plugins || []).filter(({ constructor: { name } }) => {
                if (name === 'DefinePlugin') return false;
                if (name === 'Dotenv') return false;
                return true;
            })
        };
        finalConfig.resolve.mainFields = ['browser', 'main'];
        return finalConfig;
    },
};
