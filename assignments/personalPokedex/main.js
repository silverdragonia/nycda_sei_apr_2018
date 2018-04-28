$(document).ready(function() {

	// define the trainer class
	class Trainer {
		constructor(name, lvl, exp) {
			this.name = name;
			this.lvl = lvl;
			this.exp = exp;
			this.myPokemon = [];
		}	
		// method that takes no parameters and returns an array of pokemon objects
		all() {
			return this.myPokemon;
		}
		// method that takes a parameter and returns a pokemon object housing info for the pokemon it finds
		get(name) {
			for (let i = 0; i < this.myPokemon.length; i++){
	 			let pokemonName = this.myPokemon[i].name;
	 			if(pokemonName == name) {
	 				return this.myPokemon[i];
 				}
			}
			return false;
		}
	}


	// define the pokemon class
	class Pokemon {
		constructor(name, id, img, hp, attack, defense, abilities) {
			this.name = name;
			this.id = id;
			this.img = img;
			this.hp = hp;
			this.attack = attack;
			this.defense = defense;
			this.abilities = abilities;
		}
	}


	// create a function that takes the pokemon name and id# to call api
	function loadInfo(name, id) {
		// get API data - commented out due to broken API - using own github instead
		// axios.get('https://pokeapi.co/api/v2/pokemon/' + id + '/')
		axios.get('https://raw.githubusercontent.com/silverdragonia/nycda_sei_apr_2018/master/assignments/personalPokedex/api/' + id + '.json')

 		// once loaded then run function
		.then(function(result) {
			let abilitiesApi = result.data.abilities;
			let abilitiesArr = [];
			for (let i = 0; i < abilitiesApi.length; i++) {
				abilitiesArr.push(abilitiesApi[i].ability.name);
			}
			// define pokemon object
			let info = {
				'name': result.data.name,
				'id': result.data.id,
				'img': result.data.sprites.front_shiny,
				'hp': result.data.stats[5].base_stat,
				'attack': result.data.stats[4].base_stat,
				'defense': result.data.stats[3].base_stat,
				'abilities': abilitiesArr
			}
			// push pokemon object to trainer pokemon list
			silverdragonia.myPokemon.push(info);
		});
	}

	// define new trainer and pokemon
	let silverdragonia = new Trainer('silverdragonia', 10, 9000);
	let bulbasaur = new Pokemon('bulbasaur', 1);
	let charmander = new Pokemon('charmander', 4);
	let squirtle = new Pokemon('squirtle', 7);
	
	// call function to get data for pokemon and push to trainer object
	loadInfo(bulbasaur,1);
	loadInfo(charmander,4);
	loadInfo(squirtle,7);

	// define html elements
	let name = $('#pokemonName');
	let hp = $('#hp');
	let attack = $('#attack');
	let defense = $('#defense');
	let abilities = $('#abilities');
	let img = $('#img');
	let display = $('.info');
	let closeBtn = $('#closeBtn');
	let statImg = $('#statImg');
	let pokemonSelect = $('pokemonSelect');
	let bulbasaurBtn = $('#bulbasaurBtn');
	let charmanderBtn = $('#charmanderBtn');
	let squirtleBtn = $('#squirtleBtn');
	let trainerRow = $('#trainerRow');
	let trainerName = $('#trainerName');
	let trainerLvl = $('#trainerLvl');
	let trainerExp = $('#trainerExp');

	// function to return capitalized results for diplay
	function capitalize(str) {
    	return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// function to update html info
	function updateHtml(pokemon){
		let myPokemon = silverdragonia.get(pokemon);
			name.text(capitalize(myPokemon.name));
			statImg.attr('src', 'img/' + pokemon + 'Bg.jpg');
			img.attr('src', myPokemon.img);
			hp.text(myPokemon.hp);
			attack.text(myPokemon.attack);
			defense.text(myPokemon.defense);
			abilities.text(myPokemon.abilities);
			display.removeClass('hidden');
	}

	
	// load trainer info
	trainerName.text(capitalize(silverdragonia.name));
	trainerLvl.text(silverdragonia.lvl);
	trainerExp.text(silverdragonia.exp);









	// listen for pokemon button click
	bulbasaurBtn.click(function() {
		updateHtml('bulbasaur');
	});
	charmanderBtn.click(function() {
		updateHtml('charmander');
	});
	squirtleBtn.click(function() {
		updateHtml('squirtle');
	});

	// listen for close button click
	closeBtn.click(function() {
		display.addClass('hidden');
	});







});
