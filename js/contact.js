function validation(e) {
  e.preventDefault();
  console.log("The message was submitted.");

  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let email = document.getElementById("email").value;
  let gender = document.getElementsByName("gender");
  let message = document.getElementById("message").value;
  const alert_message = document.getElementById("alert_message");
  const submit_message = document.getElementById("submit_message");

    if (name == "" || surname == "" || email == "" || message == "") {
      alert_message.style.padding = "10px";
      alert_message.innerHTML = "Please fill out all fields.";    
    } else {
      if (name.length < 3) {
        alert_message.style.padding = "10px";
        alert_message.innerHTML = "Name must have at least 3 characters.";
      } else {
        if (surname.length < 3) {
          alert_message.style.padding = "10px";
          alert_message.innerHTML = "Surname must have at least 3 characters.";
        } else {
          let atsymbol = email.indexOf("@");
          let dotsymbol = email.lastIndexOf(".");
          if (
            atsymbol < 1 ||
            dotsymbol < atsymbol + 2 ||
            dotsymbol + 2 >= email.length
          ) {
            alert_message.style.padding = "10px";
            alert_message.innerHTML = "Please use a valid email adress.";
          } else {
            //   Success
            submit_message.style.padding = "10px";
            submit_message.innerHTML = `Thank you ${name}, we will get back to you soon!`;
            setTimeout(function(){ 
              document.getElementById("submit_message").innerHTML = "";
          }, 2500);
            setTimeout(function(){ 
              document.getElementById("submit_message").style.padding = "";
          }, 2350);
          }
        }
      }
    }
    setTimeout(function(){ 
      document.getElementById("alert_message").innerHTML = "";
  }, 2450);
    setTimeout(function(){ 
      document.getElementById("alert_message").style.padding = "";
  }, 2500);
  }
  
  document.getElementById("myForm").addEventListener("submit", validation, false);

  validation ();