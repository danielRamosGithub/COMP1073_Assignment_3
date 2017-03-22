/*
 * App.js
 * Author: Daniel Costa Ramos - 200354269
 * Web	site: Mini-Portfolio
 * Description: JavaScript file to inject and control the content from the pages.
 */
"use strict"; 

// IIFE
(function() {
    //adding padding to the body, so the nav be fixed on top and bottom without problems
    let body = document.body;
    body.style.padding = "70px";

    //fixing the logo on the nav-brand
    let navBrand = document.getElementById("logo");
    navBrand.style.paddingTop = "5px";

    // giving more space between the social media icons in the fotter
    let socialMedia = document.getElementsByClassName("socialMedia");
    socialMedia[0].style.marginLeft = "80px";
    socialMedia[0].style.padding = "15px";
    socialMedia[1].style.padding = "15px";
    socialMedia[2].style.padding = "15px";

    // function to show what menu is active
    $('ul.nav > li').click(function () {
        // changing background from the links in the nav
        $('ul.nav > li').removeClass('active');
        $(this).addClass('active');
    });

    // letiables to check which page the user is, so I can append the innerHtml withou errors.
    let aboutMe = document.getElementById("aboutMe");
    let projects = document.getElementById("projects");
    let contact = document.getElementById("contact");

    // ABOUT ME PAGE

    // IF to test if the user is on ABOUT ME page.
    if (aboutMe != null) {
        let data = {};
        // instatiate an XHR object
        let XHR = new XMLHttpRequest();
        // open the json file
        XHR.open("GET", "../content.json", true);
        // send out a call to the XHR object
        XHR.send(null);
        // listen for ready state to be 4
        XHR.onreadystatechange = function() {
            if((this.readyState === 4) && (this.status === 200)) {
                data = JSON.parse(this.responseText);
            }
        };

        // wait until the data is finished loading before injecting the data
        XHR.addEventListener("load", function () {
            // Setting the variables for the elements on the page
            let personalImage = document.getElementById("personalImage");
            let whoAmI = document.getElementById("whoAmI");
            let shortParagraph = document.getElementById("shortParagraph");
            // getting the data from the Json File
            personalImage.innerHTML = data.index[0].image;
            whoAmI.innerText = data.index[0].title;
            shortParagraph.innerText = data.index[0].text;
        });
    }

    // CONTACT PAGE

    // IF to test if the user is on CONTACTs page.
    if (contact != null) {
        let submitButton = document.getElementById("submit_Button");

        // adding an eventHandler to the button SUBMIT.
        submitButton.addEventListener("click", function(event){
            let InputName = document.getElementById("InputName").value;
            let InputPhoneNumber = document.getElementById("InputPhoneNumber").value;
            let InputEmail = document.getElementById("InputEmail").value;
            let InputMessage = document.getElementById("InputMessage").value;

            console.log(`Name: ${InputName}, Phone Number: ${InputPhoneNumber}, Email: ${InputEmail}, Message: ${InputMessage}` );
            
            // prevent the page to reload, so the results keep displayed on the console
            event.preventDefault();
        });
    } 

    // PROJECTS PAGE

    // IF to test if the user is on PROJECTSs page.
    if (projects != null) {
        let data = {};
        // instatiate an XHR object
        let XHR = new XMLHttpRequest();
        // open the json file
        XHR.open("GET", "../content.json", true);
        // send out a call to the XHR object
        XHR.send(null);
        // listen for ready state to be 4
        XHR.onreadystatechange = function() {
            if((this.readyState === 4) && (this.status === 200)) {
                data = JSON.parse(this.responseText);
            }
        };

        // wait until the data is finished loading before injecting the data
        XHR.addEventListener("load", function () {
            let projectListBody = document.getElementById("projects");
            //
            data.projects.forEach(function(project) {
                // ejecting the content for the projects
                let newRow = document.createElement("div");
                newRow.innerHTML = 
                `<div class="col-sm-6 col-md-4">
                    <div class="thumbnail">
                        ${project.image}
                        <div class="caption">
                            <h4>${project.title}</h4>
                            <p>${project.description}</p>
                            <p><a href="${project.url}" class="btn btn-primary" target="_blank" role="button">Check the work</a></p>
                        </div>
                    </div>
                </div>`;
                projectListBody.appendChild(newRow);
            }, this);
        });
    }
     
})();                          