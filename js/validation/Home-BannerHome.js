//REQUISIÇÃO DOS GÊNEROS DOS FILMES
fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
    method: 'GET'
})
.then(response=>response.json())
.then((jsonGenres)=>{

    const listGenres = jsonGenres.genres
    mandarGenresIds(listGenres)

})

function mandarGenresIds(listGenres){
    
    //NÚMERO DE PÁGINAS DE FILMES QUE SERÃO VALIDADAS POR GÊNERO
    var numberPage = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    var qtdFilmeAcao = 0;
    var qtdFilmeMisterio = 0;
    var qtdFilmeRomance = 0;
    var qtdFilmeFantasia = 0;
    var qtdFilmeAnimacao = 0;
    var qtdFilmeTerror = 0;

    numberPage.forEach((numPageAtual)=>{

        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page='+numPageAtual, {
            method: 'GET'
        })
        .then(response=>response.json())
        .then((jsonNowPlaying)=>{
           
            jsonNowPlaying.results.forEach((val)=>{

                var generos = []
                //ANALISA O GÊNERO DO FILME E MANDA PARA O ARRAY generos
                listGenres.forEach((value) => {
                
                    for(let i = 0;i < val.genre_ids.length;i++){
                        
                        if(val.genre_ids[i] === value.id){

                            generos.push(value.name)
    
                        }
                        
                    }

                });

                const bannerHomeAcao = document.querySelector('.bannerAcao-wrapper')
                const bannerHomeFantasia = document.querySelector('.bannerFantasia-wrapper')
                const bannerHomeMisterio = document.querySelector('.bannerMisterio-wrapper')
                const bannerHomeRomance = document.querySelector('.bannerRomance-wrapper')
                const bannerHomeAnimacao = document.querySelector('.bannerAnimacao-wrapper')
                const bannerHomeTerror = document.querySelector('.bannerTerror-wrapper')

                //VALIDAÇÃO PARA ADCIONAR RETICÊNCIAS NOS TÍTULOS DOS FILMES LONGOS
                var qtdCaract = false
                if(val.title.length > 30){
                    qtdCaract = true
                }
                generos.forEach((value)=>{

                    //3 FILMES DE AÇÃO
                    if(value === 'Ação'){

                        if(qtdFilmeAcao < 3 && val.overview != "" && val.vote_average >= 6.5){

                            bannerHomeAcao.innerHTML += `
                            
                                <div>
                                    <img alt="${val.title}" id="${val.id}" class="filmeBannerHome" style="width: 185px;border-radius:8px;cursor:pointer;" src="https://image.tmdb.org/t/p/w400${val.poster_path}" />
                                </div>
                                <div style="margin-left:10px;margin-right:15px">
                                    <h2 style="font-size:20px;margin-bottom: 8px;">${qtdCaract?val.title.substring(0,30)+'...':val.title.substring(0,30)}</h2>
                                    <p style="font-size:14px;margin-bottom: 5px;"><b style="color: gold;">Avalição: </b>${val.vote_average}</p>
                                    <p style="font-size:14px;">${val.overview.substring(0,100)}...</p>
                                </div>
                            
                            `
                            qtdFilmeAcao++

                        }

                    }

                    //3 FILMES DE FANTASIA
                    if(value === 'Fantasia'){

                        if(qtdFilmeFantasia < 3 && val.overview != "" && val.vote_average >= 6.5){

                            bannerHomeFantasia.innerHTML += `

                                <div>
                                    <img alt="${val.title}" id="${val.id}" class="filmeBannerHome" style="width: 185px;border-radius:8px;cursor:pointer;" src="https://image.tmdb.org/t/p/w400${val.poster_path}" />
                                </div>
                                <div style="margin-left:10px;margin-right:15px">
                                    <h2 style="font-size:20px;margin-bottom: 8px;">${qtdCaract?val.title.substring(0,30)+'...':val.title.substring(0,30)}</h2>
                                    <p style="font-size:14px;margin-bottom: 5px;"><b style="color: gold;">Avalição: </b>${val.vote_average}</p>
                                    <p style="font-size:14px;">${val.overview.substring(0,100)}...</p>
                                </div>

                            `
                            qtdFilmeFantasia++

                        }

                    }

                    //3 FILMES DE MISTÉRIO
                    if(value === 'Mistério'){
                
                        if(qtdFilmeMisterio < 3 && val.overview != "" && val.vote_average >= 6.5){
                  
                            bannerHomeMisterio.innerHTML += `

                                <div>
                                    <img alt="${val.title}" id="${val.id}" class="filmeBannerHome" style="width: 185px;border-radius:8px;cursor:pointer;" src="https://image.tmdb.org/t/p/w400${val.poster_path}" />
                                </div>
                                <div style="margin-left:10px;margin-right:15px">
                                    <h2 style="font-size:20px;margin-bottom: 8px;">${qtdCaract?val.title.substring(0,30)+'...':val.title.substring(0,30)}</h2>
                                    <p style="font-size:14px;margin-bottom: 5px;"><b style="color: gold;">Avalição: </b>${val.vote_average}</p>
                                    <p style="font-size:14px;">${val.overview.substring(0,100)}...</p>
                                </div>

                            `
                            qtdFilmeMisterio++

                        }
                        
                    }

                    //3 FILMES DE ROMANCE
                    if(value === 'Romance'){

                        if(qtdFilmeRomance < 3 && val.overview != "" && val.vote_average >= 6.5){
                  
                            bannerHomeRomance.innerHTML += `

                                <div>
                                    <img alt="${val.title}" id="${val.id}" class="filmeBannerHome" style="width: 185px;border-radius:8px;cursor:pointer;" src="https://image.tmdb.org/t/p/w400${val.poster_path}" />
                                </div>
                                <div style="margin-left:10px;margin-right:15px">
                                    <h2 style="font-size:20px;margin-bottom: 8px;">${qtdCaract?val.title.substring(0,30)+'...':val.title.substring(0,30)}</h2>
                                    <p style="font-size:14px;margin-bottom: 5px;"><b style="color: gold;">Avalição: </b>${val.vote_average}</p>
                                    <p style="font-size:14px;">${val.overview.substring(0,100)}...</p>
                                </div>

                            `
                            qtdFilmeRomance++

                        }

                    }

                    //3 FILMES DE ANIMAÇÃO
                    if(value === 'Animação'){

                        if(qtdFilmeAnimacao < 3 && val.overview != "" && val.vote_average >= 6.5){

                            bannerHomeAnimacao.innerHTML += `

                                <div>
                                    <img alt="${val.title}" id="${val.id}" class="filmeBannerHome" style="width: 185px;border-radius:8px;cursor:pointer;" src="https://image.tmdb.org/t/p/w400${val.poster_path}" />
                                </div>
                                <div style="margin-left:10px;margin-right:15px">
                                    <h2 style="font-size:20px;margin-bottom: 8px;">${qtdCaract?val.title.substring(0,30)+'...':val.title.substring(0,30)}</h2>
                                    <p style="font-size:14px;margin-bottom: 5px;"><b style="color: gold;">Avalição: </b>${val.vote_average}</p>
                                    <p style="font-size:14px;">${val.overview.substring(0,100)}...</p>
                                </div>

                            `
                            qtdFilmeAnimacao++

                        }

                    }
                    
                    //3 FILMES DE TERROR
                    if(value === 'Terror'){

                        if(qtdFilmeTerror < 3 && val.overview != "" && val.vote_average >= 6.5){

                            bannerHomeTerror.innerHTML += `

                                <div>
                                    <img alt="${val.title}" id="${val.id}" class="filmeBannerHome" style="width: 185px;border-radius:8px;cursor:pointer;" src="https://image.tmdb.org/t/p/w400${val.poster_path}" />
                                </div>
                                <div style="margin-left:10px;margin-right:15px">
                                    <h2 style="font-size:20px;margin-bottom: 8px;">${qtdCaract?val.title.substring(0,30)+'...':val.title.substring(0,30)}</h2>
                                    <p style="font-size:14px;margin-bottom: 5px;"><b style="color: gold;">Avalição: </b>${val.vote_average}</p>
                                    <p style="font-size:14px;">${val.overview.substring(0,100)}...</p>
                                </div>

                            `
                            qtdFilmeTerror++

                        }

                    }

                })

            })//FOREACH FILMES VALIDADOS PELO GÊNERO
            
            //MANDA ID DO FILME CLICADO PARA URL, ID UTILIZADA NA PÁGINA filmes/filme.html
            var filmeNowPlaying = document.querySelectorAll('.filmeBannerHome')
            filmeNowPlaying.forEach((value,index)=>{
                
                filmeNowPlaying[index].addEventListener('click',()=>{
                    window.location = 'filmes/filme.html?id='+value.id
                })

            })

        })//JSON DOS FILMES NOW_PLAYING

    })//FOREACH ALTERAR PÁGINA DA REQUISÇÃO

    var bannerHomeTop3 = document.querySelectorAll('.bannerHome-top3')
    const bannerHomeSliderBullets = document.querySelector('.bannerHomeSlider-bullets')

    //QUANTIDADE D BULLETS NO BANNER HOME
    for(let i = 0;i < bannerHomeTop3.length - 1;i++){
        
        if(i === 0){
            bannerHomeSliderBullets.innerHTML += `<span style="background-color:rgb(250,250,250);cursor:pointer;"></span>`
        }
        bannerHomeSliderBullets.innerHTML += `<span style="cursor:pointer;"></span>`

    }

    const qtdSpanBullets = document.querySelectorAll('.bannerHomeSlider-bullets span')

    //CLICK SLIDER BANNER HOME
    bannerHomeTop3.forEach((value,index)=>{

        qtdSpanBullets[index].addEventListener('click',()=>{

            for(let i = 0;i < bannerHomeTop3.length;i++){

                bannerHomeTop3[i].style.opacity = '0'
                bannerHomeTop3[i].style.zIndex = '15'
                qtdSpanBullets[i].style.backgroundColor = 'rgba(250,250,250,0.3)'

            }

            bannerHomeTop3[index].style.opacity = '1'
            bannerHomeTop3[index].style.zIndex = '20'
            qtdSpanBullets[index].style.backgroundColor = 'rgb(250,250,250)'

        })

    })

    //CRÔNOMETOR PARA ALTERAÇÃO DO SLIDER BANNER HOME
    var clickSlider = 1
    setInterval(()=>{
        qtdSpanBullets[clickSlider].click()
        clickSlider++
        if(clickSlider === qtdSpanBullets.length){
            clickSlider = 0
        }    
    },10000)

    
}//FUNÇÃO COM PARAMETRO, TRAZENDO LISTA DE GÊNEROS DE FILMES