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

        const qtdPreviewSingle = document.querySelectorAll('.preview-single').length
        initSliderBullets(qtdPreviewSingle)
        
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
    var click = 0

    function initSliderBullets(val){
        const previewBullets = document.querySelector('.previewSlider-bullets')
        for(var i = 0;i < val / 6;i++){
            previewBullets.innerHTML += '<span></span>'
        }
        const previewBulletSingle = document.querySelectorAll('.previewSlider-bullets span')
        previewBulletSingle[click].style.backgroundColor = '#ccc'
    }

    function clickPreviewArrowns(){

        const previewArrow = document.querySelectorAll('.preview-texts span.setaSpan')
        const previewImages = document.querySelectorAll('.preview-images')
        const qtdPreviewImages = () => {
            if(previewImages.length != 1){
                return previewImages.length * 6
            }else{
                return 6
            }
        }

        previewArrow[0].addEventListener('click',()=>{
            //SETA ESQUERDA
            const qtdSliderBullets = document.querySelectorAll('.preview-single').length / qtdPreviewImages() - 1
            for(let i = 0;i < previewImages.length;i++){
            
                if(previewImages[i].classList[1] === 'previewPopular'){
                    if(click === qtdSliderBullets){
                        previewImages[i].style.right = 1194+'px'
                        click = 1
                    }
                }else if(previewImages[i].classList[1] === 'previewTopRated'){

                }

            }

        })

        previewArrow[1].addEventListener('click',()=>{
            //SETA DIREITA
            if(click === 0){
                previewImages[0].style.right = 1194+'px'
                click = 1
            }else if(click === 1){
                previewImages[0].style.right = 2388+'px'
                click = 2
            }

        })
        
    }/*clickPreviewArrowns*/
       
}