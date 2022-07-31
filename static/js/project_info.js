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

    for (const project of projectsData) {
        // Used to get rid of any html tags if necessary
        var tempdiv = document.createElement("div");
        tempdiv.innerHTML = project.name;

        const name = document.createElement('h2');
        name.innerHTML = tempdiv.textContent || tempdiv.innerText || project.name;

        const year = document.createElement('h3');
        year.innerHTML = project.year;
        
        //If there is at least 1 image in the database, show it
        const images = document.createElement('div');
        images.id = 'images-carousel'
        const dots = document.createElement('div');
        const leftButton = document.createElement('button');
        const rightButton = document.createElement('button');

        if (project.images != "" && project.images.length != 0) {
            // Add image buttons
            leftButton.onclick = function() { slideRight();}
            leftButton.id = 'left-slide-button';
            leftButton.innerHTML = "ᐸ"
            images.appendChild(leftButton);
            images.appendChild(rightButton);

            rightButton.onclick = function() { slideLeft();}
            rightButton.id = 'right-slide-button';
            rightButton.innerHTML = "ᐳ"

            // Add the video and/or images
            let dotNum = 0
            if (project.videoURL != "") {
                dotNum = 1
                // Embed video
                const vid = document.createElement('iframe');
                vid.src = project.videoURL;
                vid.style.display = 'none';
                vid.classList.add("img_slides");
                vid.allow = 'fullscreen';

                images.appendChild(vid);

                // Add a dot for the video
                const vidDot = document.createElement('div');
                vidDot.onclick = () => {
                    updateSlide(0);
                };
                vidDot.classList.add("dots", "inactive-dot");

                dots.appendChild(vidDot);
            }
            // Image slideshow
            for (const img of project.images) {
                const i = document.createElement('img');
                i.src = img;
                i.style.display = 'none';
                i.classList.add("img_slides");

                images.appendChild(i);
            }
            images.classList.add('images-div');

            // Add the right button after all of the images
            images.appendChild(rightButton);

            // Add dots for slideshow
            for (let index = dotNum; index < project.images.length + dotNum; index++) {
                const i = document.createElement('div');
                i.onclick = () => {
                    updateSlide(index);
                };
                i.classList.add("dots", "inactive-dot");

                dots.appendChild(i);  
            }
            dots.classList.add('dots-div');
        }
        
        const des = document.createElement('p');
        des.innerHTML = project.description;

        const git = document.createElement('a')
        if (project.github != "") {
            git.innerHTML = "Github";
            git.href = project.github;
            git.classList.add("link-bold")
        }

        const breakpoint = document.createElement('br');

        const live = document.createElement('a')
        if (project.live != "") {
            live.innerHTML = "See it Live";
            live.href = project.live;
            live.classList.add("link-bold")
        }

        const skillHead = document.createElement('h3');
        skillHead.innerHTML = "Relevant Skills/Tools";
        skillHead.style.textAlign = 'center'

        const skills = document.createElement('div');
        for (const skill of project.skills) {
            const s = document.createElement('p');
            s.innerHTML = skill;
            s.classList.add('skill-bubble')
            skills.appendChild(s);
        }
        skills.classList.add('skill-div');
        
        projectDiv = document.createElement('div');
        projectDiv.classList.add('project-card');
        projectDiv.append(name, year, images, dots, des, git, breakpoint, live, skillHead, skills);
        
        projectsContainer.appendChild(projectDiv);
    }
    updateSlide(0)
}
/////////////////////////////////////
// Go back to home page and scroll //
/////////////////////////////////////
function logoAction() {
    location.href = '/top'
}

function aboutAction() {
    location.href = '/top'
    toggleMenu()
}

function projectAction() {
    location.href = '/projects'
    toggleMenu()
}

function resumeAction() {
    location.href = '/resume'
    toggleMenu()
}

function contactAction() {
    location.href = '/contact'
    toggleMenu()
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

function copyEmail() {
    var email = document.getElementById('email-text');
    navigator.clipboard.writeText(email.innerHTML);
}