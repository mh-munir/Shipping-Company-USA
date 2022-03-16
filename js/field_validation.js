var selection_start = 0;
var selection_end = 0;

function show_error_field_message(jqObject, message, tiemout=3000){
    jqObject.children('p').text(message);
    jqObject.removeClass('d-none');
    setTimeout(function(){
        jqObject.addClass('d-none');
    }, tiemout);
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function prevent_invalid_zip_code(field_selector){
    $(field_selector).on('keydown', function(event){
        ths = $(this);
        prev_value = ths.val();
        length_of_this_field = prev_value.length;
        selection_start = $(this)[0].selectionStart;
        selection_end = $(this)[0].selectionEnd;
        last_char = prev_value.slice(selection_start-1, selection_start) || "";
        event.stopPropagation();
        
    });
    $(field_selector).on('input', function(event){
        current_value = $(this).val();
        new_chars = get_new_char(prev_value, current_value);
        if(!(/^[0-9]+$/.test(new_chars))){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'numeric characters only'
            );
        }else if(current_value.length > 5){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                '5 digits only'
            );
        }
        return false;
    });

}

function prevent_invalid_phone(field_selector){
    $(field_selector).on('keydown', function(event){
        ths = $(this);
        prev_value = ths.val();
        length_of_this_field = prev_value.length;
        selection_start = $(this)[0].selectionStart;
        selection_end = $(this)[0].selectionEnd;
        last_char = prev_value.slice(selection_start-1, selection_start) || "";
        event.stopPropagation();
        
    });
    $(field_selector).on('input', function(event){
        current_value = $(this).val();
        new_chars = get_new_char(prev_value, current_value);
        if(!(/^[0-9]+$/.test(new_chars))){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'numeric characters only'
            );
        }else if(current_value.length > 10){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                '10 digits only'
            );
        }
        return false;
    });
}


function prevent_invalid_street_address(field_selector){
    
    $(field_selector).on('keydown', function(event){
        ths = $(this);
        prev_value = $(this).val();
        while(true){
            $(this).val($(this).val().replace('  ', ' ').replace('--', '-').replace('//', '/'));
            if(prev_value == $(this).val()){
                break;
            }
            prev_value = $(this).val();
        }
        length_of_this_field = prev_value.length;
        selection_start = $(this)[0].selectionStart;
        selection_end = $(this)[0].selectionEnd;
        last_char = prev_value.slice(selection_start-1, selection_start) || "";
        event.stopPropagation();
        
    });

    $(field_selector).on('input', function(event){
        current_value = $(this).val();
        new_chars = get_new_char(prev_value, current_value);
        if(new_chars == false){
            return false;
        }
        if(!(/^[a-zA-Z0-9 \/]+$/.test(new_chars))){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'Letter and numeric characters only'
            );
        }else if((' /'.indexOf(last_char) != -1) && (last_char == new_chars)){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'Consecutive spaces and slashes not allowed'
            );
        }
        return false;
    });

}

function prevent_invalid_city(field_selector){

    $(field_selector).on('keydown', function(event){
        prev_value = $(this).val().replace('  ', ' ');
        event.stopPropagation();
    });

    $(field_selector).on('input', function(event){
        current_value = $(this).val();
        while(true){
            $(this).val($(this).val().replace('  ', ' '));
            if(current_value == $(this).val()){
                break;
            }
            current_value = $(this).val();
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'Consecutive spaces not allowed'
            );
        }
        if(!(/^[a-zA-Z ]+$/.test(current_value)) && current_value.length > 0){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'Letter characters only'
            );
        }
        event.stopPropagation();
        return false;
    });
    return false;
}

function prevent_invalid_last_name(field_selector){
    prev_last_name_value = ''
    current_last_name_value = ''
    $(field_selector).on('keydown', function(){
        ths = $(this);
        prev_last_name_value = $(this).val().replace('  ', ' ').replace('--', '-');
        length_of_this_field = prev_last_name_value.length;
        selection_start = $(this)[0].selectionStart;
        selection_end = $(this)[0].selectionEnd;
        
    });
    $(field_selector).on('input', function(event){
        current_last_name_value = $(this).val();
        while(true){
            $(this).val($(this).val().replace('  ', ' ').replace('--', '-'));
            if(current_last_name_value == $(this).val()){
                break;
            }
            current_last_name_value = $(this).val();
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'consecutive spaces and hypens are not allowed'
            );
        }
        new_chars = get_new_char(prev_last_name_value, current_last_name_value);
        if(!(/^[a-zA-Z -]+$/.test(new_chars))){
            $(this).val(prev_last_name_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'only letters, spaces and hypens are allowed'
            );
        }
    });
    
}

function prevent_invalid_first_or_middle_name(field_selector){
    prev_first_or_last_name_value = ''
    current_first_or_last_name_value = ''
    $(field_selector).on('keydown', function(){
        ths = $(this);
        prev_first_or_last_name_value = $(this).val();
        length_of_this_field = prev_first_or_last_name_value.length;
        selection_start = $(this)[0].selectionStart;
        selection_end = $(this)[0].selectionEnd;
    });
    
    $(field_selector).on('input', function(event){
        current_first_or_last_name_value = $(this).val();
        if(true){
            new_chars = get_new_char(prev_first_or_last_name_value,current_first_or_last_name_value);

            if(!(/^[a-zA-Z]+$/.test(new_chars))){
                $(this).val(prev_first_or_last_name_value);
                show_error_field_message(
                    $(this).parent().children('.validation-group'),
                    'Letter characters only'
                );
            }

        }
        return false;
    });
    
}

function prevent_invalid_business(field_selector){
    prev_value = ''
    current_value = ''
    last_char = ''
    new_chars = ''
    $(field_selector).on('keydown', function(event){
        ths = $(this);
        prev_value = $(this).val().replace('  ', ' ').replace('&&', '&').replace("''", "'").replace('..', '.').replace('--', '-').replace(',,', ',');
        length_of_this_field = prev_value.length;
        selection_start = $(this)[0].selectionStart;
        selection_end = $(this)[0].selectionEnd;
        event.stopPropagation();
    });
    $(field_selector).on('input', function(event){
        current_value = $(this).val();
        while(true){
            $(this).val($(this).val().replace('  ', ' ').replace('&&', '&').replace("''", "'").replace('..', '.').replace('--', '-').replace(',,', ','));
            if(current_value == $(this).val()){
                break;
            }
            current_value = $(this).val();
            return false;
        }
        new_chars = get_new_char(prev_value, current_value);
        if(!(/^[a-zA-Z0-9 ]+$/.test(new_chars)) && ("-,.&'".indexOf(new_chars)== -1)){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                new_chars+" is not allowed. Valid characters are (-,.&')"
            );
        }
        return false;
    });
    return false;
}

function prevent_invalid_apt(field_selector){
    
    $(field_selector).on('keydown', function(event){
        ths = $(this);
        prev_value = $(this).val();
        length_of_this_field = prev_value.length;
        selection_start = $(this)[0].selectionStart;
        selection_end = $(this)[0].selectionEnd;
        event.stopPropagation();
        
    });

    $(field_selector).on('input', function(event){
        current_value = $(this).val();
        new_chars = get_new_char(prev_value, current_value);
        if(!(/^[a-zA-Z0-9]+$/.test(new_chars))){
            $(this).val(prev_value);
            show_error_field_message(
                $(this).parent().children('.validation-group'),
                'Letters and numeric characters only'
            );
        }
        return false;
    });

}



function set_current_cursor_position(field_selector){
    $(field_selector).on("click", function(event){
        selection_start = $(field_selector)[0].selectionStart;
        selection_end = $(field_selector)[0].selectionEnd;
        old_val = $(field_selector).val();
    });    
}

function get_new_char(old_val, new_val){
    
    if(new_val.length == old_val.length+1){
        new_char = new_val.slice(selection_start, selection_start+1);
    }else if(old_val.length-(selection_end-selection_start) < new_val.length){
        old_val_after_selection = old_val.slice(selection_end);
        new_char = new_val.replace(old_val_after_selection, "").slice(selection_start);
    }else{
        new_char = false;
    }
    // console.log(new_char);
    return new_char;
}

$(function(){
    
    $('.validation-group').addClass('d-none');
    $('.validation-group p').text(' ');
    prevent_invalid_street_address('.old_street_address');
    prevent_invalid_street_address('.new_street_address');
    prevent_invalid_zip_code('.old_zip_code');
    prevent_invalid_zip_code('.new_zip_code');
    prevent_invalid_city('.old_city');
    prevent_invalid_city('.new_city');
    prevent_invalid_phone('.phone-input');
    prevent_invalid_first_or_middle_name('.fname, .middle-name-input');
    prevent_invalid_last_name('.last-name-input');
    prevent_invalid_business('.business-name-input');
    prevent_invalid_apt(".apt-number");
    set_current_cursor_position('.old_street_address');

});