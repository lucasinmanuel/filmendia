const previewPopularBullet = document.querySelectorAll('.previewPopular-bullets span')
const previewTopRatedBullet = document.querySelectorAll('.previewTopRated-bullets span')

window.addEventListener('resize',()=>{
    
    previewPopularBullet[0].click()
    previewTopRatedBullet[0].click()

    setTimeout(()=>{
        window.location.reload()
    },1000)

})