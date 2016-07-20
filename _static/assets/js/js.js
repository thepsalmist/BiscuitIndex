// 	@martianskills up in this script. buda boss.
//
// 	I could make it more modular, object oriented,
// 	but I've been at it for 8 hours and I don't think
// 	I'm pretty sure I'm over the budget anyways.
//
// 	Life ni hard; hivo ndo kunaendanga.

jQuery(function($) {
	$(document).ready(function() {

		// fetch + cache

		var html			= $('html'),
			$body			= $('body'),
			bHeight 		= $body.innerHeight(),
			wWidth 			= $(window).innerWidth(),
			wHeight 		= $(window).innerHeight(),
			urlCat 			= '' + getUrlParameter('cat'),
			urlExp 			= parseInt(getUrlParameter('exp')),
			urlCounty 		= '' + getUrlParameter('county');
			urlSoda 		= '' + getUrlParameter('sd');
			urlCoffee 		= '' + getUrlParameter('cf');
			urlCupcake 		= '' + getUrlParameter('cc');

		function baseFx() {

			// load data 

			$('#expenditure').val(urlExp).focus();
			$('#category').val(urlCat);
			$('#county').val(urlCounty);
			$('#range-soda').val(urlSoda);
			$('#range-coffee').val(urlCoffee);
			$('#range-cupcake').val(urlCupcake);


			// only show output if essential
			// data is provided
			if (urlExp && urlCat && urlCounty) {
				$('.output').css({'display':'block'});
			}

			// when call-to-action is clicked
			$('#compare').on('click', function(e) {
				e.preventDefault();

				// get values from input fields
				var category 	= $('#category').val(),
					expenditure = $('#expenditure').val(),
					county 		= $('#county').val();

					// someone tried to submit without input
					if ( expenditure == '' || expenditure == 0) {
						$('#expenditure').addClass('highlight').focus();
					} else {
						// simulate reload with set parameters
						location.href = '?cat=' + category 
										+ '&exp=' + expenditure 
										+ '&county=' + county;
					}
			});


			// write base data

			$('#output-budget').html(countyBudgetString);

			var countyName,
				categoryName,
				comparison,
				comparisonString;

			// set human-readable labels
			comparatives = JSON.parse(comparatives.replace(/'/g, '"').replace(/None/g, '"None"'));
			for (k in comparatives) {
			    if (k == urlCat) {
			        categoryName = comparatives[k].name;
			        break;
			    }
			}

			// populate the DOM
			$('#output-category').html(categoryName);
			$('#output-county').html(urlCounty);


			// calculate comparison value

			comparison = countyBudgetInteger / urlExp;
			comparison = Math.round(comparison);
			comparisonString = comparison.toLocaleString();
			
			// print it
			$('#output-comparison').html(comparisonString);


			// approximate number of icons we want

			var iconMax = 80, // default
				iconSodaMax = 40, // specific to soda
				iconCoffeeMax = 35, // specific to coffee
				iconCupcakeMax = 45, // specific to cupcakes
				outputRatio = Math.ceil( (parseInt(comparison) / iconMax) / 100 ) * 100,
				outputIconsNumber = Math.round(comparison / outputRatio),
				outputRatioUnits = '';
			

			// generate infographics
			
			var mainOutputString = '',
				outputComparisonUnits = '',
				outputRatioUnits = '',
				sodaString = '',
				coffeeString = '',
				cupcakeString = '',
				delay = 0.005; 	// animation interval for icons,
								// ndio zisiingie zote tu pap!

			// main output loop
			for (var i = 0; i < outputIconsNumber; i++) {
			    for (k in comparatives) {
			        if (k == urlCat) {
			            mainOutputString += '<i class="'+ k +'" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * outputRatio).toLocaleString() + '"></i> ';
                        outputComparisonUnits = comparatives[k].name;
                        outputRatioUnits = comparatives[k].name;
                        $('#output-ratio').siblings('i').removeAttr('class').addClass(k);
                        break;
			        }
			    }
				delay += 0.005;
			}

			$('#output-ratio').html(outputRatio);
			$('#output-comparison-units').html(outputComparisonUnits);
			$('#output-ratio-units').html(outputRatioUnits);


			// secondary outputs

			var thirdCountyBudgetInteger = Math.round(countyBudgetInteger / 3),
				sodaPrice = 30,
				coffeePrice = 200,
				cupcakePrice = 15,

				sodaCount = Math.round(thirdCountyBudgetInteger / sodaPrice),
				coffeeCount = Math.round(thirdCountyBudgetInteger / coffeePrice),
				cupcakeCount = Math.round(thirdCountyBudgetInteger / cupcakePrice),

				sodaRatio = Math.ceil( (parseInt(sodaCount) / iconSodaMax) / 1000 ) * 1000,
				sodaIconsNumber = Math.round(sodaCount / sodaRatio),

				coffeeRatio = Math.ceil( (parseInt(coffeeCount) / iconCoffeeMax) / 1000 ) * 1000,
				coffeeIconsNumber = Math.round(coffeeCount / coffeeRatio),

				cupcakeRatio = Math.ceil( (parseInt(cupcakeCount) / iconCupcakeMax) / 1000 ) * 1000,
				cupcakeIconsNumber = Math.round(cupcakeCount / cupcakeRatio);

				$('#output-soda-ratio').html(sodaRatio.toLocaleString());
				$('#output-coffee-ratio').html(coffeeRatio.toLocaleString());
				$('#output-cupcake-ratio').html(cupcakeRatio.toLocaleString());

				$('#batch-count--soda').html(Math.round(sodaCount / 30).toLocaleString()); // 30 sodas in a crate
				$('#batch-count--coffee').html('<em>+</em>' + Math.round(coffeeCount * 0.2).toLocaleString()); // 5 cups per litre
				$('#batch-count--cupcake').html('<em>+</em>' + Math.round(cupcakeCount / 6).toLocaleString()); // 6 cupcakes in a packet


			delay = 0;

			// soda loop
			for (var i = 0; i < sodaIconsNumber; i++) {
				sodaString += '<i class="soda" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * sodaRatio).toLocaleString() + '"></i> ';
				delay += 0.005;
			}

			delay = 0;

			// coffee loop
			for (var i = 0; i < coffeeIconsNumber; i++) {
				coffeeString += '<i class="coffee" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * coffeeRatio).toLocaleString() + '"></i> ';
				delay += 0.005;
			}

			delay = 0;

			// cupcake loop
			for (var i = 0; i < cupcakeIconsNumber; i++) {
				cupcakeString += '<i class="cupcake" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * cupcakeRatio).toLocaleString() + '"></i> ';
				delay += 0.005;
			}

			// insert into DOM
			$('.output-icons').html(mainOutputString);
			$('.soda-icons').html(sodaString);
			$('.coffee-icons').html(coffeeString);
			$('.cupcake-icons').html(cupcakeString);

			gridSet('.dynamic-chart', '.icon-container');


			// when sliders are moved

			$('input[type="range"]').on('change', function(e) {

				var soda = parseInt($('#range-soda').val()),
					coffee = parseInt($('#range-coffee').val()), 
					cupcake = parseInt($('#range-cupcake').val());

				var total = soda + coffee + cupcake;

				// number of items equals -> countyBudgetInteger multiplied by the ratio of item to the rest,
				// (according to current set state of sliders), then divided by the cost of a single item
				
				sodaCount = Math.round((countyBudgetInteger * ( soda / total)) / sodaPrice);
				coffeeCount = Math.round((countyBudgetInteger * ( coffee / total)) / coffeePrice);
				cupcakeCount = Math.round((countyBudgetInteger * ( cupcake / total)) / cupcakePrice);

				// get number of icons to display according to initially computed ratios
				sodaIconsNumber = Math.round(sodaCount / sodaRatio);
				coffeeIconsNumber = Math.round(coffeeCount / coffeeRatio);
				cupcakeIconsNumber = Math.round(cupcakeCount / cupcakeRatio);

				// reset (otherwise icons would increment ad infinitum)
				sodaString = coffeeString = cupcakeString = '';

				// soda loop, generate markup
				for (var i = 0; i < sodaIconsNumber; i++) {
					sodaString += '<i class="soda" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * sodaRatio).toLocaleString() + '"></i> ';
					delay += 0.005;
				}

				// coffee loop
				for (var i = 0; i < coffeeIconsNumber; i++) {
					coffeeString += '<i class="coffee" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * coffeeRatio).toLocaleString() + '"></i> ';
					delay += 0.005;
				}

				// cupcake loop
				for (var i = 0; i < cupcakeIconsNumber; i++) {
					cupcakeString += '<i class="cupcake" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * cupcakeRatio).toLocaleString() + '"></i> ';
					delay += 0.005;
				}

				// inject that shtuff, man!
				$('.soda-icons').html(sodaString);
				$('.coffee-icons').html(coffeeString);
				$('.cupcake-icons').html(cupcakeString);

				// pima pima, basic stuff
				$('#batch-count--soda').html(sodaCount.toLocaleString()); // 30 sodas in a crate
				$('#batch-count--coffee').html('<em>+</em>' + coffeeCount.toLocaleString()); // 5 cups per litre
				$('#batch-count--cupcake').html('<em>+</em>' + cupcakeCount.toLocaleString()); // 6 cupcakes in a packet

				// update URI without reload
				if (history.pushState) {

				var category 	= $("#category").val(),
					expenditure = $("#expenditure").val(),
					county 		= $("#county").val();
				
				var	newUrl = window.location.origin + window.location.pathname 
								+ '?cat=' + category 
								+ '&exp=' + expenditure 
								+ '&county=' + county
								+ '&sd=' + soda
								+ '&cf=' + coffee
								+ '&cc=' + cupcake;
					window.history.pushState({path:newUrl},'',newUrl);
				}

			});


			$(window).load(function() {

				// remove preload class
				$body.removeClass('preload');

			}); // load

			// sticky sidebar
			var $sideBar = $body.find('.side-col'),
				sideBarPos = $sideBar.offset().top,
				scrollPos, diff;


			$(window).scroll(function() {
				scrollPos = $body.scrollTop();

				diff = (scrollPos - (sideBarPos - 88))

				if ((diff > 0) && (wWidth > 800) && (diff < bHeight / 2)) {
					$sideBar.css({'margin-top':diff});
				} else if (diff < 0) {
					$sideBar.removeAttr('style');
				}

			});

		}



		/* On Doc Ready --------------------------------------*/

		// run base functions 
		baseFx();

		// run page functions
		// if ($body.hasClass('home')) { homeFx(); }



		/* On Window Resize ----------------------------------*/

		$(window).resize(function() {

			wWidth = $(window).innerWidth();
			wHeight = $(window).innerHeight();

		});


		/* Abstracted Functions ------------------------------*/

		// activate email links

		function activateEmail (selector) {
			$(selector).html( function() {
				var adr = $(this).data('address');
				var dom = $(this).data('domain');
				var ext = $(this).data('ext');
				return adr + '@' + dom + ext;
			}).attr('href', function() {
				return 'mailto:' + $(this).html();
			}).attr('target', '_blank');
		}

		// get param from url

		function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		};

		// format thousands

		function commaSeparateNumber (val) {
			while (/(\d+)(\d{3})/.test(val.toString())) {
				val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
			}
			return val;
		}

		// equalize columns

		function gridSet( wall, bricks ) {
			var maxHeight = -1,
				$bricks = $(wall).find(bricks);

			$bricks.each( function() {
				$(this).css({ 'height': 'auto' });
				maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
			});

			$bricks.each( function() {
				$(this).height(maxHeight);
			});
		}

        //If an immutable comparison is chosen, do not show the dynamic chart and controls
        $('#category').val()
        if ($('option:selected', $('#category')).attr('data-type') == 'false') {
            $('.dynamic-chart').css('display', 'none')
            $('.controls').css('display', 'none')
        } else {
            $('.dynamic-chart').css('display', 'block')
            $('.controls').css('display', 'block')
        }
        //Bind comparison element change to an action: Disabling the input area
        $('#category').change(function() {
            if ($('option:selected', this).attr('data-type') == 'false') {
                $('#expenditure').val($('option:selected', this).attr('data-amount'));
                $('#expenditure').attr('disabled', 'disabled');
            } else {
                $('#expenditure').val('');
                $("#expenditure").removeAttr("disabled");

            }
        });
	});
});