
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




    // $('.validate-form').on('submit',function(){
    //     var check = true;

    //     for(var i=0; i<input.length; i++) {
    //         if(validate(input[i]) == false){
    //             showValidate(input[i]);
    //             check=false;
    //         }
    //     }

    //     return check;
    // });


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



//----------------------------------------------------- Début du code à NOUS ------------------------------------------------------



// Fonction permettant de vérifier si le login existe déjà dans la DB (en ajax)
function login_libre(log) {
    
    var result = "NULL";
    $.ajax({
        type: 'POST',
        url: 'check_login.php',
        data: {login: log},
        success: function(data) {
          result=data;
        },
        async:false     //On fait une requête en async, sinon elle est exécutée en parrallèle et le script n'a pas le temps de récupérer le résultat
      });
    return result;
}

function validerLogin(input) {      // Une fonction pour vérifier si le login est valide

    // toLowerCase() convertit une chaîne en minuscules. Ca permet faire des checks plus facilement et fiablement (pas d'histoires de casse)

    var insulte = ['bitch', 'pute', 'con']; // On fait un array de gros mots interdits dans l'espace public pour des raisons évidentes de bienséance

    var texte = $(input).val(); // On récupère la valeur de l'élément passé dans input (un sélecteur jQuery)

    var loginFree = login_libre(texte.toLowerCase());   // On appelle la fonction login_libre pour voir si le login est déjà présent 
                                                        //          dans la db et on stocke le résultat dans une variable

    var resultat = (texte.match(/^[a-zA-Z0-9_]*$/))?"CBON":"Seulement caractères alphanumériques SVP."; // On utilise une expression régulière pour checker si
                                                                                                        //      il y a des caractères non alphanumériques
    if(texte.toLowerCase()=='steven' || texte.toLowerCase()=='valentin') {
        resultat = "Persona Non Grata !!!";     // Valentin et Steven sont persona non grata sur le site
    } else if(texte.toLowerCase()=='jjj') {
        resultat = "Sexy, j'te bz !!!";         // Eh oui hein
    } else if(texte.toLowerCase()=='lounes') {
        resultat = "Va réveiller Samuel !";     // Un grand pouvoir implique de grandes responsabilités
    } else if(texte.toLowerCase()=='romain') {
        resultat = "PAS DE PETITES PERRUCHES";  // Eh bah non cheh
    } else if(texte.toLowerCase()=='gregoire') {
        resultat = "↑ ↑ ↓ ↓ ← → ← → B A Start"; // God Mode On
    } else if(loginFree != "1") {   //
        resultat = "Login déjà pris.";          // Si le login est déjà pris (cf. ci-dessus)
    }else if (insulte.includes(texte.toLowerCase())) {  // On check si le texte entré est présent dans le tableau des gros mots pas biens
        resultat = "Ce dialecte est inadmissible ducon !!! Parle mieux bordel de chiotte !!!";      // Pas de gros mots
    } else {
        resultat = "CBON";  // Sinon, C BON

    };

    return (resultat);
}

$(function(){

    var input = $('#input_login'); // On fout le bazaar dans une variable

    $('#input_login').on('keyup', function(){

        var validation = validerLogin(input); // On appelle la fonction validation en lui passant le champ

        if(validation == "CBON"){       // Si C BON
            $('#input_login').removeClass("pas-bon");       // On enlève la classe qui met le texte en rouge
            input.tooltip('hide');                          // On cache le tooltip
        } else {                        // Sinon, C PA BON donc
            input.attr("data-original-title", validation);  // On change le texte du tooltip bootstrap
            input.tooltip('show');                          // On affiche le tooltip bootstrap
            $('#input_login').addClass("pas-bon");          // On lui ajoute la classe qui met le texte en rouge
        }
    });


    // Tooltips Initialization (on doit le faire pour les tooltips bootstrap)
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({ trigger : 'manual'})
    })
    
    // Fonction pour la validation du formulaire
    $("#idForm").submit(function(e) {
        
        e.preventDefault(); // avoid to execute the actual submit of the form.
        
        var form = $(this);
        //var url = form.attr('action'); // Si on voulait utiiliser l'action mise dans le html
        
        $.ajax({        // On check en ajax en appelant check_submit.php, en lui passant les champs en POST
            type: "POST",
            url: "check_submit.php",
            data: form.serialize(), // sérialises les éléments du formulaire
            success: function(data)
            {
                $('#connectModal #connectModalContent').html(data);     // On change le contenu de la modale avec le résultat renvoyé
                $('#connectModal').modal('show');                       // On affiche la modale
            }
        });
        $('#idForm')[0].reset();
        
    });

});