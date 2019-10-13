"use strict";

let $searchForm = $("#search-form");
let $carouselInner = $('.carousel-inner');
let $carouselItem = $('.carousel-item');
let videos = [];

$searchForm.on("submit", function(event) {
    event.preventDefault();

    let query = $(this).find("[name='search-term']").val().replace(/\s/g, "+");

    getVideos(query);
});

function getVideos(query) {
    let url = `https://itunes.apple.com/search?limit=10&entity=musicVideo&term=${query}`;
    $.ajax({
        url,
        method: "GET",
       
    }).done(function (response)  {
        console.log(response);
        let parsedResponse =  JSON.parse(response);
        videos = parsedResponse.results;
      addVideos(videos);
    }).fail((error) => {
        console.log(error);
    })
    
}

function addVideos(data) {
    $carouselInner.empty();
    data.forEach((video) => {
       
        $("<video controls>").attr("src", video.previewUrl)
        .addClass("video-item")
        .appendTo($("<div>")
        .addClass("carousel-item")
        .appendTo($carouselInner));
    });

    $(".carousel-inner .carousel-item").first().addClass('active');
    // $(".carousel-item .video-item").first().attr('autoplay','autoplay');
  
}

$('#carouselExampleFade').on('slide.bs.carousel', function () {
   
    $('video').trigger('pause');
})

