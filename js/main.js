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
async function searchPokemon() {
  const name = document.getElementById('searchInput').value.trim()
  const type = document.getElementById('typeInput').value.trim()
  const resultDiv = document.getElementById('result')
  resultDiv.innerHTML = ''
  
  if (name === '' && type === '') {
    resultDiv.innerText = '❗ Введіть ім’я покемона'
    return
  }
  
  let query = ''
  if (name) query += `name:${name}`
  if (type) query += (name ? `+` : ``) + `types:${type}`
  
  try {
    const cards = await getPokemonCards(query)
  
    if (cards.length === 0) {
      resultDiv.innerText = '😕 Картки за цими параметрами не знайдено'
      return
    }
  
    cards.slice(0, 10).forEach(card => {
      const div = document.createElement('div')
      div.className = 'pokemon'
      div.innerHTML = `
        <strong>${card.name}</strong><br>
        <img src="${card.images.small}" alt="${card.name}"><br>
        HP: ${card.hp ? card.hp : '—'}<br>
        Тип: ${card.types && card.types.length > 0 ? card.types.join(', ') : '—'}<br>
      `
      resultDiv.appendChild(div)
    })
  
   
    document.getElementById('searchInput').value = ''
    document.getElementById('typeInput').value = ''
  } catch (error) {
    resultDiv.innerText = '🚫 Помилка під час запиту'
  }
}
  
  
document.getElementById('searchInput').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchPokemon()
  }
})