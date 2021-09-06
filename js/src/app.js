const imagebox = document.getElementById("image-box");
const refresh = document.querySelector('.refresh');
const newImage = document.createElement('img');
const topLoader = document.getElementById('top-loader-container');
const emailInput = document.getElementById('assign-email');
const emailLabel = document.getElementById('email-label');
const emailButton = document.getElementById('assign-button');
const emailMessage = document.getElementById('email-message');
const assignedList = document.getElementById('assigned-list');
const assignedCont = document.getElementById('assigned');
let storage = [];

// function to grab image from picsum and create an element to display it

function createImage() {
    axios.get("https://picsum.photos/200/300")
        .then(function (response) {
            const picID = response.headers['picsum-id'];
            let picUrl = `https://picsum.photos/id/${picID}/500`;
            imagebox.insertBefore(newImage, refresh);
            newImage.setAttribute(`class`, `randomImage`);
            newImage.setAttribute(`src`, picUrl);
            newImage.setAttribute(`alt`, `Picsum Image`);
            topLoader.classList.add('loading');
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function (response) {
            topLoader.classList.remove('loading');
        });
}

createImage();


// action to create a new image when clicking on the webpage through refresh

refresh.addEventListener('click', function () {
    topLoader.classList.add('loading');
    createImage();
});


 // email section
// This will validate the email and then assign the written email with the current image shown

emailButton.addEventListener('click', function () {
    const grabbedEmail = emailInput.value;
    const indexOfEmail = storage.findIndex(i => i.email === grabbedEmail);
    let emails = "";
    

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
                "urls": [`<a href="${newImage.getAttribute('src')}" target="_blank"><img class="assigned-sub-image" src="${newImage.getAttribute('src')}"></a>`],
                
                
            });
        } else if (indexOfEmail !== -1 && !storage[indexOfEmail].urls.includes(`<a href="${newImage.getAttribute('src')}" target="_blank"><img class="assigned-sub-image" src="${newImage.getAttribute('src')}"></a>`)) {
            storage[indexOfEmail].urls.push(`<a href="${newImage.getAttribute('src')}" target="_blank"><img class="assigned-sub-image" src="${newImage.getAttribute('src')}"></a>`);
        } else if (indexOfEmail === -1) {
            storage.push({
                "email": grabbedEmail,
                "urls": [`<a href="${newImage.getAttribute('src')}" target="_blank"><img class="assigned-sub-image" src="${newImage.getAttribute('src')}"></a>`],
                

            });
        }

        if (storage.length !== 0) {
            for (let i = 0; i < storage.length; i++) {
                emails += `<ul class="assigned-list">
        <li class="assigned-main-list">
            <ul class="email-heading">
                <h3>${storage[i].email}</h3>
                <p> Number of Images :${storage[i].urls.length}</p>
                <i class="fas fa-chevron-down"></i>
                <i class="fas fa-chevron-up"></i>
            </ul>
            <ul>
                <li class="assigned-sub-list">
                    ${storage[i].urls.join("")}
                </li>
            </ul>
        </li>
    </ul>`;
            }
        }

        $('#assigned').html(emails);

        (function assignButtons() {
            let buttons = document.getElementsByClassName('email-heading');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function (e) {
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