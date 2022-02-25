window.onload = () => {

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function(json){
        const previewImages = document.querySelector('.preview-images')
        json.results.slice(0,18).map(async(val)=>{
            
            previewImages.innerHTML += `
            
                <div class="preview-single">
                    <img src="https://image.tmdb.org/t/p/w185${val.poster_path}" />
                </div>
            
            `
            const qtdPreviewSingle = document.querySelectorAll('.preview-single').length
            console.log(qtdPreviewSingle)
        })
        
    })
    
    clickPreviewArrowns()

    function clickPreviewArrowns(){

        var click = 0

        const sliderBullets = document.querySelector('.slider-bullets')
        
        /*for(var i = 0;i < qtdPreviewSingle / 6;i++){
            sliderBullets.innerHTML += 'a'
            
        }*/
        
        const previewArrow = document.querySelectorAll('.preview-texts span')
        const previewImages = document.querySelector('.preview-images')
    
        previewArrow[0].addEventListener('click',()=>{
            //SETA ESQUERDA
            if(click === 2){
                previewImages.style.right = 1194+'px'
                click = 1
            }else if(click === 1){
                previewImages.style.right = 0
                click = 0
            }

        })

        previewArrow[1].addEventListener('click',()=>{
            //SETA DIREITA
            if(click === 0){
                previewImages.style.right = 1194+'px'
                click = 1
            }else if(click === 1){
                previewImages.style.right = 2388+'px'
                click = 2
            }

        })

    }/*clickPreviewArrowns*/
       
}