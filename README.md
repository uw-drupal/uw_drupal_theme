# UW Drupal theme

![UW Drupal theme v0.0.5](https://img.shields.io/static/v1?label=version&message=v0.0.5&color=green)

This is a port of the [UW WordPress Theme](https://github.com/uweb/uw_wp_theme) which utilizes Bootstrap 4 built by the UMAC web team.

**Note:** This is ready for testing, but **use with caution in any production environment**. CSS, JS and output HTML is up to date with uw_wp_theme 3.6.3. The current version also introduces two experimental Single Directory Components: Button and Card.

## Requirements

1. Drupal 10.3+

## Installation

1. Install and enable this theme (download and extract to your `/themes/custom`
directory).
2. Go to `/admin/appearance/settings/uw_drupal_theme` to adjust the theme's settings. For more details, see the Configuring and extending section below. Theme settings you can adjust:
    * Hero area for the home page.
    * Hero area for interior (non-home page) pages.
    * Long site title setting.
    * Sidebar menu.
    * Thinstrip menu.
    * Links in the Footer region.
    * The QuickLinks menu.
    * Add top-level nav links to the drop-down menu.
    * Color settings for home page site name, slant, slogan.
    * Bootstrap settings for responsive images, form fields, buttons.
    * Login link url.
    * Default search scope for site search.

## What you get
The theme provides the base markup, javascript and styles of the uw_wp_theme. Advanced grids, cards, accordions, tabs, etc. need to be implemented through custom means or manually entered as html (with classes) on the page. Note that some markup gets stripped by CKEditor5, like the nested spans in the markup for a button.

There are two Single Directory Components available with the theme. Although not required, the [UI Patterns project](https://www.drupal.org/project/ui_patterns) helps implement single directory components through the Drupal UI. The UI Patterns Library sub-module allows you to the components and their properties.
  * **card** - provides options as found in the UW WordPress Theme Cookbook [Cards examples](https://www.washington.edu/docs/theme-cookbook/cards/).
  * **button** - provides options as found in the UW WordPress Theme Cookbook [Buttons examples](https://www.washington.edu/docs/theme-cookbook/buttons/).

## Configuring and extending
### Configuring: Theme settings
  * **Sidebar menu** - on install, the theme should set the main navigation menu as a block in the Primary section. You can exclude / include it as you would any block through the block settings. There's also a visibility setting in the theme's settings which takes precedence.
  * **Thinstrip menu** - enable the Thinstrip menu block to override the default audience menu options. After enabling the block, manage the menu items (the menu will have no items at first) at `/admin/structure/menu/manage/thinstrip-menu`.
  * **QuickLinks menu** - in the theme settings under Theme menus > QuickLinks menu you'll find example starter markup for the QuickLinks menu. Copy the starter markup and create a Content block to hold the markup. Then place that block in the Quicklinks region. Note that you need to ensure the text format set on the editor for the block is permissive enough to allow the markup through.
  * **Footer menu** - on install, the theme sets the Drupal default Footer menu in the UW Footer region, yet leaves it disabled. If you want to customize the footer links, enable this block. Then adjust the Footer menu items. You need to include the Privacy and Accessibility links found on all UW websites in additional to any custom links you want to add.

### Extending: Create a sub-theme
1. Copy the STARTER directory into your custom themes directory (typically `/web/themes/custom/`).
2. Rename the directory with your sub-theme name.
3. Find all occurrences of "STARTER" within your sub-theme directory's files and filenames and replace with your sub-theme's name.
    * Filenames to change: `STARTER.theme`, `STARTER.libraries.yml`, `STARTER.info.yml.REMOVETHISEXTENSION`, `./config/install/STARTER.settings.yml`, `./config/schema/STARTER.schema.yml`
    * Instances to change (generally): `name` and `libraries` values in `STARTER.info.yml` file, 2 places in `./config/schema/STARTER.schema.yml`
4. Your sub-theme should be available to install at Administration > Appearance (`/admin/appearance`).

## History
- 2026-02-xx: Diverged from drupal/bootstrap base theme since the foundation is already provided by uw_wp_theme files.
- 2025-10-10: CSS and template updates completed to align with uw_wp_theme v3.6.3
- 2025-03-04: Work started on diverging from stable9 core theme as base to depend directly on bootstrap base theme.
- 2024-11-08: CSS and template updates completed to align with uw_wp_theme v3.3.1
- 2024-10-18: Dependency on Bootstrap Barrio 5.1.x theme removed. Project now is a subtheme of the stable9 core theme.
- 2023-01-20: Repo renamed to uw_drupal_theme
(https://github.com/uw-drupal/uw_drupal_theme.git)
- 2022-08-09: Private Bitbucket Repo cleaned and moved to github
8/9/2022: git@github.com:uw-drupal/uw_boundless_barrio.git
