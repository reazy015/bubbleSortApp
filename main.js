$(document).ready(function(){
	$('#input-scene').hide();
	$('#sort-scene').hide();
	// массив полей ввода для цифр
	var inputList = $('#data-list [data-list-input]');

	//Создаем случаный ряд чисел и выводим дальнейшую инструкцию для пользователя
	$('#random').on('click', function(){
		for(var i = 0; i <= inputList.length; i++){
			var randomNumber = Math.floor(Math.random()*(100 - 0) + 0);
			inputList.eq(i).val(randomNumber);
		};
		$('#messageBox').text("Now press 'Get List' button to continue");
	});

	// Проверяем правильность введенных чисел и отрисовываем результат
	$('#getList').on('click', function(){
		var parentElem = $('#final-list');
		$('#final-list [data-list-sort]').remove();
		var isValid = false;

		inputList.each(function(){
			if(!$(this).val()){
				$('#messageBox').text('Please, fulfill all the input fields');
				isValid = true;
			};
		});

		if(!isValid){
			$('#messageBox').text('');
			for( var i = 0; i < inputList.length; i++){
					parentElem.append('<li data-list-sort><span>' + inputList.eq(i).val() + '</span></li>').fadeIn('slow');
				}
				$('#sort-scene').show();
				$('#input-scene').hide();
				$('#final-list [data-list-sort]').each(function(index){
					$(this).delay(300*index).animate({"opacity" : "1", "bottom":"15"},300);
				});
			}
		});

	// Переключение экранов игры
	$('#start').on('click', function(){
		$('#start-scene').hide();
		$('#input-scene').show();
	})
});


	// Сортировка пользовательских данных - алгоритм сортировки "пузырьком"
$(function(){
	var num1,num2,firstIndex,secondIndex;
	var swapped = false;
	var len = 9;
	var s_time = 950;
	var a_time = (s_time/2)-100;

	var bubbleSort = function(){
		for( j=0; j <len-1; j++){
			(function(j){
				setTimeout(function(){

					firstIndex = j;
					secondIndex = j+1

					num1 = parseInt($("#final-list li span").eq(firstIndex).html());
					num2 = parseInt($("#final-list li span").eq(secondIndex).html());

					if((secondIndex == len-1) && swapped == true){ swapped = false; setTimeout(function(){ bubbleSort(); }, s_time); }

					if ( num1 > num2){
						swapped=true;

						$("#final-list li").eq(secondIndex).addClass("shrink").animate({"right":"110px"},a_time,function() { $(this).css({'right':''}).removeClass("shrink").insertBefore($(this).prev() ) });
						$("#final-list li").eq(firstIndex).addClass("shrink").animate({"left":"110px"},a_time,function() { $(this).css({'left':''}).removeClass("shrink"); });
					}
				}, s_time * j);
			})(j);
		}
	}

	$("#startSortBtn").click(function(){
		$(this).prop('disabled', true).text('Enojoy sorting...');
		bubbleSort();
	});
});
