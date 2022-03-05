window.addEventListener('resize',()=>{
    setInterval(()=>{
        
    },2000)
})   

//REQUISIÇÃO DOS FILMES MAIS POPULARES
fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page=1', {
    method: 'GET'
})
.then(response => response.json())
.then((jsonPopular)=>{

    const previewPopularWrapper = document.querySelectorAll('.preview-wrapper')[0]
    const previewPopularImages = document.querySelector('.previewPopular-images')

    previewPopularWrapper.style.paddingLeft = '16px'
    previewPopularWrapper.style.paddingRight = '16px'
    if(window.innerWidth > 1112){

        jsonPopular.results.slice(0,18).map((val)=>{

        previewPopularImages.innerHTML += `
        
            <div style="padding-right:16px" class="preview-single">
                <img style="width: 182px" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
            </div>
            
        `

    })

    }else if(window.innerWidth <= 1112){

        jsonPopular.results.slice(0,15).map((val)=>{
            previewPopularImages.innerHTML += `
        
                <div style="padding-right:16px" class="preview-single">
                    <img style="width: 187px" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if(window.innerWidth <= 1024){

        previewPopularWrapper.style.paddingLeft = '18px'
        previewPopularWrapper.style.paddingRight = '18px'
        jsonPopular.results.slice(0,18).map((val)=>{
            previewPopularImages.innerHTML += `
        
                <div style="padding-right:18px" class="preview-single">
                    <img style="width: 180px" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
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

    const previewTopRatedWrapper = document.querySelectorAll('.preview-wrapper')[1]
    const previewTopRatedImages = document.querySelector('.previewTopRated-images')
    
    previewTopRatedWrapper.style.paddingLeft = '16px'
    previewTopRatedWrapper.style.paddingRight = '16px'
    if(window.innerWidth > 1112){

        jsonTopRated.results.slice(0,18).map((val)=>{
            previewTopRatedImages.innerHTML += `

                <div style="padding-right:16px" class="preview-single">
                    <img style="width: 182px" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if(window.innerWidth <= 1112){

        jsonTopRated.results.slice(0,15).map((val)=>{
            previewTopRatedImages.innerHTML += `
            
                <div style="padding-right:16px" class="preview-single">
                    <img style="width: 187px" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if(window.innerWidth <= 1024){

        jsonTopRated.results.slice(0,15).map((val)=>{
    
            previewTopRatedImages.innerHTML += `
            
                <div class="preview-single">
                    <img style="width: 190px" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
    
        })

    }

})
       