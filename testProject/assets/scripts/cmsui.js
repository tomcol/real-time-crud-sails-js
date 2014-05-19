// nested tree jquery stuff (this is where the magic happens)
$(document).ready(function(){
	// initialise the tree on the ul class=collapse
	// this can be put on anything really, and can be called whatever
	//add one for each list
	$('ul.collapse').quickTree();
	
	// showall/hideall buttons
	$('a.showall').click(function() {
		$('ul ul').show();
		$('.expand').addClass('contract');
	});
	
	$('a.hideall').click(function() {
		$('ul ul').hide();
		$('.expand').removeClass('contract');
	});
	
	// hide and show the contentleft navigation
	$('#contentleft-hider a').toggle(function(){
			$('#contentleft').hide('slow');	
			$('#contentleft-hider a img').attr("src","images/rarr.png");
			$('#contentleft-hider a').attr("title","Show Navigation");
			setTimeout(function() { $('#contentright').animate({width:"99%"}, 'fast'); }, 500);
		},function() {
			$('#contentleft').show('slow');	
			$('#contentleft-hider a img').attr("src","images/larr.png");
			$('#contentleft-hider a').attr("title","Hide Navigation");
			$('#contentright').animate({width:"79.3%"}, 'fast'); 
		}
	);
	
	//ie specific workarounds (pseudo-selector class names)
	if ($.browser.msie) {
		$('input[type="submit"]').addClass('submit');
		$('input[type="text"]').addClass('text');
		$('input[type="hidden"]').addClass('hidden');
		$(':last-child').addClass('last-child');
		$(':first-child').addClass('first-child');
   	}

	
	// Filter tables //
	
	//convert table to be filterable
	$("table tr:has(td)").each(function(){
		var t = $(this).text().toLowerCase(); //all row text
		$("<td class='indexColumn'></td>")
		.hide().text(t).appendTo(this);
	});//each tr
	
	//whilst typing
	$("#FilterTextBox").keyup(function(){
		var s = $(this).val().toLowerCase().split(" ");
		//show all rows.
		$("table tr:hidden").show();
		$.each(s, function(){
			$("table tr:visible .indexColumn:not(:contains('"+ this + "'))").parent().hide();
		});//each
	});//key up.

	// clear filter
	$("a#clearfilter").click(function() {
		$("#FilterTextBox").val(" ");	
		$("table tr:hidden").show();
		return false;
	});
	
	// sort table columns
        $("table.clientsidesort").tablesorter(); 
		setTimeout(function() { $('.ok').hide('slow'); }, 5000);
	// so it knows what page it's on (based on URL and href contents of the link - likely to fail)
	// get the current page
	//thisPage = location.href.substring((location.href.lastIndexOf("/"))+1); 
	//$('li a[href="'+thisPage+'"]').each(function() {
		// go to the parent of the list item that has a link to the current page we're on
		// and display it, make it bold, make it colourful, and change the + to a -
	//	$(this).parents('ul').css('display','block');
		//$(this).('font-weight','bold');
		//$(this).css('color','#ea6e23');
	//	$(this).addClass('current');
	//	$(this).siblings('.expand').addClass('contract');
	//});
	
	// Add Attendee to Table
	
	$('#selectTable select').live('change', function() {
		var param = $(this).val();
		var idEvent=$('#idEvent').val();
        if (param) {
        	window.location = 'adminManageTables.do?idEvent='+idEvent+'&idTable='+param; 
        }
        return false;
	});
	
	/* $('#selectTable select').live('change', function() {
		var newTable = $('#selectTable select').val();
		$('.unseated ul li a').each().attr('href', 'saveOrUpdateAdminEventTables.do?idEvent=4&idContact=5&idTable='+newTable+'&action=addAttendeeToTable');
		console.log(newTable);
	}); */
	
	// Date Picker
	if ($('.date_picker')) {
		$('.date_picker').datepicker({
			dateFormat: "mm/dd/y"
		});
	}
	
	if ($('.date').length) {$('.date').datePicker()}
		
});