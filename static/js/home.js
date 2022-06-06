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
        des.innerHTML = project.blurb;

        const more = document.createElement('button');
        more.innerHTML = "Read More"
        more.classList.add('read-more-button');
        more.onclick = function() {
            showMoreProjectInfo(project.projectNum)
        }
        const img = document.createElement('img')
        if (project.img1 != "") {
            img.src = project.img1
            img.classList.add('project-img-icon')
        } else {
            img.display = 'None'
        }
        
        projectDiv = document.createElement('div');
        projectDiv.classList.add('project-card');
        projectDiv.append(name, year, des, more, img);
        
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

////////////////////////////////////////////////////////////////////
// Change to 'show more' page, with info about a specific project //
////////////////////////////////////////////////////////////////////
function showMoreProjectInfo(projectID) {
    location.href = '/project/' + projectID
}