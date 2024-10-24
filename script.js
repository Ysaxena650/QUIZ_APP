document.addEventListener('DOMContentLoaded',()=>{
    let back=document.querySelector(".goback");
    let navigationbar=document.querySelector(".navigationbarmain");
    let navigation=document.querySelector(".navigationbar");
    let question=document.querySelector(".q");
    
    let score=0;
  
   
    
     
    
const getdata= async ()=>{
  
    try {
        let response=await fetch("https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple");
        let data=  await response.json();
        localStorage.setItem('dataarray',JSON.stringify(data.results));
        setdata(0);
        localStorage.setItem('index',JSON.stringify(0));

        if(document.querySelector(".name").innerHTML!=""){
            document.querySelector(".name").innerHTML=JSON.parse(localStorage.getItem('name'));
        }
       
    } 
    catch (error) {
        document.querySelector(".container").innerHTML="SERVER IS BUSY"
        alert("server is busy");
        
    }
    
}

const setdata=(count)=>{
    try {
        let itr=0;
        let data=localStorage.getItem("dataarray");
        let parseddata=JSON.parse(data);
        question.innerHTML=parseddata[`${count}`].question;
        let randomNum = Math.floor(Math.random() * 4);
        document.querySelector(`.opt${randomNum}`).innerHTML=parseddata[count].correct_answer;
        for(let i=0;i<=3;i++){
            if(i!=randomNum){
                document.querySelector(`.opt${i}`).innerHTML=parseddata[count].incorrect_answers[itr++];
            }
        }
        
    } 
    catch (error) {
        
    }
}


const mover=()=>{

    let button = document.querySelector(".upper");
    let click=1;
    button.addEventListener('click', () => {
      let mover = document.querySelector(".mover");
      
       if(click%2!=0){
        mover.style.transform = "translateX(2rem)";
        button.style.backgroundColor="white";
        document.querySelector(".container").style.backgroundImage="none";
        document.querySelector(".container").style.backgroundColor="white";
        document.querySelector(".end").style.backgroundColor="white";
        document.querySelector(".end").style.border=".2rem solid black";
        document.querySelector(".previous").style.backgroundColor="white";
        document.querySelector(".previous").style.border=".2rem solid black";
        document.querySelector(".next").style.backgroundColor="white";
        document.querySelector(".next").style.border=".2rem solid black";
        document.querySelector(".review").style.backgroundColor="white";
        document.querySelector(".review").style.border=".2rem solid black";
        document.querySelector(".submit").style.backgroundColor="white";
        document.querySelector(".submit").style.border=".2rem solid black";
        document.querySelector(".opacityquestion").style.border=".2rem solid black";
        document.querySelector(".opacityheader").style.border=".2rem solid black";
        document.querySelector(".opacityfooter").style.border=".2rem solid black";
        click++;
       }

       else{
        mover.style.transform = "translateX(0rem)";
        button.style.backgroundColor="#9d54f7";
        document.querySelector(".container").style.backgroundColor="#cd82fa";
        document.querySelector(".submit").style.backgroundColor="#cd82fa";
        document.querySelector(".end").style.backgroundColor="#cd82fa";
        document.querySelector(".submit").style.backgroundColor="#cd82fa";
        document.querySelector(".review").style.backgroundColor="#cd82fa";
        document.querySelector(".next").style.backgroundColor="#cd82fa";
        document.querySelector(".previous").style.backgroundColor="#cd82fa";
        click++;
       }
    });


}


const navigationpart=()=>{

    back.addEventListener('click',()=>{
        navigationbar.style.visibility="hidden"
        
    }) 

    navigation.addEventListener('click',()=>{
        navigationbar.style.visibility="visible";
    })

   
    document.querySelector(".numbers").addEventListener('click',(event)=>{
        localStorage.setItem('index',JSON.stringify(event.target.innerHTML-"1"));
        changeques(event.target.innerHTML-"1");
         event.target.style.backgroundColor="#a01eeb";
         setTimeout(()=>{
            setdata(event.target.innerHTML-"1");
            event.target.style.backgroundColor="transparent";
            document.querySelector(".options").style.backgroundColor="transparent";
            document.querySelector(".messege").innerHTML="";
        },500)
         
         
    })
}
   
const optionpart=()=>{
    
    document.querySelector(".optionsul").addEventListener('click',(event)=>{
            localStorage.setItem('flag',"yes")
            localStorage.setItem('selected',JSON.stringify(event.target.innerHTML))
            changecolor(event.target);
        });
      

   
}

const changecolor=(event)=>{
    let data=localStorage.getItem("dataarray");
    let parseddata=JSON.parse(data);
    let ans=JSON.parse(localStorage.getItem('selected'));
    let compare=JSON.parse(localStorage.getItem('index'));
    if(ans==parseddata[compare].correct_answer){
        localStorage.setItem('status',"correct");
        document.querySelector(".options").style.backgroundColor="#70fd9a";
        document.querySelector(".messege").innerHTML=`${ans} is the correct answer`;
        
    }
    else{
        localStorage.setItem('status',"incorrect");
        document.querySelector(".options").style.backgroundColor="#ff7373";
        document.querySelector(".messege").innerHTML=`${ans} is not the correct answer`;
    }
  
    
}

const changeques=(clicked)=>{
   let next=document.querySelector(".next");
   let prev=document.querySelector(".previous");
   let num=0;
   

   next.addEventListener('click',()=>{
    console.log(clicked);
    
     if(clicked==undefined){
        if(num<9){
            num++;
            localStorage.setItem('index',JSON.stringify(num));
            setdata(num);
            document.querySelector(".options").style.backgroundColor="transparent";
            document.querySelector(".messege").innerHTML="";
         }
     }

     else{
        
        if(clicked<9){
            clicked++;
            localStorage.setItem('index',JSON.stringify(clicked));
            setdata(clicked);
            document.querySelector(".options").style.backgroundColor="transparent";
            document.querySelector(".messege").innerHTML="";
         }
     }
   })

   prev.addEventListener('click',()=>{
     if(clicked==undefined){
        if(num>0){
            num--;
            localStorage.setItem('index',JSON.stringify(num));
            setdata(num);
            document.querySelector(".options").style.backgroundColor="transparent";
            document.querySelector(".messege").innerHTML="";
         }
     }

     else{
        
        if(clicked>0){
            clicked--;
            localStorage.setItem('index',JSON.stringify(clicked));
            setdata(clicked);
            document.querySelector(".options").style.backgroundColor="transparent";
            document.querySelector(".messege").innerHTML="";
         }
     }
   })
   
}

const submitpart=()=>{
    let submit=document.querySelector(".submit");
    let curroption=localStorage.getItem('index');
    let currjson=JSON.parse(curroption);
    
    submit.addEventListener('click',()=>{
       
        if(localStorage.getItem('flag')=="yes"){

            document.querySelector(`.div${currjson+1}`).style.backgroundColor="green";
        setdata(currjson+1);
        localStorage.setItem('index',JSON.stringify(currjson+1));
        currjson++;
        document.querySelector(".options").style.backgroundColor="transparent";
        document.querySelector(".messege").innerHTML="";

        let check=localStorage.getItem('status');
        if(check==="correct"&&score<=40){
            score+=4;
        }

        else{
            score-=1;
        }
        }
        
       
        
    })
    
}

const markpart=()=>{
    let mark=document.querySelector(".review");
    
    
    mark.addEventListener('click',()=>{
        let curroption=localStorage.getItem('index');
        let currjson=JSON.parse(curroption);
        document.querySelector(`.div${currjson+1}`).style.backgroundColor="#FFA500";
       
        
    })
}


const timerpart=()=>{
    let timer;
    const timerElement = document.querySelector('.timer');
    


    let totalTime = 300;

    timer = setInterval(() => {
      if (totalTime <= 0) {
        
        alert("Time's up!");
        window.location.href="score.html";
      } else {
        totalTime--;
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }, 1000);
}

let end=document.querySelector(".end");
console.log(end);

end.addEventListener('click',()=>{
    localStorage.setItem('finalscore',JSON.stringify(score))
    window.location.href="score.html";
    
})

getdata();
optionpart();
navigationpart();
changeques();
submitpart();
markpart();
timerpart();
mover();

})
