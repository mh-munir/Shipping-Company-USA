function get_value_from_text_input(field_selector){
    return $(field_selector).val();
}
function get_value_from_radio_button(field_selector){
    return $(field_selector+':checked').val();
}
function get_value_from_select_dropdown(field_selector){
    return $(field_selector+':selected').val();
}

function get_value(field_selector){
    type_of_field = $(field_selector).attr('type');
    if(type_of_field === undefined){
        return get_value_from_text_input(field_selector);
    }else if (type_of_field == 'radio' || type_of_field == 'checkbox'){
        return get_value_from_radio_button(field_selector);
    }else if(type_of_field == 'text' || type_of_field == 'email'){
        return get_value_from_text_input(field_selector);
    }else{
        return get_value_from_text_input(field_selector);
    }
}
function grab_form_data(form_selector_array){
    custom_array = {}
    for(var key in form_selector_array){
        user_input_value = get_value("."+key);
        custom_array[key] = user_input_value == undefined? "":user_input_value;
    }
    return custom_array;
}
field_info = {
    "move-type-input":'req|data|Permanent|Temporary|Type of move must be select',
    "start-forwarding-date-input":'req|data|any|Start forwarding date can\'t be empty',
    "end-forwarding-date-input":'dep|move-type-input|Temporary|End forwarding date can\'t be empty for temporary move',
    "movewith-input":'req|data|Individual|Family|Business|Who is moving? only you or family or your business?',
    "business-name-input":'dep|movewith-input|Business|For moving a business, business name can\' be empty',
    "title-input":'req|data|Mr.|Ms.|Mrs.|Title can\'t be empty',
    "first-name-input":'req|data|any|First name can\'t be empty',
    "middle-name-input":'',
    "last-name-input":'req|data|any|Last name can\'t be empty',
    "email-input":'req|data|any|Email can\'t be empty',
    "confirm-email":'req|match|email-input|Email and confirm email doesn\'t match',
    "mobile-type":'req|data|any|Mobile or home phone can\'t be empty',
    "phone-input":'req|len|10|Mobile or home phone can\'t be greater or less than 10 digits',
    "old_zip_code":'req|len|5|Invalid zip code',
    "old_city":'req|data|any|Old city can\'t be empty',
    "old_state":'req|len|2|Invalid state',
    "old_street_address":'req|data|any|Old street address can\'t be empty',
    "new_zip_code":'req|len|5|Invalid zip code',
    "new_city":'req|data|any|New city can\'t be empty',
    "new_state":'req|len|2|Invalid state',
    "new_street_address":'req|data|any|New street address can\'t be empty',
    "residence-type":'req|data|any|Type of residence can\'t be empty',
    "i-agree":'req|data|agree|You must agree with our terms and condition and the privacy policy',
}
var values_from_form = [];
function validate_form_now(){
    values_from_form = grab_form_data(field_info);
    for(var key in field_info){

        condition = field_info[key].split('|');
        // console.log(condition)
        if(condition[0] == 'req'){
            if(condition[1] == 'data'){
                if(condition.length == 4){
                    if(condition[2] == 'any'){
                        if(values_from_form[key].length <= 1){
                            // Can't be empty
                            $('html,body').animate({
                                scrollTop: $("."+key).offset().top
                            }, 500);
                            show_error_field_message(
                                $('.'+key).parent().children('.validation-group'),
                                condition[condition.length-1],
                                5000
                            );
                            return false
                        }
                    }else{
                        if(values_from_form[key] != condition[2]){
                            // must match the value
                            $('html,body').animate({
                                scrollTop: $("."+key).offset().top
                            }, 500);
                            if(values_from_form[key] != 'agree'){
                                show_error_field_message(
                                    $('.'+key).parent().parent().children('.validation-group'),
                                    condition[condition.length-1],
                                    5000
                                );
                                return false;
                            }
                            show_error_field_message(
                                $('.'+key).parent().children('.validation-group'),
                                condition[condition.length-1],
                                5000
                            );
                            return false;
                        }
                    }
                }else if(condition.length>4){
                    found = false;
                    for(i=2;i<=condition.length-2;i++){
                        if(condition[i] == values_from_form[key]){
                            found = true;
                            break;
                        }
                    }
                    if(found == false){
                        //Invalid data
                        $('html,body').animate({
                            scrollTop: $("."+key).offset().top
                        }, 500);
                        show_error_field_message(
                            $('.'+key).parent().children('.validation-group'),
                            condition[condition.length-1],
                            5000
                        );
                        return false;
                    }
                }
            }else if(condition[1] == 'len'){
                if(values_from_form[key].length != parseInt(condition[2])){
                    //can't be less or greater than length
                    $('html,body').animate({
                        scrollTop: $("."+key).offset().top
                    }, 500);
                    // console.log(condition[condition.length-1]);
                    show_error_field_message(
                        $('.'+key).parent().children('.validation-group'),
                        condition[condition.length-1],
                        5000
                    );
                    return false;
                }
            }else if(condition[1] == 'match'){
                if(values_from_form[key].toLowerCase() != values_from_form[condition[2]].toLowerCase()){
                    //Email and Confirm Email doesn't match
                    $('html,body').animate({
                        scrollTop: $("."+condition[2]).offset().top
                    }, 500);
                    show_error_field_message(
                        $('.'+key).parent().children('.validation-group'),
                        condition[condition.length-1],
                        5000
                    );
                    return false;
                }
            }
        }else if(condition[0] == 'dep'){
            if((values_from_form[condition[1]].toLowerCase() == condition[2].toLowerCase())){
                
                if(values_from_form[key].length < 1){
                    $('html,body').animate({
                        scrollTop: $("."+key).offset().top
                    }, 500);
                    show_error_field_message(
                        $('.'+key).parent().children('.validation-group'),
                        condition[condition.length-1],
                        5000
                    );
                    return false;
                }
                
                // return false;
            }
        }
    }
    return true;
}
var old_street_confusing_situtaion = true;
var new_street_confusing_situtaion = true;
function confsion_resolver(street_array, target){
    street_from_array = street_array.join(" ").toUpperCase();
    split_class = target.split("_");
    $(".confusing-text").text("The primary street number and "+
    street_array[street_array.length-2]+ 
    " number entered with your "+split_class[0]+" address is the same.");
    $(".user_question_text").text("In order to prevent any errors, please double check your "+split_class[0]+" address and select the correct address below:");
    $(".primary-no-text").text(street_array[0]);
    $(".apt-no-text").text(street_array[street_array.length-2].toUpperCase()+" "+street_array[street_array.length-1].toUpperCase());
    $(".confused-radio-with-apt input").val(street_from_array.trim().toUpperCase());
    $(".confused-radio-with-apt label").text(street_from_array.trim().toUpperCase());
    street_array.splice(street_array.length-2,2);
    $('.confused-radio-without-apt input').val(street_array.join(" ").toUpperCase());
    $('.confused-radio-without-apt label').text(street_array.join(" ").toUpperCase());
    street_array.splice(0,1);
    
    $(".street-line-text").text(street_array.join(" ").toUpperCase());
    $(".confused_btn").attr("push-to", target);
}
$(function(){
    // removing confusion
    $(".confused_btn").click(function () { 
        targettedClass = $(this).attr("push-to");
        user_selected_value = $(".confused-street-input:checked").val();
        $("."+targettedClass).val(user_selected_value);
        if(targettedClass.indexOf("new") != -1){
            new_street_confusing_situtaion = false;
        }else if(targettedClass.indexOf("new") != -1){
            new_street_confusing_situtaion = false;
        }
     });
    $('.btn-submit').click(function(event){
        $('.email,confirm-email').attr('type', 'email');
        event.preventDefault();
        validation_status = validate_form_now();
        if(validation_status === true){
            old_addr = values_from_form['old_street_address'].trim() + " "+values_from_form['old_city'].trim()+ " "+values_from_form['old_state'].trim()+ " "+values_from_form['old_zip_code'].trim();
            new_addr = values_from_form['new_street_address'].trim() + " "+values_from_form['new_city'].trim()+ " "+values_from_form['new_state'].trim()+ " "+values_from_form['new_zip_code'].trim();
            if(old_addr.toUpperCase() == new_addr.toUpperCase()){
                $('html,body').animate({
                    scrollTop: $(".new_street_address").offset().top
                }, 500);
                show_error_field_message(
                    $('.new_street_address').parent().children('.validation-group'),
                    "Old address and new address can not be the same.",
                    5000
                );
                validation_status = false;
                return false;
            }
            available_apt = [
                "apt", "bldg",
                "fl", "ste",
                "unit", "rm",
                "dept", "apartment",
                "building", "floor",
                "suite", "unit",
                "room", "depertment",
                "box", "spc", "space",
                "lot", "trlr", "trailer",
                "basement", "bsmt", "hanger",
                "hngr", "lobby", "lbby",
                "front", "frnt",
                "stop"
            ];
            old_street_in_an_array = values_from_form['old_street_address'].trim().toLowerCase().split(" ");
            new_street_in_an_array = values_from_form['new_street_address'].trim().toLowerCase().split(" ");
            if(old_street_in_an_array[0] == old_street_in_an_array[old_street_in_an_array.length-1]){
                if(available_apt.indexOf(old_street_in_an_array[old_street_in_an_array.length-2]) != -1){
                    if(old_street_confusing_situtaion == true){
                        // Triggering Confusing Validation for old address
                        confsion_resolver(old_street_in_an_array, "old_street_address");
                        $("#confusedmodal").modal({
                            show:true
                        });
                        validation_status = false;
                        return false;
                    }
                    
                }
            }else if(new_street_in_an_array[0] == new_street_in_an_array[new_street_in_an_array.length-1]){
                if(available_apt.indexOf(new_street_in_an_array[new_street_in_an_array.length-2]) != -1){
                    if(new_street_confusing_situtaion == true){
                        // Triggering Confusing Validation for new address
                        confsion_resolver(new_street_in_an_array, "new_street_address");
                        $("#confusedmodal").modal({
                            show:true
                        });
                        validation_status = false;
                        return false;
                    }
                    
                }
            }
            

            // On submission validation by address api
            if((old_validated_street_address != values_from_form['old_street_address']) || old_double_checked_confirmation == false){
                trigger_old_address_validator();
                return false;
            }else if((new_validated_street_address != values_from_form['new_street_address']) || new_double_checked_confirmation == false){
                trigger_new_address_validator();
                return false;
            }
            $(".user-info").submit();
            show_loader_image("Processing...");
            
            
        }
    });
});
