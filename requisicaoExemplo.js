const fields = ['nome', 'email', 'telefone'];

class cvLeads {
  constructor(url, email, token){
    this.url = url;
    this.email = email;
    this.token = token;
    this.renderForm();
  }
  
  renderForm() {
    let form = `<form class="cv-lead-form" method="post" id="cv-lead-form">
                  <input type="text" class="cv-lead-nome" name="nome" placeholder="Nome" required>
                  <input type="email" class="cv-lead-email" name="email" placeholder="E-mail" required>
                  <input type="tel" name="telefone" class="cv-lead-telefone" placeholder="Telefone" onkeyup="masc(this, mtel);" maxlength="15" required>
                  <button class="cv-lead-submit" type="submit">Enviar</button>
                </form>`;

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
    var formData = {
      "acao":"salvar_editar",
      "permitir_alteracao":"true",
    };
    
    form.forEach(function(value, key){
      formData[key] = value;
    });	   

    var data = JSON.stringify(formData);
    var formRequest = new XMLHttpRequest();

    formRequest.open('POST', this.url);
    formRequest.setRequestHeader("Content-Type", "application/json");
    formRequest.setRequestHeader("email", this.email);
    formRequest.setRequestHeader("token", this.token);
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
  