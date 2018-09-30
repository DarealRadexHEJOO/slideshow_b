/*pozycja slajdu*/

var position = 1;

/*uruchamianie kliknięcia w slajd o określonej pozycji przy przełączeniu slajdów*/

function slideSwap(p) {
	
	/*.fadeOut(200);*/
	
	$(".display").hide(); 
	$(".display").children().remove();
	
	var pos = p - 1;
	
	var target = ".slideshow a:eq(" + pos + ")";
	
	$(target).trigger("click");
	
}

/*handlery do przycisków na pokazywanym slajdzie; muszą być przywoływane przy każdej zmianie slajda*/
/*reagowanie na buttony widoczne na ekranie oraz na przyciski "lewo", "prawo", "esc" na klawiaturze*/

function buttonEvents() {
	
	$("img.full").on("load", () => {
			$(".full").fadeIn(300);
	});
	
	$(".display button.buttonesc").on("click", () => {
		$(".display").hide(); /*fadeOut(200);*/
		$(".display").children().remove();
	});
	
	$(".display button.buttonleft").on("click", () => {
		if (position != 1) {
			position -= 1;
		}
		$(".full").fadeOut(300, () => {
			slideSwap(position);
		});
	});
	
	$(".display button.buttonright").on("click", () => {
		if (position != ($(".slideshow a").length)) {
			position += 1;
		}
		$(".full").fadeOut(300, () => {
			slideSwap(position);
		});
	});
	
	if ($(".display button.buttonleft").length) {
		$(document).on("keyup", (e) => {
			if (e.which == 37) {
				$(document).off("keyup");
				if (position != 1) {
					position -= 1;
				}
				$(".full").fadeOut(300, () => {
					slideSwap(position);
				});
			}
		});
	}
	
	if ($(".display button.buttonright").length) {
		$(document).on("keyup", (e) => {
			if (e.which == 39) {
				$(document).off("keyup");
				if (position != ($(".slideshow a").length)) {
					position += 1;
				}
				$(".full").fadeOut(300, () => {
					slideSwap(position);
				});
			}
		});
	}
	
	if ($(".display button.buttonesc").length) {
		$(document).on("keyup", (e) => {
			if (e.which == 27) {
				$(document).off("keyup");
				$(".display").hide(); /*.fadeOut(200);*/
				$(".display").children().remove();
			}
		});
	}
}

$(document).ready(() => {
	
	/*przypisanie efektu po najechaniu myszką na slajd*/
	
	$(".slideshow a.slide").on("mouseenter", event => {
		$(event.currentTarget).addClass("slide-active");
	}).on("mouseleave", event => {
		$(event.currentTarget).removeClass("slide-active");
	});
	
	/*handlery otwierają pełny slajd na podstawie atrybutu href obrazu, "budują" przyciski i wstawiają stopkę na podstawie atrybutu alt obrazu*/
	
	/*pierwszy slajd z lewej strony*/
	
	$(".slideshow a:first").on("click", event => {
		event.preventDefault();
		position = 1;
		var img_href = ($(event.currentTarget).attr("href"));
		var img_alt = ($(event.currentTarget).attr("alt"));
		$(".display").append("<img class=\"full\" src=" + img_href + " alt=" + img_alt + ">");
		$(".display").show();
		$(".display").append("<button class=\"buttonright\">></button>");
		$(".display").append("<button class=\"buttonesc\">X</button>");
		$(".display").append("<p class=\"index\">" + position + "/" + ($(".slideshow a").length) + "</p>");
		$(".display").append("<p class=\"footer\">" + img_alt + "</p>");
		buttonEvents();
	});
	
	/*wszystkie slajdy poza pierwszym i ostatnim*/
	
	$(".slideshow a").not(".slideshow a:first").not(".slideshow a:last").on("click", event => {
		event.preventDefault();
		position = ($(event.currentTarget).index()) + 1;
		var img_href = ($(event.currentTarget).attr("href"));
		var img_alt = ($(event.currentTarget).attr("alt"));
		$(".display").append("<img class=\"full\" src=" + img_href + " alt=" + img_alt + ">");
		$(".display").show();
		$(".display").append("<button class=\"buttonleft\"><</button>");
		$(".display").append("<button class=\"buttonright\">></button>");
		$(".display").append("<button class=\"buttonesc\">X</button>");
		$(".display").append("<p class=\"index\">" + position + "/" + ($(".slideshow a").length) + "</p>");
		$(".display").append("<p class=\"footer\">" + img_alt + "</p>");
		buttonEvents();
	});
	
	/*ostatni slajd z prawej strony*/
	
	$(".slideshow a:last").on("click", event => {
		event.preventDefault();
		position = ($(".slideshow a").length);
		var img_href = ($(event.currentTarget).attr("href"));
		var img_alt = ($(event.currentTarget).attr("alt"));
		$(".display").append("<img class=\"full\" src=" + img_href + " alt=" + img_alt + ">");
		$(".display").show();
		$(".display").append("<button class=\"buttonleft\"><</button>");
		$(".display").append("<button class=\"buttonesc\">X</button>");
		$(".display").append("<p class=\"index\">" + position + "/" + ($(".slideshow a").length) + "</p>");
		$(".display").append("<p class=\"footer\">" + img_alt + "</p>");
		buttonEvents();
	});

});