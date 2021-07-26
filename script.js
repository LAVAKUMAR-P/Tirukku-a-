//TOP HEADING
let heading=document.createElement("div");
heading.className="heading";
heading.innerHTML="<h5>திருக்குறள்/THIRUKKURAL</h5>";
document.body.append(heading);
//SEARCH BAR

let searchBar=document.createElement("div");
searchBar.className="serch-bar"
searchBar.innerHTML =`
<div>
<div class="boxContainer" >
<table class="elementscontainer">
<tr>
    <td>
       <input type="text" placeholder="குறள் எண்/ENTER KURAL NUMBER(1 TO 1330)"
       class="search">
       <button class="btn" onclick='Search()'>SEARCH/தேடு</button>
    <td>
</tr>
</table>
<div>
</div>
`
document.body.append(searchBar);

//SERCH TRANSFER & CLEAR SCREEN
function Search(){
    var carbagecheck = document.getElementsByClassName('over-all-container');
    var carbagecheckerr = document.getElementsByClassName('error');
    if (carbagecheckerr.length > 0) {
        document.querySelector(".error").remove();
      }
     if (carbagecheck.length > 0) {
        document.querySelector(".over-all-container").remove();
      }
    const query=document.querySelector('.search').value;
    localStorage.setItem("number",query);
    getdata();
}


//get data from api
async function getdata(){
    let number=localStorage.getItem("number");
    console.log(number)
    const userData=await fetch(`https://api-thirukkural.vercel.app/api?num=${number}`,
    {
        method:"GET"
    }
    );
    try{
        const data=await userData.json();
        loadData(data);
        console.log(data);  
    }
    catch(err){
        const userList = document.createElement("div");
        userList.className = "error";
        userList.innerHTML=`PLEASE SEARCH VALIED NUMBER<br><br>
        அறத்துப்பால்/Virtue -(1-380)<br>
        பொருட்பால்/Wealth-(381-1080)<br>
        காமத்துப்பால்/Love-(1081-1330)
        </div>`
        document.body.append(userList);
        alert("please check your network connection OR Enter valied number between(1 to 1330)");
    }  
}

//to upped data to UI
function loadData(data){
    const div1=document.createElement("div");
    div1.className="over-all-container";
    let card=document.createElement("div");
    card.className="card";
    card.innerHTML=`<div class="tamil">
    <div>
    <img class="image" src="image.JPG"/>
    <div class="head">
    <h4>தமிழ்</h4>
    </div>
    <div class="top-heading">
    குறள் எண்:${data.number}<br>பால்:${data.sect_tam} <br> இயல்கள்:${data.chapgrp_tam}<br>அதிகாரங்கள்:${data.chap_tam}
    </div><br>
   <div class="green">
   குறள்:<br><br>
   <div class="poem">${data.line1}<br>${data.line2}</div>
   </div>
   <div class="green">
    <br>பொருள்:<br><br><div class="poem">${data.tam_exp}</div>
   </div>
    <br><br>
   </div>

   <div class="english">
   <div class="head">
   <h4>ENGLISH</h4>
   </div>
   <div class="top-heading">
    Number: ${data.number} <br> Section: ${data.sect_eng}<br>Chapter Groups: ${data.chapgrp_eng}<br>Chapters: ${data.chap_eng}
   </div>
   <br>
   <div class="green">
   The poem traslated to English:<br><br>
   <div class="poem">${data.eng}</div>
   </div>
   <div class="green">
   <br>explanation :<br><br><div class="poem">${data.eng_exp}</div>
   </div>
   
   </div>
    `
    div1.append(card);
    document.body.append(div1);
    //footer();
}


/*function footer(){
let footer=document.createElement("footer");
footer.className="heading";
footer.innerHTML="<h5>திருக்குறள்/THIRUKKURAL</h5>";
document.body.append(footer);
}*/
