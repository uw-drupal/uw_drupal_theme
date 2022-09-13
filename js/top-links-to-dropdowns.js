jQuery(document).ready(function($) {

  $('div#white-bar > ul#menu-dropdowns > li').each( function(index){
    if( $(this).has('> ul').length ){
      var toplink = $( this ).find('> a');
      if( toplink.attr('href') != '/' && toplink.attr('href') != '' ){
              $(this).find('> ul > li:nth-child(1)').before(
          `<li class="menu-item top-level-nav nav-item"><a href="${toplink.attr('href')}" class="nav-link" style="font-weight:bold">${toplink.text().toUpperCase()}</a></li>`
        );
      }
    }
  });

});
