var animal = {
    options: ["dog", "cat", "rabbit", "hampster", "gold fish", "bird", "turtle", "horse", "cow", "giraf", "frog", "pig", "hippopotumus", "lion", "tiger", "elephant", "bear", "monkey", "wolf", "goat", "squirrel", "duck", "mouse"],
    optClass: "animal",
    optColor: "lightblue",
  }
  var celebrity = {
    options: ["elvis persely", "al pachino", "nicolos cage", "harrison ford", "bruce lee", "Jane fonda", "hema malini", "amitabh buchchan", "rajesh khanna", "rees witherspoon", "mat demon", "leanardo di caprio"],
    optClass: "celebrity",
    optColor: "pink"
  }
  
  var movie = {
    options: ["ghost", "god father", "Gone with the wind", "don",],
    optClass: "movie",
    optColor: "lightcoral"
  }
  var category = { animal: animal, celebrity: celebrity, movie: movie }
  var currentCat = animal;
  
  // Function to add select element
  function addSelect() {
    var catLabel1 = $("<label>");
    catLabel1.attr("id", "catLabel");
    catLabel1.attr("for", "mySelect");
    catLabel1.attr("for", "mySelect");
    catLabel1.text("Select From: ");
    var catOptions = [];
    catOptions[1] = $("<option>");
    catOptions[1].attr("value", "animal");
    catOptions[1].text("Animals");
    catOptions[2] = $("<option>");
    catOptions[2].attr("value", "celebrity");
    catOptions[2].text("Celebreties");
    catOptions[3] = $("<option>");
    catOptions[3].attr("value", "movie");
    catOptions[3].text("Movies");
    var catSelect = $("<select>");
    catSelect.attr("id", "mySelect");
    catSelect.append(catOptions[1]);
    catSelect.append(catOptions[2]);
    catSelect.append(catOptions[3]);
  
    $("#catSelectDiv").append(catLabel1);
    $("#catSelectDiv").append(catSelect);
  }
  
  //Add main H1 element
  function addMainH1() {
    var mainH1 = $("<h1>");
    mainH1.attr("id", "mainHeading");
    mainH1.text("Animal Search");
    $("#gifGroup").prepend(mainH1);
  }
  
  //Add add category Div
  function addCategoryAddDiv() {
    var catAddLabel = $("<label>");
    catAddLabel.attr("id", "catAdd");
    catAddLabel.attr("for", "category-input");
    catAddLabel.text("Add Animal");
    var catFirstInput = $("<input>");
    catFirstInput.attr("type", "text");
    catFirstInput.attr("id", "category-input");
    catFirstInput.attr("value", "");
    var catSecondInput = $("<input>");
    catSecondInput.attr("type", "submit");
    catSecondInput.attr("id", "add-category");
    catSecondInput.attr("value", "Submit");
  
    var catBr = $("<br>");
    $("#catAddDiv").append(catAddLabel);
    $("#catAddDiv").append(catFirstInput);
    $("#catAddDiv").append(catBr);
    $("#catAddDiv").append(catSecondInput);
  }
  
  // Function for dumping the JSON content for each button into the div
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < currentCat.options.length; i++) {
      var a = $("<button>");
      a.addClass(currentCat.optClass);
      a.css("background-color", currentCat.optColor);
      a.attr("data-name", currentCat.options[i]);
      a.text(currentCat.options[i]);
      $("#category-form").css("background-color", currentCat.optColor);
      $("#buttons-view").append(a);
      $("#category-input").val("");
    }
  }
  
  // This function handles events to add new buttons
  $("body").on("click", "#add-category", function (event) {
    event.preventDefault();
    var newOption = $("#category-input").val().trim();
    console.log("newOption :" + newOption);
    var optionExists = currentCat.options.indexOf(newOption.trim().toLowerCase());
    if (optionExists === -1) {
      currentCat.options.push(newOption);
      renderButtons(currentCat);
      $("#category-input").val("");
    }
  });
  
  //Toggle between still and animated when gif is clicked
  $("body").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      var newSRC = $(this).attr("data-animate");
      console.log("newSRC :" + newSRC);
      $(this).attr("src", newSRC);
      $(this).attr("data-state", "animate");
    }
  
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    $("#category-input").val("");
  });
  
  //Function to load category user selected
  $("body").on("change", "#mySelect", function () {
    currentCat = category[document.getElementById("mySelect").value];
    console.log("currentCat :"+currentCat);
    var selectVal = document.getElementById("mySelect").value;
    var currentCatText = selectVal.charAt(0).toUpperCase() + selectVal.slice(1);
    renderButtons(currentCat);
    $("#mainHeading").text(currentCatText + " Search");
    $("#catAdd").text("Add " + currentCatText);
    $("#show-category").empty();
  });
  
  // On load 
  // Calling the renderButtons, add select,h1 and other function to display the intial buttons
  renderButtons(currentCat);
  addSelect();
  addMainH1();
  addCategoryAddDiv();
  
  
  $(document).on("click", ".animal", displayAnimalInfo);
  $(document).on("click", ".celebrity", displayAnimalInfo);
  $(document).on("click", ".movie", displayMovieInfo);
  
  //call Giphy API
  function displayAnimalInfo() {
    var newanimal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + newanimal + "&limit=10";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("url :" + queryURL);
      var stringjson = JSON.stringify(response);
      console.log(response);
      console.log("length :" + response.data.length);
      $("#show-category").empty();
  
      var animalImg = [];
      var animalRow = [];
      var animalCol = [];
      var pRating = [];
      var pTitle = [];
      var animalCounter = 0;
      var imagCounter = 0;
  
      for (var i = 0; i < 4; i++) {
        animalRow[i] = $("<div>");
        animalRow[i].attr("class", "category-Row");
        $(".category-Col").css("border-color", currentCat.optColor);
        for (var j = 0; j < 3; j++) {
          imageCounter = j + animalCounter;
          if (imageCounter < response.data.length) {
            var rating = response.data[j + animalCounter].rating;
            var stillImg = response.data[j + animalCounter].images.fixed_height_still.url;
            var animatedImg = response.data[j + animalCounter].images.fixed_height_downsampled.url;
            var title = response.data[j + animalCounter].title;
            var dataUrl = response.data[j + animalCounter].url;
  
            animalCol[j] = $("<div>");
            animalCol[j].attr("class", "category-Col");
            pRating[j] = $("<p>");
            pRating[j].attr("class", "ratingP");
            pRating[j].text("Rating: " + rating);
            pTitle[j] = $("<p>");
            pTitle[j].attr("class", "titleP");
            pTitle[j].text("Title :" + title);
            console.log("title :" + title + "dataUrl :" + dataUrl + " animatedImg :" + animatedImg);
            animalImg[j] = $("<img src=" + stillImg + " data-still=" + stillImg + " data-animate=" + animatedImg + " data-state=still class=gif>");
            animalCol[j].append(pRating[j]);
            animalCol[j].append(pTitle[j]);
            animalCol[j].append(animalImg[j]);
            animalRow[i].append(animalCol[j]);
          }
        }
        animalCounter += 3;
        $("#show-category").append(animalRow[i]);
      }
      $("#show-category").append(animalRow[i - 1]);
    });
  }
  
  //call omdb API
  function displayMovieInfo() {
    var newmovie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?s=" + newmovie + "&y=&plot=short&apikey=trilogy";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("url :" + queryURL);
      console.log(response);
      
      $("#show-category").empty();
  
      var movieImg = []; $("#show-category").empty();
      var movieRow = [];
      var movieCol = [];
      var pRating = [];
      var pTitle = [];
      var movieCounter = 0;
      var imagCounter = 0;
  
      for (var i = 0; i < 4; i++) {
        movieRow[i] = $("<div>");
        movieRow[i].attr("class", "category-Row");
        $(".category-Col").css("border-color", currentCat.optColor);
        for (var j = 0; j < 3; j++) {
          imageCounter = j + movieCounter;
          if (imageCounter < response.Search.length) {
            var newactors = response.Search[j + movieCounter].Actors;
            var newmoviename = response.Search[j + movieCounter].Title;
            var newmovieYear = response.Search[j + movieCounter].Year;
            console.log(newmoviename);
            var poster = response.Search[j + movieCounter].Poster;
            console.log("poster :" + poster);
            movieCol[j] = $("<div>");
            movieCol[j].attr("class", "category-Col");
            pRating[j] = $("<p>");
            pRating[j].attr("class", "ratingP");
            pRating[j].text("Year: " + newmovieYear);
            pTitle[j] = $("<p>");
            pTitle[j].attr("class", "titleP");
            pTitle[j].text("Title :" + newmoviename);
            movieImg[j] = $("<img src=" + poster + " data-still=" + poster + " data-animate=" + poster + " data-state=still class=movie>");
            movieCol[j].append(pRating[j]);
            movieCol[j].append(pTitle[j]);
            movieCol[j].append(movieImg[j]);
            movieRow[i].append(movieCol[j]);
          }
        }
        movieCounter += 3;
        $("#show-category").append(movieRow[i]);
      }
      $("#show-category").append(movieRow[i - 1]);
    });
  }