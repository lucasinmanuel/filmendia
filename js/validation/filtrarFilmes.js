initconfig()
function initconfig(){

    const h1TitlePage = document.querySelector('.filmesFiltro h1')
    const clickMenuItem = document.querySelector('.selectFiltro-menu > li')
    const clickSubMenuItems = document.querySelectorAll('.selectFiltro-subMenu li')
 
    if(window.location.href.split('=')[1] === 'popular'){

        var filterInitial = 'popular'
        h1TitlePage.innerHTML = 'Todos os Filmes Populares'
        clickMenuItem.innerHTML = 'Popularidade'
        clickSubMenuItems[0].innerHTML = 'Bem avaliados'
        clickSubMenuItems[1].innerHTML = 'Recentes'

    }else if(window.location.href.split('=')[1] === 'top_rated'){

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

    //REQUISIÇÃO DA LISTA DE GÊNEROS DOS FILMES
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response=>response.json())
    .then((jsonGenres)=>{
        
        fetchFilmes(1,filterInitial,jsonGenres.genres)
        filterDropDown(jsonGenres.genres,filterInitial)

    })

}

function fetchFilmes(numPage,filterInitial,listGenres){

    //REQUISIÇÃO DOS FILMES FILTRADOS POR RECENTES, BEM AVALIADOS E POPULARIDADE
    fetch(`https://api.themoviedb.org/3/movie/${filterInitial}?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page=${numPage}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then((jsonFilmes)=>{
        
        const filmesRecentesImages = document.querySelector('.filmesRecentes-images')
        if(document.querySelector('.checkBox-ativado')){
            
        }else{
            filmesRecentesImages.innerHTML = '' //RESET DE IMAGENS POR PÁGINA
        }
        
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
            var dataComplet = dataDia+'/'+dataMes+'/'+dataAno

            //ADCIONANDO RETICÊNCIAS A SINOPSE E TITULO
            var qtdCaractSinopse = false
            var qtdCaractTitle = false
            if(val.overview.length > 90){
                qtdCaractSinopse = true
            }
            if(val.title.length > 15){
                qtdCaractTitle = true
            }

            var urlGenresIdSplit = window.location.href.split('-')
            if(urlGenresIdSplit.length > 1){
                
                filterGenre(val,dataComplet,qtdCaractSinopse,qtdCaractTitle,generos)

            }else{
                console.log('oiiiii'+val.id)
                filmesRecentesImages.innerHTML += `

                    <div style="width:33.3%;display:flex;margin-bottom:15px;background-color:#1E1E1E;padding:10px;">
                        <div style="width:45%;display:flex;align-items:center;">
                            <img id="${val.id}" class="filmeRecentes" style="width:100%;cursor:pointer;" alt="${val.title}" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
                        </div>
                        <div style="width:55%;padding: 0 10px;">
                            <h2 style="font-size:17px;margin-bottom:5px;">${qtdCaractTitle?val.title.substring(0,15)+'...':val.title}</h2>
                            <p style="font-size:14px;"><b style="color:#c1c1c1;">Data de lançamento: </b>${dataComplet}</p>
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

        })//ADCIONANDO OS FILMES E VALIDANDO OS GÊNEROS

        function filterGenre(infoFilme,dataFilm,sinopseRetic,titleRetic,genresFilme){

            var urlGenresIdSplit = window.location.href.split('-')
            for(let i = 0;i < infoFilme.genre_ids.length;i++){
            
                if(infoFilme.genre_ids[i] == urlGenresIdSplit[1]){
                    
                    filmesRecentesImages.innerHTML += `

                        <div class="filmesSingle" style="width:33.3%;display:flex;margin-bottom:15px;background-color:#1E1E1E;padding:10px;">
                            <div style="width:45%;display:flex;align-items:center;">
                                <img id="${infoFilme.id}" class="filmeRecentes" style="width:100%;cursor:pointer;" alt="${infoFilme.title}" src="https://image.tmdb.org/t/p/w300${infoFilme.poster_path}" />
                            </div>
                            <div style="width:55%;padding: 0 10px;">
                                <h2 style="font-size:17px;margin-bottom:5px;">${titleRetic?infoFilme.title.substring(0,15)+'...':infoFilme.title}</h2>
                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Data de lançamento: </b>${dataFilm}</p>
                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Avalição: </b>${infoFilme.vote_average}</p>
                                <p style="font-size:14px;"><b style="color:#c1c1c1;">Gênero: </b>${genresFilme.map((value)=>{
                                    return " "+value
                                })}</p>
                                <h3 style="font-size:14px;margin:8px 0;">SINOPSE</h3>
                                <p style="font-size:14px;">${sinopseRetic?infoFilme.overview.substring(0,80)+'...':infoFilme.overview}</p>
                            </div>
                        </div>

                    ` 

                }
                
            }
            
        }

        mudarPagina()

        //ADICIONA O ID DO FILME A URL
        var filmesRecentes = document.querySelectorAll('.filmeRecentes')
        filmesRecentes.forEach((value,index)=>{

            filmesRecentes[index].addEventListener('click',()=>{
                window.location.href = 'filmes/filme.html?id='+value.id
            })
            
        })

        //AUTO COMPLETAR CASO A QUATIDADE DE FILMES SEJA MENOR QUE 6
        var qtdFilmesSingle = document.querySelectorAll('.filmesSingle').length
        if(qtdFilmesSingle < 6 && document.querySelector('.checkBox-ativado')){

            var mostrarMais = document.querySelector('.mostrarMais')
            mostrarMais.click()

        }
        
        function mudarPagina(){

            if(document.querySelector('.checkBox-ativado')){

                const mudarPage = document.querySelector('.mudarPaginaRecentes')
                mudarPage.innerHTML = `
                
                    <span class="mostrarMais" style="cursor:pointer;font-weight:bold;font-size:15px;">Mostrar mais...</span>
                
                `

                document.querySelector('.mostrarMais').addEventListener('click',()=>{

                    fetchFilmes(parseInt(numPage) + 1,filterInitial,listGenres)  
                
                })

            }else{

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

                const mudarPage = document.querySelector('.mudarPaginaRecentes')
                mudarPage.innerHTML = `

                    <p class="pagRecentes backDez" style="cursor:pointer;opacity:0.6;">${voltarPageDez?numPage - 10:'*'}...</p>
                    <p class="pagRecentes" style="cursor:pointer;opacity:0.6;">${voltarPageDois?numPage - 2:'*'}</p>
                    <p class="pagRecentes" style="cursor:pointer;opacity:0.6;">${voltarPageUm?numPage - 1:'*'}</p>
                    <p class="pagRecentes" style="border-bottom:2px solid gold;cursor:pointer;margin-top:2px;">${numPage}</p>
                    <p class="pagRecentes" style="cursor:pointer;">${parseInt(numPage) + 1}</p>
                    <p class="pagRecentes" style="cursor:pointer;">${parseInt(numPage) + 2}</p>
                    <p class="pagRecentes skipDez" style="cursor:pointer;">...${parseInt(numPage) + 10}</p>
                    
                `

                //CLICK NOS NúMEROS DAS PÁGINAS
                const clickNumPage = document.querySelectorAll('.pagRecentes')
                clickNumPage.forEach((valueNumPage,index)=>{

                    clickNumPage[index].addEventListener('click',()=>{

                        if(valueNumPage.innerHTML.substring(0,1) === '*'){
                            return false
                        }

                        if(valueNumPage.classList.value === 'pagRecentes skipDez'){

                            //AVANÇAR PÁGINAS
                            let numPageClick = valueNumPage.innerHTML.substring(3)
                            fetchFilmes(numPageClick,filterInitial,listGenres)         

                        }else if(valueNumPage.classList.value === 'pagRecentes backDez'){

                            //VOLTAR PÁGINAS
                            if(valueNumPage.innerHTML.length === 4){

                                let numPageClick = valueNumPage.innerHTML.substring(0,1)
                                fetchFilmes(numPageClick,filterInitial,listGenres)

                            }else if(valueNumPage.innerHTML.length === 5){

                                let numPageClick = valueNumPage.innerHTML.substring(0,2)
                                fetchFilmes(numPageClick,filterInitial,listGenres)

                            }else{

                                let numPageClick = valueNumPage.innerHTML.substring(0,3)
                                fetchFilmes(numPageClick,filterInitial,listGenres)

                            }

                        }else{

                            //PÁGINA ATUAL
                            let numPageClick = valueNumPage.innerHTML
                            fetchFilmes(numPageClick,filterInitial,listGenres)

                        }
                        
                    })

                })

            }

        }//FUNCTION mudarPagina()

    })//JSON FETCH FILMES

}

function filterDropDown(listGenres,filterInitial){

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
                fetchFilmes(1,'popular')

            }else if(value.innerHTML === 'Bem avaliados'){

                clickSubMenuItems[index].innerHTML = clickMenuItem.innerHTML
                clickMenuItem.innerHTML = 'Bem avaliados'
                h1TitlePage.innerHTML = 'Todos os Filmes Bem Avaliados'
                document.location.href = '?filter=top_rated'
                fetchFilmes(1,'top_rated')

            }else if(value.innerHTML === 'Recentes'){

                clickSubMenuItems[index].innerHTML = clickMenuItem.innerHTML
                clickMenuItem.innerHTML = 'Recentes'
                h1TitlePage.innerHTML = 'Todos os Filmes Recentes'
                document.location.href = 'categorias.html'
                fetchFilmes(1,'now_playing')
                
            }else{
                document.location.href = '404.html'
            }

        })

    })

    //ADCIONANDO OS CHECK BOX FILTROS DINAMICAMENTE 
    var urlGenresIdSplit = window.location.href.split('-')
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

}






