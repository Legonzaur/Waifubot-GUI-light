const mediaList = document.getElementById("mediaList");
const graphQLURL = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    },
    query = `
  query ($search: String){
    Page (page: 1, perPage: 20) {
        media (search: $search) {
          id
          type
          title {
            romaji
            english
            native
          }
          characters{
            nodes{
              id
            }
          }
          coverImage{
            medium
          }
          siteUrl
        }
      }
    }
  `;

async function findAnimes(search){
  searchMediaInput.value = search
  let variables = {
    search:search
  }
  options.body = JSON.stringify({
    query: query,
    variables: variables
  })

  let medias = await fetch(graphQLURL, options).then(r => r.json())
                   .then(data => data.data.Page.media);
  mediaList.innerHTML = "";



 let mediaToShow = medias
 //removes all media with no characters owned
 .filter(e => {
    return user.Waifus.filter(w => 
        e.characters.nodes.find(t => t.id == w.ID)
    ).length > 0
  })
  //remove characters that are not owned
  .map(e => {
    e.characters.nodes = e.characters.nodes.filter(n => user.Waifus.find(w => w.ID == n.id))
    return e
  })
  //Experimental reduce : remove unnecessary duplicates
  .reduce((acc, val) => {

    if(acc.length == 0){
      acc.push(val)
      return acc
    }
      //la source actuelle n'a elle pas été ajoutée dans acc?
    // if(acc.every((a, i) => {
    //   ///la source actuelle semble-elle être un candidat meilleur par rapport à la source comparée ? true : false
    //   ///conditions pour être un meilleur candidat : posséder plus de personnages que le candidat comparé, posséder tous les personnages du candidat comparé
    //   console.log(a)
    //   if(a.characters.nodes.every(c=>{
    //     return val.characters.nodes.find(e => e.id == c. id)
    //   }) && a.characters.nodes.length < val.characters.nodes.length){
    //     //changement de la source pour la source actuelle (car meilleur candidat)
    //     acc[i] = val
    //     return false
    //   }else{
    //     return true
    //   }
    // }))
    // {
      //Si la source actuelle n'a pas été déjà ajoutée dans acc -> ce n'est pas un meilleur candidat par rapport à une source déjà présente
      //Est ce que cette source possède des personnages nouveaux par rapport aux sources déjà sélectionnées?
      //Si oui, l'ajouter dans la liste.
      console.log(acc.map(t=>t.characters.nodes))


      console.log(!(acc.reduce((boolAcc, a) => {
        return (boolAcc + val.characters.nodes.every(c=>{
          return a.characters.nodes.find(e => e.id == c.id)
        }))
      }, false)))


      if(!(acc.reduce((boolAcc, a) => {
        return (boolAcc + val.characters.nodes.every(c=>{
          return a.characters.nodes.find(e => e.id == c.id)
        }))
      }, false)))
      {
        val.characters.nodes = val.characters.nodes.filter(n => !(acc.flatMap(e=> e.characters.nodes).find(a => a.id == n.id)))
        val.characters.nodes.length > 0 ? acc.push(val) : null;
      }


      // if(val.characters?.nodes.every(c=>{
      //   let test = !acc.reduce((boolAcc, a) => {
      //     return (a.characters.nodes.find(e => e.id == c. id) ? true : false) + boolAcc
      //   }, false) 
        
      //   console.log(test)
      //   return test
      // }))
      // {
      //   acc.push(val)
      // }
    //}
      return acc
  }, [])

  console.log(mediaToShow.map(t => t.characters.nodes))
  batchAddCards(
    mediaToShow
    //converts characters into cards
    .map(m => ({
      Name : m.title.romaji,
      Image : null /*: m.coverImage.medium*/,
      link : m.siteUrl,
      ID : m.characters.nodes.length,
      idEvent : ()=>{
        filteredInventory = user.Waifus.filter(w => m.characters.nodes.find(e=>e.id == w.ID))
        sort(filteredInventory, sortElement.value);
        reloadAll();
        console.log(m.title.romaji)
      }
    })), mediaList)
}