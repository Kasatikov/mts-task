define(['../templates', '../api', '../helpers', '../renderUserApps', 'css!../../../../css/modal' ], function (templates, api, helpers, renderer) {
  'use strict';
  function Modal(options) {
    var options = options || {},
        modal_template = _.template(templates.modal_template),
        selectors;

    this.selectors = {
      modal_open_trigger_elem: options.modal_open_trigger_elem || '.jsModalTrigger',
      modal_close_button_elem: options.modal_close_button_elem || '.jsModalClose',
      modal_close_overlay_elem: options.modal_close_overlay_elem || '.jsOverlay'
    }

    selectors = this.selectors;

    this.initialize = function() {
      this.render();
      this.ready(_.bind(this.closeModal, this));
    }

    this.bindEvents = function() {
      var self = this;
      $('.message a').click(function(){
        $('form').animate({
          height: "toggle",
          opacity: "toggle" }, "slow");
      });
      $('.login-form button').click(function(e) {
        var login =  $('.login-form .modal_auth_login').val();
        var password =  $('.login-form .modal_auth_password').val();
        e.preventDefault();
        api.login({
          login: login,
          password: password
        }).then(function(res) {
          if (res.auth) {
            helpers.setCookie('login', login);
            helpers.setCookie('password', password);
            $('.navbar-item__profile span.login-elem').hide();
            $('.navbar-item__profile span.logout-elem').show();
            $('.auth_modal').animate({opacity: "toggle" }, "slow").promise().done(function() {
              self.destroy(null, $('.auth_modal'));
            });
            api.getUserApps().then(function(res) {
                renderer.renderUserApps(res);
                $('.apps_grid__item').off().click(function(e) {
                  var $app_card = $(e.currentTarget).closest('.apps_grid__item');
                  var id = $app_card.data('id');
                  var app_model = _.findWhere(res.apps, { id: id });
                  new Modal({
                    app_model: app_model
                  });
                });
            });
          }
        });
      });
    }

    this.render = function() {
      this.$modal = $(modal_template({ modal_classname: options.modal_classname }));
      if (!_.isUndefined(options.app_model)) {
        var app_info = _.template(templates.modal_app_inner_template);
        var stars_template = _.template(templates.modal_app_star_template);
        this.$modal.find('.modal__container').append(app_info({
          name: options.app_model.name,
          img:  options.app_model.img,
          text: options.app_model.text
        }));
        this.$modal.find('.app_description').after(stars_template({rating: options.app_model.rating.toFixed(1)}));
      }
      if (!_.isUndefined(options.auth_modal)) {
        this.$modal.find('.modal__container').append(_.template(templates.auth_modal_template));
      }
      $('body').append(this.$modal);
      this.bindEvents();
    }

    this.destroy = function(e, selector) {
      var $modal = e ? $(e.currentTarget).closest('.modal') : selector;
      $modal.remove();
    }

    this.closeModal = function() {
      var $closeButton = $(selectors.modal_close_button_elem),
          $closeOverlay = $(selectors.modal_close_overlay_elem);

        for(var i = 0; i < $closeButton.length; i++) {
          $closeButton[i].onclick = _.bind(function(e) {
            this.destroy(e);
          }, this);
        }

        for(var i = 0; i < $closeOverlay.length; i++) {
          $closeOverlay[i].onclick = _.bind(function(e) {
              this.destroy(e);
          }, this);
        }

    };

    this.ready = function(fn) {
      if (document.readyState != 'loading'){
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }

    this.initialize();
}

return Modal;
});
