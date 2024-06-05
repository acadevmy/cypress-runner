import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  minify: false,
  clean: true,
  cjsInterop: true,
  tsconfig: './tsconfig.json'
});