//Only fire if touch is detected by modernizer
if (Modernizr.touch) {
	// Hammer JS wacht tot hij een swipe registreert en doet de bij behorende 
	// handeling wanneer een swipe naar rechts of links geregistreerd wordt.
	// In dit geval het toegvoegen en weghalen van een class.
	Hammer(document.getElementById("content")).on("panright", function() {
	    //alert('Swiped Right');	Gebruikt om te registreren of er een swipt geweest is.
	    document.getElementById('navTrigger').classList.add('active');
	});

	Hammer(document.getElementById("content")).on("panleft", function() {
	    //alert('Swiped Left');		Gebruikt om te registreren of er een swipt geweest is.
	    document.getElementById('navTrigger').classList.remove('active');
	});
}