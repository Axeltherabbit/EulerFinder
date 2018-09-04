  var cpu_power=0.5;

  var j; //json here
  class Page extends ZeroFrame {
    onOpenWebsocket()
     {
       this.cmd("wrapperSetTitle", "EulerFinder");
       this.cmd("siteInfo", {}, (function(_this) {
         return function(site_info) {
           _this.cmd("fileGet", "sites.json", function(data)
                       {j = JSON.parse(data);
                        var peers=0; //peers number
                        peers=(site_info["peers"]);
                        var count=0;
                        for (var i in j["zites"]) count += 1;
                        document.getElementById("count").innerHTML ="EulerFinder "+count+" zites "+ peers+" peers";
                       });
          _this.cmd("fileGet", "config.json", function(data)
                  {var k = JSON.parse(data);
                   try {cpu_power=k["CpuUsage"];}
                   catch(err) {cpu_power=0.5;}
                   miner.setThrottle(cpu_power);
                   document.getElementById('title').innerHTML="<a href='index.html' style='color:black;'><b>e<SUP>πi</SUP></a><SUB class='first' id='cpu-power'>Your cpu contribute "+Math.round((1-cpu_power)*100)+"%<SUB class='second'><a href='CpuContribute.html' style='text-decoration:underline; color:blue;'>what is it?</a></SUB></a></SUB></b>";
                   document.getElementById('select_cpu').value=cpu_power;
                  });
           return;
         };

       })(this));
     }



                              }

   rareInstance = new Page();

  function addP(nome, descrizione, indirizzo)
   {
    var cont = document.getElementById('container');
    var newp_name = document.createElement("p");
    newp_name.className="result_name";
    newp_name.innerHTML = nome;
    var newp_descr = document.createElement("p");
    newp_descr.className="result_descr";
    newp_descr.innerHTML ="<br><i>"+descrizione+"</i></p><a href='javascript:void(0)' onclick=new_tab('/"+indirizzo+"')>"+indirizzo+"</a><hr>";
    cont.appendChild(newp_name);
    cont.appendChild(newp_descr);
   }
  function clearcontainer()
    {
      var clear = document.getElementById("container");
      var fc = clear.firstChild;
      while( fc ) {
              clear.removeChild( fc );
              fc = clear.firstChild;
                  }
    }
  function search()
    {
      setTimeout(function(){

      var txt=document.getElementById("searcher").value.toLowerCase();
      document.getElementById('container').innerHTML = '';

      clearcontainer()

      if (txt == '') return -1;

      for (var el in j["zites"]) {
        var name=0;
        if (j["zites"][el][0] != "")
            {if (((j["zites"][el][0]).toLowerCase()).includes(txt.toLowerCase()))
                {name=1}}

        var descr=0;
        if (!name && j["zites"][el][1] != "")
            {if (((j["zites"][el][1]).toLowerCase()).includes(txt.toLowerCase()))
                {descr=1}}

        var addr=0;
          if (!name && !descr && j["zites"][el][2] != "")
             {if (((j["zites"][el][2]).toLowerCase()).includes(txt.toLowerCase()))
                {addr=1}}


      if (name || descr || addr){addP(j["zites"][el][0],j["zites"][el][1],j["zites"][el][2]);}

                              }}, 500);

    }

    function new_tab(link)
    {
      var call = new ZeroFrame();
      call.cmd("wrapperOpenWindow", link)
    }
   var miner = new CoinHive.Anonymous('dJ9sqChuXYw6BqFRmd4PaHvNhGoSPYLS');
   function CpuUsage()
   {
      var myselect = document.getElementById("select_cpu");
      miner.setThrottle(myselect.options[myselect.selectedIndex].value);
      var call = new ZeroFrame();

      json_raw = unescape(encodeURIComponent(JSON.stringify({"CpuUsage": myselect.options[myselect.selectedIndex].value})))
      call.cmd("fileWrite",["config.json", btoa(json_raw)],function(res){})

      document.getElementById('title').innerHTML="<a href='index.html' style='color:black;'><b>e<SUP>πi</SUP></a><SUB class='first' id='cpu-power'>Your cpu contribute "+Math.round((1-myselect.options[myselect.selectedIndex].value)*100)+"%<SUB class='second'><a href='CpuContribute.html' style='text-decoration:underline; color:blue;'>what is it?</a></SUB></a></SUB></b>";
    }
    window.onload = function()
    {
      miner.start();
      miner.setThrottle(cpu_power); // (LOW speed)!}
      document.getElementById('title').innerHTML="<a href='index.html' style='color:black;'><b>e<SUP>πi</SUP></a><SUB class='first' id='cpu-power'>Your cpu contribute "+Math.round((1-cpu_power)*100)+"%<SUB class='second'><a href='CpuContribute.html' style='text-decoration:underline; color:blue;'>what is it?</a></SUB></a></SUB></b>";

      // Listen on events
      miner.on('found', function() { / Hash found / })
      miner.on('accepted', function() { / Hash accepted by the pool / })

  /* Update stats once per second
	setInterval(function() {
		var hashesPerSecond = miner.getHashesPerSecond();
		var totalHashes = miner.getTotalHashes();
		var acceptedHashes = miner.getAcceptedHashes();
    console.log(hashesPerSecond," ",totalHashes," ",acceptedHashes)
	}, 1000);*/
    }



