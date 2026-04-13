<?php

/**
 * @file
 * Post update functions for UW Drupal Theme.
 */

/**
 * Modifies UW Drupal Theme config variables by removing bootstrap_barrio
 * theme config keys, renaming keys starting with uw_drupal_theme_* and adding
 * new config keys available with latest version.
 */
function uw_drupal_theme_post_update_config_v0_to_v1():string {
  $config = \Drupal::service('config.factory')->getEditable('uw_drupal_theme.settings');

  $config_key_mapping = [
    ['uw_drupal_theme_hero_image_front_default_path', 'changekey', 'hero_image_front_default_path'],
    ['uw_drupal_theme_hero_image_front_default', 'changekey', 'hero_image_front_default'],
    ['uw_drupal_theme_hero_image_front_path', 'changekey', 'hero_image_front_path'],
    ['uw_drupal_theme_hero_image_front_mobile', 'remove'],
    ['uw_drupal_theme_hero_image_front_mobile_default_path', 'remove'],
    ['uw_drupal_theme_hero_image_front_mobile_default', 'remove'],
    ['uw_drupal_theme_hero_image_front_mobile_path', 'changekey', 'hero_image_front_mobile_path'],
    ['uw_drupal_theme_hero_image_other_default_path', 'changekey', 'hero_image_other_default_path'],
    ['uw_drupal_theme_hero_image_other_default', 'changekey', 'hero_image_other_default'],
    ['uw_drupal_theme_hero_image_other_path', 'changekey', 'hero_image_other_path'],
    ['uw_drupal_theme_hero_image_other_mobile', 'remove'],
    ['uw_drupal_theme_hero_image_other_mobile_default_path', 'remove'],
    ['uw_drupal_theme_hero_image_other_mobile_default', 'remove'],
    ['uw_drupal_theme_hero_image_other_mobile_path', 'changekey', 'hero_image_other_mobile_path'],
    ['uw_drupal_theme_hero_template_front', 'changekey', 'hero_template_front'],
    ['uw_drupal_theme_hero_template_other', 'changekey', 'hero_template_other'],
    ['uw_drupal_theme_long_site_name', 'changekey', 'long_site_name'],
    ['uw_drupal_theme_front_page_title_color', 'changekey', 'front_page_title_color'],
    ['uw_drupal_theme_front_page_slant_color', 'changekey', 'front_page_slant_color'],
    ['uw_drupal_theme_front_page_slogan_color', 'changekey', 'front_page_slogan_color'],
    ['uw_drupal_theme_text_shadow_black', 'changekey', 'text_shadow_black'],
    ['uw_drupal_theme_text_shadow_white', 'changekey', 'text_shadow_white'],
    ['uw_drupal_theme_sidebar_menu_visibility', 'changekey', 'sidebar_menu_visibility'],
    ['uw_drupal_theme_theme_quicklinks_markup', 'keep'],
    ['uw_drupal_theme_custom_quicklinks_menu', 'keep'],
    ['uw_drupal_theme_top_links_to_dropdowns', 'changekey', 'top_links_to_dropdowns'],
    ['uw_drupal_theme_login_url', 'changekey', 'login_url'],
    ['hero_front_banner', 'new', ''],
    ['hero_front_button_text', 'new', ''],
    ['hero_front_button_link', 'new', ''],
    ['hero_front_subhead_text', 'new', ''],
    ['hero_front_title_below', 'new', 0],
    ['hero_other_banner', 'new', ''],
    ['hero_other_button_text', 'new', ''],
    ['hero_other_button_link', 'new', ''],
    ['hero_other_subhead_text', 'new', ''],
    ['hero_other_title_below', 'new', 0],
    ['search_toggle_option', 'new', 'site'],
    ['input_radio', 'new', 'custom'],
    ['input_checkbox', 'new', 'switch'],
    ['input_select', 'new', 'custom'],
    ['input_file', 'new', 'custom'],
    ['convert_input_to_submit', 'new', 1],
    ['button_size', 'new', ''],
    ['button_outline', 'new', 0],
    ['fluid_container', 'new', 1],
    ['image_fluid', 'new', 0],
    ['uw_drupal_theme_front_sass_page_slogan_color', 'remove'],
    ['uw_drupal_theme_hero_image_default', 'remove'],
    ['bootstrap_barrio_library', 'remove'],
    ['bootstrap_barrio_sidebar_position', 'remove'],
    ['bootstrap_barrio_content_offset', 'remove'],
    ['bootstrap_barrio_sidebar_first_width', 'remove'],
    ['bootstrap_barrio_sidebar_first_offset', 'remove'],
    ['bootstrap_barrio_sidebar_second_width', 'remove'],
    ['bootstrap_barrio_sidebar_second_offset', 'remove'],
    ['bootstrap_barrio_fluid_container', 'remove'],
    ['bootstrap_barrio_button', 'remove'],
    ['bootstrap_barrio_button_size', 'remove'],
    ['bootstrap_barrio_button_outline', 'remove'],
    ['bootstrap_barrio_navbar_toggle', 'remove'],
    ['bootstrap_barrio_navbar_container', 'remove'],
    ['bootstrap_barrio_navbar_top_position', 'remove'],
    ['bootstrap_barrio_navbar_top_color', 'remove'],
    ['bootstrap_barrio_navbar_top_background', 'remove'],
    ['bootstrap_barrio_navbar_position', 'remove'],
    ['bootstrap_barrio_navbar_color', 'remove'],
    ['bootstrap_barrio_navbar_background', 'remove'],
    ['bootstrap_barrio_messages_widget', 'remove'],
    ['bootstrap_barrio_radio', 'remove'],
    ['bootstrap_barrio_checkbox', 'remove'],
    ['bootstrap_barrio_select', 'remove'],
    ['bootstrap_barrio_file', 'remove'],
    ['bootstrap_barrio_system_messages', 'remove'],
    ['bootstrap_barrio_table_hover', 'remove'],
    ['bootstrap_barrio_table_style', 'remove'],
    ['bootstrap_barrio_source', 'remove'],
    ['bootstrap_barrio_region_clean_search', 'remove'],
    ['bootstrap_barrio_region_class_search', 'remove'],
    ['bootstrap_barrio_region_clean_thinstrip', 'remove'],
    ['bootstrap_barrio_region_class_thinstrip', 'remove'],
    ['bootstrap_barrio_region_clean_navigation', 'remove'],
    ['bootstrap_barrio_region_class_navigation', 'remove'],
    ['bootstrap_barrio_region_clean_highlighted', 'remove'],
    ['bootstrap_barrio_region_class_highlighted', 'remove'],
    ['bootstrap_barrio_region_clean_help', 'remove'],
    ['bootstrap_barrio_region_class_help', 'remove'],
    ['bootstrap_barrio_region_clean_breadcrumb', 'remove'],
    ['bootstrap_barrio_region_class_breadcrumb', 'remove'],
    ['bootstrap_barrio_region_clean_content', 'remove'],
    ['bootstrap_barrio_region_class_content', 'remove'],
    ['bootstrap_barrio_region_clean_sidebar_first', 'remove'],
    ['bootstrap_barrio_region_class_sidebar_first', 'remove'],
    ['bootstrap_barrio_region_clean_sidebar_second', 'remove'],
    ['bootstrap_barrio_region_class_sidebar_second', 'remove'],
    ['bootstrap_barrio_region_clean_uwfooter', 'remove'],
    ['bootstrap_barrio_region_class_uwfooter', 'remove'],
    ['bootstrap_barrio_region_clean_quicklinks', 'remove'],
    ['bootstrap_barrio_region_class_quicklinks', 'remove'],
    ['bootstrap_barrio_sidebar_collapse', 'remove'],
    ['bootstrap_barrio_image_fluid', 'remove'],
    ['bootstrap_barrio_navbar_top_navbar', 'remove'],
    ['bootstrap_barrio_navbar_top_class', 'remove'],
    ['bootstrap_barrio_navbar_class', 'remove'],
    ['bootstrap_barrio_navbar_flyout', 'remove'],
    ['bootstrap_barrio_navbar_slide', 'remove'],
    ['bootstrap_barrio_tabs_style', 'remove'],
    ['bootstrap_barrio_navbar_top_affix', 'remove'],
    ['bootstrap_barrio_navbar_affix', 'remove'],
    ['bootstrap_barrio_sidebar_first_affix', 'remove'],
    ['bootstrap_barrio_sidebar_second_affix', 'remove'],
    ['bootstrap_barrio_scroll_spy', 'remove'],
    ['bootstrap_barrio_google_fonts', 'remove'],
    ['bootstrap_barrio_bootstrap_icons', 'remove'],
    ['bootstrap_barrio_icons', 'remove'],
    ['bootstrap_barrio_table_head', 'remove'],
  ];

  foreach ($config_key_mapping as $key) {
    // Work through keys that are changing. Get the preexisting value, set a new key/value pair. Remove
    // the original key.
    if ($key[1] === "changekey") {
      // Check that this key is in the config.
      if ($config->get($key[0]) !== NULL) {
        $new_key = $key[2];
        // Handle up_drupal_theme_hero_image_other_default as a special case.
        if ($key[0] === 'uw_drupal_theme_hero_image_other_default') {
          $val = $config->get($key[0]);
          // Invert the value. This is coded incorrectly in the 0.0.4 (old) version.
          $new_val = (int)!$val;
          // Set the value.
          $config->set($new_key, $new_val)->save();
          // Clear the old value.
          $config->clear($key[0])->save();
        } else {
          // Otherwise do regular.
          // Set the new key with the old value.
          $config->set($new_key, $config->get($key[0]))->save();
          // Clear the old key.
          $config->clear($key[0])->save();
        }
      }
    }

    if ($key[1] === "new") {
      $config->set($key[0], $key[2])->save();
    }

    if ($key[1] === "remove") {
      if ($config->get($key[0]) !== NULL) {
        $config->clear($key[0])->save();
      }
    }
  }

  return t('Configuration updates for uw_drupal_theme.settings are complete.');
}
