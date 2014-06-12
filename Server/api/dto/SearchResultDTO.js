/**
 * A DTO to encapsulate all outgoing errors from the API
 * @param User
 * @constructor
 */
function SearchResultDTO() {
    this.searchText = '';
    this.movies = [];
    this.persons = [];
}

SearchResultDTO.prototype.fromMovieDtos = function(movieDtos) {

};

SearchResultDTO.prototype.fromPersonDtos = function(personDtos) {

};


module.exports = SearchResultDTO;