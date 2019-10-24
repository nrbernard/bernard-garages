# Bernard Garages

The Bernard Garages site uses [Gatsby](https://gatsbyjs.org) powered by content from [Ghost](https://ghost.org). This site is based off a [Gatsby/Ghost starter project](https://github.com/TryGhost/gatsby-starter-ghost.git).

# Developlemnt

After you install [Yarn](https://yarnpkg.com/en/docs/install) and the [Gatsby CLI](https://www.gatsbyjs.org/docs/quick-start#install-the-gatsby-cli), install the project dependencies.


```bash
yarn
```

Then, start the development server. This will pull content from headless Ghost and generate a Gatsby site.


```bash
gatsby develop
```

Gatsby populates content from the Ghost install specified in the `.ghost.json` config file.


# Production

```bash
# Run a production build, locally
gatsby build

# Serve a production build, locally
gatsby serve
```

Gatsby `develop` uses the `development` config in `.ghost.json` - while Gatsby `build` uses the `production` config.
