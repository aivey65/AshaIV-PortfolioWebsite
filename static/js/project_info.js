///////////////////
// Switch Slides //
///////////////////
function updateSlide(newSlide) {    
    let slides = document.getElementsByClassName('img_slides');
    let dots = document.getElementsByClassName('dots');

    for(let i = 0; i < slides.length; i++) {
        if (i == newSlide) {
            slides[i].style.display = 'block';
            dots[i].classList.replace('inactive-dot', 'active-dot')
        } else {
            slides[i].style.display = 'none';
            dots[i].classList.replace('active-dot', 'inactive-dot')
        } 
    }
}

function slideRight() {
    let slides = document.getElementsByClassName('img_slides');

    for(let i = 1; i < slides.length; i++) {
        if (slides[i].style.display == 'block') {
            updateSlide(i - 1);
            return;
        }
    }
    return;
}

function slideLeft() {
    let slides = document.getElementsByClassName('img_slides');

    for(let i = 0; i < slides.length - 1; i++) {
        if (slides[i].style.display == 'block') {
            updateSlide(i + 1);
            return;
        }
    }
    return;
}

// Get and populate page with all the data. This is better than loading each 
// section separately since it is all technically on one page.
function loadData() {
    const projectID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    fetch('/load-data/' + projectID).then(response => response.json()).then((responseData) => {
        loadProjects(responseData.data.project);
    })
}

function loadProjects(projectsData) {
    const projectsContainer = document.getElementById('projects-container');

    if (projectsData.length == 0) {
        const [header, details, backButton] = createPageNotFound();
        projectsContainer.append(header, details, backButton);
        return;
    }

    for (const project of projectsData) {
        // Used to get rid of any html tags if necessary
        var tempdiv = document.createElement("div");
        tempdiv.innerHTML = project.name;

        const name = document.createElement('h1');
        name.innerHTML = tempdiv.textContent || tempdiv.innerText || project.name;

        const year = document.createElement('h3');
        year.innerHTML = project.year;
        
        //If there is at least 1 image in the database, show it
        var slideshow;
        if (project.images != "" && project.images.length != 0 || project.videoURL != "") {
            slideshow = createImageSlideshow(project.images, project.videoURL)
        }
        
        const summaryDiv = document.createElement('div');
        const summaryH = document.createElement('h2');
        summaryH.innerHTML = "Summary"
        const summary = document.createElement('p');
        summary.innerHTML = project.descriptionSummary;
        summaryDiv.append(summaryH, summary);

        const contributionsDiv = document.createElement('div');
        const contributionsH = document.createElement('h2');
        contributionsH.innerHTML = "Development Details"
        const contributions = document.createElement('p');
        contributions.innerHTML = project.descriptionCont;
        contributionsDiv.append(contributionsH, contributions)

        const git = document.createElement('a')
        if (project.github != "") {
            git.innerHTML = "Github";
            git.href = project.github;
            git.classList.add("link-bold");
            git.target = "_blank";
            git.rel = "noopener noreferrer";
        }

        const live = document.createElement('a')
        if (project.live != "") {
            live.innerHTML = "See it Live";
            live.href = project.live;
            live.classList.add("link-bold");
            live.target = "_blank";
            live.rel = "noopener noreferrer";
        }

        const documentation = document.createElement('a')
        if (project.doc != "") {
            documentation.innerHTML = "Documentation";
            documentation.href = project.doc;
            documentation.classList.add("link-bold");
            documentation.target = "_blank";
            documentation.rel = "noopener noreferrer";
        }

        const skillHead = document.createElement('h3');
        skillHead.innerHTML = "Relevant Skills/Tools";
        skillHead.style.textAlign = 'center'

        const skills = document.createElement('div');
        for (const skill of project.skills) {
            const s = document.createElement('p');
            s.innerHTML = skill;
            s.classList.add('skill-bubble');
            skills.appendChild(s);
        }
        skills.classList.add('skill-div');
        
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-card');
        projectDiv.append(name, year, slideshow, summaryDiv, contributionsDiv, git, documentation, live, skillHead, skills);
        
        projectsContainer.appendChild(projectDiv);
    }
    updateSlide(0)
}

///////////////////////////////////////////////////////////
//Breakdown functions for creating project page elements //
///////////////////////////////////////////////////////////
function createPageNotFound() {
    const notFoundTitle = document.createElement('h2');
    notFoundTitle.classList.add('not-found');
    notFoundTitle.innerHTML = 'Project Not Found.'

    const notFoundDes = document.createElement('p');
    notFoundDes.classList.add('not-found');
    notFoundDes.innerHTML = 'The project you are looking for does not exist. Check your URL or go back to the projects page.'

    const backButton = document.createElement('button');
    backButton.classList.add('not-found', 'back-button');
    backButton.innerHTML = 'Back to Projects';
    backButton.onclick = function() { projectAction();}

    return [notFoundTitle, notFoundDes, backButton];
}

function createImageSlideshow(imageList, videoLink) {
    const images = document.createElement('div');
    images.id = 'images-div';

    const dots = document.createElement('div');
    dots.id='dots-div';

    // Buttons for navigating the image carousel
    const leftButtonDiv = document.createElement('div');
    const rightButtonDiv = document.createElement('div');
    const leftButton = document.createElement('button');
    const rightButton = document.createElement('button');

    // Add button functionality
    leftButtonDiv.onclick = function() { slideRight();}
    leftButtonDiv.id = 'left-slide-div';

    leftButton.id = 'left-slide-button';
    leftButton.innerHTML = "‹"
    leftButtonDiv.appendChild(leftButton);

    rightButtonDiv.onclick = function() { slideLeft();}
    rightButtonDiv.id = 'right-slide-div';

    rightButton.id = 'right-slide-button';
    rightButton.innerHTML = "›"
    rightButtonDiv.appendChild(rightButton);

    images.appendChild(leftButtonDiv); //Add the left button first

    // Add the images (and video if available)
    let dotNum = 0
    if (videoLink != "") { //Add video first
        dotNum = 1
        // Embed the video first
        const vid = document.createElement('iframe');
        vid.src = videoLink;
        vid.style.display = 'none';
        vid.classList.add("img_slides");
        vid.allow = 'fullscreen';

        images.appendChild(vid);

        // Add a navigation dot for the video
        const vidDot = document.createElement('div');
        vidDot.onclick = () => {
            updateSlide(0);
        };
        vidDot.classList.add("dots", "inactive-dot");

        dots.appendChild(vidDot);
    }
    // Add images second
    for (const img of imageList) {
        const i = document.createElement('img');
        i.src = img;
        i.style.display = 'none';
        i.classList.add("img_slides");

        images.appendChild(i);
    }

    // Add the right button after all of the images
    images.appendChild(rightButtonDiv);

    // Add dots for each image
    for (let index = dotNum; index < imageList.length + dotNum; index++) {
        const i = document.createElement('div');
        i.onclick = () => {
            updateSlide(index);
        };
        i.classList.add("dots", "inactive-dot");

        dots.appendChild(i);  
    }

    const slideshow = document.createElement('div');
    slideshow.append(images, dots)
    return slideshow;
}

/////////////////////////////////////
// Go back to home page and scroll //
/////////////////////////////////////
function logoAction() {
    location.href = '/top'
}

function homeAction() {
    location.href = '/top'
}

function aboutAction() {
    location.href = '/about'
}

function projectAction() {
    location.href = '/projects'
}

function resumeAction() {
    location.href = '/resume'
}

function contactAction() {
    location.href = '/contact'
}

////////////////////
// Other Functions//
////////////////////
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

var prevScrollpos = window.pageYOffset;
window.addEventListener('scroll', () => { 
    const currentScrollPos = window.pageYOffset;
 
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

function copyEmail() {
    var email = document.getElementById('email-text');
    navigator.clipboard.writeText(email.innerHTML);
}