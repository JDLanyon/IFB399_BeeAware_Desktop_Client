window.onload = function(){
    switchInnerPageFlex('About');
    // get all button by css
    var buttons = document.querySelectorAll('.subnav button');
    // add event listener to each button
    buttons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            // set background color of buttons to white
            buttons.forEach(function (button) {
                button.style.backgroundColor = 'rgb(255, 214, 53)';
            });
            // button set to orange
            button.style.backgroundColor = "orange";
        });
    });
}



