// http://pokeapi.co/api/v1/ used here
// it is a rest api allows access to data/restful resources

$(document).on('ready', function() {

  // api's base uri
  var pokeApiBaseUri = "http://pokeapi.co";
  // adds the version
  var pokeApiV1 = pokeApiBaseUri + "/api/v1";
  // adds /pokemon
  var pokeApiPokemon = pokeApiV1 + "/pokemon";

  // retrieves the pokemon by id
  function getPokemonById(id) {
    // gets link to id
    var pokeUri = pokeApiPokemon + "/" + id;
    // .get - shortcut to make http get request, data gets data from pokeUri
    $.get(pokeUri, function(data) {
      //sticks data name in h1 id of #poke-name
      $('#poke-name').html(data.name);
      // calls getPokemonSprite and passes it data.sprites
      getPokemonSprite(data.sprites);
      // calls getPokemonAbilities and passes it data.abilites
      getPokemonAbilities(data.abilities);
    });
  }

  // gets a random number/id
  function randomId() {
    var randPokeId = Math.floor((Math.random() * 151) + 1);
    return randPokeId;
  }

  // gets the sprite of the current pokemon
  // the sprites are in an array but I only wanted to print 1
  function getPokemonSprite(spriteData) {
  // builds uri for sprite data the first resource_uri 
    var pokeUri = pokeApiBaseUri + spriteData[0].resource_uri;
    $.get(pokeUri, function(data) {
      // path to sprite
      var imgPath = pokeApiBaseUri + data.image;
      // adds img to img tag's src attribute
      $('#poke-img').attr('src', imgPath);
    });
  }

  // gets pokemon abilites
  function getPokemonAbilities(abilityData) {
    // gets each ability in abilityData array
    for (ability in abilityData) {
      // builds uri for ability data and gets each resource uri
      var pokeUri = pokeApiBaseUri + abilityData[ability].resource_uri;
      $.get(pokeUri, function(data) {
        // appends each ability to ul
        $('#abilities').append('<li>' + data.name + '</li>');
      });
    }
  }

  // random button on click empties ul and gets all the pokemon info
  $('#random-pokemon').click(function() {
    $('#abilities').html("");
    getPokemonById(randomId());
    // shows hidden h2
    $('.hidden').show();
  });

  // https://api.jquery.com/jquery.get/
  // lets you capture what happened in results var. It is an a syncronsis job.
  // var result = $.get(pokeApiV1, function(abilityData){

  // });
});
