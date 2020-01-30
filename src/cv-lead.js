class cvLeads {
  constructor(url, email, token) {
    this.urlCV = url;
    this.emailCV = email;
    this.tokenCV = token;
    this.renderForm();
    this.utmHandler();
  }
  
  renderForm() {
    document.querySelector("#cv-lead-form").addEventListener("submit", (event) => {
       event.preventDefault();
       this.submitForm(event);
    });
  }


  utmHandler() {
    //http://www.example.com/?utm_source=adsite&utm_medium=origem&utm_campaign=campanhadoanuncio&utm_term=palavra-chavedoanuncio
    const origem = formatOrigin(getParamsURL()['utm_source']);
    const medium = formatMedium(getParamsURL()['utm_source'], getParamsURL()['utm_medium']);
    this.registerLocalStorage(origem, medium);
  }

  registerLocalStorage(origem, medium) {
      if(origem && medium) {
        localStorage.removeItem('utm_source');
        localStorage.removeItem('utm_medium');
        localStorage.setItem('utm_source', origem);
        localStorage.setItem('utm_medium', medium);
      }
  }


  submitForm(event) {
    event.preventDefault();
    var form = new FormData(document.getElementById('cv-lead-form'));
    var formData = {
      "acao": "salvar",
      "permitir_alteracao": "true"
    };
    
    form.forEach(function(value, key) {
      formData[key] = value;
    });

    if(localStorage.getItem('utm_source') && localStorage.getItem('utm_medium')){  
      formData.origem = localStorage.getItem('utm_source');
      formData.midia = localStorage.getItem('utm_medium');
    }

    formData.conversao = document.getElementsByName("conversao")[0].value ? document.getElementsByName("conversao")[0].value : formData.origem;

    var data = JSON.stringify(formData);
    var formRequest = new XMLHttpRequest();

    formRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          alert( response["sucesso"] ? 'Sua mensagem foi enviada com sucesso' : 'Houve um erro no envio da mensagem.');
       }
    };

    formRequest.open('POST', this.urlCV, true);
    formRequest.setRequestHeader("Content-Type", "application/json");
    formRequest.setRequestHeader("email", this.emailCV);
    formRequest.setRequestHeader("token", this.tokenCV);
    formRequest.send(data);
  }
}

function getParamsURL(){
  var array = location.search.split('?').join('').split("&");
  var obj = {};
  array.forEach(function(element){
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
      case 'instagram':
        return 'FB';
  }
 }


 function formatMedium(origin, medium) {
  if(origin && medium) {
    return origin+"_"+medium;
  }
 }


let v_obj;
let v_fun;

function masc(o,f) {
  v_obj=o;
  v_fun=f;
  setTimeout("this.execmasc()", 1);
}

function execmasc() {
  v_obj.value=v_fun(v_obj.value);
}

function mtel(v) {
  v=v.replace(/\D/g,"");
  v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
  v=v.replace(/(\d)(\d{4})$/,"$1-$2");
  return v;
}


  