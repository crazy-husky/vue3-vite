const {resolve} = require('path')
export default {
    alias: {
        '/@/': resolve(__dirname, 'src')
    },
    build: {
        outDir: resolve(__dirname, 'build')
    }
}