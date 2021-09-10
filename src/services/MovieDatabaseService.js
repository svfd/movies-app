class MovieDatabaseService {

	_apiKey = '';

	_baseUrl = 'https://api.themoviedb.org/3/';

	_imagePath = 'https://image.tmdb.org/t/p/w500';
	_originalImagePage = 'https://image.tmdb.org/t/p/original';

	_makeRequest = async (url, addUrl = '') => {
		const response = await fetch(`${this._baseUrl}${url}?api_key=${this._apiKey}${addUrl}`);

		if (!response.ok) {
			throw new Error('Request error');
		}

		return await response.json();
	};

	transformMovies = (results, totalPages) => {

		const transformedResults = results.map((result) => {
			const img = result.poster_path ? this._imagePath + result.poster_path : null;
			return {
				id: result.id,
				image: img,
				title: result.title
			};
		});

		return {
			results: transformedResults,
			pages: totalPages
		};
	};

	transformMovie = (data) => {
		const img = data.poster_path ? this._imagePath + data.poster_path : null;
		const backdrop = data.backdrop_path ? this._originalImagePage + data.backdrop_path : null;

		return {
			id: data.id,
			image: img,
			title: data.title,
			budget: data.budget,
			description: data.overview,
			releaseDate: data.release_date,
			duration: data.runtime,
			genres: data.genres,
			countries: data.production_countries.map(({ name }) => name),
			tagline: data.tagline,
			status: data.status,
			rating: data.vote_average,
			backdrop
		};
	};

	transformMovieTrailers = (trailers) => {
		return trailers.map((trailer) => ({
			id: trailer.id,
			name: trailer.name,
			url: `https://www.youtube.com/embed/${trailer.key}`
		}));
	}

	transformMovieImages = ({ backdrops }) => {
		return backdrops.map((item) => ({
			src: this._originalImagePage + item.file_path,
			width: item.width,
			height: item.height
		}));
	};

	transformMovieCredits = (credits) => {
		return credits.map((item) => {
			const img = item.profile_path ? this._imagePath + item.profile_path : null;
			return {
				id: item.id,
				image: img,
				character: item.character,
				name: item.name
			};
		});
	};

	transformMovieReviews = ({ results }) => {
		return results.map((item) => {
			const { avatar_path } = item.author_details;
			const hasUrl = /^\/http?s/.test(avatar_path);
			let _avatar = avatar_path ? this._imagePath + avatar_path : null;

			if (hasUrl) {
				_avatar = avatar_path.slice(1);
			}

			return {
				id: item.id,
				author: item.author_details.username,
				avatar: _avatar,
				rating: item.author_details.rating,
				review: item.content,
				created: new Date(item.created_at).toDateString()
			};
		});
	};

	transformPersonDetails = (details) => {
		const img = details.profile_path ? this._imagePath + details.profile_path : null;
		let homepage = details.homepage;

		if (homepage !== null) {
			const url = homepage.match(/[a-z]+\.+[a-z]+/gi).join('');
			homepage = url.replace(url, 'http://$&');
		}

		return {
			id: details.id,
			name: details.name,
			image: img,
			biography: details.biography,
			birthday: details.birthday,
			deathday: details.deathday,
			placeOfBirth: details.place_of_birth,
			homepage
		};
	};

	getMoviesByType = (type, page) => {
		return this._makeRequest(`movie/${type}`,`&page=${page}`);
	};

	getMoviesByGenre = (id, page) => {
		return this._makeRequest('discover/movie', `&with_genres=${id}&page=${page}`);
	};

	searchMoviesByKeyword = (keyword, page) => {
		return this._makeRequest(`search/movie`, `&query=${keyword}&page=${page}`);
	};

	getMovieById = (id) => {
		return this._makeRequest(`movie/${id}`);
	};

	getMovieTrailers = (id) => {
		return this._makeRequest(`/movie/${id}/videos`);
	}

	getMovieImages = (id) => {
		return this._makeRequest(`movie/${id}/images`);
	};

	getSimilarMovies = (id) => {
		return this._makeRequest(`movie/${id}/similar`);
	};

	getMovieReviews = (id) => {
		return this._makeRequest(`movie/${id}/reviews`);
	};

	getMovieCredits = (id) => {
		return this._makeRequest(`movie/${id}/credits`);
	};

	getPersonDetails = (id) => {
		return this._makeRequest(`person/${id}`);
	};

	getPersonCredits = (id) => {
		return this._makeRequest(`person/${id}/movie_credits`);
	};

	getMoviesGenres = () => {
		return this._makeRequest('/genre/movie/list');
	};

};

export default MovieDatabaseService;