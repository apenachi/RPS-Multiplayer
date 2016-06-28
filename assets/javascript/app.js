
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
		var playerID;
		var thisPlayer;
		var toBeRemoved;
		var whosTurn;

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
			db.ref().child('turn').once('value', function(snapshot) {
				// whosTurn = whosTurn ?  2 : 1;
				db.ref().child('turn').set({turn : n});
			});
		};

		var ok = true;
		function displayGameMessage(snap) {
			console.log('called ');
			var gameMessage = $('<h3>', {
				text : 'Welcome ' + snap.val().name,
				attr : {'data-key' : snap.key},
				id : snap.key,
			});
			$('#game-message').append(gameMessage);
			$('#game-message > h3').hide();
			if (snap.key === '1') {
				$('#' + '1').show();
				// $('#' + '2').hide();
				
			} else {
				$('#' + '2').show();
				// $('#' + '1').hide();
			}
			ok = false;
			// console.log(name);
		}
		db.ref().child('players').on('value', function(snapshot) {

				numberOfPlayers = snapshot.numChildren();
				playerID = numberOfPlayers + 1;
			console.log('players: ' + numberOfPlayers);
			if (numberOfPlayers === 2 ) {
			// 	console.log('yes');
				$('#playerform').remove();
				
			// } else {
			// 	console.log('no');
			// 	playerID = numberOfPlayers + 1;
			}
			// if (getTurn() === 2) {
			// 	$('.1').hide();
			// } else {
			// 	$('.2').hide();
			// }
		});

		db.ref().child('players').on('child_added', function(snapshot) {
			 console.log(snapshot.key);
				if (snapshot.key === '1') {
					console.log('this 1st Key: ' + snapshot.key);
					// $('.2').hide();
					// $('.1').show();
				} else {
					console.log('this 2nd Key: ' + snapshot.key);
					// $('.1').hide();
					// $('.2').show();
				};

				if (snapshot.key === '1') {
					var id = 'left';
				} else {
					var id = 'right'
				};
				var div = $('#' + id);
				var h4 = $('<h4>', {
					data: {key: snapshot.key},
					attr: {'data-key' : snapshot.key},
					text: snapshot.val().name,
				});
				div.append(h4);
				div.append('<p class =' + snapshot.key + '>' + 'ROCK' + '</p>');
				div.append('<p class =' + snapshot.key + '>' + 'PAPER' + '</p>');
				div.append('<p class =' + snapshot.key + '>' + 'SCISSORS' + '</p>');

				// displayGameMessage(snapshot);
		});

		db.ref().child('chat').on('child_added', function(snapshot) {	
			toBeRemoved =  snapshot.key;
			// Get Firebase Object Key
			console.log('snapshot key: ' + snapshot.key);
			var chat = snapshot.val();
			var p = $('<p>' + chat.message + '</p>');
			$('.chatroom').append(p);

		});

		$(document).on('click', '.1', function(){
			var rps = $(this).text();
			console.log(rps);
			db.ref().child('players').child(1).set({name: name, choice: rps, losses : 0, wins: 0});
			$(this).css({
				'font-size' : '35px',
				'color' : 'red',
				'display' : 'none',
			});
			$('.1').toggle();
		});

		$(document).on('click', '.2', function(){

			var rps = $(this).text();
			db.ref().child('players').child(2).set({name: name, choice: rps, losses : 0, wins: 0});
			$(this).css({
				'font-size' : '35px',
				'color' : 'red',
				'display' : 'none',
			});
			$('.2').toggle();
		});

		$('#message-submit').on('click', function(){
			console.log($('#message-input').val());
			var message = $('#message-input').val();
			$('#message-input').val('');
			db.ref().child('chat').push({user: 'user', message : message});
			return false;
		});

		$('#player-submit').on('click', function(){
			var name = $('#player-input').val();
			$('#player-input').val('');
			console.log('submit');
			console.log('playerID: ' + playerID);
			db.ref().child('players').child(playerID).set({name: name, choice: '', losses : 0, wins: 0});
			return false;
		});

	$(window).on('beforeunload', function(){
		console.log('bye');
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
