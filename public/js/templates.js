define(function () {
  'use strict';
  var card_app_template = '<div class="apps_grid__item" data-id=<%=app.id%>><div class="grid-item__logo"><img src=<%=app.img%>></div><div class="grid-item__name"><%=app.name%></div></div> ';

  return {
    grid_root_template: '<div><div class="apps-category"><%=name%></div><div class="apps_grid"><% _.each(apps, function(app) { %>  ' + card_app_template + ' <% }); %></div></div>',
    modal_template: '<div class="modal open <%=modal_classname%>"><div class="modal__overlay jsOverlay"></div><div class="modal__container"><button class="modal__close jsModalClose">✕</button></div></div>',
    modal_app_inner_template: '<div class="app_name"><%=name%></div><div style="float: right;margin: 15px;margin-top: 8px;margin-right: 0px;border-radius: 4px;"><img src="<%=img%>" style="border-radius: 4px;"></div><div class="app_description"><%=text%></div><div style="margin-top: 50px;"><textarea placeholder="Добавить комментарий" oninput="this.style.height = &quot;&quot;;this.style.height = this.scrollHeight + &quot;px&quot;"></textarea></div>',
    modal_app_star_template: '<div class="star-wrapper"><div class="rating"><%=rating%></div><% for(var i = 0; i < rating; i++) { %>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star" id="common--star" style=""><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg> <% }; %></div>',
    auth_modal_template: '<div class="form"><form class="register-form"><input type="text" placeholder="Логин"/><input type="password" placeholder="Пароль"/><input type="text" placeholder="Email"/><button>Создать аккаунт</button><p class="message">Уже зарегистрированы? <a href="#">Войти</a></p></form><form class="login-form"><input class="modal_auth_login" type="text" placeholder="Логин"/><input class="modal_auth_password" type="password" placeholder="Пароль"/><button>Войти</button><p class="message">Нет аккаунта? <a href="#">Зарегистрироваться</a></p></form></div>'
  };
});
