
var sections = document.querySelectorAll('h2');

var sections_active = document.querySelectorAll('section');

var navbarlist = document.getElementById('navbar__list');

var list_items;

var details = document.querySelectorAll('details');

var navbar = document.querySelector('nav');

var clock = null;



// function to hide navbar
hideNav = function(){
    navbar.style.display = "none";
}

// function to show navbar
showNav = function(){
    navbar.style.display = "block";
}



// function to detect if a section is in the viewport and returns true or false
function inView(section) {
    const space = section.getBoundingClientRect();
    return (
       space.top >= 0 && space.left >= 0 
       &&
       space.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&  space.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// a for loop to add an ID and href with the sections id to each anchor tag then append it to the ul
for(let i=0;i<sections.length;i++){

list_items = document.createElement('a');

list_items.setAttribute('id',`${sections[i].textContent}`);
list_items.setAttribute('href',`#section${i+1}`);

list_items.appendChild(document.createTextNode(sections[i].textContent));

navbarlist.appendChild(list_items);

}


var anchors = document.querySelectorAll("a");
// iterates over each anchor tag in our ul and adds an event listener for a click to execute a function to smooth scroll
anchors.forEach(anchor => {
    anchor.addEventListener('click',function(a){
        a.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:"smooth"});

    }
    );
});




// adds an event listener to each section to listen for a scroll event when the section is in the viewport it adds an Active class to the section or removes the Active class when not in viewport
document.addEventListener('scroll',function(){

    sections_active.forEach(section=>{
        if(inView(section)){
            section.classList.add("active");
            
        }else{
            section.classList.remove("active");
        }
    });

});


// adds an event listener to listen for a scroll event that checks if the user is scrolling to hide the navbar by setting a timeout
document.addEventListener('scroll',function(){
    if(clock !== null){
        clearTimeout(clock);
        showNav();
        

    }
    clock = setTimeout(hideNav, 2000);
});




