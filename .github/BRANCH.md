# Table of contents

- [Branches](#Branches)
- [Master branch info](#Master/Production)
- [Dev branch info](#Dev/Development)
- [Difference](#Difference)
- [Read me](#readme)
- [Uninstallation](#uninstallation)
- [Contributing](#contributing)
- [License](#license)

## Branches

Welcome to branch md! This markdown will have the branch related information like differences, names, certain commit hashes etc!

If you have a branch related question and it is not in here, create a pull request!

### Master/Production

**Ports**: Nil, use the domain, project1.kami.wtf

### Dev/Development

**Ports**: 4321, change it in astro.config.mjs

```
export default defineConfig({
	integrations: [/* integrated modules */],
	...
	prefetch: true,
	server: { port: 4322 } // port you want here, add this line
})
```

## Differences

**Names**: master (production), development (development)

**Ports**: nil, 4321

## Read me related information

Development will have more _development_ related guide/help like bun build or npm build, how to build it in docker etc!

Docker porting will be coming soon later!

Production will have a general user guide such as how to use, how to download, the site link, the common issues, the file format required, other requirements (probably no new file) and more!
