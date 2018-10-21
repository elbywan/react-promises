import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import { minify } from 'uglify-es'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
    input: './src/index.js',
    output: {
        file: 'dist/bundle/react-promises.umd.min.js',
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
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs({}),
        uglify({}, minify)
    ],
    external: [
        'react',
        'react-dom'
    ]
}