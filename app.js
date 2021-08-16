const imagebox = document.getElementById("image-box");
const refresh = document.querySelector('.refresh');
const newImage = document.createElement('img');
const topLoader = document.getElementById('top-loader-container');


function createImage(){
axios.get("https://picsum.photos/200/300")
.then(function(response) {
    const picID = response.headers['picsum-id'];
    let picUrl = `https://picsum.photos/id/${picID}/500`;
    imagebox.insertBefore(newImage, refresh);
    newImage.setAttribute(`class`, `randomImage`);
    newImage.setAttribute(`src`, picUrl);
    newImage.setAttribute(`alt`, `Picsum Image`);
    topLoader.classList.add('loading');
    console.log(response);
})
.catch(function(error) {
    console.log(error);
})
.finally(function(response){
    topLoader.classList.remove('loading');
});
}

createImage();


refresh.addEventListener('click', function() {
    topLoader.classList.add('loading');
    createImage();
});