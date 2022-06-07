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

        // Image slideshow
        const images = document.createElement('div');
        for (const img of project.images) {
            const i = document.createElement('img');
            i.src = img;
            i.classList.add("img_slides")

            skills.appendChild(i);
            
        }
        images.classList.add('images-div');

        // Add dots for slideshow
        const dots = document.createElement('div');
        for (let dotNum = 0; dotNum < project.images.length; dotNum++) {
            const i = document.createElement('img');
            i.src = img;
            i.classList.add("img_slides")

            skills.appendChild(i);
            
        }
        images.classList.add('images-div');

        const skillHead = document.createElement('h3');
        skillHead.innerHTML = "Skills";

        const skills = document.createElement('div');
        for (const skill of project.skills) {
            const s = document.createElement('p');
            s.innerHTML = skill;
            skills.appendChild(s);
            
        }
        skills.classList.add('skill-div');
        
        projectDiv = document.createElement('div');
        projectDiv.classList.add('project-card');
        projectDiv.append(name, year, des, git, breakpoint, live, skillHead, skills);
        
        projectsContainer.appendChild(projectDiv);
    }
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