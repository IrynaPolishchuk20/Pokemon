async function getPokemonCards(query) {
    const url = `https://api.pokemontcg.io/v2/cards?q=${query}`
  
    try {
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': '9fcc134b-92bf-49d1-ad5b-901111ef4c43'
        }
      })
  
      const data = await response.json()
      return data.data || []
  
    } catch(error) {
       resultDiv.innerText = '🚫 Помилка під час запиту ' 
      }
  }