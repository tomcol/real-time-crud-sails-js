$(document).ready(function(){
	$('.numeric').keypress(function(event) {
		var controlKeys = [8, 9, 13, 35, 36, 37, 39, 46, 48];
		var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
		if (!event.which || (49 <= event.which && event.which <= 57) || isControlKey) {
			return;
		} else {
			event.preventDefault();
		    thisID = $(this).attr('id');
			fieldText = $('label[for="'+thisID+'"]').text().replace('*','');
		    if ($('p#'+thisID+'_error').length) {
		    	$('p#'+thisID+'_error').text(fieldText+' must be a number');
		    } else {
			    $(this).after('<p id="'+thisID+'_error" class="error">'+fieldText+' must be a number</p>');
			}
		}
	});
	
	$('.email').live('blur',function() {
		thisVal = $(this).val();
		thisID = $(this).attr('id');
		if (thisVal) {
			validEmail = validateEmail(thisVal)
			if (!validEmail) {
			    if ($('p#'+thisID+'_error').length) {
			    	$('p#'+thisID+'_error').slideDown().text('Please enter a valid email address');
			    } else {
				    $('#'+thisID).after('<p id="'+thisID+'_error" class="error">Please enter a valid email address</p>');
				}
			} else {
				$('label[for="'+thisID+'"]').removeClass('error');
				$(this).removeClass('error');
				$('p#'+thisID+'_error.error').slideUp(300);			
			}
		}
	});

    $('form').submit(function(e) {
    	formid = $(this).attr('id');
        errorcount = validate_form(formid);
        if (errorcount === 0) {
	        return true;
        } else if (errorcount === 1) {
            return false;
        } else if (errorcount > 1) {
            return false;
        } 
        return false;
    });
    
    $('input.error, select.error, textarea.error').live('blur', function () {
        if (!$(this).val()) {
            return;
        } else {
            this_id = $(this).attr('id');
            $('label[for="' + this_id + '"]').removeClass('error');
            $(this).removeClass('error');
            $('p#' + this_id + '_error.error').fadeOut(300);
        }
    });	
    
   	//Select filter rebuild
	$('select.filtered').each(function() {
		//for each .filtered select, add an input and a filterable list as a surrogate
		selectID = $(this).attr('id');
		$(this).wrap('<div class="selectfilter" id="filtercontainer_'+selectID+'" />');
		$(this).before('<input type="text" class="filterinput" id="filterinput_'+selectID+'" data-selectid="'+selectID+'" placeholder="Search List" />');
		$(this).after('<ul class="filterlist options" id="filterlist_'+selectID+'" />');
		$(this).children('option').each(function() {
			optionText = $(this).text();
			optionVal = $(this).val();
			optionLI = '<li id="option_'+optionVal+'" data-selectid="'+selectID+'" data-optionval="'+optionVal+'"><a href="#option_'+optionVal+'" data-selectid="'+selectID+'" data-optionval="'+optionVal+'">'+optionText+'</a></li>';
			$('#filtercontainer_'+selectID+' ul.options').append(optionLI);
		});
	});	
});

//Select Filter Listeners
$(document).on('focus', 'select.filtered', function() {
	//when a .filtered select is focused, hide it and show our surrogate	
	//if the scree is small, scroll to the top of the input 
	//so the drop down is more likely to fit on screen
	if ($(window).height() < 770) {
	    $('html, body').animate({
	        scrollTop: $(this).offset().top-40
	    }, 350);
	}
	selectID = $(this).attr('id');
	$('#filtercontainer_'+selectID).addClass('active');
	$('#filtercontainer_'+selectID+' #filterinput_'+selectID).focus();
	console.log('focus', selectID);
});

$(document).on('blur', '.filterinput', function(e) {
	//when the input is blurred, hide our surrogates and show the original select
	selectID = $(this).data('selectid');
	$('#filtercontainer_'+selectID).removeClass('active');	
});

$(document).on('keyup', '.filterinput', function() {
	//when typing in our surrogate input, filter the surrogate list
	selectID = $(this).data('selectid');
	if (!$(this).val() ||  ($(this).val().match(/^\s*$/)))  {
	 	$('#filterlist_'+selectID).children('li').show();
	} else {
	 	$('#filterlist_'+selectID).children('li').hide();
		$('#filterlist_'+selectID).children('li:containsIgnoreCase("'+$(this).val()+'")').show();
		resultcount = $('#filterlist_'+selectID).children('li:containsIgnoreCase("'+$(this).val()+'")').length;
		if (!resultcount) {
			$('#filterlist_'+selectID).append('<li id="noresults">No Results</li>');
		} else {
			$('#filterlist_'+selectID+' li#noresults').remove();
		}
	}
});

$(document).on('keydown', '.filterinput', function(e) {
	//prevent submission of form on enter in filterable selects surrogate inputs
    if(e.keyCode == 13) {
		e.preventDefault();
		return false;
    }
});

$(document).on('mousedown', '.filterlist li', function() {
	//when you choose something from the surrogate list, mark the appropriate
	//option from the real select as selected and switch back to it
	selectID = $(this).data('selectid');
	selectedOption = $(this).data('optionval');
	$('#'+selectID).children('option[value="'+selectedOption+'"]').attr('selected','selected').change();//.show();
	$('#filtercontainer_'+selectID).removeClass('active');	
});

function validate_form(formid) {
	var errorcount = 0;
	$('p.error').remove();
	$('.error').removeClass('error');
	$('form#'+formid+' label:contains("*"):visible').each(function () {
		thisLabelFor = $(this).attr('for');
		errorMessage = '<p id="'+thisLabelFor+'_error" class="error">' +$(this).text().replace('*', '')+' is required</p>';
		
		if ($('#'+thisLabelFor).is('.email')) {
			thisVal = $('#'+thisLabelFor).val();
			if (thisVal) {
				validEmail = validateEmail(thisVal)
				if (!validEmail) {
				    if ($('p#'+thisLabelFor+'_error').length) {
				    	$('p#'+thisLabelFor+'_error').text('Please enter a valid email address');
				    } else {
					    $('#'+thisLabelFor).after('<p id="'+thisLabelFor+'_error" class="error">Please enter a valid email address</p>');
					}
					errorcount++;
				}
			}
		}
		
		if ($('#'+thisLabelFor).is('input[type="text"]') || $('#'+thisLabelFor).is('textarea') || $('#'+thisLabelFor).is('select')){
			thisVal = $('#'+thisLabelFor).val();
			if (!thisVal.length) {
				$(this).addClass('error');
				$('#'+thisLabelFor).addClass('error');
				$('#'+thisLabelFor).after(errorMessage);
				errorcount++;
			}
		}
		
		if ($('#'+thisLabelFor).is('input[type="checkbox"]')){
			thisChecked = $('#'+thisLabelFor).is(':checked');
			if (!thisChecked) {
				$('label[for='+thisLabelFor+']').addClass('error');
				$(this).addClass('error');
				$('#'+thisLabelFor).addClass('error');
				errorcount++;
			}
		}
		
		if ($('#'+thisLabelFor).is('fieldset')){			
			if ($('#'+thisLabelFor+' input[type="radio"][name="'+thisLabelFor+'"]').length > 0) {
				if ($('#'+thisLabelFor+' input[type="radio"][name="'+thisLabelFor+'"]:checked').length === 0) {
					$('label[for='+thisLabelFor+']').addClass('error');
					$('fieldset#'+thisLabelFor).addClass('error');
					$('fieldset#'+thisLabelFor).after(errorMessage);
					errorcount++;				
				} 
			}
			
			if ($('#'+thisLabelFor+' select').length > 0) {
				selectError = 0;
				$('#'+thisLabelFor+' select').each(function() {
					if (!$(this).val().length) {
						selectError++
						return selectError;
					}
				});
				if (selectError) {
					$('label[for='+thisLabelFor+']').addClass('error');
					$('fieldset#'+thisLabelFor).addClass('error');
					$('fieldset#'+thisLabelFor).after(errorMessage);
					errorcount++;
				}
			}	
			if ($('#'+thisLabelFor+' input[type="text"]').length > 0) {
				textError = 0;
				$('#'+thisLabelFor+' input[type="text"]').each(function() {
					if (!$(this).val().length) {
						textError++
						return textError;
					}
				});
				if (textError) {
					$('label[for='+thisLabelFor+']').addClass('error');
					$('fieldset#'+thisLabelFor).addClass('error');
					$('fieldset#'+thisLabelFor+' input[type="text"]').addClass('error');
					$('fieldset#'+thisLabelFor).after(errorMessage);
					errorcount++;
				}
				
				
			
			}
		}
	});
	return errorcount;
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

////Select Filtering
function hideSelectFilterList(listID) {
	$('#'+listID).removeClass('active');
	$('#'+listID+' ul.options').hide();
}
$.expr[':'].containsIgnoreCase = function (n, i, m) {
    return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};