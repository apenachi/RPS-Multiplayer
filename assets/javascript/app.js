
		var config = {
			apiKey: "AIzaSyDOiUyKYsUXAQB1UczNr47SoElPP2ROCEg",
			authDomain: "fir-app-6c1bf.firebaseapp.com",
			databaseURL: "https://fir-app-6c1bf.firebaseio.com",
			storageBucket: "fir-app-6c1bf.appspot.com",
		};

	// Initialize Firebase  
		firebase.initializeApp(config);

	// Create a variable to reference the database
		var	db = firebase.database();
		var numberOfPlayers;
		var thisPlayer= 0;
		var toBeRemoved;
		var session;

		// db.ref().child('players');		
		// db.ref().child('chat');
		function getTurn() {
			db.ref().child('turn').once('value', function(snapshot) { 
				// console.log(snapshot.val().turn);
				if (!snapshot.val()) {
					setTurn(1);
					return(1);
				} else if (snapshot.val().turn === 1) {
					setTurn(2);
					return(2);
				} else {
					setTurn(1);
					return(1);
				}
			});
		};

		function setTurn(n) {
			// db.ref().child('turn').once('value', function(snapshot) {
				// whosTurn = whosTurn ?  2 : 1;
				db.ref().child('turn').set({turn : n});
			// });
		};

		function displayTopBottom(snap) {
			$('#player' + snap.key).empty();
			$('#player' + snap.key).append('<p>' + snap.val().name + '<p>');
			var rps = $('<div>', {
				css : {'width' : '100%', 'height' : '60%', 'background-color' : '#cea'},
				class : 'rps' + snap.key,
			})			
			var winslosses = $('<p>', {
				text : 'Wins: ' + snap.val().wins + '   losses: ' + snap.val().losses,
				css : {'font-size':'10px'},
			});
			$('#player' + snap.key).append(rps);
			$('#player' + snap.key).append(winslosses);
		}

		function displayGameMessage(snap) {
			var gameMessage = $('<h3>', {
				text : 'Hi "' + snap.val().name + '" you are player ' + snap.key,
				attr : {'data-key' : snap.key},
				class : snap.key,
			});
			$('#playerform').remove();
			$('#game-message').append(gameMessage);
			
			// rps.append('<p class =' + snap.key + '>' + 'ROCK' + '</p>');
			// rps.append('<p class =' + snap.key + '>' + 'PAPER' + '</p>');
			// rps.append('<p class =' + snap.key + '>' + 'SCISSORS' + '</p>');
			// $('#player' + snap.key).append(rps);
			// $('#player' + snap.key).append(winslosses);

		}

		db.ref().child('players').on('value', function(snapshot) {

console.log('players.on.value');
console.log('players.on.value.Children: ' + snapshot.numChildren());
			if(snapshot.numChildren() ==='2') {
				setTurn(1);
			}
		});

		db.ref().child('players').on('child_added', function(snapshot) {
console.log('players.on.child_added');
				displayTopBottom(snapshot);
				
				// var div = $('#player' + snapshot.key);
				// var h4 = $('<h4>', {
				// 	data: {key: snapshot.key},
				// 	attr: {'data-key' : snapshot.key},
				// 	text: snapshot.val().name,
				// });
				// div.append(h4);
				// div.append('<p class =' + snapshot.key + '>' + 'ROCK' + '</p>');
				// div.append('<p class =' + snapshot.key + '>' + 'PAPER' + '</p>');
				// div.append('<p class =' + snapshot.key + '>' + 'SCISSORS' + '</p>');

		});

		db.ref().child('chat').on('child_added', function(snapshot) {
	console.log('chat.on.child_added');
			toBeRemoved =  snapshot.key;
			// Get Firebase Object Key
			// console.log('snapshot key: ' + snapshot.key);
			var chat = snapshot.val();
			var p = $('<p>' + chat.message + '</p>');
			$('.chatroom').append(p);

		});

		$(document).on('click', '.1', function(){
	console.log('document.on.click.1');
			var rps = $(this).text();
			db.ref().child('players').child(1).set({name: name, choice: rps, losses : 0, wins: 0});
			$(this).css({
				'font-size' : '35px',
				'color' : 'red',
				'display' : 'none',
			});
			// $('.1').toggle();
		});

		$(document).on('click', '.2', function(){
	console.log('document.on.click.2');
			var rps = $(this).text();
			db.ref().child('players').child(2).set({name: name, choice: rps, losses : 0, wins: 0});
			$(this).css({
				'font-size' : '35px',
				'color' : 'red',
				'display' : 'none',
			});
			// $('.2').toggle();
		});

		$('#message-submit').on('click', function(){
			console.log($('#message-input').val());
			var message = $('#message-input').val();
			$('#message-input').val('');
			db.ref().child('chat').push({user: 'user', message : message});
			return false;
		});

		function checkSession() {
				var sesstion;
				db.ref().child('players').once('value', function(snapshot) {
						console.log('once ' + snapshot.numChildren());
						session = snapshot.numChildren() + 1;
				});
				return(session); 
		}

		$('#player-submit').on('click', function(){
console.log('#player-submit.on.click');
			var name = $('#player-input').val();
			$('#player-input').val('');

			var thisSession = checkSession();

			// Add Player
			db.ref().child('players').child(thisSession).set({name: name, choice: '', losses : 0, wins: 0});

			// Display Messages
			console.log('session: ' + thisSession);
			db.ref('players').child(session).once('value', function(snapshot) {
				console.log(snapshot.val().name);
				displayGameMessage(snapshot);
			});

			return false;
		});


	$(window).on('beforeunload', function(){
	console.log('window.on.beforeunload');
		// db.ref().child('chat').child(toBeRemoved).remove();
		// db.ref().child('players').child(thisPlayer).remove();
			// db.ref().child('chat').once('value', function(snapshot) {
			// 	// Remove Children
			// 	console.log(snapshot);
			// 	if (snapshot.key === '-KLJ0B6q2IypVM8Iu9CN') {

			// 		db.ref().child('chat').child('-KLJ0B6q2IypVM8Iu9CN').remove();

			// 	} else {
			// 		console.log('nope');
			// 	}
			// });
	});
