const imagebox = document.getElementById("image-box");
const reload = document.querySelector('.reload-button');
const newImage = document.createElement('img');
const imageOutput = $("#image-list");
const imgbox = document.getElementById("img-box");
const emailInput = document.getElementById('assign-email');
const emailLabel = document.getElementById('email-label');
const emailButton = document.getElementById('assign-button');
const emailMessage = document.getElementById('email-message');
const assignedList = document.getElementById('assigned-list');
const assignedCont = document.getElementById('assigned');
let emaildb= [];
let counter = 0;
createImage();

// function to grab image from picsum and create an element to display it

function createImage() {

    let imgUrl = "https://picsum.photos/id/"+ randomNumber()+"/300";
    axios.get(imgUrl)
        .then(function (response) {            
            imagebox.insertBefore(newImage, imgbox);
            newImage.setAttribute(`class`, `randomImage`);
            newImage.setAttribute(`src`, imgUrl);
            newImage.setAttribute(`alt`, `Picsum Image`);
            
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
function randomNumber(){

    return Math.floor(Math.random() * 500) + 1;
}



 // email section
// This will validate the email and then assign the written email with the current image shown

function sameEmail (email){
    return emaildb.includes(email);
    
}

function addImageandEmail(email){
    
    emaildb.push(email)
    imageOutput.append( `<ul class="email-section">` +
                         `<li class= "email-title"> <h3>${email}</h3></p></li>`+ `</ul>` +`<ul  class ="email-image ${counter}">`+`<img class ="newImage" src="${newImage.getAttribute('src')}"> </ul>`);
    counter++


}

function addImgtolist(email){
    for( var i= 0; i < emaildb.length; i++){

        if(email === emaildb[i]){
            let img = document.createElement('img')
            img.src = newImage.getAttribute('src');
            img.setAttribute("class", "newImage");
            $('.email-image')[i].append(img);
        }
    }

}




function addEmailandImage() {
    const pulledEmail = emailInput.value;
  
    

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    if (!validateEmail(pulledEmail)) {
        emailMessage.classList.add('shown');
        emailInput.classList.add('error');
    } else if (validateEmail(pulledEmail)) {
        emailMessage.classList.remove('shown');
        emailInput.classList.remove('error');

        //check if email is the same as before
        if(sameEmail(pulledEmail)){
           //if it is, add onto the list and add onto the same ul
           addImgtolist(pulledEmail)
           
        } else{
            // if it isnt, make a new ul for that image
            addImageandEmail(pulledEmail)
            
        }
        
        createImage();

        

        
        

        

       

       
    }

}