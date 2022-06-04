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
        const name = document.createElement('h3');
        name.innerHTML = project.name;

        const year = document.createElement('h4');
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

        const skillHead = document.createElement('h4');
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
/////////////////////////////////////////
// Scroll functions for page navigation//
/////////////////////////////////////////
function aboutAction() {
    document.getElementById('about').scrollIntoView();

}

function projectAction() {
    document.getElementById('projects').scrollIntoView();

}

function resumeAction() {
    document.getElementById('resume').scrollIntoView();

}

function contactAction() {
    document.getElementById('contact').scrollIntoView();

}

////////////////////
// Other Functions//
////////////////////
function copyEmail() {
    var email = document.getElementById('email-text');
    navigator.clipboard.writeText(email.innerHTML);
}