// JavaScript Document


function activateTag(id){
 
  for(var x=1;x<4;x++)
  {
    var tab = "tab"+x;
    if(id != tab)
    { 
     document.getElementById(tab).setAttribute("class","tab-inactive");
     document.getElementById(tab).style.zIndex="200";
    } 
    
    else{document.getElementById(tab).setAttribute("class","tab-active");
         document.getElementById(tab).style.zIndex="300";}
  }   
  
}

document.getElementById('tab1').addEventListener("click",function(){ activateTag('tab1'); });
document.getElementById('tab2').addEventListener("click",function(){ activateTag('tab2'); });
document.getElementById('tab3').addEventListener("click",function(){ activateTag('tab3'); });
