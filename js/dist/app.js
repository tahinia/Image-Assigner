"use strict";

var imagebox = document.getElementById("image-box");
var refresh = document.querySelector('.refresh');
var newImage = document.createElement('img');
var topLoader = document.getElementById('top-loader-container');
var emailInput = document.getElementById('assign-email');
var emailLabel = document.getElementById('email-label');
var emailButton = document.getElementById('assign-button');
var emailMessage = document.getElementById('email-message');
var assignedList = document.getElementById('assigned-list');
var assignedCont = document.getElementById('assigned');
var storage = []; // function to grab image from picsum and create an element to display it

function createImage() {
  axios.get("https://picsum.photos/200/300").then(function (response) {
    var picID = response.headers['picsum-id'];
    var picUrl = "https://picsum.photos/id/".concat(picID, "/500");
    imagebox.insertBefore(newImage, refresh);
    newImage.setAttribute("class", "randomImage");
    newImage.setAttribute("src", picUrl);
    newImage.setAttribute("alt", "Picsum Image");
    topLoader.classList.add('loading');
    console.log(response);
  })["catch"](function (error) {
    console.log(error);
  })["finally"](function (response) {
    topLoader.classList.remove('loading');
  });
}

createImage(); // action to create a new image when clicking on the webpage through refresh

refresh.addEventListener('click', function () {
  topLoader.classList.add('loading');
  createImage();
}); // email section
// This will validate the email and then assign the written email with the current image shown

emailButton.addEventListener('click', function () {
  var grabbedEmail = emailInput.value;
  var indexOfEmail = storage.findIndex(function (i) {
    return i.email === grabbedEmail;
  });
  var emails = "";

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  if (!validateEmail(grabbedEmail)) {
    emailMessage.classList.add('shown');
    emailInput.classList.add('error');
    emailLabel.classList.add('error');
  } else if (validateEmail(grabbedEmail)) {
    emailMessage.classList.remove('shown');
    emailInput.classList.remove('error');
    emailLabel.classList.remove('error');

    if (storage.length === 0) {
      storage.push({
        "email": grabbedEmail,
        "urls": ["<a href=\"".concat(newImage.getAttribute('src'), "\" target=\"_blank\"><img class=\"assigned-sub-image\" src=\"").concat(newImage.getAttribute('src'), "\"></a>")]
      });
    } else if (indexOfEmail !== -1 && !storage[indexOfEmail].urls.includes("<a href=\"".concat(newImage.getAttribute('src'), "\" target=\"_blank\"><img class=\"assigned-sub-image\" src=\"").concat(newImage.getAttribute('src'), "\"></a>"))) {
      storage[indexOfEmail].urls.push("<a href=\"".concat(newImage.getAttribute('src'), "\" target=\"_blank\"><img class=\"assigned-sub-image\" src=\"").concat(newImage.getAttribute('src'), "\"></a>"));
    } else if (indexOfEmail === -1) {
      storage.push({
        "email": grabbedEmail,
        "urls": ["<a href=\"".concat(newImage.getAttribute('src'), "\" target=\"_blank\"><img class=\"assigned-sub-image\" src=\"").concat(newImage.getAttribute('src'), "\"></a>")]
      });
    }

    if (storage.length !== 0) {
      for (var i = 0; i < storage.length; i++) {
        emails += "<ul class=\"assigned-list\">\n        <li class=\"assigned-main-list\">\n            <ul class=\"email-heading\">\n                <h3>".concat(storage[i].email, "</h3>\n                <p> Number of Images : ").concat(storage[i].urls.length, "</p>\n                <i class=\"fas fa-chevron-down\"></i>\n                <i class=\"fas fa-chevron-up\"></i>\n            </ul>\n            <ul>\n                <li class=\"assigned-sub-list\">\n                    ").concat(storage[i].urls.join(""), "\n                </li>\n            </ul>\n        </li>\n    </ul>");
      }
    }

    $('#assigned').html(emails);

    (function assignButtons() {
      var buttons = document.getElementsByClassName('email-heading');

      for (var _i = 0; _i < buttons.length; _i++) {
        buttons[_i].addEventListener('click', function (e) {
          this.classList.toggle("active");
          this.nextElementSibling.children[0].classList.toggle("active");
          this.querySelector('.fa-chevron-down').classList.toggle('toggled');
          this.querySelector('.fa-chevron-up').classList.toggle('toggled');
        });
      }
    })();

    topLoader.classList.add('loading');
    createImage();
  }
});