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

        var numberPage = 1

        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page='+numberPage, {
            method: 'GET'
        })
        .then(response=>response.json())
        .then(async(jsonNowPlaying)=>{

            console.log(jsonNowPlaying)
            console.log(genres)
            var filmeIndex = 0

            await jsonNowPlaying.results.forEach((val)=>{

                var generos = []
       
                genres.forEach((value) => {
                   
                    for(let i = 0;i < val.genre_ids.length;i++){
                        
                        if(val.genre_ids[i] === value.id){

                            generos.push(value.name)
    
                        }
                        
                    }

                });

                const bannerHomeMisterio = document.querySelector('.bannerMisterio-wrapper')

                generos.forEach((value)=>{

                    if(value === 'Ação'){
                        console.log(value)
                        if(filmeIndex < 3){
                            
                            bannerHomeMisterio.innerHTML += `

                                <div class="bannerMisterio-images">
                                    <img src="https://image.tmdb.org/t/p/w185${val.poster_path}" />
                                </div>
                                <div class="bannerMisterio-info">
                                    <p>oiiiiiiiiiiiiiiiiiii</p>
                                </div>

                            `
                            filmeIndex++

                        }else{
                            
                            return false

                        }
                        
                    }

                })

            })//JSON NOW_PLAYING PÁGINAS
            
            numberPage++
            
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