# FormValidator
Plugin in jQuery to validate your forms using ajax or not. A validation differently!

### Features
* Validação de qualquer formulário;
* Não necessita de CSS;
* Possível criar mensagem de confirmação ao submiter formulário (opcional);
* Possível submeter em **AJAX** ou padrão;
* **Callbacks** para o método AJAX (success e error);
* Permite criar suas próprias validações (personalizados);
* Métodos específicos e personalizados para Sucesso e Erro de validação;
* Método para realizar ações **antes** e **depois** para o método AJAX;
* Disponível em **3 idiomas**: português(**pt-bt**), inglês(**en**), espanhol(**es**);

### Particularidades
* Funciona somente com biblioteca jQuery;
* Funciona somente com atributo ID (ex.: ``` <form id="my-form"></form> ```);

### Options
Here's a list of available settings (default).
```javascript
$("#my-form").formValidator({
  before: function(){},
  after: {
      successValidation: function(){},
      errorValidation: function(){}
  },
  submitEnable: true,
  confirmSubmit : '',
  myValidations: [],
  sending: {
      type: 'redirect',
      dataType: 'html',
      success: function(){},
      error: function(){}
  },
  lang:'pt-br'
});
```
Attribute			  | Type				| Default		| Description
---						  | ---					| ---				| ---
`before`		    | *Functions*	| `null`		| Displays the number of stars in a repository.
`submitEnable`  | *Boolean*		| `true`		| Displays the number of forks in a repository.
`confirmSubmit`	| *String*		| `empty`		| Displays the number of issues in a repository.
`myValidations`	| *Array* 		| `null`		| Displays the number of issues in a repository.
`sending`	      | *Settings* 	| `...`		  | Configurações para definir o modo de envio.
`lang`	        | *String* 		| `pt-br`		| Idioma em que o plugin irá trabalhar.

### Usage (examples)
**Include in header your Html**:
```html
  <script src="js/jquery.formValidator.js"></script>
```
**Form (Html)**:
```html
    <form name="my-form" id="my-form" method="POST" action="send.php">
        <div class="form-group">
            <label>E-mail</label>
            <input type="text" name="email" data-required="true" data-title="E-mail" />
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="pass" data-required="true" data-title="Password" />
        </div>
        <div class="form-group">
            <button name="pass">Submit</button>
        </div>
    </form>
```
 **JavaScript (examples)**:
 - **Case 01**:  
  *Forma mais simples de se chamar o plugin.*
```javascript
    $(function(){
        $('#my-form').formValidator();
    });
```
 - **Case 02**:
  *Desta forma é determinado o tipo de envio "ajax", com os métodos callbacks "success" e "error".*
```javascript
    $(function(){
        $('#my-form').formValidator({
            sending: {
                type: 'ajax',
                success: function(data){
                  if(data==1){
                    alert("Submitted successfully!");
                  }
                  else{
                    alert("Failure to submit!");
                  }
                },
                error: function(){
                }
            }
        });
    });
```
