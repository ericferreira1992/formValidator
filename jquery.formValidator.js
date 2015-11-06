//PLUGIN PARA VALIDAÇÃO DE FORMULARIOS CRIADO POR ERIC ANDRADE - ericferreira1992@gmail.com
"use strict";
$.fn.formValidator = function(options) {
    var defaults = {
        before: function(){},
        after: {
            successValidation: '',
            errorValidation: ''
        },
        submitEnable: true,
        confirmSubmit : '',
        thisForm: this,
        erro: false,
        alertaErro: '',
        myValidations: [],
        sending: {
            type: 'redirect',
            dataType: 'html',
            success: '',
            error: ''
        }
    };
    var settings = $.extend( {}, defaults, options );

    settings.thisForm = this;
    $(document).on('submit', '#'+settings.thisForm.attr('id'), function(e){
        if(settings.submitEnable){
            if(settings.confirmSubmit!=''){
                if(!window.confirm(settings.confirmSubmit))
                    return false;
            }

            if (typeof settings.before == 'function') {
                settings.before.call(this);
            }

            settings.erro = false;
            settings.alertaErro = "Os seguintes campos precisam ser preenchidos:\n";
            $(this).find('input[data-required="true"], select[data-required="true"], textarea[data-required="true"]').map(function(){
                if($(this).attr('type')=="radio"){
                    //Buscar quantidade com o mesmo nome e ver se há algum checkado!!
                    if($(this).prop('checked')==false){
                        if($(this).data("title")!="" && $(this).data("title")!=undefined)
                            var nome = $(this).data("title");
                        else
                            var nome = $(this).parent().children('label').text();

                        var checked = false
                        $(this).find('input[name="'+$(this).attr("name")+'"]').map(function(){
                            if($(this).prop('checked')==true){
                                checked =  true;
                            }
                        });
                        if(!checked){
                            settings.erro = true;
                            settings.alertaErro = settings.alertaErro.replace("- "+nome+"\n",'');
                            settings.alertaErro += "- "+nome+"\n";
                        }
                    }
                }
                else if($(this).attr('type')=="checkbox"){
                    if($(this).prop('checked')==false){
                        settings.erro = true;
                        if($(this).data("title")!="" && $(this).data("title")!=undefined)
                            var nome = $(this).data("title");
                        else
                            var nome = $(this).parent().children('label').text();
                        settings.alertaErro = settings.alertaErro.replace("- "+nome+"\n",'');
                        settings.alertaErro += "- "+nome+"\n";
                    }
                }
                else{
                    if($(this).val()==""){
                        settings.erro = true;
                        if($(this).data("title")!="" && $(this).data("title")!=undefined)
                            var nome = $(this).data("title");
                        else
                            var nome = $(this).parent().children('label').text();
                        settings.alertaErro += "- "+nome+"\n";
                    }
                }
            });

            if(!settings.erro){
                settings.alertaErro = "Os campos abaixo precisam ser iguais:\n";
                $(this).find('input[data-equals], select[data-equals], textarea[data-equals]').map(function(){
                    var inputNameIgual = $(this).data("equals");
                    if($(this).val() != $('input[name="'+inputNameIgual+'"]').val()){
                        settings.erro = true;
                        if($(this).data("title")!="" && $(this).data("title")!=undefined)
                            var nomeInput = $(this).data("title");
                        else
                            var nomeInput = $(this).parent().children('label').text();

                        if($('input[name="'+inputNameIgual+'"]').data("title")!="" && $('input[name="'+inputNameIgual+'"]').data("title")!=undefined)
                            var nomeInputIgual = $('input[name="'+inputNameIgual+'"]').data("title");
                        else
                            var nomeInputIgual = $('input[name="'+inputNameIgual+'"]').parent().children('label').text();
                        settings.alertaErro += "- "+nomeInputIgual+" e "+nomeInput+"\n";
                    }
                });
            }

            if(!settings.erro){
                settings.alertaErro = "Valores inválidos:\n";
                $(this).find('input[data-min-characters], textarea[data-min-characters]').map(function(){
                    var minCharacters = parseInt($(this).data("min-characters"));
                    if($(this).val().length < minCharacters){
                        settings.erro = true;
                        if($(this).data("title")!="" && $(this).data("title")!=undefined)
                            var nomeInput = $(this).data("title");
                        else
                            var nomeInput = $(this).parent().children('label').text();

                        settings.alertaErro += "- "+nomeInput+" precisa ter no mínimo "+minCharacters+" caractéres.\n";
                    }
                });
            }

            if(!settings.erro){
                if(settings.myValidations.length>0){
                    settings.alertaErro = "Ops, ocorreram alguns erros:\n";
                    for(var i=0; i<settings.myValidations.length; i++){
                        if(typeof settings.myValidations[i] == 'function'){
                            var msg = settings.myValidations[i].call(this);
                            if(msg != "" && msg!=undefined){
                                settings.alertaErro += "- "+msg+"\n";
                                settings.erro = true;
                            }
                        }
                    }
                }
            }
            done();
        }
        e.stopImmediatePropagation();
        return false;
    });

    var ajaxingForm = false;
    function done(){
        if(!settings.erro){//SUCCESS
            if (typeof settings.after.successValidation == 'function') {
                settings.after.successValidation.call(this);
            }
            if(settings.sending.type == "ajax"){
                var inputs = $('#'+settings.thisForm.attr('id')).serialize();
                var url = $(settings.thisForm).attr('action');
                var method = ($(settings.thisForm).attr('method')=="" || $(settings.thisForm).attr('method')==undefined) ? "POST" : $(settings.thisForm).attr('method');
                if(!ajaxingForm){
                    ajaxingForm = true;
                    $.ajax({
                        type: method,
                        url: url,
                        data: inputs,
                        dataType: settings.sending.dataType,
                        success: function(retorno) {
                            ajaxingForm = false;
                            if (typeof settings.sending.success == 'function') {
                                settings.sending.success(retorno);
                            }
                        },
                        error: function(){
                            ajaxingForm = false;
                            if (typeof settings.sending.error == 'function') {
                                settings.sending.error(retorno);
                            }
                        }
                    });
                }
            }
            else{
                settings.submitEnable = false;
                $(settings.thisForm).submit();
            }
        }
        else{//ERROR
            if (typeof settings.after.errorValidation == 'function') {
                settings.after.errorValidation.call(this);
            }
            alert(settings.alertaErro);
        }
    }
};