# npm-unpublish

Another way to unpublish your npm packages.

## Usage

```shell
# run without installation
npx npm-unpublish <pkg-name> [reason]

# examples
npx npm-unpublish my-pkg
npx npm-unpublish my-pkg "Deprecated, please do not use it!"

# how it works
npm deprecate my-pkg "Deprecated, please do not use it!"
npm owner add npm my-pkg
npm owner rm $(npm whoami) my-pkg
```
