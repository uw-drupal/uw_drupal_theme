<?php

/**
 * @file
 * Functions to support the UW Drupal Theme theme settings.
 */

use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter() for system_theme_settings.
 */
function uw_drupal_theme_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL): void {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }
  // Establish array of UW colors for select options.
  $_colors = [
    '#4b2e83' => t('Purple'),
    '#b7a57a' => t('Gold'),
    '#85754d' => t('Metallic Gold'),
    '#d9d9d9' => t('Light Grey'),
    '#444444' => t('Dark Grey'),
    '#000000' => t('Black'),
    '#ffffff' => t('White'),
  ];

  // Set array of hero template styles for select options.
  $_hero_templates = [
    'default' => t('Default'),
    'big_hero' => t('Big hero'),
    'small_hero' => t('Small hero'),
    'jumbotron' => t('Jumbotron hero'),
    'no_hero' => t('No image'),
    'no_title' => t('No title/image'),
  ];

  // Set form fields for UW Drupal Theme Settings.
  $form['uw_drupal_theme'] = [
    '#type' => 'vertical_tabs',
    '#prefix' => '<h2><small>' . t('UW Drupal Theme Settings') . '</small></h2>',
    '#weight' => -11,
  ];

  //
  // Hero image tab.
  //
  $form['uw_drupal_theme_hero_image'] = [
    '#type' => 'details',
    '#title' => t('Hero image area'),
    '#group' => 'uw_drupal_theme',
  ];
  // Hero image settings for the image on the default front page.
  $form['uw_drupal_theme_hero_image']['front_page'] = [
    '#type' => 'details',
    '#title' => t('Front page hero image area'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['uw_drupal_theme_hero_template_front'] = [
    '#type' => 'radios',
    '#title' => t('Select the hero template style for the front page'),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_template_front'),
    '#options' => $_hero_templates,
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['uw_drupal_theme_hero_image_front_default'] = [
    '#type' => 'checkbox',
    '#title' => t('Use the default hero image'),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_image_front_default'),
    '#tree' => FALSE,
    '#description' => t('Check here if you want the theme to use the hero image supplied with it.'),
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['settings'] = [
    '#type' => 'container',
    '#states' => [
      // Hide the header settings when using the default header.
      'invisible' => [
        'input[name="uw_drupal_theme_hero_image_front_default"]' => ['checked' => TRUE],
      ],
    ],
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['settings']['uw_drupal_theme_hero_image_front_upload'] = [
    '#type' => 'managed_file',
    '#title' => t('Upload front page hero image'),
    '#upload_location' => 'public://',
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_image_front_upload'),
    '#description' => t("Use this field to upload your front page hero image."),
    '#upload_validators' => ['file_validate_extensions' => ['gif png jpg jpeg']],
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['additional_settings'] = [
    '#type' => 'details',
    '#title' => t('Additional hero options'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#states' => [
      // Only show the additional settings when using the 'Big hero',
      // 'Small hero' or 'Jumbotron hero'.
      'visible' => [
        'input[name="uw_drupal_theme_hero_template_front"]' => [
          ['value' => 'big_hero'],
          'or',
          ['value' => 'small_hero'],
          'or',
          ['value' => 'jumbotron'],
        ],
      ],
    ],
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['additional_settings']['uw_drupal_theme_hero_front_banner'] = [
    '#type' => 'textfield',
    '#title' => t('Banner'),
    '#description' => t("Put your banner text here."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_front_banner'),
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['additional_settings']['uw_drupal_theme_hero_front_button_text'] = [
    '#type' => 'textfield',
    '#title' => t('Button text'),
    '#description' => t("Put your button text here."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_front_button_text'),
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['additional_settings']['uw_drupal_theme_hero_front_button_link'] = [
    '#type' => 'textfield',
    '#title' => t('Button link'),
    '#description' => t("Put your button link here."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_front_button_link'),
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['additional_settings']['uw_drupal_theme_hero_front_subhead_text'] = [
    '#type' => 'textfield',
    '#title' => t('Subhead text'),
    '#description' => t("Put your subhead text here."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_front_subhead_text'),
    '#states' => [
      // Only show the mobile settings when using the 'Big hero' or
      // 'Small hero'.
      'visible' => [
        'input[name="uw_drupal_theme_hero_template_front"]' => ['value' => 'jumbotron'],
      ],
    ],
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['additional_settings']['uw_drupal_theme_hero_front_title_below'] = [
    '#type' => 'checkbox',
    '#title' => t('Page title'),
    '#description' => t("Display the page title below the hero image (instead of on the hero image)."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_front_title_below'),
    '#tree' => FALSE,
    '#states' => [
      // Only show the mobile settings when using the 'Big hero' or
      // 'Small hero'.
      'visible' => [
        'input[name="uw_drupal_theme_hero_template_front"]' => [
          ['value' => 'big_hero'],
          'or',
          ['value' => 'small_hero'],
        ],
      ],
    ],
  ];
  $form['uw_drupal_theme_hero_image']['front_page']['additional_settings']['uw_drupal_theme_hero_image_front_mobile_upload'] = [
    '#type' => 'managed_file',
    '#title' => t('Upload front page mobile hero image'),
    '#upload_location' => 'public://',
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_image_front_mobile_upload'),
    '#description' => t("Use this field to upload a custom front page mobile hero image (for Big hero, Small hero and Jumbotron hero template styles). If no image is uploaded, the desktop front page hero image will be used."),
    '#upload_validators' => ['file_validate_extensions' => ['gif png jpg jpeg']],
  ];

  // Hero image settings for the image used on other pages.
  $form['uw_drupal_theme_hero_image']['other_page'] = [
    '#type' => 'details',
    '#title' => t('Non-front page hero image'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['uw_drupal_theme_hero_template_other'] = [
    '#type' => 'radios',
    '#title' => t('Select the hero template style'),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_template_other'),
    '#options' => $_hero_templates,
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['uw_drupal_theme_hero_image_default'] = [
    '#type' => 'checkbox',
    '#title' => t('Use the default non-front page hero image'),
    '#tree' => FALSE,
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_image_default'),
    '#description' => t('Check here if you want the theme to use the hero image supplied with it.'),
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['settings'] = [
    '#type' => 'container',
    '#states' => [
      // Hide the header settings when using the default header.
      'invisible' => [
        'input[name="uw_drupal_theme_hero_image_default"]' => ['checked' => TRUE],
      ],
    ],
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['settings']['uw_drupal_theme_hero_image_other_upload'] = [
    '#type' => 'managed_file',
    '#title' => t('Upload a non-front page hero image'),
    '#upload_location' => 'public://',
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_image_other_upload'),
    '#description' => t("Use this field to upload your non-front page hero image."),
    '#upload_validators' => ['file_validate_extensions' => ['gif png jpg jpeg']],
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['additional_settings'] = [
    '#type' => 'details',
    '#title' => t('Additional hero options'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#states' => [
      // Only show the mobile settings when using the 'Big hero', 'Small hero'
      // or 'Jumbotron hero'.
      'visible' => [
        'input[name="uw_drupal_theme_hero_template_other"]' => [
          ['value' => 'big_hero'],
          'or',
          ['value' => 'small_hero'],
          'or',
          ['value' => 'jumbotron'],
        ],
      ],
    ],
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['additional_settings']['uw_drupal_theme_hero_other_banner'] = [
    '#type' => 'textfield',
    '#title' => t('Banner'),
    '#description' => t("Put your banner text here."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_other_banner'),
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['additional_settings']['uw_drupal_theme_hero_other_button_text'] = [
    '#type' => 'textfield',
    '#title' => t('Button text'),
    '#description' => t("Put your button text here."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_other_button_text'),
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['additional_settings']['uw_drupal_theme_hero_other_button_link'] = [
    '#type' => 'textfield',
    '#title' => t('Button link'),
    '#description' => t("Put your button link here."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_other_button_link'),
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['additional_settings']['uw_drupal_theme_hero_other_subhead_text'] = [
    '#type' => 'textfield',
    '#title' => t('Subhead text'),
    '#description' => t("Put your subhead text here."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_other_subhead_text'),
    '#states' => [
      // Only show the mobile settings when using the 'Big hero' or
      // 'Small hero'.
      'visible' => [
        'input[name="uw_drupal_theme_hero_template_other"]' => ['value' => 'jumbotron'],
      ],
    ],
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['additional_settings']['uw_drupal_theme_hero_other_title_below'] = [
    '#type' => 'checkbox',
    '#title' => t('Page title'),
    '#description' => t("Display the page title below the hero image (instead of on the hero image)."),
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_other_title_below'),
    '#tree' => FALSE,
    '#states' => [
      // Only show the mobile settings when using the 'Big hero' or
      // 'Small hero'.
      'visible' => [
        'input[name="uw_drupal_theme_hero_template_other"]' => [
          ['value' => 'big_hero'],
          'or',
          ['value' => 'small_hero'],
        ],
      ],
    ],
  ];
  $form['uw_drupal_theme_hero_image']['other_page']['additional_settings']['uw_drupal_theme_hero_image_other_mobile_upload'] = [
    '#type' => 'managed_file',
    '#title' => t('Upload non-front page mobile hero image'),
    '#upload_location' => 'public://',
    '#default_value' => theme_get_setting('uw_drupal_theme_hero_image_other_mobile_upload'),
    '#description' => t("Use this field to upload a custom non-front page mobile hero image (for Big hero and Small hero template styles). If no image is uploaded, the desktop non-front page hero image will be used."),
    '#upload_validators' => ['file_validate_extensions' => ['gif png jpg jpeg']],
  ];
  $form['uw_drupal_theme_hero_image']['uw_drupal_theme_long_site_name'] = [
    '#type' => 'checkbox',
    '#title' => t('Does your site name take two lines on desktop?'),
    '#description' => t("When checked, the font-size for the site name will be reduced in the hero area."),
    '#default_value' => theme_get_setting('uw_drupal_theme_long_site_name'),
  ];
  $form['uw_drupal_theme_hero_image']['instructions'] = [
    '#type' => 'markup',
    '#markup' => t("<div class='form-item__description'>The \"Big hero\" and \"Small hero\" options above will include the \"Slogan\" from \"Basic Site Settings\" beneath the udub-slant (See:&nbsp;/admin/config/system/site-information.)</div>"),
  ];

  //
  // Theme menus tab.
  //
  $form['uw_drupal_theme_theme_menus'] = [
    '#type' => 'details',
    '#title' => t('Theme menus'),
    '#group' => 'uw_drupal_theme',
  ];
  $form['uw_drupal_theme_theme_menus']['sidebar_menu'] = [
    '#type' => 'details',
    '#title' => t('Sidebar menu'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  ];
  $form['uw_drupal_theme_theme_menus']['sidebar_menu']['uw_drupal_theme_sidebar_menu_visibility'] = [
    '#type' => 'select',
    '#title' => t('Sidebar menu visibility'),
    '#default_value' => theme_get_setting('uw_drupal_theme_sidebar_menu_visibility'),
    '#options' => [
      0 => t('Hidden'),
      1 => t('Visible'),
    ],
  ];
  $form['uw_drupal_theme_theme_menus']['thinstrip_menu'] = [
    '#type' => 'details',
    '#title' => t('Thinstrip menu'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  ];
  $form['uw_drupal_theme_theme_menus']['thinstrip_menu']['description'] = [
    '#type' => 'markup',
    '#markup' => t("<p><strong>Instructions</strong><br/>The Thinstrip menu is handled as a block with a menu in it:</p><ul><li>@block_layout_link to override the standard UW WordPress theme Thinstrip menu (also known as the Audience menu).</li><li>You can modify the @thinstrip_menu_link</li><li>or adjust the @thinstrip_block_link to customize it.</li></ul><p>When the theme is first installed a Thinstrip menu (machine name: thinstrip-menu) is created if it doesn't already exist and the Thinstrip menu block is placed in the Thinstrip region, but set to Disabled.</p>", [
      '@block_layout_link' => Link::fromTextAndUrl('Enable the Thinstrip menu block', Url::fromUri('internal:/admin/structure/block'))->toString(),
      '@thinstrip_menu_link' => Link::fromTextAndUrl('Thinstrip menu items', Url::fromUri('internal:/admin/structure/menu/manage/thinstrip-menu?destination=/admin/appearance/settings/uw_drupal_theme'))->toString(),
      '@thinstrip_block_link' => Link::fromTextAndUrl('Thinstrip menu block settings', Url::fromUri('internal:/admin/structure/block/manage/uw_drupal_theme_thinstripmenu?destination=/admin/appearance/settings/uw_drupal_theme'))->toString(),
    ]),
  ];
  $form['uw_drupal_theme_theme_menus']['footer_links_menu'] = [
    '#type' => 'details',
    '#title' => t('Footer links menu'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  ];
  $form['uw_drupal_theme_theme_menus']['footer_links_menu']['description'] = [
    '#type' => 'markup',
    '#markup' => t("<p><strong>Instructions</strong><br/>The navigation links in the Footer are handled as a menu within a block using Drupal's Footer menu:</p><ul><li>@block_layout_link to override the standard UW drupal_theme theme footer links (also known as the footer-navigation nav).</li><li>You can modify the @footer_menu_link</li><li>or adjust the @footer_block_link to customize it further.</li></ul><p>When the theme is first installed the Footer menu block is placed in the Footer region, but set to Disabled.</p>", [
      '@block_layout_link' => Link::fromTextAndUrl('Enable the Footer menu block', Url::fromUri('internal:/admin/structure/block'))->toString(),
      '@footer_menu_link' => Link::fromTextAndUrl('Footer menu items', Url::fromUri('internal:/admin/structure/menu/manage/footer?destination=/admin/appearance/settings/uw_drupal_theme'))->toString(),
      '@footer_block_link' => Link::fromTextAndUrl('Footer menu block settings', Url::fromUri('internal:/admin/structure/block/manage/uw_drupal_theme_footermenu?destination=/admin/appearance/settings/uw_drupal_theme'))->toString(),
    ]),
  ];
  $form['uw_drupal_theme_theme_menus']['quicklinks_menu'] = [
    '#type' => 'details',
    '#title' => t('QuickLinks menu'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  ];
  $form['uw_drupal_theme_theme_menus']['quicklinks_menu']['description'] = [
    '#type' => 'markup',
    '#markup' => t("<p><strong>Instructions</strong><br/>The QuickLinks menu is handled as a block in the QuickLinks region. When the theme is first installed the QuickLinks Content block won't exist.</p><ul><li>Use the Example starter markup below to @content_block_link that will hold the QuickLinks menu content.</li><li>@block_layout_link to assign the Content block to the QuickLinks region.</li></ul><p><strong>Note:</strong> the 'Quick Links' button doesn't appear unless there is something in the QuickLinks region.", [
      '@content_block_link' => Link::fromTextAndUrl('add a Content block', Url::fromUri('internal:/block/add'))->toString(),
      '@block_layout_link' => Link::fromTextAndUrl('Manage blocks', Url::fromUri('internal:/admin/structure/block'))->toString(),
    ]),
  ];
  $form['uw_drupal_theme_theme_menus']['quicklinks_menu']['starter_markup'] = [
    '#type' => 'details',
    '#title' => t('Example starter markup'),
    '#description' => t("Copy this starter markup into a Content block inside the QuickLinks region."),
    '#open' => FALSE,
  ];
  $form['uw_drupal_theme_theme_menus']['quicklinks_menu']['starter_markup']['markup'] = [
    '#type' => 'html_tag',
    '#tag' => 'code',
    '#value' => t('@code', [
      '@code' => '<ul id="big-links">
  <li><span class="icon-myuw" tabindex="-1"></span><a href="https://my.uw.edu">MyUW</a></li>
  <li><span class="icon-calendar" tabindex="-1"></span><a href="https://www.washington.edu/calendar/">Calendar</a></li>
  <li><span class="icon-directories" tabindex="-1"></span><a href="https://directory.uw.edu/">Directories</a></li>
  <li><span class="icon-libraries" tabindex="-1"></span><a href="https://lib.washington.edu">Libraries</a></li>
  <li><span class="icon-medicine" tabindex="-1"></span><a href="https://uwmedicine.org">UW Medicine</a></li>
  <li><span class="icon-maps" tabindex="-1"></span><a href="https://www.washington.edu/maps/">Maps</a></li>
  <li><span class="icon-uwtoday" tabindex="-1"></span><a href="https://www.washington.edu/news/">UW Today</a></li>
</ul>
<h3>Helpful Links</h3>
<ul id="little-links">
  <li><span class="false" tabindex="-1"></span><a href="https://itconnect.uw.edu">Computing/IT</a></li>
  <li><span class="false" tabindex="-1"></span><a href="https://isc.uw.edu/">Employee Self Service</a></li>
  <li><span class="false" tabindex="-1"></span><a href="https://hfs.uw.edu/Husky-Card-Services/">Husky Card</a></li>
  <li><span class="false" tabindex="-1"></span><a href="https://www.uwb.edu/">UW Bothell</a></li>
  <li><span class="false" tabindex="-1"></span><a href="https://tacoma.uw.edu">UW Tacoma</a></li>
  <li><span class="false" tabindex="-1"></span><a href="https://facebook.com/UofWA">UW Facebook</a></li>
  <li><span class="false" tabindex="-1"></span><a href="https://twitter.com/UW">UW Twitter</a></li>
</ul>',
    ]),
    '#description' => t('Use this'),
    '#prefix' => '<pre>',
    '#suffix' => '</pre>',
  ];

  $form['uw_drupal_theme_theme_menus']['uw_drupal_theme_top_links_to_dropdowns'] = [
    '#type' => 'checkbox',
    '#title' => t('Add top-level links to drop-down menus'),
    '#tree' => FALSE,
    '#default_value' => theme_get_setting('uw_drupal_theme_top_links_to_dropdowns'),
    '#description' => t('When a top-level navigation item has a node associated with it, add the top-level Menu link to the drop-down menu.'),
  ];

  // Color settings.
  $url = Url::fromUri('https://www.washington.edu/brand/brand-elements/colors/');
  $form['uw_drupal_theme_colors'] = [
    '#type' => 'details',
    '#title' => t('Color settings'),
    '#group' => 'uw_drupal_theme',
    '#description' => t('Set the color display of certain page elements. For color references, see:') . ' ' . (Link::fromTextAndUrl(t('UW brand color palette'), $url))->toString(),
  ];
  $form['uw_drupal_theme_colors']['front_page'] = [
    '#type' => 'fieldset',
    '#title' => t('Front page elements'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  ];
  // Front page title color.
  $form['uw_drupal_theme_colors']['front_page']['uw_drupal_theme_front_page_title_color'] = [
    '#type' => 'select',
    '#title' => t('Site name'),
    '#default_value' => theme_get_setting('uw_drupal_theme_front_page_title_color'),
    '#options' => $_colors,
  ];
  // Front page slant color.
  $form['uw_drupal_theme_colors']['front_page']['uw_drupal_theme_front_page_slant_color'] = [
    '#type' => 'select',
    '#title' => t('Slant'),
    '#default_value' => theme_get_setting('uw_drupal_theme_front_page_slant_color'),
    '#options' => $_colors,
  ];
  // Front page slogan color.
  $form['uw_drupal_theme_colors']['front_page']['uw_drupal_theme_front_sass_page_slogan_color'] = [
    '#type' => 'select',
    '#title' => t('Site slogan'),
    '#default_value' => theme_get_setting('uw_drupal_theme_front_page_slogan_color'),
    '#options' => $_colors,
  ];

  // Login url settings.
  $form['uw_drupal_theme_login_search'] = [
    '#type' => 'details',
    '#title' => t('Login and search settings'),
    '#group' => 'uw_drupal_theme',
  ];
  $form['uw_drupal_theme_login_search']['login'] = [
    '#type' => 'fieldset',
    '#title' => t('Login settings'),
  ];
  $form['uw_drupal_theme_login_search']['login']['uw_drupal_theme_login_url'] = [
    '#type' => 'textfield',
    '#title' => t('Login url'),
    '#description' => t("Enter the url for the login link (lead with a forward slash '/'). The date in the footer will be linked to this url. Leave empty to not link the date in the footer to a login url."),
    '#default_value' => theme_get_setting('uw_drupal_theme_login_url'),
  ];
  $form['uw_drupal_theme_login_search']['search'] = [
    '#type' => 'fieldset',
    '#title' => t('Default search settings'),
  ];
  $form['uw_drupal_theme_login_search']['search']['details'] = [
    '#type' => 'markup',
    '#markup' => t("<p><strong>Instructions</strong><br/>There's a simple search form that comes with the theme in the #uwsearcharea. Use the select below to change the default search scope for that search form. For the Current site, the form will post to the setting for default node searches (@config_search_pages_link).</p><p>Don't want that? You can place any block in the Search region. It will replace the default search. @block_layout_link</p>", [
      '@config_search_pages_link' => Link::fromTextAndUrl('configure Search pages', Url::fromUri('internal:/admin/config/search/pages'))->toString(),
      '@block_layout_link' => Link::fromTextAndUrl('Manage blocks', Url::fromUri('internal:/admin/structure/block'))->toString(),
    ]),
  ];
  $form['uw_drupal_theme_login_search']['search']['uw_drupal_theme_search_toggle_option'] = [
    '#type' => 'select',
    '#title' => t('Change the default search scope.'),
    '#description' => t("When #uwsearcharea is open, this is the radio button option that will be selected."),
    '#default_value' => theme_get_setting('uw_drupal_theme_search_toggle_option'),
    '#options' => [
      'site' => t('Current site'),
      'uw' => t('All the UW'),
    ],
  ];

  // From submission handler.
  $form['#submit'][] = 'uw_drupal_theme_form_system_theme_settings_submit';
}

/**
 * Submission handler for the theme's form settings.
 *
 * @throws \Drupal\Core\Entity\EntityStorageException
 */
function uw_drupal_theme_form_system_theme_settings_submit(&$form, FormStateInterface &$form_state, $form_id = NULL): void {

  $field_uploads_to_check = [
    'uw_drupal_theme_hero_image_front_upload',
    'uw_drupal_theme_hero_image_front_mobile_upload',
    'uw_drupal_theme_hero_image_other_upload',
    'uw_drupal_theme_hero_image_other_mobile_upload',
  ];

  foreach ($field_uploads_to_check as $field_upload) {
    if ($form_state->getValue([$field_upload, '0'])) {
      $file_id = $form_state->getValue([$field_upload, '0']);
      $file = File::load($file_id);
      // Set status to permanent so that it's not deleted.
      $file->setPermanent();
      $file->save();
    }
  }
}
