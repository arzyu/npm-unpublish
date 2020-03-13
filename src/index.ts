#!/usr/bin/env node

import chalk from "chalk";
import shell from "shelljs";

const fail = chalk.red;
const success = chalk.green;

const args = process.argv;

if (args.length < 3) {
  console.log(fail("Usage:\n  npx npm-unpublish <pkg-name> [reason]\n"));
  process.exit(1);
}

const pkgName = args[2];
const reason = args[3] || "Deprecated, please do not use it!";

console.log(`💩 Unpublishing ${pkgName}...`);

const cmdList = [
  `npm deprecate ${pkgName} "${reason}"`,
  `npm owner add npm ${pkgName}`,
  `npm owner rm $(npm whoami) ${pkgName}`
];

const run = (cmd: string) => new Promise((resolve, reject) => {
  shell.exec(cmd, { silent: true }, (code, stdout, stderr) => {
    if (!code) resolve(stdout);
    else reject(stderr);
  });
});

(async () => {
  for (let i = 0; i < cmdList.length; i++) {
    await run(cmdList[i]);
  }
  console.log(success("🎉 Done."));
})().catch(error => console.log(fail(error)));
