 l1=document.querySelector(".nav-line1");
    l2=document.querySelector(".nav-line2");
    l3=document.querySelector(".nav-line3");
    t1=document.querySelector(".nav-menu").querySelector("h1");
    t1.innerHTML="X";
    t1.style.display="none";
function showMenu()
{
    document.querySelector(".background").style.display="flex";
    l1.style.display="none";
    l2.style.display="none"
    l3.style.display="none";
    t1.style.display="block";
     document.querySelector("body").style.overflow="hidden";
}
function hideMenu()
{
document.querySelector(".background").style.display="none";   
t1.style.display="none";
     l1.style.display="block";
    l2.style.display="block"
    l3.style.display="block";
       document.querySelector("body").style.overflow="visible";
       event.stopPropagation();
}