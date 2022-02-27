function clickPreviewArrows(){

    function alterarSliderBullets(indexPopular,indexTopRated){

        const previewPopularBulletSingle = document.querySelectorAll('.previewPopular-bullets span')
        const previewTopRatedBulletSingle = document.querySelectorAll('.previewTopRated-bullets span')
        for(let i = 0;i < 3;i++){
            previewPopularBulletSingle[i].style.backgroundColor = 'white'
            previewTopRatedBulletSingle[i].style.backgroundColor = 'white'
        }
        previewPopularBulletSingle[indexPopular].style.backgroundColor = 'gold'
        previewTopRatedBulletSingle[indexTopRated].style.backgroundColor = 'gold'

    }

    const previewPopularArrow = document.querySelectorAll('.previewPopular-texts span.setaSpan')
    const previewPopularImages = document.querySelector('.previewPopular-images')
    var clickPreviewPopular = 0

    previewPopularArrow[0].addEventListener('click',()=>{
        //SETA ESQUERDA PREVIEW POPULAR
        if(clickPreviewPopular === 2){
            previewPopularImages.style.right = previewPopularImages.scrollWidth / 3+'px'
            clickPreviewPopular = 1
        }else if(clickPreviewPopular === 1){
            previewPopularImages.style.right = 0
            clickPreviewPopular = 0
        }
        alterarSliderBullets(clickPreviewPopular,clickPreviewTopRated)
    })
    previewPopularArrow[1].addEventListener('click',()=>{
        //SETA DIREITA PREVIEW POPULAR
        if(clickPreviewPopular === 0){
            previewPopularImages.style.right = previewPopularImages.scrollWidth / 3+'px'
            clickPreviewPopular = 1
        }else if(clickPreviewPopular === 1){
            previewPopularImages.style.right = (previewPopularImages.scrollWidth / 3) * 2+'px'
            clickPreviewPopular = 2
        }
        alterarSliderBullets(clickPreviewPopular,clickPreviewTopRated)
    })

    const previewTopRatedArrow = document.querySelectorAll('.previewTopRated-texts span.setaSpan')
    const previewTopRatedImages = document.querySelector('.previewTopRated-images')
    var clickPreviewTopRated = 0
    
    previewTopRatedArrow[0].addEventListener('click',()=>{
        //SETA ESQUERDA PREVIEW TOP RATED
        if(clickPreviewTopRated === 2){
            previewTopRatedImages.style.right = previewTopRatedImages.scrollWidth / 3+'px'
            clickPreviewTopRated = 1
        }else if(clickPreviewTopRated === 1){
            previewTopRatedImages.style.right = 0
            clickPreviewTopRated = 0
        }
        alterarSliderBullets(clickPreviewPopular,clickPreviewTopRated)
    })
    previewTopRatedArrow[1].addEventListener('click',()=>{
        //SETA DIREITA PREVIEW TOP RATED
        if(clickPreviewTopRated === 0){
            previewTopRatedImages.style.right = previewTopRatedImages.scrollWidth / 3+'px'
            clickPreviewTopRated = 1
        }else if(clickPreviewTopRated === 1){
            previewTopRatedImages.style.right = (previewTopRatedImages.scrollWidth / 3) * 2+'px'
            clickPreviewTopRated = 2
        }
        alterarSliderBullets(clickPreviewPopular,clickPreviewTopRated)
    })
    
}