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

        //REQUISIÇÃO DOS FILMES MAIS POPULARES
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page=1', {
        method: 'GET'
        })
        .then(response => response.json())
        .then((jsonPopular)=>{
            console.log(genres)
            const previewPopularImages = document.querySelector('.previewPopular')
            jsonPopular.results.slice(0,18).map((val)=>{
                
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

            const previewTopRatedImages = document.querySelector('.previewTopRated')
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