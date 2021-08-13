const imagebox = document.getElementById("image-box");
const refresh = document.querySelector('.refresh');

axios.get("https://picsum.photos/200/300")
.then(function(response) {
    console.log(response);
})