document.querySelector(".marksgot").innerHTML=localStorage.getItem('finalscore');
document.querySelector(".restart").addEventListener('click',()=>{
    localStorage.clear();
    window.location.href="mainpage.html";
})