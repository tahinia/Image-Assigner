"use strict";

var imagebox = document.getElementById("image-box");
var reload = document.querySelector('.reload-button');
var newImage = document.createElement('img');
var imageOutput = $("#image-list");
var imgbox = document.getElementById("img-box");
var emailInput = document.getElementById('assign-email');
var emailLabel = document.getElementById('email-label');
var emailButton = document.getElementById('assign-button');
var emailMessage = document.getElementById('email-message');
var assignedList = document.getElementById('assigned-list');
var assignedCont = document.getElementById('assigned');
var emaildb = [];
var counter = 0;
createImage(); // function to grab image from picsum and create an element to display it

function createImage() {
  var imgUrl = "https://picsum.photos/id/" + randomNumber() + "/300";
  axios.get(imgUrl).then(function (response) {
    imagebox.insertBefore(newImage, imgbox);
    newImage.setAttribute("class", "randomImage");
    newImage.setAttribute("src", imgUrl);
    newImage.setAttribute("alt", "Picsum Image");
    console.log(response);
  })["catch"](function (error) {
    console.log(error);
  });
}

function randomNumber() {
  return Math.floor(Math.random() * 500) + 1;
} // action to create a new image when clicking on the webpage through reload
// reload.addEventListener('click', function () {
//     createImage();
// });
// email section
// This will validate the email and then assign the written email with the current image shown


function sameEmail(email) {
  return emaildb.includes(email);
}

function addImageandEmail(email) {
  emaildb.push(email);
  imageOutput.append("<ul class=\"email-section\">" + "<li class= \"email-title\"> ".concat(email, "</li>") + "</ul>" + "<ul  class =\"email-image ".concat(counter, "\">") + "<img class =\"newImage\" src=\"".concat(newImage.getAttribute('src'), "\"> </ul>"));
  counter++;
}

function addImgtolist(email) {
  for (var i = 0; i < emaildb.length; i++) {
    if (email === emaildb[i]) {
      var img = document.createElement('img');
      img.src = newImage.getAttribute('src');
      img.setAttribute("class", "newImage");
      $('.email-image')[i].append(img);
    }
  }
}

function addEmailandImage() {
  var pulledEmail = emailInput.value;

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  if (!validateEmail(pulledEmail)) {
    emailMessage.classList.add('shown');
    emailInput.classList.add('error');
  } else if (validateEmail(pulledEmail)) {
    emailMessage.classList.remove('shown');
    emailInput.classList.remove('error'); //check if email is the same as before

    if (sameEmail(pulledEmail)) {
      //if it is, add onto the list and add onto the same div 
      addImgtolist(pulledEmail);
    } else {
      addImageandEmail(pulledEmail);
    }

    createImage(); // if it isnt, make a new div for that image
  }
}