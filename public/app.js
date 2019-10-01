require(['config.js'], function() {
  require(['jquery', 'underscore', '../js/renderAppCard', '../js/components/modal', '../js/helpers'], function($, _, renderAppCard, Modal, helpers) {
    function bindActions(apps) {
      $('.apps_grid__item').click(function(e) {
        var $app_card = $(e.currentTarget).closest('.apps_grid__item');
        var id = $app_card.data('id');
        var app_model = _.findWhere(apps || self.apps, { id: id });
        new Modal({
          app_model: app_model
        });
      });
    }
    new renderAppCard().then(function(apps) {
      bindActions();
      this.apps = apps || [];
      var self = this;
      $('.navbar-item__profile.login span').click(function(e) {
        if (_.isUndefined(helpers.getCookie('login'))) {
          new Modal({
            modal_classname: 'auth_modal',
            auth_modal: true
          });
        } else {
          helpers.deleteCookie('login');
          new renderAppCard().then(function(apps) {
            bindActions(apps);
          });
        }
      });
      $('span.logout-elem').click(function(e) {
        $('span.login-elem').show();
        $('span.logout-elem').hide();
      });
    });
  });
});
