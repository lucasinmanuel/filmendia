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
    
    clickPreviewArrowns()

    function alterarSliderBullets(indexPopular,indexTopRated){

        const previewPopularBulletSingle = document.querySelectorAll('.previewPopular-bullets span')
        const previewTopRatedBulletSingle = document.querySelectorAll('.previewTopRated-bullets span')
        for(let i = 0;i < 3;i++){
            previewPopularBulletSingle[i].style.backgroundColor = 'white'
            previewTopRatedBulletSingle[i].style.backgroundColor = 'white'
        }
        previewPopularBulletSingle[indexPopular].style.backgroundColor = 'gold'
        previewTopRatedBulletSingle[indexTopRated].style.backgroundColor = 'gold'

    }

    function clickPreviewArrowns(){

        const previewPopularArrow = document.querySelectorAll('.previewPopular-texts span.setaSpan')
        const previewPopularImage = document.querySelector('.previewPopular')
        var clickPreviewPopular = 0

        previewPopularArrow[0].addEventListener('click',()=>{
            //SETA ESQUERDA PREVIEW POPULAR
            if(clickPreviewPopular === 2){
                previewPopularImage.style.right = previewPopularImage.scrollWidth / 3+'px'
                clickPreviewPopular = 1
            }else if(clickPreviewPopular === 1){
                previewPopularImage.style.right = 0
                clickPreviewPopular = 0
            }
            alterarSliderBullets(clickPreviewPopular,clickPreviewTopRated)
        })
        previewPopularArrow[1].addEventListener('click',()=>{
            //SETA DIREITA PREVIEW POPULAR
            if(clickPreviewPopular === 0){
                previewPopularImage.style.right = previewPopularImage.scrollWidth / 3+'px'
                clickPreviewPopular = 1
            }else if(clickPreviewPopular === 1){
                previewPopularImage.style.right = (previewPopularImage.scrollWidth / 3) * 2+'px'
                clickPreviewPopular = 2
            }
            alterarSliderBullets(clickPreviewPopular,clickPreviewTopRated)
        })

        const previewTopRatedArrow = document.querySelectorAll('.previewTopRated-texts span.setaSpan')
        const previewTopRatedImage = document.querySelector('.previewTopRated')
        var clickPreviewTopRated = 0
        
        previewTopRatedArrow[0].addEventListener('click',()=>{
            //SETA ESQUERDA PREVIEW TOP RATED
            if(clickPreviewTopRated === 2){
                previewTopRatedImage.style.right = previewTopRatedImage.scrollWidth / 3+'px'
                clickPreviewTopRated = 1
            }else if(clickPreviewTopRated === 1){
                previewTopRatedImage.style.right = 0
                clickPreviewTopRated = 0
            }
            alterarSliderBullets(clickPreviewPopular,clickPreviewTopRated)
        })
        previewTopRatedArrow[1].addEventListener('click',()=>{
            //SETA DIREITA PREVIEW TOP RATED
            if(clickPreviewTopRated === 0){
                previewTopRatedImage.style.right = previewTopRatedImage.scrollWidth / 3+'px'
                clickPreviewTopRated = 1
            }else if(clickPreviewTopRated === 1){
                previewTopRatedImage.style.right = (previewTopRatedImage.scrollWidth / 3) * 2+'px'
                clickPreviewTopRated = 2
            }
            alterarSliderBullets(clickPreviewPopular,clickPreviewTopRated)
        })
        
    }/*clickPreviewArrowns*/
       
}