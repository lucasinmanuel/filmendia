window.onload = () => {

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response => response.json())
    .then((jsonPopular)=>{

        const previewPopularImages = document.querySelector('.previewPopular')
        jsonPopular.results.slice(0,18).map((val)=>{
            
            previewPopularImages.innerHTML += `
            
                <div class="preview-single">
                    <img src="https://image.tmdb.org/t/p/w185${val.poster_path}" />
                </div>
            
            `

        })   
        
    })

    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
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
    
    clickPreviewArrows()
       
}