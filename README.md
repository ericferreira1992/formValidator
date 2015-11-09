# FormValidator
Plugin in jQuery to validate your forms using ajax or not. A validation differently!

### Features
* Validation of any form;
* No need for CSS;
* Possible create confirmation message to submiter form (optional);
* Possible submit in AJAX ** ** or standard;
* **Callbacks** for AJAX method (success and error);
* Allows you to create your own validations (custom);
* Specific, personalized methods for success and validation error;
* Method to perform actions **before** and **after** for AJAX method;
* Avaiable in **3 languages**: portguese(**pt-bt**), english(**en**), spanish(**es**);

---

### Particularities
* Works with jQuery library;
* Compatible with any form;
* Because it is compatible with any form, errors are displayed in an "alert";
* Works with the ID attribute (ex.: ``` <form id="my-form"></form> ```);

---

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
`before`		    | *Function*	| `null`		| Activities performed before validation (ex .: loading ...).
`after  `		    | *Functions*	| `null`		| Activities performed after validation (ex .: remove loading ...).
`submitEnable`  | *Boolean*		| `true`		| Enable or disable formValidator.
`confirmSubmit`	| *String*		| `empty`		| Message to ensure that the user really wants to submit.
`myValidations`	| *Array* 		| `null`		| Lets you create multiple functions to perform special validation (returns a string).
`sending`	      | *Settings* 	| `...`		  | Settings to set the send mode (ex .: ajax).
`lang`	        | *String* 		| `pt-br`		| Language in which the plugin will work.

---

### Usage
**Include in header your Html**:
```html
  <script src="js/jquery.formValidator.js"></script>
```
Data Attributes	      | Description
---						        | ---
`data-required`		    | With "true" or "" false "reports whether the input is required or not (ex .: ``` <input name="name" data-required="true"/> ```).
`data-title`		      | Display name for the input, but can be replaced with a label containing the element name (ex .: ``` <input name="name" data-required="true" data-title="Name" /> ```).
`data-equals`		      | When a field needs to be the same as another, much used in passwords (ex .: ``` <input name="pass" data-required="true" data-title="Password" data-equals="repass" /> ```).

---

### Examples

**HTML 01 (Form login)**:  
*Form that exemplifies a login where all fields are required.*
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
 HTML 01 - **JavaScript**:
 - **Case** 01:  
  *Simplest way to call the plugin.*
```javascript
    $(function(){
        $('#my-form').formValidator();
    });
```
 - **Case** 02:  
  *Thus it is determined consignment type "ajax", with callbacks methods "success" and "error".*
```javascript
    $(function(){
        $('#my-form').formValidator({
            confirmSubmit: 'Are you sure to submit?',
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
                    alert("Failure to submit!");
                }
            }
        });
    });
```
---

**HTML 02 (Form register)**:  
*Form that contains a special feature where passwords are required and should be equal.*
```html
    <form name="my-form" id="my-form" method="POST" action="send.php">
        <div class="form-group">
            <label>E-mail</label>
            <input type="text" name="email" data-required="true" data-title="E-mail" />
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="pass" data-required="true" data-equals="repass" data-title="Password" />
        </div>
        <div class="form-group">
            <label>Re-Password</label>
            <input type="password" name="repass" data-required="true" data-title="Re-Password"  />
        </div>
        <div class="form-group">
            <button name="pass">Submit</button>
        </div>
    </form>
```
 HTML 02 - **JavaScript**:
 - **Case** 01:  
  *Simplest way to call the plugin.*
```javascript
    $(function(){
        $('#my-form').formValidator();
    });
```
---
### Donate to help: [Click Here] (https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ericferreira1992%40gmail%2ecom&lc=BR&item_name=Eric%20Github&currency_code=BRL&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)
---
### Send email to support: [ericferreira1992@gmail.com] (mailto://ericferreira1992@gmail.com)
