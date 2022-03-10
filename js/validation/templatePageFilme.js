var urlAtual = window.location.href
var urlFilmeId = urlAtual.split('=')[1]

//INFORMAÇÕES DO FILME
fetch(`https://api.themoviedb.org/3/movie/${urlFilmeId}?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br`, {
    method: 'GET'
})
.then(response=>response.json())
.then((jsonFilmeId)=>{

    const templateImg = document.querySelector('.templateFilme-images')
    templateImg.innerHTML = `
    
        <img style="width:100%;" src="https://image.tmdb.org/t/p/w400${jsonFilmeId.poster_path}" />

    `
    const templateInfo = document.querySelector('.templateFilme-infos')
    templateInfo.innerHTML = `
    
        <h1 style="color: gold;font-size:32px;margin-bottom: 8px;">${jsonFilmeId.title}</h1>
        <p><b style="color: #c1c1c1;">Título original: </b>${jsonFilmeId.original_title}</p>
        <p><b style="color: #c1c1c1;">Língua original: </b>${jsonFilmeId.original_language}</p>
        <p><b style="color: #c1c1c1;">Data de lançamento: </b>${jsonFilmeId.release_date.replace(/-/g,'/')}</p>
        <p><b style="color: #c1c1c1">Avalição: </b>${jsonFilmeId.vote_average}<p/>
        <p><b style="color: #c1c1c1">Gênero: </b>${jsonFilmeId.genres.map((value)=>{
            return " "+value.name
        })}</p>
        <p><b style="color: #c1c1c1">Duração: </b>${jsonFilmeId.runtime+"min"}</p>
        <h2 style="font-size:24px;text-transform:uppercase;margin: 8px 0;">SINOPSE</h2>
        <p>${jsonFilmeId.overview}</p>
    
    `

    const templateDistrib = document.querySelector('.templateFilme-distrib')
    templateDistrib.innerHTML = `
    
        <h2 style="font-size:16px;color: #c1c1c1;margin-bottom: 5px;">Distribuição:</h2>
        <p>${jsonFilmeId.production_companies.map((value)=>{
            return value.name+", "+value.origin_country+"<br />"
        }).join('')}</p>
        <br />
        <h2 style="font-size:16px;color: #c1c1c1;margin-bottom: 5px;">País de produção:</h2>
        <p>${jsonFilmeId.production_countries.map((value)=>{
            return " "+value.name+", "+value.iso_3166_1
        }).join('')}</p>
    
    `

})

fetch(`https://api.themoviedb.org/3/movie/${urlFilmeId}/videos?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br`, {
    method: 'GET'
})
.then(response=>response.json())
.then((jsonTrailerFilme)=>{

    const templateTrailerFilme = document.querySelector('.TemplateFilmeVideo-wrapper')
    if(jsonTrailerFilme.results.length != 0){

        jsonTrailerFilme.results.forEach((value) => {
    
            templateTrailerFilme.innerHTML += `
        
                <h2 style="font-size:24px;margin-bottom:8px;margin-top:10px;">${value.name}</h2>
                <iframe style="margin-bottom: 15px;" width="560" height="315" src="https://www.youtube.com/embed/${value.key}" 
                title="YouTube video player" frameborder="1" allowfullscreen><p>Your browser does not support iframes.</p></iframe>
                <div style="width: 60%;height: 2px;background-color:rgba(255, 215, 0,0.2);border-radius:10px;margin-bottom:20px;"></div> 

            `

        });

    }else{

        templateTrailerFilme.innerHTML += `
        
            <div style="margin-top:10px;margin-bottom: 20px;width:560px;height:315px;background-color:#a0a0a0;
            text-align:center;line-height:315px;color:#dbdbdb;user-select:none;opacity:0.8;"><p>Não possui nenhum trailer :(</p></div>

        `

    }
    
})