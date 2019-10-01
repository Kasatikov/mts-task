define(['../js/api', '../js/templates', '../js/helpers', '../js/renderUserApps'], function(api, templates, helpers, renderer) {
  'use strict';

  return function() {
    function renderAppCard(apps, resolve) {
      var $target_elem = $('.grid_container'),
          grid_root_template = _.template(templates.grid_root_template),
          last_point = 0,
          app_cards = '';


      apps.forEach(function(app, index) {
        if (app.category_id !== (apps[index + 1] && apps[index + 1].category_id)) {

          app_cards += grid_root_template({
            apps: apps.slice(last_point, index + 1),
            name: app.description
          });

        	last_point = index + 1;
        }
      });

    	$target_elem.empty().append($(app_cards));

      resolve(apps);
  	}

    function groupAppsByCategory(data, resolve) {
      var apps = data.apps;

      apps.sort(function(a, b) {
        return a.category_id - b.category_id;
      });

      renderAppCard(apps, resolve);
    }

    return new Promise(function(resolve, reject) {

      if (!_.isUndefined(helpers.getCookie('login'))) {
        $('.navbar-item__profile span.login-elem').hide();
        $('.navbar-item__profile span.logout-elem').show();
        api.getUserApps().then(function(res) {
          renderer.renderUserApps(res);
          resolve(res.apps);
        });
      } else {
        api.getApps().then(function(res) {
          groupAppsByCategory(res, resolve);
        }, function() {
          reject(new Error('Cannot get apps'));
        });
      }

  });
}
});
