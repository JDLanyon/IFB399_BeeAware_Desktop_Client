
function switchPage(name) {
    var pages = document.getElementsByClassName("pages");
    var shownPage = document.getElementById(name);
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    shownPage.style.display = "block";
}

function switchInnerPage(name) {
    var pages = document.getElementsByClassName("innerPages");
    var shownPage = document.getElementById(name);
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    shownPage.style.display = "block";
}


function switchInnerPageFlex(name) {
    var pages = document.getElementsByClassName("innerPages");
    var shownPage = document.getElementById(name);
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    shownPage.style.display = "flex";
}
