// Get and populate page with all the data. This is better than loading each 
// section separately since it is all technically on one page.
function loadData() {
    const projectID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    fetch('/load-data/' + projectID).then(response => response.json()).then((responseData) => {
        console.log(responseData.data.project)
        loadProjects(responseData.data.project);
    })
}

function loadProjects(projectsData) {
    const projectsContainer = document.getElementById('projects-container');

    for (const project of projectsData) {
        const name = document.createElement('h2');
        name.innerHTML = project.name;

        const year = document.createElement('h3');
        year.innerHTML = project.year;
        
        //If there is at least 1 image in the database, show it
        const images = document.createElement('div');
        const dots = document.createElement('div');

        if (project.images != "" && project.images.length != 0) {
            let dotNum = 0
            if (project.videoURL != "") {
                // Embed video
                const vid = document.createElement('iframe');
                vid.src = project.videoURL;
                vid.style.display = 'none';
                vid.classList.add("img_slides");
                vid.allow = 'fullscreen';

                images.appendChild(vid);

                // Add a dot for the video
                const vidDot = document.createElement('div');
                vidDot.onclick = function() {
                    updateSlide(dotNum);
                };
                vidDot.classList.add("dots", "inactive-dot");

                dots.appendChild(vidDot);
                dotNum++
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

            // Add dots for slideshow
            for (let index = dotNum; index < project.images.length + dotNum; index++) {
                const i = document.createElement('div');
                i.onclick = function() {
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
        }

        const breakpoint = document.createElement('br');

        const live = document.createElement('a')
        if (project.live != "") {
            live.innerHTML = "See it Live";
            live.href = project.live;
        }

        const skillHead = document.createElement('h3');
        skillHead.innerHTML = "Skills/Tools";
        skillHead.style.textAlign = 'center'

        const skills = document.createElement('div');
        for (const skill of project.skills) {
            const s = document.createElement('p');
            s.innerHTML = skill;
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
function copyEmail() {
    var email = document.getElementById('email-text');
    navigator.clipboard.writeText(email.innerHTML);
}

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
        }
        else {
            slides[i].style.display = 'none';
            dots[i].classList.replace('active-dot', 'inactive-dot')
        } 
    }
}