# tsx-boilerplate

Minimal TypeScript + React boilerplate.

```
npm install -g tsd
tsd install
npm install
npm run
```

## What's included

- TypeScript
- React
- Linting
- Hot Reloading (Development)
- Building (Production)
- See `npm run` for a list of scripts available.

### What about Tests, Docs, Routing, Ramda, etc?

The core is kept at a minimal. Check out the `extra/*` branches for
boilerplates that add _one_ new feature to the `master` branch
(e.g. SASS, or Jest tests).

Only the core (`master` branch) is guaranteed to be up to date. Keep
this in mind when venturing into the `extra/*` branches. If they can
still merge in with `master` then you're probably all right.

### Creating your own preset

There are some pre-defined `preset/*` branches, but like the `extra/*`
branches they may be out of date.

If you're feeling bold, you can create your own preset by rebasing or
merging `extra/*` branches into a new branch:

```
(master)$ git checkout -b preset/newapp
(preset/newapp)$ git rebase origin/extra/jest
(preset/newapp)$ git rebase origin/extra/typedoc
(preset/newapp)$ tsd install && npm install
(preset/newapp)$ npm start
```

Taking a look at how the `extra/*` feature was implemented and
manually adding in the changes will be your best bet if the conflicts
are too messy.

## Contributions

Make PR's to `develop` if you want to change the core (`master`
branch).

If modifying `extra/*` or `preset/*` branches, make PR's directly to
them vs `develop`.

## License

Public Domain (CC0)

Do whatever you want with the current license. Replace it, remove it,
etc. No attribution required.
