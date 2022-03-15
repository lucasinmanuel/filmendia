var numPage = 1
mudarPagina(numPage)

const filmesPopularesArrows = document.querySelectorAll('.mudarPagina span')
filmesPopularesArrows[0].addEventListener('click',()=>{
    numPage--
    if(numPage < 1){
        numPage = 1
    }
    mudarPagina(numPage)
})
filmesPopularesArrows[1].addEventListener('click',()=>{
    numPage++
    mudarPagina(numPage)
})

function mudarPagina(numPage){

    //REQUISIÇÃO DOS GÊNEROS DOS FILMES
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response=>response.json())
    .then((jsonGenres)=>{

        const listGenres = jsonGenres.genres
        mandarGenresIds(listGenres)

    })

    //REQUISIÇÃO DOS FILMES POPULARES POR PÁGINA
    function mandarGenresIds(listGenres){

        fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page='+numPage, {
        method: 'GET'
        })
        .then(response => response.json())
        .then((jsonPopular)=>{

            const filmesPopularImages = document.querySelector('.filmesPopulares-images')
            filmesPopularImages.innerHTML = '' //RESET DE IMAGENS POR PÁGINA

            jsonPopular.results.map((val)=>{

                var generos = []
                //ANALISA O GÊNERO DO FILME E MANDA PARA O ARRAY generos
                listGenres.forEach((value) => {
                
                    for(let i = 0;i < val.genre_ids.length;i++){
                        
                        if(val.genre_ids[i] === value.id){

                            generos.push(value.name)

                        }
                        
                    }

                });

                var qtdCaractSinopse = false
                var qtdCaractTitle = false
                if(val.overview.length > 90){
                    qtdCaractSinopse = true
                }
                if(val.title.length > 15){
                    qtdCaractTitle = true
                }
                filmesPopularImages.innerHTML += `

                    <div style="width:33.3%;display:flex;margin-bottom:15px;background-color:#1E1E1E;padding:10px;">
                        <div style="width:45%;display:flex;align-items:center;">
                            <img id="${val.id}" class="filmePopular" style="width:100%;cursor:pointer;" alt="${val.title}" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                        </div>
                        <div style="width:55%;padding: 0 10px;">
                            <h2 style="font-size:17px;margin-bottom:5px;">${qtdCaractTitle?val.title.substring(0,15)+'...':val.title}</h2>
                            <p style="font-size:14px;"><b style="color:#c1c1c1;">Data de lançamento: </b>${val.release_date.replace(/-/g,'/')}</p>
                            <p style="font-size:14px;"><b style="color:#c1c1c1;">Avalição: </b>${val.vote_average}</p>
                            <p style="font-size:14px;"><b style="color:#c1c1c1;">Gênero: </b>${generos.map((value)=>{
                                return " "+value
                            })}</p>
                            <h3 style="font-size:14px;margin:8px 0;">SINOPSE</h3>
                            <p style="font-size:14px;">${qtdCaractSinopse?val.overview.substring(0,80)+'...':val.overview}</p>
                        </div>
                    </div>

                `

            })

            var filmesPopulares = document.querySelectorAll('.filmePopular')
            filmesPopulares.forEach((value,index)=>{

                filmesPopulares[index].addEventListener('click',()=>{
                    window.location = 'filme.html?id='+value.id
                })

            })

            //MOSTRA A MUDANÇA DE PÁGINA
            const filmesPopularesPage = document.querySelector('.mudarPagina p')
            filmesPopularesPage.innerHTML = jsonPopular.page

        })

    }

}


