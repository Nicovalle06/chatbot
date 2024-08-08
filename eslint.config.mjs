import botWhatsapp from "eslint-plugin-bot-whatsapp";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("plugin:bot-whatsapp/recommended"), 
    {
        plugins: {
            "bot-whatsapp": botWhatsapp,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
            },

            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
    {
        files: ["**/.eslintrc.{js,cjs}"],

        languageOptions: {
            globals: {
                ...globals.node,
            },

            ecmaVersion: 5,
            sourceType: "commonjs",
        },
    }
];
