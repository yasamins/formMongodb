'use strict';
let originalData = null;
let map = null;
let marker = null;


const fetchData = () => {
    fetch('data.json')
        .then(response => {
            return response.json();
        })
        .then(items => {
            originalData = items;
            update(items);
        }).catch(function(err) {
            console.log("it cant fetch"+ err);

        });
};
// const sortData = (a,b) => {
//   var textA = a.category.toUpperCase();
//      var textB = b.category.toUpperCase();
//      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//  });
const sortItems = (items, rule) => {
    const newItems = items.filter(item => item.category === rule);
    update(newItems);
  };
// const sortData(function(a, b) {
//     var textA = a.category.toUpperCase();
//     var textB = b.category.toUpperCase();
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
// });
// console.log(newItems);
const update = (items) => {
    // categoryButtons(items);
    document.querySelector('.card-deck').innerHTML = '';
    for (let item of items) {
        console.log(item);
        const article = document.createElement('article');
        //every article has a class and a card attribute
        article.setAttribute('class', 'card');

        article.innerHTML = `
                        <img class="card-img-top" src="${item.thumbnail}" alt="">
                        <div class="card-block">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.details}</p>
                        </div>
                        <div class="card-footer">
                            <p><button class="btn btn-primary">View</button></p>
                        </div>
                        `;
        article.addEventListener('click', (evt) => {
            document.querySelector('.modal-body img').src = item.image;
            document.querySelector('.modal-title').innerHTML = item.title;
            $('#myModal').modal('show');
        });
        document.querySelector('.card-deck').appendChild(article);
    }
};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
    var marker = new google.maps.Marker({
        map: map
    });
};
const resetMap = (item) => {
    const coords = item.coordinates;
    console.log(coords);
    google.maps.event.trigger(map, "resize");
    map.panTo(coords);
    marker.setOptions({
        position: coords
    });
};
fetchData();
// initMap();
