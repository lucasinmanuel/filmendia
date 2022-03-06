window.addEventListener('resize',()=>{
    
    previewPopularBullet[0].click()
    previewTopRatedBullet[0].click()

    setTimeout(()=>{
        window.location.reload()
    },1000)

})