window.onload = () => {

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function(json){
        const previewImages = document.querySelector('.preview-images')
        json.results.slice(0,18).map((val)=>{
            
            previewImages.innerHTML += `
            
                <div class="preview-single">
                    <img src="https://image.tmdb.org/t/p/w185${val.poster_path}" />
                </div>
            
            `

        })
        console.log(json)
    })
    
    clickPreviewArrowns()

    function clickPreviewArrowns(){

        const previewArrow = document.querySelectorAll('.preview-texts span')
        const previewImages = document.querySelector('.preview-images')
        var i = 0
        previewArrow[0].addEventListener('click',()=>{
            //SETA ESQUERDA
            if(i === 2){
                previewImages.style.right = 1194+'px'
                i = 1
            }else if(i === 1){
                previewImages.style.right = 0
                i = 0
            }

        })

        previewArrow[1].addEventListener('click',()=>{
            //SETA DIREITA
            if(i === 0){
                previewImages.style.right = 1194+'px'
                i = 1
            }else if(i === 1){
                previewImages.style.right = 2388+'px'
                i = 2
            }

        })

    }/*clickPreviewArrowns*/
       
}