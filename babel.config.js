module.exports = function (api) {
    api.cache(true)

    const presets = [
        ['@babel/env', { modules: false }],
        '@babel/react'
    ]
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread'
    ]

    return {
      presets,
      plugins
    }
}