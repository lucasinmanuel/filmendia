var bannerHomeTop3 = document.querySelectorAll('.bannerHome-top3')
const bannerHomeSliderBullets = document.querySelector('.bannerHomeSlider-bullets')

for(let i = 0;i < bannerHomeTop3.length - 1;i++){
    
    if(i === 0){
        bannerHomeSliderBullets.innerHTML += `<span style="background-color:rgb(250,250,250);cursor:pointer;"></span>`
    }
    bannerHomeSliderBullets.innerHTML += `<span style="cursor:pointer;"></span>`

}

const qtdSpanBullets = document.querySelectorAll('.bannerHomeSlider-bullets span')

bannerHomeTop3.forEach((value,index)=>{

    qtdSpanBullets[index].addEventListener('click',()=>{

        for(let i = 0;i < bannerHomeTop3.length;i++){

            bannerHomeTop3[i].style.opacity = '0'
            qtdSpanBullets[i].style.backgroundColor = 'rgba(250,250,250,0.3)'

        }

        bannerHomeTop3[index].style.opacity = '1'
        qtdSpanBullets[index].style.backgroundColor = 'rgb(250,250,250)'

    })

})

var clickSlider = 1
setInterval(()=>{
    qtdSpanBullets[clickSlider].click()
    clickSlider++
    if(clickSlider === qtdSpanBullets.length){
        clickSlider = 0
    }    
},10000)



