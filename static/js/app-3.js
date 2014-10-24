var movieAPP = movieAPP || {};

(function() {
	movieAPP.controller = {
		init: function() {
			movieAPP.check.locStorage();
		}
	};

	movieAPP.check = {
		locStorage: function() {
            if (Modernizr.localstorage) {
                console.log("localStorage supported");

				movieAPP.xhr.trigger('GET', 'http://dennistel.nl/movies', function (response) {
					localStorage.setItem('movies', response);
					movieAPP.router.init();
				});

            } else {
                console.log("no support for localStorage :(");

				movieAPP.xhr.trigger('GET', 'http://dennistel.nl/movies', function (response) {
					window.globalData = response;
					window.localStorage.getItem = function(){return globalData};

					movieAPP.router.init();
				});
            }
        }
    };

   movieAPP.router = {
        init: function() {
            console.log("router begins");

            routie({
                '/about': function() {
                    movieAPP.sections.renderAbout('about');
                    console.log("route changed: about");

                    //movieAPP.content.about;
                    console.log("get data for: about");
                },
                '/movies': function() {
                    movieAPP.sections.renderMovies('movies');
                    console.log("route changed: movies");

					//movieAPP.content.movies;
                    console.log("get data for: movies");
                },
                '/movies/:id': function(id) {
                    movieAPP.sections.renderFilm('film', id);
                    console.log("route changed: film id", id);

                    movieAPP.content.movie;
                    console.log("get data for: film " + id);
                },
                '*': function() {
                    movieAPP.sections.renderAbout('about');
                    console.log("route changed: default");

                    /*movieAPP.content.about();*/
                    console.log("get data for: default");
                }
            });
        }
    };

    movieAPP.xhr = {
        trigger: function (type, url, success, data) {
            var req = new XMLHttpRequest;
            req.open('GET', url, true);

            req.setRequestHeader('Content-type','application/json');

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

    movieAPP.content = {
        about: {
	            title: "About",
	            description: "An overview of movies"
        },

        movies: {
            /*movies: JSON.parse(localStorage.getItem('movies')
            moviesDirective: {
                cover: {
                    src: function () {
                        return this.cover;
                    },
                    alt: function () {
                        return this.title + ' cover';
                    }
                },
                details: {
                    href: function() {
                        return '#movies/' + (this.id - 1);
                    }
                }
            }*/
        },

        film: {/*function(id) {
			console.log('create model for movie ', id);
            var model = {
                "movieDetails": JSON.parse(localStorage.getItem('movies'))[id],
                "movieDirective": {
                    cover: {
                        src: function () {
							console.log(this);
                            return this.cover;
                        },
                        alt: function () {
                            return this.title + ' cover';
                        }
                    }
                }
            };            
            return movieAPP.sections.renderMovie(model);
        }*/}
    };

    movieAPP.directives = {
		cover: {
			src: function() {
				return this.cover;
			}, 
			alt: function() {
				return this.title + ' cover';
			}			
		},
        details: {
            href: function() {
                return '#/movies/' + (this.id - 1);
            }
        }
	};

    movieAPP.sections = {
        renderAbout: function(route) {
            console.log('render about');
            Transparency.render(qwery('[data-route='+route+']')[0], movieAPP.content.about);
            movieAPP.sections.toggle(route);
        },
        renderMovies: function(route) {
            console.log('render movies');
            movieAPP.content.movies = JSON.parse(localStorage.getItem('movies'));
            console.log('Parsed Data', movieAPP.content.movies);
            Transparency.render(qwery('[data-route='+route+']')[0], movieAPP.content.movies, movieAPP.directives);
            movieAPP.sections.toggle(route);
        },
        renderFilm: function(route, id) {
            console.log('render details film ' + id);
            movieAPP.content.film = JSON.parse(localStorage.getItem('movies'))[id];
            console.log('Parsed Data film ' + id, movieAPP.content.film);
            Transparency.render(qwery('[data-route='+route+']')[0], movieAPP.content.film, movieAPP.directives);
            movieAPP.sections.toggle(route);
        },
        toggle: function(route) {

            var route = route,
            sections = qwery('section'),
            section = qwery('[data-route=' + route + ']')[0];


            if (section) {
        	for (var i=0; i < sections.length; i++){
        		sections[i].classList.remove('active');
	        	}
	        	section.classList.add('active');
	        }
	        
            if (!route) {
                sections[0].classList.add('active');
            }
        }
    };

    movieAPP.controller.init();

})();