'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fields = ['nome', 'email', 'telefone'];

var cvLeads = function () {
  function cvLeads(url, email, token) {
    _classCallCheck(this, cvLeads);

    this.urlCV = url;
    this.emailCV = email;
    this.tokenCV = token;
    this.renderForm();
    this.utmHandler();
  }

  _createClass(cvLeads, [{
    key: 'renderForm',
    value: function renderForm() {
      var _this = this;

      var form = '<form class="cv-lead-form" method="post" id="cv-lead-form">' + '<div class="item-form">' + '<label for="nome">Nome</label>' + '<input type="text" class="cv-lead-nome" name="nome" placeholder="Nome" required>' + '</div>' + '<div class="item-form">' + '<label for="email">E-mail</label>' + '<input type="email" class="cv-lead-email" name="email" placeholder="E-mail" required>' + '</div>' + '<div class="item-form">' + '<label for="telefone">Telefone</label>' + '<input type="tel" name="telefone" class="cv-lead-telefone" placeholder="Telefone" onkeyup="masc(this, mtel);" maxlength="15" required>' + '</div>' + '<button class="cv-lead-submit" type="submit">Enviar</button>' + '</form>';

      document.querySelector('#cv-leads').insertAdjacentHTML('beforeend', form);
      document.querySelector("#cv-lead-form").addEventListener("submit", function (event) {
        event.preventDefault();
        _this.validateForm() ? _this.submitForm(event) : false;
      });
    }
  }, {
    key: 'validateForm',
    value: function validateForm() {
      var fieldname;
      var i,
          l = fields.length;

      for (i = 0; i < l; i++) {
        fieldname = fields[i];
        if (document.forms["cv-lead-form"][fieldname].value === "") {
          alert("Preencha todos os campos!");
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'utmHandler',
    value: function utmHandler() {
      //http://www.example.com/?utm_source=adsite&utm_medium=origem&utm_campaign=campanhadoanuncio&utm_term=palavra-chavedoanuncio
      var origem = formatOrigin(getParamsURL()['utm_source']);
      var medium = formatMedium(getParamsURL()['utm_source'], getParamsURL()['utm_medium']);
      this.registerLocalStorage(origem, medium);
    }
  }, {
    key: 'registerLocalStorage',
    value: function registerLocalStorage(origem, medium) {
      if (origem && medium) {
        localStorage.setItem('utm_source', origem);
        localStorage.setItem('utm_medium', medium);
      }
    }
  }, {
    key: 'submitForm',
    value: function submitForm(event) {
      event.preventDefault();
      var form = new FormData(document.getElementById('cv-lead-form'));
      var formData = {
        "acao": "salvar_editar",
        "permitir_alteracao": "true"
      };

      form.forEach(function (value, key) {
        formData[key] = value;
      });

      if (localStorage.getItem('utm_source') && localStorage.getItem('utm_medium')) {
        formData.origem = localStorage.getItem('utm_source');
        formData.midia = localStorage.getItem('utm_medium');
      }

      var data = JSON.stringify(formData);
      var formRequest = new XMLHttpRequest();

      formRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          alert(response["sucesso"] ? 'Sua mensagem foi enviada com sucesso' : 'Houve um erro no envio da mensagem.');
        }
      };

      formRequest.open('POST', this.urlCV, true);
      formRequest.setRequestHeader("Content-Type", "application/json");
      formRequest.setRequestHeader("email", this.emailCV);
      formRequest.setRequestHeader("token", this.tokenCV);
      formRequest.send(data);
    }
  }]);

  return cvLeads;
}();

function getParamsURL() {
  var array = location.search.split('?').join('').split("&");
  var obj = {};
  array.forEach(function (element) {
    var attrValue = element.split('=');
    obj[attrValue[0]] = attrValue[1];
  });
  return obj;
}

function formatOrigin(origin) {
  switch (origin) {
    case 'facebook':
      return 'FB';

    case 'google':
      return 'GO';

    case 'bing':
      return 'BC';

    case 'twitter':
      return 'TW';

    case 'newsletter':
      return 'EM';
  }
}

function formatMedium(origin, medium) {
  if (origin && medium) {
    return origin + "_" + medium;
  }
}

function masc(o, f) {
  v_obj = o;
  v_fun = f;
  setTimeout("this.execmasc()", 1);
}

function execmasc() {
  v_obj.value = v_fun(v_obj.value);
}

function mtel(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
  return v;
}