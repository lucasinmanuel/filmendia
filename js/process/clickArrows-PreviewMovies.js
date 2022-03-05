//SESSÃO DE FILMES POPULARES
const previewPopularImages = document.querySelector('.previewPopular-images')
const previewPopularBullet = document.querySelectorAll('.previewPopular-bullets span')

previewPopularBullet.forEach((value,index)=>{

    previewPopularBullet[index].addEventListener('click',()=>{

        for(let i = 0;i < 3;i++){
            previewPopularBullet[i].style.backgroundColor = 'rgba(250,250,250,0.3)'
        }

        previewPopularBullet[index].style.backgroundColor = 'rgba(250,250,250,1)'

        if(index === 0){
            previewPopularImages.style.marginLeft = 0
        }else if(index === 1){
            previewPopularImages.style.marginLeft = '-'+previewPopularImages.scrollWidth / 3+'px'
        }else if(index === 2){
            previewPopularImages.style.marginLeft = '-'+(previewPopularImages.scrollWidth / 3)*2+'px'
        }

    })
    
})

//SESSÃO DE FILMES MAIS BEM AVALIADOS
const previewTopRatedImages = document.querySelector('.previewTopRated-images')
const previewTopRatedBullet = document.querySelectorAll('.previewTopRated-bullets span')

previewTopRatedBullet.forEach((value,index)=>{

    previewTopRatedBullet[index].addEventListener('click',()=>{

        for(let i = 0;i < 3;i++){
            previewTopRatedBullet[i].style.backgroundColor = 'rgba(250,250,250,0.3)'
        }

        previewTopRatedBullet[index].style.backgroundColor = 'rgba(250,250,250,1)'
 
        if(index === 0){
            previewTopRatedImages.style.marginLeft = 0
        }else if(index === 1){
            previewTopRatedImages.style.marginLeft = '-'+previewTopRatedImages.scrollWidth / 3+'px'
        }else if(index === 2){
            previewTopRatedImages.style.marginLeft = '-'+(previewTopRatedImages.scrollWidth / 3)*2+'px'
        }
      
    })

})


