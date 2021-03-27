let query = `query ($id: Int) { # Define which variables will be used in the query (id)
    Character(id: $id){
        media{
            nodes{
                id
                idMal
                type
                format
                title {
                romaji
                english
                native
                }
                source
              characters {
                nodes {
                  id
                }
              }
            }
            }
  }
    }
  `;
let fallbackQuery = `query ($id: Int) {
    Character(id: $id){
        media{
            nodes{
                id
                idMal
                type
                format
                title {
                romaji
                english
                native
                }
                source
              relations {
                nodes {
                  id
                  title {
                    romaji
                    english
                    native
                    userPreferred
                  }
                  source
                }
              }
            }
            }
  }
    }`
let graphQLURL = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:""
    };

function fetchSources(id, fallback = false){
    let rateLimit
    let variables = {
        id:id
    };

    options.body = JSON.stringify({
        query: fallback ? fallbackQuery : query,
        variables: variables
    })
    return fetch(graphQLURL, options).then(r=>{
        rateLimit = r.headers.get("X-RateLimit-Remaining");
        return r.json()
    }).then(data => {
        let returnValue
        //First request, then fallback if no "original source" is found
        if(fallback == false){
            returnValue = data.data.Character.media.nodes.filter(e => (e.source == "ORIGINAL" || e.source == null) && e.format != "SPECIAL")
            if(returnValue.length > 0){
                returnValue = returnValue.reduce((prev, current)=>(
                    (prev.id < current.id) ? prev : current
                ));
            }else{
                return fetchSources(id, true)
            }
        }else{
             //add first source to it's relations 
            data.data.Character.media.nodes[0].relations.nodes.push(data.data.Character.media.nodes.reduce((prev, current)=>(
                (prev.id < current.id) ? prev : current
            )))
            //flattens all relations of all sources
            returnValue = [data.data.Character.media.nodes.flatMap(e=>
                e.relations.nodes
            ).reduce((prev, current)=>(
                (prev.id < current.id) ? prev : current
            ))]
        }

        if(returnValue.length == 0 && fallback == false){
             return fetchSources(id, true)
        }
        return {data:returnValue, limit:rateLimit};
    })
}

document.getElementById("buildSources").onclick = async ()=>{
    buildSources(await upload(), user.Waifus )
}

async function buildSources(sources , waifus){
    cached = JSON.parse(sources);
    toFetch = waifus.filter(e => !(cached.waifus[e.ID]?.partial == true))
    //remove already fetched waifus from list and iterate through them
    let limit = 90;
    // let waifuData = await fetchSources(37491)
    // console.log(waifuData.data)
    // return;
    while(limit > 0){
        let waifu = toFetch.shift()
        console.log(limit, waifu.ID)
        let waifuData = await fetchSources(waifu.ID, true)
        limit = waifuData.limit;
        console.log(waifuData.data)
    }

        

}



function upload() {
    return new Promise(function (resolve, reject) {
      var element = document.createElement("input");
      element.setAttribute("type", "file");
      element.setAttribute("accept", ".json");
  
      element.style.display = "none";
      document.body.appendChild(element);
  
      element.addEventListener("input", async function (e) {
        text = await element.files[0].text();
        resolve(text);
        document.body.removeChild(element);
      });
      element.click();
    });
  }

//fetchSources(1)