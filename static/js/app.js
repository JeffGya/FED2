//Global scope
//Created SCOREAPP Namespace 
var APP = APP || {};

(function() {
//Local scope

	//Data objecten
	APP.content = {

		about: { 
			title: 'About this app',
			description: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the disimagey channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the disimagey channel from time to time. but i guess you can't now, being dead and all."
		},

		movies: [
				{title: "Shawshank Redemption", releaseDate:"14 October 1994", description:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", image:"shawshank-redemption.jpg" },
				{title: "The Godfather", releaseDate:"24 March 1972", description:"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", image:"the-godfather.jpg" },
				{title: "Pulp Fiction", releaseDate:"14 October 1994", description:"The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", image:"pulp-fiction.jpg" },
				{title: "The Dark Knight", releaseDate:"18 July 2008", description:"When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.", image:"the-dark-knight.jpg" }
			],

		films: /*function() {
			APP.xhr.trigger("GET", "http://dennistel.nl/movies",function(data){
					APP.content.films = JSON.parse(data);
					console.log('Dit is films data', APP.content.films);
					});*/
		}
	};

	/*APP.directives = {
		image: {
			src: function() {
				return this.image;
			}
		}
	};*/

	//Controller Init
	APP.controller = {
		init: function () {
			//log to check if the APP has come this far
			console.log("Start Webapp");

			// pull data
			APP.router.init();
		}
	};

	 APP.xhr = {
		trigger: function (type, url, success, data) {
			var req = new XMLHttpRequest;
			req.open(type, url, true);

			req.setRequestHeader('Content-type','application/json');
			//req.send();

			console.log(req.status)
			console.log(req.statusText)

			type === 'POST' ? req.send(data) : req.send(null);

			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200 || req.status === 201) {
						success(req.responseText);
					}
				}
			}
		}
	};

	//Router
	APP.router = {
		init: function () {
			routie({
				'/about': function() {
					APP.section.render('about');
				},
				'/movies': function() {
					APP.section.render('movies');
				},
				'/films': function() {
					APP.section.render('films');
				},
				/*'/films/:id': function(){
					sections.films()
				}*/

				'*': function() {
					APP.section.render('about');
				}
			});
		},

		change: function () {
        var route = window.location.hash.slice(2),
            sections = qwery('section'),
            section = qwery('[data-route=' + route + ']')[0];

        // Show active section, hide all other
        if (section) {
        	for (var i=0; i < sections.length; i++){
        		sections[i].classList.remove('active');
        	}
        	section.classList.add('active');
        }

        // Default route
        if (!route) {
        	sections[0].classList.add('active');
        }
	}
};

	APP.section = {
		render: function (route) {
			var data;
			var direct;
			switch (route){
				case 'about':
				data = APP.content.about;
				break;

				case 'movies':
				data = APP.content.movies;
				direct = APP.directives;
				break;

				case 'films':
				data = APP.content.films;
				direct = APP.directives;
				break;

				default:
				data = APP.content.about;
			}

			Transparency.render(qwery('[data-route='+route+']')[0], data, direct);
			APP.router.change();
		}
	};

	APP.config = {
		init: function() {
			this.transparency();
		},
		
		directives: {
			image: {
				src: function(params) {
					return this.image;
				}
			}
		},

		xhr: {
			trigger: function(type, url, success, data){
				var req = new XMLHttpRequest;

				req.open(type, url, true);

				req.setRequestHeader('Content-type', 'application/json');

				type === 'POST' ? req.send(data) : req.send(null);

				req.onreadystatechange = function() {
					if (req.readyState === 4) {
						if(req.status === 200 || req.status === 201) {
							success(req.responseText);
						}
					}
				}
			}
		}
	}


	//DOM ready code
	domready(function(){
		//Start application
		APP.controller.init();
		console.log("dom is ready")
	});

})();