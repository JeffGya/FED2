var APP = APP || {};

	(function() {

		APP.content = {

			about: { 
				title: '',
				description: ''
			},

			movies: [
					{title: "", releaseDate:"", description:"", cover:"" }
				]
		};

		APP.controller = {
			init: function () {
				//log to check if the APP has come this far
				console.log("Start Webapp");

				// pull data
				APP.router.init();
			}
		};

		APP.router = {
			init: function () {
				routie({

				});
			}
		}

		APP.section = {
			render: function (route) {
				var data;
				switch (route){
					case = 'about':
					data = APP.content.about;
					break

					case = 'movies'
					data = APP.content.movies;
					break;

					default:
					data = APP.content.about;
				}

				Transparency.render(qwery('[data-route='+route+']')[0], data);
				
			}

			/*init: function() {

			},
			about: function() {

			},
			movies: function() {

			}*/
		}

		domready(function(){
			//Start application
			APP.controller.init();
			console.log("dom is ready")
		});

})();