// Get and populate page with all the data. This is better than loading each 
// section separately since it is all technically on one page.
function loadData() {
    fetch('/load-data').then(response => response.json()).then((responseData) => {
        loadAbout(responseData.data.about);
        loadProjects(responseData.data.projects);
    })
}

function loadAbout(aboutData) {
    const aboutContainer = document.getElementById('about-description');
    aboutContainer.innerHTML = aboutData[0].description;
}

function loadProjects(projectsData) {
    const projectsContainer = document.getElementById('projects-container');

    for (const project of projectsData) {
        const basicInfo = document.createElement('div');
        
        const name = document.createElement('h3');
        name.innerHTML = project.name;
        basicInfo.appendChild(name);

        const year = document.createElement('h4');
        year.innerHTML = project.year;
        basicInfo.appendChild(year);

        const img = document.createElement('img')
        if (project.images != "") {
            img.src = project.images[0];
            img.classList.add('project-img-icon');
        } else {
            img.display = 'None';
        }

        const condense = document.createElement('div');
        condense.append(basicInfo, img);
        condense.classList.add('project-card-condensed-info');

        const des = document.createElement('p');
        des.innerHTML = project.blurb;

        const more = document.createElement('button');
        more.innerHTML = "Read More";
        more.classList.add('read-more-button');
        more.onclick = function() {
            showMoreProjectInfo(project.projectNum);
        }
        
        projectDiv = document.createElement('div');
        projectDiv.classList.add('project-card');
        projectDiv.append(condense, des, more);
        
        projectsContainer.appendChild(projectDiv);
    }
}
/////////////////////////////////////////
// Scroll functions for page navigation//
/////////////////////////////////////////
function logoAction() {
    document.getElementById('top').scrollIntoView();
}

function aboutAction() {
    document.getElementById('top').scrollIntoView();
    toggleMenu()
}

function projectAction() {
    document.getElementById('projects').scrollIntoView();
    toggleMenu()
}

function resumeAction() {
    document.getElementById('resume').scrollIntoView();
    toggleMenu()
}

function contactAction() {
    document.getElementById('contact').scrollIntoView();
    toggleMenu()
}

function toggleMenu() {
    const navbar = document.getElementsByTagName('nav')[0]
    const logo = document.getElementById('toggle-logo')

    if(logo.display != 'none') {
        if(logo.classList.contains('hamburg')) {
            // Change to close
            logo.src = "../static/images/mobile_nav_X.png";
            logo.classList.replace('hamburg', 'close');
            navbar.style.left = "0px";
        } else {
            // Change to hamburg
            logo.src = "../static/images/mobile_nav_hamburg.png";
            logo.classList.replace('close', 'hamburg');
            navbar.style.left = '-70%';
        }
    }
}

////////////////////
// Other Functions//
////////////////////
function copyEmail() {
    var email = document.getElementById('email-text');
    navigator.clipboard.writeText(email.innerHTML);
}

////////////////////////////////////////////////////////////////////
// Change to 'show more' page, with info about a specific project //
////////////////////////////////////////////////////////////////////
function showMoreProjectInfo(projectID) {
    location.href = '/project/' + projectID
}

////////////////////
// Scroll Functions //
////////////////////
// Paralax scrolling method adapted from https://stackoverflow.com/questions/29240028/css-make-a-background-image-scroll-slower-than-everything-else
var prevScrollpos = window.pageYOffset;
window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    var factor = 0.5;
    var yvalue = currentScrollPos * factor;
    document.body.style.backgroundPosition = "center " + yvalue + "px";
    
    // Hide/show nav bar when scrolling
    const logo = document.getElementById('toggle-logo')
    if(logo.display != 'none' && logo.classList.contains('hamburg')) {
        if (prevScrollpos > currentScrollPos) {
            document.getElementsByClassName("mobile-nav")[0].style.top = "0";
        } else {
            document.getElementsByClassName("mobile-nav")[0].style.top = "-50px";
        }
        prevScrollpos = currentScrollPos;
    }
});