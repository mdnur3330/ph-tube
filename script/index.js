const lodCategoryBtn = ()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => showCategorieBtn(data.categories))

}
const lodVideos = ()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => showVideos(data.videos))
}

const lodeSearchVedios = (searchKey)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchKey}`)
    .then(res => res.json())
    .then(data =>showVideos(data.videos))
}
const showCategoriesVideos = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => showVideos(data.category))
}
const showCategorieBtn = (categoriesBtn)=>{
    const categoryContainer = document.getElementById("category-id")
    categoriesBtn.forEach(btn => {
        const div = document.createElement("div")
        div.innerHTML=`
        <button onclick="showCategoriesVideos(${btn.category_id})" class="btn btn-lg hover:bg-red-600 hover:text-white">${btn.category}</button>
        `
        categoryContainer.append(div)
    });
    const btnLg = document.querySelectorAll(".btn-lg")
     btnLg.forEach(btn => {
    btn.addEventListener("click",(e)=>{
        btnLg.forEach(btn => btn.classList.remove('activ'))
        e.target.classList.add("activ")
    })
     })
    
    
}
const showVideos =(videos)=>{
    const videosContainer = document.getElementById("videos-container")
    videosContainer.innerHTML = "";
    if(videos.length  == 0){
        videosContainer.innerHTML = `
        <div class="col-span-full items-center space-y-5 text-center text-3xl font-bold">
        <img class="mx-auto" src="/img/Icon.png" alt="">
        <h2>Oops!! Sorry, There is no <br> content here</h2>
        </div>
        `;
        return;
    }
    videos.forEach(video => {
    const div = document.createElement("div")
    div.innerHTML = `
          <div class="card w-96 overflow-hidden">
            <figure class="">
              <img
                src="${video.thumbnail}"
                alt="${video.title}"
                class="w-full h-[200px] object-cover rounded-xl" />
            </figure>
          </div>
        <div class="flex gap-6 py-5">
            <div>
            <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
           </div>
            </div>
            <div class ="space-y-2">
                <h2 class ="text-3xl font-medium">${video.title}</h2>
                <p class="flex  gap-2 text-gray-800">${video.authors[0].profile_name} 
                ${video.authors[0].verified === true ? `<img
                    class="w-5 h-5"
                    src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                    alt=""/>` : ''}</p>
                <p class="text-gray-800">${video.others.views}</p>
            </div>
        </div>


    

    `;
    videosContainer.append(div)
    })
}


// search functionalete

document.getElementById("search").addEventListener("keyup",(e)=>{
    const inputValue = e.target.value;
    lodeSearchVedios(inputValue);
})

lodCategoryBtn()