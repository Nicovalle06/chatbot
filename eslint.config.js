/** @type {import('eslint').Linter.FlatConfig} */
module.exports = {
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    },
    rules: {
        // Agrega tus reglas personalizadas aquí
    },
};



// module.exports = {
//     env: {
//         browser: true,
//         commonjs: true,
//         es2021: true,
//     },
//     overrides: [
//         {
//             env: {
//                 node: true,
//             },
//             files: ['.eslintrc.{js,cjs}'],
//             parserOptions: {
//                 sourceType: 'script',
//             },
//         },
//     ],
//     parserOptions: {
//         ecmaVersion: 'latest',
//     },
//     plugins: ['bot-whatsapp'],
//     extends: ['plugin:bot-whatsapp/recommended'],
// }
