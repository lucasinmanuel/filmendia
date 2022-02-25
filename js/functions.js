window.onload = () => {

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function(json){
        const previewImages = document.querySelector('.preview-images')
        json.results.map((val)=>{
            
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
        previewArrow[0].addEventListener('click',()=>{
            //SETA ESQUERDA
            let i = 0
            i += 198
            const previewImages = document.querySelector('.preview-images')
            previewImages.style.right = i.toString()+'px'

        })

        previewArrow[1].addEventListener('click',()=>{
            //SETA DIREITA
            let i = 0
            i++
            console.log(i)
            const previewImages = document.querySelector('.preview-images')
            previewImages.style.right = i+'px'
        })

    }
    
    
}