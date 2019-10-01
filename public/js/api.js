define(['jquery'], function ($) {
  'use strict';

  var get_apps_endpoint = '/getApps',
      login_endpoint = '/login',
      get_user_apps_endpoint = '/getUserApps';



  function getApps() {
    return $.ajax({
      type: 'GET',
      url: get_apps_endpoint
    });
  }

  function getUserApps() {
    return $.ajax({
      type: 'GET',
      url: get_user_apps_endpoint
    });
  }

  function login(data) {
    return $.ajax({
      url: login_endpoint,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    });
  }

  return {
    getApps: getApps,
    getUserApps: getUserApps,
    login: login
  };
});
