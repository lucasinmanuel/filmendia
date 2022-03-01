window.onload = () => {

    //REQUISIÇÃO DOS GÊNEROS DOS FILMES
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response=>response.json())
    .then((jsonGenres)=>{

        const genres = jsonGenres.genres
        mandarGenresIds(genres)

    })

    function mandarGenresIds(genres){
        console.log(genres)
        //NÚMERO DE PÁGINAS DE FILMES QUE SERÃO VALIDADAS PARA UM GÊNERO
        var numberPage = [1,2,3,4,5,6,7,8,9,10]

        var filmeIndex = 0

        numberPage.forEach((numPageAtual)=>{

            fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page='+numPageAtual, {
                method: 'GET'
            })
            .then(response=>response.json())
            .then((jsonNowPlaying)=>{
                console.log(jsonNowPlaying)
                jsonNowPlaying.results.forEach((val)=>{

                    var generos = []
                    //ANALISA O GÊNERO DO FILME E MANDA PARA O ARRAY generos
                    genres.forEach((value) => {
                    
                        for(let i = 0;i < val.genre_ids.length;i++){
                            
                            if(val.genre_ids[i] === value.id){

                                generos.push(value.name)
        
                            }
                            
                        }

                    });

                    const bannerHomeMisterio = document.querySelector('.bannerMisterio-wrapper')

                    generos.forEach((value)=>{

                        if(value === 'Mistério'){
                    
                            if(filmeIndex < 3 && val.overview != "" && val.vote_average >= 6){
                                
                                bannerHomeMisterio.innerHTML += `

                                    <div style="cursor: pointer;" class="bannerMisterio-image">
                                        <img src="https://image.tmdb.org/t/p/w185${val.poster_path}" />
                                    </div>
                                    <div class="bannerMisterio-info">
                                        <h2 style="font-size:22px;text-align:left;margin-bottom: 8px;">${val.title}</h2>
                                        <p style="font-size:14px;text-align:left;margin-bottom: 5px;"><b style="color: gold;">Avalição: </b>${val.vote_average}</p>
                                        <p style="font-size:14px;text-align:left;">${val.overview.substring(0,100)}...</p>
                                    </div>

                                `
                                filmeIndex++

                            }else{
                                
                                return false

                            }
                            
                        }

                    })

                })//JSON NOW_PLAYING PÁGINAS
                
            })

        })
        
        //REQUISIÇÃO DOS FILMES MAIS POPULARES
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page=1', {
            method: 'GET'
        })
        .then(response => response.json())
        .then((jsonPopular)=>{

            jsonPopular.results.slice(0,18).map((val)=>{

                const previewPopularImages = document.querySelector('.previewPopular-images')
    
                previewPopularImages.innerHTML += `
                
                    <div class="preview-single">
                        <img src="https://image.tmdb.org/t/p/w185${val.poster_path}" />
                    </div>
                    
                `

            })   
        
        })

        //REQUISIÇÃO DOS FILMES MAIS BEM AVALIADOS
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page=1', {
            method: 'GET'
        })
        .then(response => response.json())
        .then((jsonTopRated)=>{
 
            const previewTopRatedImages = document.querySelector('.previewTopRated-images')
            
            jsonTopRated.results.slice(0,18).map((val)=>{
                
                previewTopRatedImages.innerHTML += `
                
                    <div class="preview-single">
                        <img src="https://image.tmdb.org/t/p/w185${val.poster_path}" />
                    </div>
                
                `

            })

        })
        
    }
    
    clickPreviewArrows()
       
}