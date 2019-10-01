requirejs.config({
    baseUrl: 'libs',
    paths: {
        underscore: 'underscore',
        jquery: 'jquery-3.4.1'
    },
    map: {
      '*': {
        'css': 'require-css/css' // or whatever the path to require-css is
      }
    },
    packages: [
      {
        name: 'require-css',
        location: '../require_plugins/require-css',
        main: 'css'
      }
    ],
});
