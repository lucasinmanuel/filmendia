window.onload = () => {

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function(json){
        const previewPopular = document.querySelector('.previewPopular-images')
        json.results.slice(0,12).map((val)=>{
            
            previewPopular.innerHTML += `
            
                <div class="previewPopular-single">
                    <img src="https://image.tmdb.org/t/p/w185${val.poster_path}" />
                </div>
            
            `

        })
        console.log(json)
    })
    
}