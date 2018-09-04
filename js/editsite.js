class Page extends ZeroFrame {
    onOpenWebsocket()
     {
       this.cmd("wrapperSetTitle", "EulerFinder");
       this.cmd("siteInfo", {}, (function(_this) {
       })(this));
     }
                                }
   rareInstance = new Page();


   function check(){
     (function a(){
       var address=document.getElementById("address").value;
       var description=document.getElementById("description").value;
       var name=document.getElementById("name").value;

       var text= "Site edit: "+address+"\n"+name+"\n"+description;
       document.getElementById('buttom').remove();
       document.getElementById('load').className= "loader";

       a.class="loader";
       emailjs.init("user_rdIriC2Dah0gM8NP68yXO");
       emailjs.send("euler","template_OwBU1vJO",{
        name: name,
        notes: text
                                          }).then(
      function(response) {
        console.log("SUCCESS", response);
        document.getElementById('load').className= "";
        document.getElementById('load').innerHTML = "Request Send";
                         },
      function(error) {
        console.log("FAILED", error);
        document.getElementById('load').className= "";
        document.getElementById('load').innerHTML = "Error";
                      });
                      })();
                 }