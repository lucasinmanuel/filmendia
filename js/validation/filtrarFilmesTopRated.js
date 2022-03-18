mudarPagina(1)

function mudarPagina(numPage){

    //REQUISIÇÃO DOS GÊNEROS DOS FILMES
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br', {
        method: 'GET'
    })
    .then(response=>response.json())
    .then((jsonGenres)=>{

        const listGenres = jsonGenres.genres
        mandarGenresIds(listGenres)

    })

    //REQUISIÇÃO DOS FILMES POPULARES POR PÁGINA
    function mandarGenresIds(listGenres){

        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=d9006a76b9606894cb5d01eda1af5904&language=pt-br&page='+numPage, {
        method: 'GET'
        })
        .then(response => response.json())
        .then((jsonTopRated)=>{

            const filmesTopRatedImages = document.querySelector('.filmesTopRated-images')
            filmesTopRatedImages.innerHTML = '' //RESET DE IMAGENS POR PÁGINA

            jsonTopRated.results.map((val)=>{

                var generos = []
                //ANALISA O GÊNERO DO FILME E MANDA PARA O ARRAY generos
                listGenres.forEach((value) => {
                
                    for(let i = 0;i < val.genre_ids.length;i++){
                        
                        if(val.genre_ids[i] === value.id){

                            generos.push(value.name)

                        }
                        
                    }

                });
                //FORMATANDO DATA AMERICANA PARA BRASILEIRA
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
                filmesTopRatedImages.innerHTML += `

                    <div style="width:33.3%;display:flex;margin-bottom:15px;background-color:#1E1E1E;padding:10px;">
                        <div style="width:45%;display:flex;align-items:center;">
                            <img id="${val.id}" class="filmeTopRated" style="width:100%;cursor:pointer;" alt="${val.title}" src="https://image.tmdb.org/t/p/w300${val.poster_path}" />
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

            })

            //ADICIONA O ID DO FILME A URL
            var filmesTopRatedPage = document.querySelectorAll('.filmeTopRated')
            filmesTopRatedPage.forEach((value,index)=>{

                filmesTopRatedPage[index].addEventListener('click',()=>{
                    window.location.href = 'filme.html?id='+value.id
                })

            })

            //MOSTRA A MUDANÇA DE PÁGINA VOLTAR
            var voltarPageUm = false
            var voltarPageDois = false
            var voltarPageDez = false
            if(jsonTopRated.page > 1){
                voltarPageUm = true
            }
            if(jsonTopRated.page > 2){
                voltarPageDois = true
            }
            if(jsonTopRated.page > 10){
                voltarPageDez = true
            }
            //MOSTRA A MUDANÇA DE PÁGINA
            const filmesPopularesPage = document.querySelector('.mudarPaginaTopRated')
            filmesPopularesPage.innerHTML = `

                <p class="pagTopRated backDez" style="cursor:pointer;opacity:0.6;">${voltarPageDez?jsonTopRated.page - 10:'*'}...</p>
                <p class="pagTopRated" style="cursor:pointer;opacity:0.6;">${voltarPageDois?jsonTopRated.page - 2:'*'}</p>
                <p class="pagTopRated" style="cursor:pointer;opacity:0.6;">${voltarPageUm?jsonTopRated.page - 1:'*'}</p>
                <p class="pagTopRated" style="border-bottom:2px solid gold;cursor:pointer;margin-top:2px;">${jsonTopRated.page}</p>
                <p class="pagTopRated" style="cursor:pointer;">${jsonTopRated.page + 1}</p>
                <p class="pagTopRated" style="cursor:pointer;">${jsonTopRated.page + 2}</p>
                <p class="pagTopRated skipDez" style="cursor:pointer;">...${jsonTopRated.page + 10}</p>
                
            `

            //CLICK NOS NUMEROS DAS PÁGINAS
            const clickNumPage = document.querySelectorAll('.pagTopRated')
            clickNumPage.forEach((valueNumPage,index)=>{

                clickNumPage[index].addEventListener('click',()=>{

                    if(valueNumPage.innerHTML.substring(0,1) === '*'){
                        return false
                    }

                    if(valueNumPage.classList.value === 'pagTopRated skipDez'){

                        //AVANÇAR DEZ PÁGINAS
                        let numPage = valueNumPage.innerHTML.substring(3)
                        mudarPagina(numPage)

                    }else if(valueNumPage.classList.value === 'pagTopRated backDez'){

                        //VOLTAR DE DEZ PÁGINAS
                        let numPage = valueNumPage.innerHTML.substring(0,2)
                        mudarPagina(numPage)

                    }else{

                        //AVANÇAR UMA PÁGINA
                        let numPage = valueNumPage.innerHTML
                        mudarPagina(numPage)

                    }
                    
                })

            })

        })//JSON FETCH

    }

}

//FILTRAR FILMES, MOSTRAR MENU DROPDOWN
const selectMenu = document.querySelector('.selectFiltro-menu')
const selectSubMenu = document.querySelector('.selectFiltro-subMenu')

selectMenu.addEventListener('click',()=>{

    if(selectSubMenu.style.display === 'none'){
        selectMenu.style.borderRadius = '0'
        selectMenu.style.borderTopLeftRadius = '2px'
        selectMenu.style.borderTopRightRadius = '2px'
        selectSubMenu.style.display = 'block'
    }else{
        selectMenu.style.borderRadius = '2px'
        selectSubMenu.style.display = 'none'
    }
    
})

const selectSubMenuItems = document.querySelectorAll('.selectFiltro-subMenu li')

selectSubMenuItems.forEach((value,index)=>{

    selectSubMenuItems[index].addEventListener('click',()=>{

        if(value.innerHTML === 'Popularidade'){
            document.location.href = 'filmes_populares.html'
        }else if(value.innerHTML === 'Recentes'){
            document.location.href = '/categorias.html'
        }else{

        }

    })

})


