const fields = ['nome', 'email', 'telefone'];

class cvLeads {
  constructor(url, email, token) {
    this.urlCV = url;
    this.emailCV = email;
    this.tokenCV = token;
    this.renderForm();
  }
  
  renderForm() {
    let form = '<form class="cv-lead-form" method="post" id="cv-lead-form">'
                  + '<input type="text" class="cv-lead-nome" name="nome" placeholder="Nome" required>'
                  + '<input type="email" class="cv-lead-email" name="email" placeholder="E-mail" required>'
                  + '<input type="tel" name="telefone" class="cv-lead-telefone" placeholder="Telefone" onkeyup="masc(this, mtel);" maxlength="15" required>' 
                  + '<input type="tel" name="telefone" class="cv-lead-telefone" placeholder="Telefone" onkeyup="masc(this, mtel);" maxlength="15" required>'                 
                  + '<button class="cv-lead-submit" type="submit">Enviar</button>' +
                  '</form>';

    document.querySelector('#cv-leads').insertAdjacentHTML('beforeend', form);
    document.getElementById("cv-lead-form").addEventListener("submit", (event) => {
       event.preventDefault();
       this.validateForm() ? this.submitForm() : false;
    });
  }
  
  validateForm() {
    var fieldname;
    var i, l = fields.length;

    for (i = 0; i < l; i++) {
      fieldname = fields[i];
      if (document.forms["cv-lead-form"][fieldname].value === "") {
        alert("Preencha todos os campos!");
        return false;
      }
    }
    return true;
  }
  
  submitForm() {
    var form = new FormData(document.getElementById('cv-lead-form'));
    var formData = "urlCV=" + this.urlCV + "&emailCV=" + this.emailCV + "&tokenCV=" + this.tokenCV + "&";
    
    form.forEach(function(value, key) {
      formData += key + '=' + value + '&';
    });

    console.log(formData);

    // var data = JSON.stringify(formData);
    var data = encodeURI(formData);
    var formRequest = new XMLHttpRequest();

    formRequest.open('POST', 'https://apresentacao.realizacoes.com/cv-lead/cv-lead.php', true);
    formRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    formRequest.send(data);
	}
}

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
  