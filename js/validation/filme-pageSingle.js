var urlAtual = window.location.href
var urlFilmeId = urlAtual.split('=')[1]

//REQUISIÇÃO DE FILME PELO ID VIA URL
fetch(`https://api.themoviedb.org/3/movie/${urlFilmeId}?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br`, {
    method: 'GET'
})
.then(response=>response.json())
.then((jsonFilmeId)=>{

    document.title = jsonFilmeId.title+' - Filmendia'
    const templateImg = document.querySelector('.templateFilme-images')
    templateImg.innerHTML = `
    
        <img style="width:100%;" src="https://image.tmdb.org/t/p/w400${jsonFilmeId.poster_path}" />

    `
    //FORMATANDO DATA AMERICANA PARA BRASILEIRA
    var dataAmericanaSplit = jsonFilmeId.release_date.split('-')
    var dataDia = dataAmericanaSplit[2]
    var dataMes = dataAmericanaSplit[1]
    var dataAno = dataAmericanaSplit[0]
    
    var descricaoFilme = false
    if(jsonFilmeId.release_date === ""){

        var descricaoFilme = true

    }

    //TRADUÇÃO DE STATUS DO FILME RELEASED/PLANNED
    if(jsonFilmeId.status === 'Released'){
        var filmeStatus = 'Liberado'
    }else{
        var filmeStatus = 'Planejado'
    }
    console.log(jsonFilmeId)            
    const templateInfo = document.querySelector('.templateFilme-infos')
    templateInfo.innerHTML = `
    
        <h1 style="color: gold;font-size:32px;margin-bottom: 8px;">${jsonFilmeId.title}</h1>
        <p><b style="color:#c1c1c1;">Título original: </b>${jsonFilmeId.original_title}</p>
        <p><b style="color:#c1c1c1;">Língua original: </b>${jsonFilmeId.original_language}</p>
        <p><b style="color:#c1c1c1;">Status: </b>${filmeStatus}</p>
        <p><b style="color:#c1c1c1;">Data de lançamento: </b>${descricaoFilme?'Indefinida':dataDia+'/'+dataMes+'/'+dataAno}</p>
        <p><b style="color:#c1c1c1">Avalição: </b>${jsonFilmeId.vote_average}<p/>
        <p><b style="color:#c1c1c1">Gênero: </b>${jsonFilmeId.genres.map((value)=>{
            return " "+value.name
        })}</p>
        <p><b style="color:#c1c1c1">Duração: </b>${jsonFilmeId.runtime+"min"}</p>
        <h2 style="font-size:24px;text-transform:uppercase;margin: 8px 0;">SINOPSE</h2>
        <p>${jsonFilmeId.overview}</p>
    
    `

    const templateDistrib = document.querySelector('.templateFilme-distrib')
    templateDistrib.innerHTML = `
    
        <h2 style="font-size:16px;color:#c1c1c1;margin-bottom: 5px;">Distribuição:</h2>
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

//REQUISIÇÃO DOS TRAILERS DO FILME PELO ID VIA URL
fetch(`https://api.themoviedb.org/3/movie/${urlFilmeId}/videos?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br`, {
    method: 'GET'
})
.then(response=>response.json())
.then((jsonTrailerFilme)=>{

    const templateTrailerFilme = document.querySelector('.templateFilmeVideo-wrapper')
    if(jsonTrailerFilme.results.length != 0){

        jsonTrailerFilme.results.forEach((value) => {
    
            templateTrailerFilme.innerHTML += `
        
                <div class="templateFilmeVideo-single" style="width:50%;margin-top:15px;margin-bottom: 15px;border: 8px solid black;">
                    <h2 style="font-size:22px;margin-bottom:8px;">${value.name.substring(0,45)}</h2>
                    <iframe style="margin-bottom: 15px;" width="100%" height="315" src="https://www.youtube.com/embed/${value.key}" 
                    title="YouTube video player" frameborder="1" allowfullscreen><p>Your browser does not support iframes.</p></iframe>
                    <div style="width:70%;height: 2px;background-color:rgba(255, 215, 0,0.2);border-radius:10px;"></div> 
                </div>

            `

        });

    }else{

        templateTrailerFilme.innerHTML += `

            <div class="templateFilmeVideo-single" style="margin-top:25px;margin-bottom: 25px">
                <div style="width:560px;height:315px;background-color:#a0a0a0;
                text-align:center;line-height:315px;color:#dbdbdb;user-select:none;opacity:0.8;"><p>Não possui nenhum trailer :(</p></div>
            </div>

        `

    }
    
})

//REQUISIÇÃO DOS FILMES SIMILARES PELO ID URL
fetch(`https://api.themoviedb.org/3/movie/${urlFilmeId}/similar?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br`, {
    method: 'GET'
})
.then(response=>response.json())
.then((jsonFilmeSimilar)=>{

    const templateSimilar = document.querySelector('.templateFilmeSimilares-images')
    if(window.innerWidth > 1112){

        jsonFilmeSimilar.results.slice(0,6).map((val)=>{

        templateSimilar.innerHTML += `
        
            <div class="preview-single">
                <img id="${val.id}" class="filmeSimilar" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
            </div>
            
        `

    })

    }else if(window.innerWidth > 1024){

        jsonFilmeSimilar.results.slice(0,5).map((val)=>{
            templateSimilar.innerHTML += `
        
                <div class="preview-single">
                    <img id="${val.id}" class="filmeSimilar" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if (window.innerWidth > 812){

        jsonFilmeSimilar.results.slice(0,4).map((val)=>{
            templateSimilar.innerHTML += `
        
                <div class="preview-single">
                    <img id="${val.id}" class="filmeSimilar" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else if(window.innerWidth > 736){

        jsonFilmeSimilar.results.slice(0,3).map((val)=>{
            templateSimilar.innerHTML += `
        
                <div class="preview-single">
                    <img id="${val.id}" class="filmeSimilar" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }else{

        jsonFilmeSimilar.results.slice(0,2).map((val)=>{
            templateSimilar.innerHTML += `
        
                <div class="preview-single">
                    <img id="${val.id}" class="filmeSimilar" style="width: 100%;cursor:pointer;" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                </div>
            
            `
        })

    }

    //ENVIA O ID DOS FILMES MAIS BEM AVALIADOS VIA URL PARA UTILIZAR NA PÁGINA filmes/filme.html
    var filmeSimilar = document.querySelectorAll('.filmeSimilar')
    filmeSimilar.forEach((value,index)=>{
    
        filmeSimilar[index].addEventListener('click',()=>{
            window.location = 'filme.html?id='+value.id
        })
    
    })

})