(function (){
	var repos = {};

	var section = document.getElementById("main");
	section.classList.remove("is-hide");
	section.classList.add("section-opacity");

	function getRepos () {
		get().then(function(response) {
		  	compileTemplate(JSON.parse(response));
				section.classList.remove("red-text");
		}, function(error) {
		  console.log("Failed to fetch data.txt: " + error);
			section.classList.add("red-text");
		});
	}

	function get() {
	  return new Promise(function(succeed, fail) {
			var params = document.getElementById("repo").value || "Javascript";
			var req = new XMLHttpRequest();
			req.open("GET", "https://api.github.com/search/repositories?q=" + params, false);
	    req.addEventListener("load", function() {
	      if (req.status < 400)
	        succeed(req.response);
	      else
	        fail(new Error("Request failed: " + req.statusText));
	    });
	    req.addEventListener("error", function() {
	      fail(new Error("Network error"));
	    });
	    req.send(null);
	  });
	}

	var myBtn = document.getElementById("myButton");

	myBtn.addEventListener("click", getRepos);
})();

function compileTemplate(data) {
	var container = document.getElementById('repos-list');
	var source = document.getElementById('repo-template').innerHTML;

	var theTemplate = Handlebars.compile(source);

	container.innerHTML = theTemplate(data);
}
