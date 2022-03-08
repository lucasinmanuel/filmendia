var urlAtual = window.location.href
var urlFilmeId = urlAtual.split('?')[1]

console.log(urlFilmeId)

fetch(`https://api.themoviedb.org/3/movie/${urlFilmeId}?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br`, {
    method: 'GET'
})
.then(response=>response.json())
.then((jsonFilmeId)=>{

    console.log(jsonFilmeId)
    const templateImg = document.querySelector('.templateFilme-images')
    templateImg.innerHTML = `
    
        <img style="width:100%;" src="https://image.tmdb.org/t/p/w300${jsonFilmeId.poster_path}" />

    `

})