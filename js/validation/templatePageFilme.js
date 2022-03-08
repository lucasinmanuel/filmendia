var urlAtual = window.location.href
var urlFilmeId = urlAtual.split('?')[1]

fetch(`https://api.themoviedb.org/3/movie/${urlFilmeId}?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br`, {
    method: 'GET'
})
.then(response=>response.json())
.then((jsonFilmeId)=>{

    console.log(jsonFilmeId)
    const templateImg = document.querySelector('.templateFilme-images')
    templateImg.innerHTML = `
    
        <img style="width:100%;" src="https://image.tmdb.org/t/p/w400${jsonFilmeId.poster_path}" />

    `
    const templateInfo = document.querySelector('.templateFilme-infos')
    templateInfo.innerHTML = `
    
        <h1 style="color: gold;font-size:32px;">${jsonFilmeId.title}</h1>
        <p><b style="color: #eaeaea;">Título original: </b>${jsonFilmeId.original_title}</p>
        <p><b style="color: #eaeaea;">Data de lançamento: </b>${jsonFilmeId.release_date}</p>
        <p><b style="color: #eaeaea">Avalição: </b>${jsonFilmeId.vote_average}<p/>
        <h2 style="text-transform:uppercase;">SINOPSE</h2>
    
    `

})