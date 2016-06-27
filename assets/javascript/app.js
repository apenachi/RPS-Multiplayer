		var triviaQuestions = [{
			question: 'What is Git',
			options : ['A version control system', 'A Cloud Service', 'Name of my laptop'],
			answer : 'A version control system'
		},
		{
			question: 'What is GitHub',
			options : ['Cloud storage server', 'The name of my boat', 'A boardgame'],
			answer : 'Cloud storage server'
		},
		{
			question: 'What is Json',
			options : ['Javascript Object Notation', 'Java source onclick', 'Javasrctip son', 'Jquery Stateless Object Notation'],
			answer : 'Javascript Object Notation'
		},
		{
			question: 'What is CSS',
			options : ['Graphical User Interface', 'Command Source Service', 'Cascading Style Sheets'],
			answer : 'Cascading Style Sheets'
		},
		{
			question: 'What AJAX stands for',
			options : ['A Javascript Async XML', 'Async Java And And Xml', 'Async Javascript And XML', 'Async Java And XML'],
			answer : 'Async Javascript And XML'
		},		
		];
		var currentTriviaQuestion = 0;
		var rightAnswer;
		var time;
		var timer;
		var rightAnswers = 0;
		var wrongAnswers = 0;
		var unanswered = 0;
		var looser = $('<iframe src="http://giphy.com/embed/BvLBKDhHSZdAY"" width="480" height="489" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
		var winner = $('<iframe src="http://giphy.com/embed/l0K4gl3QvnIjoy0Tu" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
		var notime = $('<iframe src="http://giphy.com/embed/sQpl7yebgk3Pq" width="480" height="356" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
		$(document).ready(function() {
			$('.trivia').hide();
			$('.start').show();
			$('.start').on('click', function() {
				start();
			});



			function start(){
				time = 5;
				if (currentTriviaQuestion === triviaQuestions.length) {
					displayTotals();
				} else {
					$('.time').html('Time Remaining: ' + time);
					$('.trivia').show();
					$('.start').hide();
					$('.footer').empty();
					askQuestion(triviaQuestions[currentTriviaQuestion]);
					rightAnswer = triviaQuestions[currentTriviaQuestion].answer;
					console.log('rightAnswer ' + triviaQuestions[currentTriviaQuestion].answer);
					console.log('currentTriviaQuestion ' + currentTriviaQuestion);
					timer = setInterval(countDown, 1000);
					$('.option').on('click', '.op', function(){
						var userAnswer = $(this).text();
						console.log('inside : ' + userAnswer);
						var right = checkAnswer(triviaQuestions[currentTriviaQuestion], userAnswer);
						if (right) {
							display('Correct ...!!', winner);
							rightAnswers ++;
						} else {
							display('Nope ...!!', looser);
							wrongAnswers ++;
						}
					});
				}
			};

			function countDown(){
				time --;
				$('.time').html('Time Remaining: ' + time);
				console.log('Time Remaining: ' + time);
				if (time === 0) {
					stop();
					display('Out Of Time ....!!', notime);
					unanswered ++;
				};
			};
			function displayTotals() {
				$('#question').empty();
				$('#options').empty();
				$('#question').html('<tr><th class="text-center"><h3>All Done, your totals are </h3></th></tr>');
				$('#options').html(
					'<tr class="option" ><td class="totals"><h4>Right answeres: ' + rightAnswers + '</h4></td></tr>' +
					'<tr class="option" ><td class="totals"><h4>Wrong answeres: ' + wrongAnswers + '</h4></td></tr>' +
					'<tr class="option" ><td class="totals"><h4>Unanswered: ' + unanswered + '</h4></td></tr>'
					);
				$('.table-hover').removeClass('table-hover');
				
				$('.footer').append('<button type="button" class="again">try again</button>');
			
				$('.footer').on('click', '.again', function() {
					console.log('again');
					$('#question').empty();
					$('#options').empty();
					currentTriviaQuestion = 0;
					rightAnswers = 0;
					wrongAnswers = 0;
					unanswered = 0;
					start();
				});

				console.log('rightAnswers: ' + rightAnswers);
				console.log('wrongAnswers: ' + wrongAnswers);
				console.log('unanswered: ' + unanswered);
			};

			function display(message, video) {
				$('.blink').removeClass('blink');
				$('#question').html('<tr><th class="text-center"><h3>' + message + '</h3></th></tr>');
				console.log('rightAnswer ' + rightAnswer)
				$('#options').empty();
				var option = $('<tr class="option" ><td class="op"><h4>The correct answer was: ' + rightAnswer + '</h4></td></tr>');
				$('#options').append(option);
				$('#options').append(video);

				setTimeout(function(){
					$('#question').empty();
					$('#options').empty();
					currentTriviaQuestion ++;
					// askQuestion(triviaQuestions[currentTriviaQuestion]);
					start();
				}, 3 * 1000);
			};

			function stop(){
				clearInterval(timer);
			};

			function askQuestion(question) {
				$('#question').html('<tr><th class="text-center"><h3>' + question.question + '?</h3></th></tr>');
				var options = $('#options');
				for (var i = 0;  i < question.options.length ; i++) {
					var option = $('<tr class="option" ><td class="op"><h4>' + question.options[i] + '</h4></td></tr>');
					options.append(option);
					console.log(question.options[i]);
				};
				console.log('askQuestion');
			};

			function checkAnswer(question, userAnswer) {
				console.log('checking answer ' + question.answer + ' - ' + userAnswer);
				stop();
				if (question.answer === userAnswer) {
					console.log('true');
					return true;
				} else {
					console.log('false');
					return false;
				}
			};
		});

