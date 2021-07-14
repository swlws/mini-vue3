import pkg from "./package.json";
import typescript from "rollup-plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./packages/vue/src/index.ts",
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      exclude: "node_modules/**",
    }),
  ],
  output: [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
    },
    {
      name: "vue",
      format: "es",
      file: pkg.module,
      sourcemap: true,
    },
  ],
};
