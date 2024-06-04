#! /usr/bin/env node

"use strict";
const { cypressRunner } = require("../dist/index.js");

cypressRunner()
    .then(() => process.exit(0))
    .catch((e) => {
    console.error(e);
    process.exit(1);
});
