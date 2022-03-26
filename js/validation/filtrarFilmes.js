initconfig()
function initconfig(){

    const h1TitlePage = document.querySelector('.filmesFiltro h1')
    const clickMenuItem = document.querySelector('.selectFiltro-menu > li')
    const clickSubMenuItems = document.querySelectorAll('.selectFiltro-subMenu li')

    if(window.location.href.substring(45,52) === 'popular'){

        var filterInitial = 'popular'
        h1TitlePage.innerHTML = 'Todos os Filmes Populares'
        clickMenuItem.innerHTML = 'Popularidade'
        clickSubMenuItems[0].innerHTML = 'Bem avaliados'
        clickSubMenuItems[1].innerHTML = 'Recentes'

    }else if(window.location.href.substring(45,54) === 'top_rated'){

        var filterInitial = 'top_rated'
        h1TitlePage.innerHTML = 'Todos os Filmes Bem Avaliados'
        clickMenuItem.innerHTML = 'Bem avaliados'
        clickSubMenuItems[0].innerHTML = 'Popularidade'
        clickSubMenuItems[1].innerHTML = 'Recentes'

    }else{

        var filterInitial = 'now_playing'
        h1TitlePage.innerHTML = 'Todos os Filmes Recentes'
        clickMenuItem.innerHTML = 'Recentes'
        clickSubMenuItems[0].innerHTML = 'Bem avaliados'
        clickSubMenuItems[1].innerHTML = 'Popularidade'

    }

    refazerFetch(1,filterInitial)

    filterDropDown()

}

function refazerFetch(numPage,filtroFilme){

    //REQUISIÇÃO DA LISTA DE GÊNEROS DOS FILMES
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response=>response.json())
    .then((jsonGenres)=>{
        
        const listGenres = jsonGenres.genres
        mandarGenresIds(listGenres)

    })

    function mandarGenresIds(listGenres){

        //ADCIONANDO OS CHECK BOX FILTROS DINAMICAMENTE 
        var urlGenresIdSplit = window.location.href.split('-')
        const subMenuGenres = document.querySelector('ul.selectFiltroGenres-subMenu')
        subMenuGenres.innerHTML = '' //RESET DE FILTROS POR PÁGINA
        
        listGenres.forEach((value)=>{

            subMenuGenres.innerHTML += `
            
                <li><div class="checkBox" id="${value.id}"></div>${value.name}</li>
    
            `

            //VALIDAÇÃO PARA MARCAR OS CHECK BOX ATIVOS VIA URL AO RECARREGAR A PÁGINA
            for(let i = 1;i < urlGenresIdSplit.length;i++){

                if(window.location.href.includes('?') && urlGenresIdSplit[i] == value.id){
                    
                    document.getElementById(value.id).className = 'checkBox-ativado'

                }

            }
            
        })
        
        //CLIQUE CHECK BOX PARA ATIVAR, ADCIONANDO ID-GÊNERO A URL E ESTILIZANDO
        const clickFiltroBullet = document.querySelectorAll('.checkBox')
        const clickFiltroBulletActive = document.querySelectorAll('.checkBox-ativado')
        
        clickFiltroBullet.forEach((valueGenre,index)=>{

            clickFiltroBullet[index].addEventListener('click',()=>{
                
                for(let i = 0;i < clickFiltroBulletActive.length;i++){
                    clickFiltroBulletActive[i].className = 'checkBox'
                } 

                if(window.location.href.includes('popular')){

                    clickFiltroBullet[index].className = 'checkBox-ativado'
                    document.location.href = '?filter=popular&genre-'+valueGenre.id

                }else if(window.location.href.includes('top_rated')){

                    clickFiltroBullet[index].className = 'checkBox-ativado'
                    document.location.href = '?filter=popular&genre-'+valueGenre.id

                }else{

                    clickFiltroBullet[index].className = 'checkBox-ativado'
                    document.location.href = '?filter=genre-'+valueGenre.id

                }

            })

        })
        
        //CLIQUE CHECK BOX PARA DESATIVAR, REMOVENDO ID-GÊNERO DA URL E ESTILIZANDO
        clickFiltroBulletActive.forEach((valueGenre,index)=>{

            clickFiltroBulletActive[index].addEventListener('click',()=>{

                if(window.location.href.includes('?')){

                    if(urlGenresIdSplit.length === 2){

                        clickFiltroBulletActive[index].className = 'checkBox'
                        if(filterInitial != 'now_playing'){
                            window.location.href = 'categorias.html?filter='+filterInitial
                        }else{
                            window.location.href = 'categorias.html'
                        }  

                    }else{

                        clickFiltroBulletActive[index].className = 'checkBox'

                        urlGenresIdSplit.forEach((value)=>{
                            if(value == valueGenre.id){
                                
                                window.location.href = urlGenresIdSplit.filter((el)=>{
                                    return el != valueGenre.id
                                }).join('-')
                                
                            }
                        })

                    }

                }

            })

        })
        
        //REQUISIÇÃO DOS FILMES FILTRADOS POR RECENTES, BEM AVALIADOS E POPULARIDADE
        fetch(`https://api.themoviedb.org/3/movie/${filtroFilme}?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page=${numPage}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then((jsonFilmes)=>{

            console.log(jsonFilmes.page)
            const filmesRecentesImages = document.querySelector('.filmesRecentes-images')
            filmesRecentesImages.innerHTML = '' //RESET DE IMAGENS POR PÁGINA 
            
            jsonFilmes.results.map((val)=>{
                
                var generos = []
                //ANALISA O GÊNERO DO FILME E MANDA PARA O ARRAY generos
                listGenres.forEach((valueList) => {
                
                    for(let i = 0;i < val.genre_ids.length;i++){
                        
                        if(val.genre_ids[i] === valueList.id){

                            generos.push(valueList.name)

                        }
                        
                    }

                });

                //FORMATANDO DATA EM FORMATO AMERICANO
                var dataAmericanaSplit = val.release_date.split('-')
                var dataDia = dataAmericanaSplit[2]
                var dataMes = dataAmericanaSplit[1]
                var dataAno = dataAmericanaSplit[0]

                //ADCIONANDO RETICÊNCIAS A SINOPSE E TITULO
                var qtdCaractSinopse = false
                var qtdCaractTitle = false
                if(val.overview.length > 90){
                    qtdCaractSinopse = true
                }
                if(val.title.length > 15){
                    qtdCaractTitle = true
                }

                if(urlGenresIdSplit.length > 1){
                    
                    urlGenresIdSplit.forEach((value,index)=>{

                        if(index > 0){
                            
                            for(let i = 0;i < val.genre_ids.length;i++){
                            
                                if(val.genre_ids[i] == value && document.querySelectorAll('.filmesSingle').length < 20){
        
                                    filmesRecentesImages.innerHTML += `
    
                                        <div class="filmesSingle" style="width:33.3%;display:flex;margin-bottom:15px;background-color:#1E1E1E;padding:10px;">
                                            <div style="width:45%;display:flex;align-items:center;">
                                                <img id="${val.id}" class="filmeRecentes" style="width:100%;cursor:pointer;" alt="${val.title}" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                                            </div>
                                            <div style="width:55%;padding: 0 10px;">
                                                <h2 style="font-size:17px;margin-bottom:5px;">${qtdCaractTitle?val.title.substring(0,15)+'...':val.title}</h2>
                                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Data de lançamento: </b>${dataDia+'/'+dataMes+'/'+dataAno}</p>
                                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Avalição: </b>${val.vote_average}</p>
                                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Gênero: </b>${generos.map((value)=>{
                                                    return " "+value
                                                })}</p>
                                                <h3 style="font-size:14px;margin:8px 0;">SINOPSE</h3>
                                                <p style="font-size:14px;">${qtdCaractSinopse?val.overview.substring(0,80)+'...':val.overview}</p>
                                            </div>
                                        </div>
    
                                    `      
        
                                }
                                
                            }
    
                        }
    
                    })

                }else{

                    filmesRecentesImages.innerHTML += `

                        <div style="width:33.3%;display:flex;margin-bottom:15px;background-color:#1E1E1E;padding:10px;">
                            <div style="width:45%;display:flex;align-items:center;">
                                <img id="${val.id}" class="filmeRecentes" style="width:100%;cursor:pointer;" alt="${val.title}" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                            </div>
                            <div style="width:55%;padding: 0 10px;">
                                <h2 style="font-size:17px;margin-bottom:5px;">${qtdCaractTitle?val.title.substring(0,15)+'...':val.title}</h2>
                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Data de lançamento: </b>${dataDia+'/'+dataMes+'/'+dataAno}</p>
                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Avalição: </b>${val.vote_average}</p>
                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Gênero: </b>${generos.map((value)=>{
                                    return " "+value
                                })}</p>
                                <h3 style="font-size:14px;margin:8px 0;">SINOPSE</h3>
                                <p style="font-size:14px;">${qtdCaractSinopse?val.overview.substring(0,80)+'...':val.overview}</p>
                            </div>
                        </div>

                    `

                }

            })//ADCIONANDO OS FILMES E VALIDANDO OS GÊNEROS POR CADA PÁGINA

            //ADICIONA O ID DO FILME A URL
            var filmesRecentes = document.querySelectorAll('.filmeRecentes')
            filmesRecentes.forEach((value,index)=>{

                filmesRecentes[index].addEventListener('click',()=>{
                    window.location.href = 'filmes/filme.html?id='+value.id
                })

            })

            //MOSTRA A MUDANÇA DE PÁGINA
            var voltarPageUm = false
            var voltarPageDois = false
            var voltarPageDez = false
            if(numPage > 1){
                voltarPageUm = true
            }
            if(numPage > 2){
                voltarPageDois = true
            }
            if(numPage > 10){
                voltarPageDez = true
            }

            const filmesPopularesPage = document.querySelector('.mudarPaginaRecentes')
            filmesPopularesPage.innerHTML = `

                <p class="pagRecentes backDez" style="cursor:pointer;opacity:0.6;">${voltarPageDez?numPage - 10:'*'}...</p>
                <p class="pagRecentes" style="cursor:pointer;opacity:0.6;">${voltarPageDois?numPage - 2:'*'}</p>
                <p class="pagRecentes" style="cursor:pointer;opacity:0.6;">${voltarPageUm?numPage - 1:'*'}</p>
                <p class="pagRecentes" style="border-bottom:2px solid gold;cursor:pointer;margin-top:2px;">${numPage}</p>
                <p class="pagRecentes" style="cursor:pointer;">${parseInt(numPage) + 1}</p>
                <p class="pagRecentes" style="cursor:pointer;">${parseInt(numPage) + 2}</p>
                <p class="pagRecentes skipDez" style="cursor:pointer;">...${parseInt(numPage) + 10}</p>
                
            `

            //CLICK NOS NUMEROS DAS PÁGINAS
            const clickNumPage = document.querySelectorAll('.pagRecentes')
            clickNumPage.forEach((valueNumPage,index)=>{

                clickNumPage[index].addEventListener('click',()=>{

                    if(valueNumPage.innerHTML.substring(0,1) === '*'){
                        return false
                    }

                    if(valueNumPage.classList.value === 'pagRecentes skipDez'){

                        //AVANÇAR 10 PÁGINAS
                        let numPageClick = valueNumPage.innerHTML.substring(3)
                        refazerFetch(numPageClick,filtroFilme)         

                    }else if(valueNumPage.classList.value === 'pagRecentes backDez'){

                        if(valueNumPage.innerHTML.length === 5){

                            //VOLTAR 10 PÁGINAS
                            let numPageClick = valueNumPage.innerHTML.substring(0,2)
                            refazerFetch(numPageClick,filtroFilme)

                        }else{

                            //VOLTAR 100 PÁGINAS
                            let numPageClick = valueNumPage.innerHTML.substring(0,3)
                            refazerFetch(numPageClick,filtroFilme)

                        }

                    }else{

                        //AVANÇAR E VOLTAR 1 e 2 PÁGINAS
                        let numPageClick = valueNumPage.innerHTML
                        refazerFetch(numPageClick,filtroFilme)

                    }
                    
                })

            })

        })//JSON FETCH FILMES

    }//FUNCTION mandarGenresIds

}

function filterDropDown(){

    //MOSTRAR MENU DROPDOWN DE FILTROS
    const clickMenu = document.querySelector('ul.selectFiltro-menu')
    const clickSubMenu = document.querySelector('ul.selectFiltro-subMenu')
    const subMenuGenres = document.querySelector('ul.selectFiltroGenres-subMenu')
    clickMenu.addEventListener('click',()=>{

        if(clickSubMenu.style.display === 'none'){

            clickMenu.style.borderRadius = '0'
            clickMenu.style.borderTopLeftRadius = '2px'
            clickMenu.style.borderTopRightRadius = '2px'
            clickSubMenu.style.display = 'block'
            subMenuGenres.style.display = 'block'

        }else{

            clickMenu.style.borderRadius = '2px'
            clickSubMenu.style.display = 'none'
            subMenuGenres.style.display = 'none'

        }
        
    })
    subMenuGenres.addEventListener('click',(e)=>{
        e.stopPropagation()
    })

    //ALTERAR FILTRO RECENTES/POPULARIDADE/BEM AVALIADOS
    const h1TitlePage = document.querySelector('.filmesFiltro h1')
    const clickMenuItem = document.querySelector('.selectFiltro-menu > li')
    const clickSubMenuItems = document.querySelectorAll('.selectFiltro-subMenu li')
    clickSubMenuItems.forEach((value,index)=>{

        clickSubMenuItems[index].addEventListener('click',()=>{

            if(value.innerHTML === 'Popularidade'){

                clickSubMenuItems[index].innerHTML = clickMenuItem.innerHTML
                clickMenuItem.innerHTML = 'Popularidade'
                h1TitlePage.innerHTML = 'Todos os Filmes Populares'
                document.location.href = '?filter=popular'
                refazerFetch(1,'popular')

            }else if(value.innerHTML === 'Bem avaliados'){

                clickSubMenuItems[index].innerHTML = clickMenuItem.innerHTML
                clickMenuItem.innerHTML = 'Bem avaliados'
                h1TitlePage.innerHTML = 'Todos os Filmes Bem Avaliados'
                document.location.href = '?filter=top_rated'
                refazerFetch(1,'top_rated')

            }else if(value.innerHTML === 'Recentes'){

                clickSubMenuItems[index].innerHTML = clickMenuItem.innerHTML
                clickMenuItem.innerHTML = 'Recentes'
                h1TitlePage.innerHTML = 'Todos os Filmes Recentes'
                document.location.href = 'categorias.html'
                refazerFetch(1,'now_playing')
                
            }else{
                document.location.href = '404.html'
            }

        })

    })

}






