# `@responseams/app-config-builder`

Allows programatically building a Response App config for the Nuxt.js application using
a declarative chaining API with TypeScript or JavaScript.

## Usage

```
const ConfigBuilder = require('@responseams/app-config-builder');

return new configBuilder()
  .withApiURL('http://api.mydomain.com')
```
