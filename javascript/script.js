// have user input their postal code
// have user input their ideal size and age of pet 
// display new "tinder card" for each adoptable pet (name, age, sex, description)
// user can swipe left or right on pets
// gallery will be generated for all liked pets
// overlay will display the selected pet with all pet details and contact info for the shelter 

const petApp ={};
petApp.apiKey='93aa7050878a877fdcd5aeb00962085e';
petApp.baseApiUrl = 'http://api.petfinder.com/';
petApp.liked = [];

//start call getting data 
petApp.getData = function(locationString, sizeString, ageString){
	$.ajax({
		url:'http://api.petfinder.com/pet.find',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			key: petApp.apiKey,
			format: 'json',
			animal: 'dog',
			location: locationString,
			output: 'string',
			size: sizeString,
			count: 12,
			age: ageString 
		},
		success: function(response){
			//write a each loop for each item shows up in the results array
			petApp.displayDogs(response.petfinder.pets.pet);
			//in each result run the function that displays the dog
		}
	});
}

petApp.location = function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		var location = $('input.location').val();
		var size = $('#size').val();
		var age =$('#age').val();
		petApp.getData(location, size, age);
	});
};


// Display one pet 
petApp.displayDogs = function(data){
	$('header.intro').fadeOut();
	$.each(data, function(i, piece){
		var photo = piece.media.photos;
		var descript = piece.description;
		console.log(piece);
		if (photo != undefined && descript != undefined) {
			var name = $('<p>').addClass('dogName').text(piece.name.$t);
	 	var age = $('<p>').addClass('dogAge').text(piece.age.$t);
		var breed = $('<p>').addClass('breed').text(piece.breeds.breed.$t);
	 	var image = $('<img>').attr('src', piece.media.photos.photo[2].$t);
	 	var dogFile = $('<li>').addClass('dogFile').attr('data-dscrpt', piece.description.$t).append(image, name, age, breed);
	 	$('.deck').append(dogFile);
		}
	});
   petApp.sortDogs();
};

petApp.sortDogs = function() {
	$(".results").jTinder({
	    onLike: function(item) {
		    var index = item.index();
		    var list = $('ul.deck li');
		    var faved = list[index];
		    petApp.liked.push({
		    	name: $(faved).find('p.dogName').text(),
		    	description: $(faved).data('dscrpt'),
		    	image: $(faved).find('img').attr('src')
		    });
		    petApp.showLiked();
	    }
	});
}


// Show "liked" pets
petApp.showLiked = function() {
	$('.faveddogs').empty();
	$('input.view').on('click', function() {
		$('section.choices');
	});
	$.each(petApp.liked, function(x, y) {
		const choiceName = $('<p>').addClass('choiceName').text(y.name);
		const choiceDescription = $('<p>').addClass('choiceDescription').text(y.description);
		const choiceImg = $('<img>').addClass('choiceImg').attr('src', y.image);
		const choice = $('<article>').append(choiceImg, choiceName, choiceDescription);
		$('.faveddogs').append(choice); 
	});
}

petApp.init = function(){
	petApp.location();
};

$(function(){
	petApp.init();
});



