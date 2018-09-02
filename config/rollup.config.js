import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import { minify } from 'uglify-es'

export default {
    input: './src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'react-promises',
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
        },
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        uglify({}, minify)
    ],
    external: [
        'react',
        'react-dom'
    ]
}