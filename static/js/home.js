function homeAction() {
    document.getElementById('home').scrollIntoView()
}

function aboutAction() {
    fetch('/about').then(response => response.json()).then((responseData) => {
        const aboutContainer = document.getElementById('about-long');
        
        aboutInfo = responseData.data[0]
        aboutContainer.innerHTML = aboutInfo.long
        
        document.getElementById('about').scrollIntoView()
    })
}

function experienceAction() {
    var header = document.getElementById('test');
    header.style.color = 'pink';
}

function projectsAction() {
    var header = document.getElementById('test');
    header.style.color = 'pink';
}

function resumeAction() {
    var header = document.getElementById('test');
    header.style.color = 'pink';
}

