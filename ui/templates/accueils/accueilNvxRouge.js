import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './accueilNvxRouge.html';
/*
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.css'
*/

Template.logoutRéglages.events({
	'click #logout'(event) {
		event.preventDefault();
		Meteor.logout();
		setTimeout(() => FlowRouter.go('log'), 200);
	}
});

/* Swipe */
/*
$('.js-lazyload').lazyload({
	effect: 'fadeIn',
	threshold: 50,
});

var $topCard,
deltaThreshold = 100,
deltaX = 0;

function swipeEnded(event, direction, $card) {
	var  directionFactor,
	transform;
	if (event.type === 'click') {
		directionFactor = direction === 'right' ? -1 : 1;
	}
	else if (event.deltaX) {
		directionFactor = event.deltaX >= 0 ? -1 : 1;
	}
	if ( event.deltaX && deltaX > deltaThreshold || event.deltaX && deltaX < -1 * deltaThreshold || direction) {
		transform = 'translate(' + directionFactor * -100 + 'vw, 0) rotate(' + directionFactor * -5 + 'deg)';
		$card
		.delay(100)
		.queue(function () { 
			$(this).css('transform', transform).dequeue(); 
		})
		.delay(300)
		.queue(function () { 
			$(this).addClass('done').remove(); 
		});
		console.log('Swipe done. \nCard:', $card, '\nDirection:', directionFactor);
		
	}
	else {
		transform = 'translate(0, 0) rotate(0)';
		$card.css({
			'transform': transform,
		});
	}
}

function swipeLeft(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(5deg)';
	//translate the card on swipe
	$card.css({
		'transform': transform,
	});
}

function swipeRight(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(-5deg)';
	//translate the card on swipe
	$card.css({
		'transform': transform,
	});
}

/*Pour les interactions sur les écrans des tel portables */
/*
$('.js-swiping-card').each(function(index, element) {
	var $card = $(element),
	hammertime = new Hammer(element);
	hammertime.on('panleft swipeleft', function(event) {
		swipeLeft(event, $card);
	});
	hammertime.on('panright swiperight', function(event) {
		swipeRight(event, $card);
	});
	hammertime.on('panend', function(event) {
		swipeEnded(event, false, $card);
	});
});

$('.js-left-trigger').on('click', function(event) {
	var $topCard= $('.js-swiping-card').last();
	swipeEnded(event, 'left', $topCard);
});
$('.js-right-trigger').on('click', function(event) {
  var $topCard = $('.js-swiping-card').last();
  swipeEnded(event, 'right', $topCard);
}); 
*/