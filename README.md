# UW Drupal theme

![UW Drupal theme v0.0.5 - feature branch](https://img.shields.io/static/v1?label=version&message=v0.0.5&color=green)

This is a port of the [UW WordPress Theme](https://github.com/uweb/uw_wp_theme) which utilizes Bootstrap 4 built by the UMAC web team. It uses the [Drupal Bootstrap Project] theme as a base theme.

**Note:** This is a Work-In-Progress **not ready
for production**. Currently, the theme templates are being reviewed/rewritten to adapt to the Drupal Bootstrap Project equivalents for inheritance. It also demonstrates one SDC exploration for the UW Button styles.

## Requirements

1. Drupal 10.3+
2. Bootstrap project 5.0+

## Installation

1. Install and enable this theme (download and extract to your /themes/custom
directory).
2. Go to /admin/appearance/settings/uw_drupal_theme to adjustment the theme's settings including:
    * The QuickLinks menu.
    * Links in the Footer region.
    * Thinstrip menu.
    * Sidebar menu.
    * Add top-level nav links to the drop-down menu.
    * Hero area for the home page.
    * Hero area for interior (non-home page) pages.
    * Login link url.

## What you get
The theme provides the base markup, javascript and styles of the uw_wp_theme. Advanced grids, cards, accordions, tabs, etc. need to be implemented through custom means or manually entered as html (with classes) on the page. Note that some markup gets stripped by CKEditor5, like the nested spans in the markup for a button. In the future, we hope to provide solutions for adding components on the page.

## Create a sub-theme
1. Copy the STARTER directory into your custom themes directory (typically `/web/themes/custom/`).
2. Rename the directory with your sub-theme name.
3. Find all occurrences of "STARTER" within your sub-theme directory's files and filenames and replace with your sub-theme's name.
    * Filenames to change: `STARTER.theme`, `STARTER.libraries.yml`, `STARTER.info.yml.REMOVETHISEXTENSION`, `./config/install/STARTER.settings.yml`, `./config/schema/STARTER.schema.yml`
    * Instances to change (generally): `name` and `libraries` values in `STARTER.info.yml` file, 2 places in `./config/schema/STARTER.schema.yml`
4. Your sub-theme should be available to install at Administration > Appearance (`/admin/appearance`).

## History
- 2025-03-04: Work started on diverging from stable9 core theme as base to depend directly on bootstrap base theme.
- 2024-11-08: CSS and template updates completed to align with uw_wp_theme v3.3.1
- 2024-10-18: Dependency on Bootstrap Barrio 5.1.x theme removed. Project now is a subtheme of the stable9 core theme.
- 2023-01-20: Repo renamed to uw_drupal_theme
(https://github.com/uw-drupal/uw_drupal_theme.git)
- 2022-08-09: Private Bitbucket Repo cleaned and moved to github
8/9/2022: git@github.com:uw-drupal/uw_boundless_barrio.git
