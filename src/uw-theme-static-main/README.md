# UW Theme Static Files

![Bootstrap v4.6](https://img.shields.io/static/v1?label=Bootstrap&message=v4.6&color=blue) ![jQuery v3.5.1](https://img.shields.io/static/v1?label=jQuery&message=v3.5.1&color=blue) ![Popper v1.16.1](https://img.shields.io/static/v1?label=Popper.js&message=v1.16.1&color=blue)

## What's here

This repo consists of static assets for CSS, JS, and Sass components. Choose your own build tools or use the dist versions.

### `assets` folder

This folder has all included files, such as fonts and images, to support the CSS and JS for our theme.

### `dist` folder

All distribution/production-ready CSS and JavaScript files. Drop these directly into your project to get started.

Please don't hotlink directly to the files on GitHub. We may provide these files in a hosted environment in the future. Please reach out to us if you're interested in that delivery method for your project.

### `footers`  folder - TBD

This *will* include sample footer files that can be used in your projects.

### `headers` folder - TBD

This *will* include sample header files that can be used in your projects.

### `lib` folder

Any included libraries, such as Bootstrap.

### `src` folder

Includes Sass and JavaScript working files.

These were pulled from the WordPress theme so, depending on your project, you may need some, all, none, or edited versions of these files for your project.

### `index.html` file

A sample HTML starter page with the dist CSS and JS loaded in.

## How to use these files

In theory, you should be able to use these files to style any Bootstrap classed HTML and end up with UW-styled components. You may need to tweak or finesse.

Start with HTML directly from [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/) for best results. We've had success testing by dropping in HTML copied and pasted from the Bootstrap example pages with the `dist` files.

The important files to include for all of Bootstrap to work with UW styling:

- `dist/css/style.css` (includes Bootstrap CSS)
- `dist/js/bootstrap.bundle.min.js` - this includes popper.js
- `dist/js/jquery.min.js`

If you are building components individually or are integrating directly into your project, make sure you are including jQuery, Popper.js, and the Bootstrap.js files. Popper.js is required for tooltips and popovers.

Note: For properly loading font and image assets, it's assumed your stylesheet is in a folder and not the website root (e.g. a `css` folder) and the `assets` folder structure is copied as-is to the root of your project. If you need another structure, you may need to adjust and rebuild the Sass files.
