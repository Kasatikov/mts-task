define(['../js/templates'], function(templates) {
  'use strict';

    function renderUserApps(apps) {
      var $target_elem = $('.grid_container'),
          grid_root_template = _.template(templates.grid_root_template),
          app_cards = '';

          app_cards += grid_root_template({
            apps: apps.apps,
            name: 'Ваши приложения'
          });

      $target_elem.empty().append($(app_cards));
    }

    return {
      renderUserApps: renderUserApps
    }
});
