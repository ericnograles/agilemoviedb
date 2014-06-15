/**
 * A DTO to encapsulate search results for movies or persons
 * @param User
 * @constructor
 */
function SearchResultDTO() {
    this.searchText = '';
    this.movieDtos = [];
    this.personDtos = [];
}

SearchResultDTO.prototype.fromMovieDtos = function(movieDtos) {
    this.movieDtos = movieDtos;
};

SearchResultDTO.prototype.fromPersonDtos = function(personDtos) {
    this.personDtos = personDtos;
};


module.exports = SearchResultDTO;