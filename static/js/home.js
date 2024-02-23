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
    document.getElementById('greeting').textContent = aboutData[0].greeting;
    document.getElementById('description-a').innerHTML = aboutData[0].description;

    const hobbyList = document.getElementById('ul-b');
    
    const hobbyData = aboutData[0].descriptionB;
    for (var item of hobbyData) {
        const newItem = document.createElement("li");
        newItem.textContent = item;
        hobbyList.append(newItem);
    }
}

function loadSkills(skillsData) {
    const skillsContainer = document.getElementById('about-skills');
    for (const skill of skillsData) {
        const skillName = document.createElement('p');
        skillName.textContent = skill.skillName;
        skillName.classList.add('skill-name')

        const skillImage = document.createElement('i');
        skillImage.classList.add('skill-images', skill.image);
        skillImage.loading = "lazy";
        skillImage.alt = skill.skillName + " icon"

        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill-div')

        skillDiv.append(skillImage, skillName);
        skillsContainer.appendChild(skillDiv);
    }
}

function loadProjects(projectsData) {
    const projectsContainer = document.getElementById('projects-container');

    // Create observer to observe the cards as they enter view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-animate");
            } else {
                entry.target.classList.remove("show-animate");
            }
        });
    });

    for (const project of projectsData) {
        const img = document.createElement('img')
        if (project.images != "") {
            img.src = project.images[0];
            img.classList.add('project-img-icon');
            img.loading = "lazy";
            img.alt = "Thumbnail for " + project.name + " project"
        } else {
            img.display = 'None';
        }

        const condense = document.createElement('div');
        condense.classList.add('condensed-info');
        
        const name = document.createElement('h3');
        name.textContent = project.name;

        const year = document.createElement('h4');
        year.textContent = project.year;

        condense.append(name, year)

        const des = document.createElement('p');
        des.classList.add("description-p");
        des.textContent = project.blurb;

        const more = document.createElement('img');
        more.src = "../static/images/open-icon.svg";
        more.title = "See more details"
        more.classList.add('read-more-button');

        const demo = document.createElement('a');
        if (project.live != "") {
            demo.textContent = "Live";
            demo.classList.add('live-button');
            demo.href = project.live;
            demo.target = '_blank';
        } else if (project.videoURL != "") {
            demo.textContent = "Demo";
            demo.classList.add('live-button');
            demo.href = project.videoURL;
            demo.target = '_blank'
        } else if (project.github != "") {
            demo.textContent = "Github";
            demo.classList.add('live-button');
            demo.href = project.github;
            demo.target = '_blank';
        }

        const skills = document.createElement('div');
        for (const skill of project.skills) {
            const s = document.createElement('p');
            s.innerHTML = skill;
            s.classList.add('skill-bubble');
            skills.appendChild(s);
        }
        skills.classList.add('skill-bubbles');

        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-card');
        projectDiv.append(img, condense, des, more, demo, skills);
        projectDiv.onclick = function(event) {
            if (event.target != demo) {
                showMoreProjectInfo(project.projectNum);
            }
        }

        observer.observe(projectDiv);

        
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
    
    // Hide/show nav bar when scrolling
    const logo = document.getElementById('toggle-logo')
    if(logo.display != 'none' && logo.classList.contains('hamburg')) {
        if (prevScrollpos > currentScrollPos) {
            document.getElementsByClassName("mobile-nav")[0].style.transform = "translateY(0px)";
        } else {
            document.getElementsByClassName("mobile-nav")[0].style.transform = "translateY(-55px)";
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