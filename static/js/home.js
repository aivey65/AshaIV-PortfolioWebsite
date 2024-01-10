// Get and populate page with all the data. This is better than loading each 
// section separately since it is all technically on one page.
function loadData() {
    fetch('/load-data').then(response => response.json()).then((responseData) => {
        loadAbout(responseData.data.about);
        loadSkills(responseData.data.skills);
        loadProjects(responseData.data.projects);
    });
}

function loadAbout(aboutData) {
    const greetingContainer = document.getElementById('greeting');
    greetingContainer.innerHTML = aboutData[0].greeting;

    const aboutContainer = document.getElementById('about-description');
    aboutContainer.innerHTML = aboutData[0].description;
}

function loadSkills(skillsData) {
    const skillsContainer = document.getElementById('about-skills');
    for (const skill of skillsData) {
        const skillName = document.createElement('p');
        skillName.innerHTML = skill.skillName;
        skillName.classList.add('skill-name')

        const skillImage = document.createElement('img');
        skillImage.src = skill.image;
        skillImage.classList.add('skill-images');
        if (skill.contrast == true) {
            skillImage.style.backgroundColor = 'white';
        }

        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill-div')

        skillDiv.append(skillImage, skillName);
        skillsContainer.appendChild(skillDiv);
    }
}

function loadProjects(projectsData) {
    const projectsContainer = document.getElementById('projects-container');

    for (const project of projectsData) {
        const img = document.createElement('img')
        if (project.images != "") {
            img.src = project.images[0];
            img.classList.add('project-img-icon');
        } else {
            img.display = 'None';
        }

        const condense = document.createElement('div');
        condense.classList.add('condensed-info');
        
        const name = document.createElement('h3');
        name.innerHTML = project.name;

        const year = document.createElement('h4');
        year.innerHTML = project.year;

        condense.append(name, year)

        const des = document.createElement('p');
        des.innerHTML = project.blurb;

        const more = document.createElement('button');
        more.innerHTML = "Read More";
        more.classList.add('read-more-button');
        more.onclick = function() {
            showMoreProjectInfo(project.projectNum);
        }

        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-card');
        projectDiv.append(img, condense, des, more);
        projectDiv.onclick = function() {
            showMoreProjectInfo(project.projectNum);
        }
        
        projectsContainer.appendChild(projectDiv);
    }
}
/////////////////////////////////////////
// Scroll functions for page navigation//
/////////////////////////////////////////
function logoAction() {
    document.getElementById('top').scrollIntoView();
    closeMenu()
}

function homeAction() {
    document.getElementById('top').scrollIntoView();
    closeMenu()
}

function aboutAction() {
    document.getElementById('about').scrollIntoView();
    closeMenu()
}

function projectAction() {
    document.getElementById('projects').scrollIntoView();
    closeMenu()
}

function resumeAction() {
    document.getElementById('resume').scrollIntoView();
    closeMenu()
}

function contactAction() {
    document.getElementById('contact').scrollIntoView();
    closeMenu()
}

function ctaAction() {
    document.getElementById('projects').scrollIntoView();
    closeMenu()
}

function closeMenu() {
    const navbar = document.getElementsByTagName('nav')[0]
    const logo = document.getElementById('toggle-logo')

    if(logo.display != 'none') {
        if(logo.classList.contains('hamburg')) {
            // The menu is already closed
            return;
        }

        // The menu is 'close' (or the 'X' icon). Change to hamburg
        logo.src = "../static/images/hamburger-icon.svg";
        logo.classList.replace('close', 'hamburg');
        navbar.style.left = '-70%';
    }
}

function toggleMenu() {
    const navbar = document.getElementsByTagName('nav')[0]
    const logo = document.getElementById('toggle-logo')

    if(logo.display != 'none') {
        if(logo.classList.contains('hamburg')) {
            // Change to close
            logo.src = "../static/images/x-icon.svg";
            logo.classList.replace('hamburg', 'close');
            navbar.style.left = "0px";
        } else {
            // Change to hamburg
            logo.src = "../static/images/hamburger-icon.svg";
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

function dist(x1, y1, x2, y2) {
    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2))
}

////////////////////////////////////////////////////////////////////
// Change to 'show more' page, with info about a specific project //
////////////////////////////////////////////////////////////////////
function showMoreProjectInfo(projectID) {
    location.href = '/project/' + projectID
}

//////////////////////
// Scroll Functions //
//////////////////////
// Paralax scrolling method adapted from https://stackoverflow.com/questions/29240028/css-make-a-background-image-scroll-slower-than-everything-else
var prevScrollpos = window.pageYOffset;
window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    var factor = 0.7;
    var yvalue = currentScrollPos * factor;
    document.body.style.backgroundPosition = "center " + yvalue + "px";
    
    // Hide/show nav bar when scrolling
    const logo = document.getElementById('toggle-logo')
    if(logo.display != 'none' && logo.classList.contains('hamburg')) {
        if (prevScrollpos > currentScrollPos) {
            document.getElementsByClassName("mobile-nav")[0].style.transform = "translateY(0px)";
        } else {
            document.getElementsByClassName("mobile-nav")[0].style.transform = "translateY(-50px)";
        }
        prevScrollpos = currentScrollPos;
    }
});

//////////////////////////////////////////////
// Get the height offset                    //
// (to account for mobile device interface) //
//////////////////////////////////////////////
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');

window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
});