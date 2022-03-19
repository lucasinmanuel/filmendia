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
        
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewPopular" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `

        })

    }else if(window.innerWidth > 1024){

        jsonPopular.results.slice(0,15).map((val)=>{
            previewPopularImages.innerHTML += `
        
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewPopular" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if (window.innerWidth > 812){

        jsonPopular.results.slice(0,12).map((val)=>{
            previewPopularImages.innerHTML += `
        
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewPopular" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if(window.innerWidth > 736){

        jsonPopular.results.slice(0,9).map((val)=>{
            previewPopularImages.innerHTML += `
        
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewPopular" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else{

        jsonPopular.results.slice(0,6).map((val)=>{
            previewPopularImages.innerHTML += `
        
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewPopular" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }
    
    //ENVIA O ID DOS FILMES POPULARES VIA URL PARA UTILIZAR NA PÁGINA filmes/filme.html
    var filmePopular = document.querySelectorAll('.filmePreviewPopular')
    filmePopular.forEach((value,index)=>{
        
        filmePopular[index].addEventListener('click',()=>{
            window.location = 'filmes/filme.html?id='+value.id
        })

    })

    //CLICK PREVIEW SLIDER DOS FILMES POPULARES
    const previewPopularBullet = document.querySelectorAll('.previewPopular-bullets span')

    previewPopularBullet.forEach((value,index)=>{

        previewPopularBullet[index].addEventListener('click',()=>{

            for(let i = 0;i < 3;i++){
                previewPopularBullet[i].style.backgroundColor = 'rgba(250,250,250,0.3)'
            }

            previewPopularBullet[index].style.backgroundColor = 'rgba(250,250,250,1)'

            if(index === 0){
                previewPopularImages.style.marginLeft = 0
            }else if(index === 1){
                previewPopularImages.style.marginLeft = '-'+previewPopularImages.scrollWidth / 3+'px'
            }else if(index === 2){
                previewPopularImages.style.marginLeft = '-'+(previewPopularImages.scrollWidth / 3)*2+'px'
            }

        })
        
    })

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

                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewTopRated" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if(window.innerWidth > 1024){

        jsonTopRated.results.slice(0,15).map((val)=>{
    
            previewTopRatedImages.innerHTML += `
            
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewTopRated" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
    
        })

    }else if (window.innerWidth > 812){

        jsonTopRated.results.slice(0,12).map((val)=>{
    
            previewTopRatedImages.innerHTML += `
            
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewTopRated" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
    
        })

    }else if(window.innerWidth > 736){

        jsonTopRated.results.slice(0,9).map((val)=>{
    
            previewTopRatedImages.innerHTML += `
            
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewTopRated" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
    
        })

    }else{

        jsonTopRated.results.slice(0,6).map((val)=>{
    
            previewTopRatedImages.innerHTML += `
            
                <div class="preview-single">
                    <img alt="${val.title}" id="${val.id}" class="filmePreviewTopRated" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
    
        })

    }

    //ENVIA O ID DOS FILMES MAIS BEM AVALIADOS VIA URL PARA UTILIZAR NA PÁGINA filmes/filme.html
    var filmeTopRated = document.querySelectorAll('.filmePreviewTopRated')
    filmeTopRated.forEach((value,index)=>{
    
        filmeTopRated[index].addEventListener('click',()=>{
            window.location = 'filmes/filme.html?id='+value.id
        })
    
    })

    //CLICK PREVIEW SLIDER DOS FILMES MAIS BEM AVALIADOS
    const previewTopRatedBullet = document.querySelectorAll('.previewTopRated-bullets span')

    previewTopRatedBullet.forEach((value,index)=>{

        previewTopRatedBullet[index].addEventListener('click',()=>{

            for(let i = 0;i < 3;i++){
                previewTopRatedBullet[i].style.backgroundColor = 'rgba(250,250,250,0.3)'
            }

            previewTopRatedBullet[index].style.backgroundColor = 'rgba(250,250,250,1)'
    
            if(index === 0){
                previewTopRatedImages.style.marginLeft = 0
            }else if(index === 1){
                previewTopRatedImages.style.marginLeft = '-'+previewTopRatedImages.scrollWidth / 3+'px'
            }else if(index === 2){
                previewTopRatedImages.style.marginLeft = '-'+(previewTopRatedImages.scrollWidth / 3)*2+'px'
            }
        
        })

    })

})
       