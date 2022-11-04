let loginMail = document.getElementById("login-mail");
let loginPass = document.getElementById("login-pass");
let loginButton = document.getElementById("login");
let bodyHome = document.getElementById("body-home");
let welcome = document.getElementById("welcome");
let userName  =document.getElementById("user-name");
let signUpMail=document.getElementById("signup-mail");
let signUpPass=document.getElementById("signup-pass");
let signupButton=document.getElementById("signup");
let usersList = []


//events

if(loginButton)
{
loginButton.addEventListener("click", function () {
        login();
      });
    
    }


if(signupButton)
{
  signupButton.addEventListener("click",function(){

  if(document.getElementById("invalidCheck").checked==false)
{
  document.getElementById("check").style.display="block"
  
  
}

   

if(mailValidation()==true && passwordValidation()==true &&document.getElementById("invalidCheck").checked)
    {
      document.getElementById("check").style.display="none"
    register();
    }
})
}

    
if (localStorage.getItem('users') == null) {
    usersList = []
} else {
    usersList = JSON.parse(localStorage.getItem('users'))
}


if(signUpMail)
{
  signUpMail.addEventListener("blur",function(){
    mailValidation();
 })
}


if(signUpPass)
{
  signUpPass.addEventListener("blur",function(){
    passwordValidation();
 })
}



let username = localStorage.getItem('sessionUsername')
    if (username)
    {
    if(document.getElementById('welcome'))
    {
      document.getElementById('welcome').innerHTML = `Welcome ${username}`
    }
    
    }


function isMailExist(){
    for(let i=0; i< usersList.length;i++)
    {
    
        if(usersList[i].mail.toLowerCase()==signUpMail.value.toLowerCase()){
            
            return true
        }
        
    };
}



function register(){
    if (signUpMail.value == "" || signUpPass.value == ""|| userName.value=="") {
        document.getElementById("empty").style.display = "block";
        document.getElementById("already-exists").style.display="none"
        document.getElementById("success").style.display="none"
        return true
       
      
      } 
  
    let user={
        name:userName.value,
        mail:signUpMail.value,
        password:signUpPass.value,

    }

    if(isMailExist() == true){
        
        document.getElementById("success").style.display="none"
        document.getElementById("empty").style.display = "none";
        document.getElementById("already-exists").style.display="block"

    }
    
    else {
    usersList.push(user)
    localStorage.setItem("users",JSON.stringify(usersList))
    document.getElementById("empty").style.display = "none";
    document.getElementById("already-exists").style.display="none"
    document.getElementById("success").style.display="block"
    
    
    }
}

function login (){
    if (loginMail.value == "" || loginPass.value == "") {

        document.getElementById("incorrect").style.display = "none";
        document.getElementById("empty").style.display = "block";
        return true
      } 
      for (let i = 0; i < usersList.length; i++) {
   
        if (
          loginMail.value.toLowerCase() == usersList[i].mail.toLowerCase() &&
          loginPass.value == usersList[i].password
        )
         {
          
          location = "home.html";
          localStorage.setItem('sessionUsername', usersList[i].name);
      
         
           
        } 
       
        else{
          
          document.getElementById("empty").style.display = "none";
          document.getElementById("incorrect").style.display = "block";
        }

}
}


function logout(){
    localStorage.removeItem('sessionUsername')
    

}

//validation
function mailValidation(){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signUpMail.value))
{
  signUpMail.classList.remove("is-invalid")
  signUpMail.classList.add("is-valid")
  document.getElementById("mail-valid").style.display="none"
  return true
}
   else {
     
      signUpMail.classList.remove("is-valid")
      signUpMail.classList.add("is-invalid")
      document.getElementById("mail-valid").style.display="block"
      return false
      }

}

function passwordValidation(){
  if(/^[A-Za-z]\w{7,14}$/.test(signUpPass.value))
  {
  signUpPass.classList.remove("is-invalid")
  signUpPass.classList.add("is-valid")
  document.getElementById("pass-valid").style.display="none"
  return true
  }
   else { 
      signUpPass.classList.remove("is-valid")
      signUpPass.classList.add("is-invalid")
      document.getElementById("pass-valid").style.display="block"
      return false
}
}



