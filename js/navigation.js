let mainNav, siteContent, leftNav, mainContent, activeButtonMain, rightSide, backButton;

function buildButton(name, clickFunction) {
    const newButton = document.createElement('a');
    newButton.setAttribute('href', '#');
    newButton.setAttribute('class', 'button');
    newButton.dataset['target'] = name;
    newButton.innerText = name;
    newButton.addEventListener('click', clickFunction);
    return newButton;
}

function buildReferences(newReferences) {
    for (const reference of newReferences) {
        const newLink = document.createElement('a');
        newLink.setAttribute('href', reference);
        newLink.innerText = reference;
        rightSide.appendChild(newLink);
    }
}

function buildSourceCodeContents(sourceCodes) {
    for (const sourceCode of sourceCodes) {
        const headingCode = document.createElement('h3');
        headingCode.innerText = sourceCode.type + '-Quellcode';
        mainContent.querySelector('.code').appendChild(headingCode);
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.innerText = sourceCode.content;
        pre.appendChild(code);
        mainContent.querySelector('.code').appendChild(pre);
    }
}

function navigateSubmenu() {
    const sideNavButtons = leftNav.querySelectorAll('a.button');
    for (let button of sideNavButtons) {
        button.classList.remove('active');
    }
    this.classList.add('active');
    const target = this.dataset['target'];

    mainContent.querySelector('.code').innerHTML = '';
    const sourceCodes = siteContent[activeButtonMain][target].code;
    buildSourceCodeContents(sourceCodes);
    mainContent.querySelector('.code').classList.remove('hidden');

    rightSide.innerHTML = '';
    const newReferences = siteContent[activeButtonMain][target].references;
    buildReferences(newReferences);
}

function navigateMainmenu() {
    const mainNavButtons = leftNav.querySelectorAll('a.button');
    for (let button of mainNavButtons) {
        button.classList.remove('active');
    }
    this.classList.add('active');

    const target = this.dataset['target'];
    const contentSubNav = siteContent[target];
    leftNav.innerHTML = '';
    for (let subItem of Object.keys(contentSubNav)) {
        const newButton = buildButton(subItem, navigateSubmenu);
        leftNav.appendChild(newButton);
    }
    activeButtonMain = target;
    backButton.classList.remove('hidden');
}

function buildMainmenu(siteContent) {
    leftNav.innerHTML = '';
    for (let element of Object.keys(siteContent)) {
        const newButton = buildButton(element, navigateMainmenu);
        leftNav.appendChild(newButton);
    }
    mainContent.querySelector('.code').classList.add('hidden');
    backButton.classList.add('hidden');
}

async function init() {
    mainNav = document.querySelector('.header .nav');
    leftNav = document.querySelector('.leftSide .sideNav');
    mainContent = document.querySelector('.mainContent');
    rightSide = document.querySelector('.rightSide');
    backButton = document.querySelector('.backButton');

    siteContent = JSON.parse(await (await fetch('data/navigator_contents.json')).text());
    buildMainmenu(siteContent);
    backButton.addEventListener('click', function() {
        buildMainmenu(siteContent);
    });
}

init();