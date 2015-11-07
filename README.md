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

### Usage
  * **Include in header your Html**:
```html
  <script src="js/jquery.formValidator.js"></script>
```
  * **Form (Html)**:
```html
  <form name="my-form" id="my-form" method="POST" action="send.php">
    <form>
    
    </form>
  </form>
```