import swc from "rollup-plugin-swc";
import {defineConfig} from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import scss from "rollup-plugin-scss";
import {uglify} from "rollup-plugin-uglify";

const aliases = {
    "@data":        path.resolve(__dirname, "./src/renderer/data"),
    "@modules":     path.resolve(__dirname, "./src/renderer/modules"),
    "@ui":          path.resolve(__dirname, "./src/renderer/ui"),
    // "@node":        path.resolve(__dirname, "./src/renderer/node"),
    "@common":      path.resolve(__dirname, "./src/common"),
    "@classes":     path.resolve(__dirname, "./src/renderer/classes"),
    // "@flux":        path.resolve(__dirname, "./src/renderer/flux"),
    // "@decorators":  path.resolve(__dirname, "./src/renderer/decorators")
};

export default args => {
    const {mode = "renderer", minify = true} = args;
    delete args.mode;
    delete args.minify;

    return defineConfig({
        input: `./src/${mode}/index`,
        external: [
            "electron",
            "fs",
            "path",
            "module",
            "sucrase",
            "sass",
            "inspector",
            "@electron/remote/main",
            "@electron/remote/renderer"
        ],
        output: {
            format: mode === "renderer" ? "esm" : "commonjs",
            file: `./dist/${mode}.js`
        },

        plugins: [
            minify && uglify(),
            json(),
            alias({
                entries: aliases
            }),
            scss({
                output: "./dist/style.css",
                // @ts-ignore
                runtime: require("sass")
            }),
            resolve({
                browser: mode === "renderer",
                extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
                preferBuiltins: false,
            }),
            swc({
                minify: minify,
                jsc: {
                    parser: {
                        tsx: true,
                        syntax: "typescript",
                        decorators: true
                    },
                    target: "es2022",
                    // minify: {
                    //     compress: {
                    //         arguments: true,
                    //         dead_code: true,
                    //         reduce_vars: true,
                    //         reduce_funcs: true
                    //         // keep_classnames: true
                    //     }
                    // },
                    transform: {
                        react: {useBuiltins: true}
                    }
                }
            })
        ].filter(Boolean),
    });
};