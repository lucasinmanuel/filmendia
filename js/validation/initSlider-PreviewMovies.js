//REQUISIÇÃO DOS FILMES MAIS POPULARES
fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page=1', {
    method: 'GET'
})
.then(response => response.json())
.then((jsonPopular)=>{

    const previewPopularImages = document.querySelector('.previewPopular-images')

    if(window.innerWidth > 1112){

        jsonPopular.results.slice(0,18).map((val)=>{

        previewPopularImages.innerHTML += `
        
            <div style="width:16.6%;" class="preview-single">
                <img style="width: 100%;cursor: pointer" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
            </div>
            
        `

    })

    }else if(window.innerWidth > 1024){

        jsonPopular.results.slice(0,15).map((val)=>{
            previewPopularImages.innerHTML += `
        
                <div style="width:16.6%;" class="preview-single">
                    <img style="width: 100%;cursor: pointer" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if (window.innerWidth > 812){

        jsonPopular.results.slice(0,12).map((val)=>{
            previewPopularImages.innerHTML += `
        
                <div style="width:16.6%;" class="preview-single">
                    <img style="width: 100%;cursor: pointer" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }   

})

//REQUISIÇÃO DOS FILMES MAIS BEM AVALIADOS
fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page=1', {
    method: 'GET'
})
.then(response => response.json())
.then((jsonTopRated)=>{

    const previewTopRatedImages = document.querySelector('.previewTopRated-images')
    
    if(window.innerWidth > 1112){

        jsonTopRated.results.slice(0,18).map((val)=>{
            previewTopRatedImages.innerHTML += `

                <div style="width:16.6%;" class="preview-single">
                    <img style="width: 100%" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if(window.innerWidth > 1024){

        jsonTopRated.results.slice(0,15).map((val)=>{
    
            previewTopRatedImages.innerHTML += `
            
                <div style="width:16.6%;" class="preview-single">
                    <img style="width: 100%" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
    
        })

    }else if (window.innerWidth > 812){

        jsonTopRated.results.slice(0,12).map((val)=>{
    
            previewTopRatedImages.innerHTML += `
            
                <div style="width:16.6%;" class="preview-single">
                    <img style="width: 100%" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
    
        })

    }

})
       