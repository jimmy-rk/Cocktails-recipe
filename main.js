$(window).on('scroll',function(){
            
            if ($(window).scrollTop()){
                $('nav').addClass('nav');
                $('nav div').addClass('logo');
                $('nav ul li').addClass('horizontal');                
            }
            else{
                $('nav').removeClass('nav');
                $('nav div').removeClass('logo');
                $('nav ul li').removeClass('horizontal');                
            }
            
        })
        

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);




        /*for (let i = 0; i < 4; i++) {
            const random = Math.floor(Math.random() * 545);
            
            console.log(response.cocktails[random].strDrink);
                        $(`#cocktail${i+1}`).html(response.cocktails[random].strDrink);
        } //for*/
        
        for (let i = 0; i < 12; i++) {
            const random = Math.floor(Math.random() * 545);
            const Content = $('<div class="popularContent">')
            const img = $('<img >')
            img.attr('src', response.cocktails[random].strDrinkThumb);
            console.log(response.cocktails[random].strDrinkThumb);
            Content.append(`<div class="name"> ${response.cocktails[random].strDrink}`);
            Content.append(img)

            $('#popularCocktails').append(Content);
        } //for





        $('#popularCocktails').on('click', '.popularContent .name', function () {

            const div = $('<div id="dialog1" style="background-image:url(/images/pic3.jpg)">')
            const Content = $('<div class="Content">')
            const ul = $('<ul>')

            const img = $('<img>')
            const name = $.trim(this.innerHTML).toLowerCase();

            for (let i = 0; i < response.cocktails.length; i++) {
                if ($.trim(response.cocktails[i].strDrink).toLowerCase().includes(name)) {
                    div.attr('title', response.cocktails[i].strDrink)

                    img.attr('src', response.cocktails[i].strDrinkThumb);

                    Content.append(img)

                    const noIngredients = (Object.keys(response.cocktails[i]).length - 9) / 2
                    for (let x = 0; x < noIngredients; x++) {
                        const li = $(`<li>`)
                        const strong = $(`<strong>`)

                        const measures = [response.cocktails[i].strMeasure1,
                                  response.cocktails[i].strMeasure2,
                                  response.cocktails[i].strMeasure3,
                                  response.cocktails[i].strMeasure4,
                                  response.cocktails[i].strMeasure5,
                                  response.cocktails[i].strMeasure6,
                                  response.cocktails[i].strMeasure7,
                                  response.cocktails[i].strMeasure8
                                 ]

                        const ingredient = [response.cocktails[i].strIngredient1,
                                  response.cocktails[i].strIngredient2,
                                  response.cocktails[i].strIngredient3,
                                  response.cocktails[i].strIngredient4,
                                  response.cocktails[i].strIngredient5,
                                  response.cocktails[i].strIngredient6,
                                  response.cocktails[i].strIngredient7,
                                  response.cocktails[i].strIngredient8
                                 ]
                        strong.html(`Ingredient ${x+1} :`);
                        li.append(strong).append(ingredient[x])
                        li.append('---')
                        li.append(measures[x])
                        ul.append(li)
                    }

                    ul.append(`
                                        
                                        <li><strong>Glass: </strong> ${response.cocktails[i].strGlass}
                                        <li><strong>Instruction: </strong> ${response.cocktails[i].strInstructions}
                                        

                                    `)


                    Content.append(ul);
                    div.append(Content);
                    break;
                }

            }




            div.dialog({
                autoOpen: false,
                resizable: false,
                position: {
                    my: "top",
                    at: "bottom",
                    of: $('#popularCocktails')
                }

            });

            div.dialog("option", "width", $(window).width() * 0.6);
            div.dialog("option", "height", $(window).height() * 0.9);
            div.dialog("option", "position", "right");
            div.dialog('open');



        })



        $('#searchButton').click(function () {


            const searchText = $('#searchText').val().toLowerCase();

            if (searchText != '') {

                $('#filterContent').empty();
                for (let i = 0; i < response.cocktails.length; i++) {
                    if ($.trim(response.cocktails[i].strDrink).toLowerCase().includes(searchText)) {

                        const Content = $('<div class="Content">')
                        const ul = $('<ul>')

                        const img = $('<img >')
                        img.attr('src', response.cocktails[i].strDrinkThumb);

                        Content.append(img)
                        ul.append(`
                                        <li><strong>Name: </strong> ${response.cocktails[i].strDrink}
                                        

                                    `)

                        const noIngredients = (Object.keys(response.cocktails[i]).length - 9) / 2
                        for (let x = 0; x < noIngredients; x++) {
                            const li = $(`<li>`)
                            const strong = $(`<strong>`)
                            const measures = [response.cocktails[i].strMeasure1,
                                  response.cocktails[i].strMeasure2,
                                  response.cocktails[i].strMeasure3,
                                  response.cocktails[i].strMeasure4,
                                  response.cocktails[i].strMeasure5,
                                  response.cocktails[i].strMeasure6,
                                  response.cocktails[i].strMeasure7,
                                  response.cocktails[i].strMeasure8
                                 ]
                            const ingredient = [response.cocktails[i].strIngredient1,
                                  response.cocktails[i].strIngredient2,
                                  response.cocktails[i].strIngredient3,
                                  response.cocktails[i].strIngredient4,
                                  response.cocktails[i].strIngredient5,
                                  response.cocktails[i].strIngredient6,
                                  response.cocktails[i].strIngredient7,
                                  response.cocktails[i].strIngredient8
                                 ]
                            strong.html(`Ingredient ${x+1} :`);
                            li.append(strong).append(ingredient[x])
                            li.append('---')
                            li.append(measures[x])
                            ul.append(li)
                        }

                        ul.append(`
                                        
                                        <li><strong>Glass: </strong> ${response.cocktails[i].strGlass}
                                        <li><strong>Instruction: </strong> ${response.cocktails[i].strInstructions}
                                        

                                    `)


                        Content.append(ul);
                        $('#filterContent').append(Content);

                    }


                } //for

            }



        }) //searchButton click function
 getCocktailsBySpirit('Gin');
function getCocktailsBySpirit(spirit){
    
    
                        $('#filterHeader').html(spirit)
            for (let i = 0; i < response.cocktails.length; i++) {

                const noIngredients = (Object.keys(response.cocktails[i]).length - 9) / 2
                for (let x = 0; x < noIngredients; x++) {

                    const ingredient = [response.cocktails[i].strIngredient1,
                                  response.cocktails[i].strIngredient2,
                                  response.cocktails[i].strIngredient3,
                                  response.cocktails[i].strIngredient4,
                                  response.cocktails[i].strIngredient5,
                                  response.cocktails[i].strIngredient6,
                                  response.cocktails[i].strIngredient7,
                                  response.cocktails[i].strIngredient8
                                 ]

                    const measures = [response.cocktails[i].strMeasure1,
                                  response.cocktails[i].strMeasure2,
                                  response.cocktails[i].strMeasure3,
                                  response.cocktails[i].strMeasure4,
                                  response.cocktails[i].strMeasure5,
                                  response.cocktails[i].strMeasure6,
                                  response.cocktails[i].strMeasure7,
                                  response.cocktails[i].strMeasure8
                                 ]

                    
                    if ($.trim(ingredient[x]).toLowerCase().includes(spirit.toLowerCase())) {

                        const Content = $('<div class="Content">')
                        
                        
                        
                        const ul = $('<ul>')

                        const img = $('<img >')
                        img.attr('src', response.cocktails[i].strDrinkThumb);

                        Content.append(img)
                        ul.append(`
                                        <li><strong>Name: </strong> ${response.cocktails[i].strDrink}
                                        

                                    `)



                        for (let x = 0; x < noIngredients; x++) {
                            const li = $(`<li>`)
                            const strong = $(`<strong>`)
                            strong.html(`Ingredient ${x+1} :`);
                            li.append(strong).append(ingredient[x])
                            li.append('---')
                            li.append(measures[x])
                            ul.append(li)
                        }
                        ul.append(`
                                        
                                        <li><strong>Glass: </strong> ${response.cocktails[i].strGlass}
                                        <li><strong>Instruction: </strong> ${response.cocktails[i].strInstructions}
                                        

                                    `)

                        Content.append(ul);
                        
                        $('#filterContent').append(Content);


                    } //if

break;

                } //inner for

            } //outer for


    
    
}//function

        $('#ginButton').click(function () {
            $('#filterContent').empty();
            getCocktailsBySpirit('Gin');

        }) //ginButton click  
        
        $('#ginButton').click(function () {
            $('#filterContent').empty();
            getCocktailsBySpirit('Gin');

        }) //ginButton click    
        
        $('#vodkaButton').click(function () {
            $('#filterContent').empty();
            getCocktailsBySpirit('Vodka');

        }) //vodkaButton click   
        
        $('#rumButton').click(function () {
            $('#filterContent').empty();
            getCocktailsBySpirit('Rum');

        }) //rumButton click    
        
        $('#whiskyButton').click(function () {
            $('#filterContent').empty();
            
            getCocktailsBySpirit('Bourbon');
            getCocktailsBySpirit('Scotch');
            getCocktailsBySpirit('Whisky')
        })   
        
        $('#tequilaButton').click(function () {
            $('#filterContent').empty();
            getCocktailsBySpirit('Tequila');

        }) //tequilaButton click     


$('#cock').click(function () {
    
    
            $('#filterContent').empty();
            getCocktailsBySpirit('Tequila');

        }) 






    } // if statement (readyState)
}; //xhttp.onreadystatechange
xhttp.open("GET", "cocktail.json", true);
xhttp.send();