// .eslintrc.js 
module.exports = {
    extends: [
        // vue style guide 推荐的规则集
        // @see https://github.com/vuejs/eslint-plugin-vue/blob/v6.2.2/docs/rules/README.md
        'plugin:vue/recommended',
        // standard JavaScript 规则集
        // @see https://github.com/vuejs/eslint-plugin-vue/blob/v6.2.2/docs/rules/README.md
        // 关闭所有和 prettier 冲突的规则检查。总是置于最后
        // @see https://github.com/prettier/eslint-config-prettier#installation
        'prettier',
        'prettier/vue',
    ],
    rules: {
        'vue/attributes-order': 0,
        'vue/order-in-components': 0,
    },
};