  document.addEventListener("DOMContentLoaded", function () {
    let baseUrl = "http://localhost:3000";
    let ramenMenu = document.getElementById("ramen-menu");
    let ramenDetail = document.getElementById("ramen-detail");
    let newRamenForm = document.getElementById("new-ramen");
  
    // Function to create a new ramen card
    function createRamenCard(ramen) {
      let card = document.createElement("div");
      card.className = "ramen-card";
      card.dataset.id = ramen.id;
  
      let image = document.createElement("img");
      image.src = ramen.image;
      image.alt = ramen.name;
      card.appendChild(image);
  
      // Add event listener to the ramen card
      card.addEventListener("click", function () {
        showRamenDetail(ramen);
      });
  
      return card;
    }
  
    // Function to display the ramen detail
    function showRamenDetail(ramen) {
      let detailImage = document.querySelector(".detail-image");
      let name = document.querySelector(".name");
      let restaurant = document.querySelector(".restaurant");
      let ratingDisplay = document.querySelector("#rating-display");
      let commentDisplay = document.querySelector("#comment-display");
  
      detailImage.src = ramen.image;
      detailImage.alt = ramen.name;
      name.textContent = ramen.name;
      restaurant.textContent = ramen.restaurant;
      ratingDisplay.textContent = ramen.rating;
      commentDisplay.textContent = ramen.comment;
    }
  
    // Function to fetch all ramen objects
    function fetchRamen() {
      fetch(baseUrl + "/ramens")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          data.forEach(function (ramen) {
            let card = createRamenCard(ramen);
            ramenMenu.appendChild(card);
          });
        })
        .catch(function (error) {
          console.log("Error fetching ramen:", error);
        });
    }
  
    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault();
  
      let nameInput = document.getElementById("new-name");
      let restaurantInput = document.getElementById("new-restaurant");
      let imageInput = document.getElementById("new-image");
      let ratingInput = document.getElementById("new-rating");
      let commentInput = document.getElementById("new-comment");
  
      let newRamen = {
        name: nameInput.value,
        restaurant: restaurantInput.value,
        image: imageInput.value,
        rating: parseFloat(ratingInput.value),
        comment: commentInput.value,
      };
  
      let card = createRamenCard(newRamen);
      ramenMenu.appendChild(card);
  
      // Reset form inputs
      newRamenForm.reset();
    }
  
    // Add event listener to the new ramen form
    newRamenForm.addEventListener("submit", handleFormSubmit);
  
    // Fetch ramen objects and display them on page load
    fetchRamen();
  });
  
