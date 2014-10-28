var movieAPP = movieAPP || {};

(function() {
	movieAPP.controller = {
		init: function() {
			movieAPP.store.init();
		}
	};

    movieAPP.store = {
    	init: function() {
             movieAPP.xhr.trigger('GET', 'http://dennistel.nl/movies', function (response) {
                //Store data in localstorage
                localStorage.setItem('movies', response);
                movieAPP.router.init();
                //proceed with application
            });
         }
    };

   movieAPP.router = {
        init: function() {
            console.log("router begins");

            routie({
                '/about': function() {
                    movieAPP.sections.renderAbout('about');
                    console.log("route changed: about");

                    movieAPP.content.about;
                    console.log("get data for: about");
                },
                '/movies': function() {
                    console.log("route changed: movies");
                    movieAPP.sections.renderMovies('movies');
                },
                '/movies/:id': function(id) {
                    movieAPP.sections.renderFilm('film', id);
                    console.log("route changed: film id", id);

                    console.log("get data for: film " + id);
                },
                '/movies/genre/:genre': function(genre) {
                    movieAPP.sections.renderMoviesGenre('movies', genre);
                },
                '*': function() {
                    movieAPP.sections.renderMovies('movies');
                    console.log("route changed: default");

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

        movies: function (){
            var genre = '';

            return  movieAPP.underscore.changeData();

        },

        film: function(id) {
            return  movieAPP.underscore.changeData(id);
        },

        moviesGenre: function(genre){
            console.log('in moviesGenre', genre);
            return  movieAPP.underscore.changeData(genre);
        }

        
    };

    movieAPP.underscore = {

        changeData: function(genre) {
            var data = JSON.parse(localStorage.getItem('movies'));

            _.map(data, function (movie, i){
                    movie.reviews   = _.reduce(movie.reviews,   function(memo, review){   return memo + review.score; }, 0) / movie.reviews.length;
                })

            console.log('in changeData genre =', genre);
            console.log('in changeData data =', data);
           return(this.filter(data, genre));
           
        },

        filter: function (data, genre) {
            var hash = window.location.hash;
            console.log(hash);
            var splitHash = hash.split("/");

            console.log('in filter data =', data);

            if (splitHash[2] === "genre") {
                console.log('in filter genre=',genre);
                    var data = _.filter(data, function (data) {

                        if (_.contains(data.genres, genre)) {
                            console.log(data);
                            return data;
                        }
                   });
            }
            return data;
        }
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
        },
	};

    movieAPP.sections = {
        renderAbout: function(route) {
            console.log('render about');
            Transparency.render(qwery('[data-route='+route+']')[0], movieAPP.content.about);
            movieAPP.sections.toggle(route);
        },
        renderMovies: function(route, model) {
            console.log('render movies');
            console.log("get data for: movies");
            Transparency.render(qwery('[data-route='+route+']')[0], movieAPP.content.movies(), movieAPP.directives);
            movieAPP.sections.toggle(route);
        },
        renderFilm: function(route, id) {
            console.log('render details film ' + id);
            Transparency.render(qwery('[data-route='+route+']')[0], movieAPP.content.film()[id], movieAPP.directives);
            movieAPP.sections.toggle(route);
        },
        renderMoviesGenre: function(route,genre) {
            console.log('in renderMoviesGenre genre =', genre);
            console.log('render details');
            Transparency.render(qwery('[data-route='+route+']')[0], movieAPP.content.moviesGenre(genre), movieAPP.directives);
            movieAPP.sections.toggle(route);
        },
        toggle: function(route) {
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