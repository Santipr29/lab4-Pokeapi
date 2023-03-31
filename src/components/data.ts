export async function api() {
	try {

			const arrayPokemon = []
			for(let i=1; i<26; i++){
			const pokeapi = await (await fetch("https://pokeapi.co/api/v2/pokemon/" + i)).json()
			arrayPokemon.push(pokeapi)
			}
			console.log(arrayPokemon)
			return arrayPokemon
	}
	catch(error){
		console.log(error)
	}
}