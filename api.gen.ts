/// <reference types="node" />
// @ts-ignore
const { generateApi } = require("swagger-typescript-api");
const path = require("path");

generateApi({
  name: "swagger.ts",
  output: path.resolve(__dirname, "./src/api/"),
  url: "https://api.u19.org/v3/api-docs",
  httpClientType: "axios",
  hooks: {
    onFormatRouteName: function (_: any, templateRouteName: string) {
      return templateRouteName.replace(/[\d]$/, "");
    },
  },
});
