
(function ($) {
    "use strict";


     /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');




    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);



function login_libre(log) {
    
    var result = "NULL";
    $.ajax({
        type: 'POST',
        url: 'check_login.php',
        data: {login: log},
        success: function(data) {
          result=data;
        },
        async:false
        // dataType: dataType,
      });
    // Console.log(log);
    // return JSON.stringify(dat);
    return result;
}

// alert(dat);

function validerLogin(input) {
    var texte = $(input).val();
    var loginFree = login_libre(texte);
    console.log(loginFree);
    var resultat = (texte.match(/^[a-zA-Z0-9_]*$/))?"CBON":"Seulement caractères alphanumériques SVP.";
    // alert(texte.toLowerCase());
    if(texte.toLowerCase()=='steven' || texte.toLowerCase()=='valentin') {
        resultat = "Persona Non Grata !!!";
    } else if(texte.toLowerCase()=='jjj') {
        resultat = "Sexy, j'te bz !!!";
    } else if(texte.toLowerCase()=='lounes') {
        resultat = "Va réveiller Samuel !";
    } else if(texte.toLowerCase()=='romain') {
        resultat = "PAS DE PETITES PERRUCHES";
    } else if(texte.toLowerCase()=='gregoire') {
        resultat = "↑ ↑ ↓ ↓ ← → ← → B A Start";
    } else if(loginFree != "1") {
        resultat = "Login déjà pris.";
    };

    // return(login_libre(texte));
    
    return (resultat);
}

$(function(){
// alert("truc");





    var input = $('#input_login'); // on fout le bazaar dans une variable
    $('#input_login').on('keyup', function(){
        var validation = validerLogin(input); //on appelle la fonction validation en lui
        if(validation == "CBON"){
            // alert("STEVEN ALERT");
            $('#input_login').removeClass("pas-bon");
            input.tooltip('hide');    
        } else {
            input.attr("data-original-title", validation); //change le texte du tooltip bootstrap
            input.tooltip('show'); //affiche le tooltip bootstrap
            $('#input_login').addClass("pas-bon");
        }
    });


    // Tooltips Initialization
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({ trigger : 'manual'})
    })

});