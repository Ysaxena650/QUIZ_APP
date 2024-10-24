document.addEventListener("DOMContentLoaded",()=>{
    let subbutton=document.getElementById("submit");
    subbutton.addEventListener('click',(event)=>{
    let name=document.querySelector("#username");
    let pass=document.querySelector("#passward")
    event.preventDefault();
    localStorage.setItem('name',JSON.stringify(name.value));

    if(name.value!=""&&pass.value!=""){
        window.location.href="mainpage.html";
    }

    else{
        alert(" name or passward is missing");
    }
    
})




})



