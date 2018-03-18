let chuckNorris = new Vue({

    el: '#chuck',

    
    data: {
        appName: 'Chuck Norris Facts: ',
        getCategories: [],
        getHighlightedSearchValue: [],
        getSearchValues: [],
        history:[],
        categoryResult: '',
        grabSearchValue: ''
        
    },

    methods:{


        getListCategories: function(){

            
            let viewModel = this

            $(".category-main").hide();
            $(".highlighted-output").hide();
            

            axios.get('https://api.chucknorris.io/jokes/categories', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){

               

                for(let i = 0; i < response.data.length; i++){

                    viewModel.getCategories.push(response.data[i])

                }

                
                
            })
            .catch(function(err){
                alert(err)
            })
        },

        getRandomFact: function(){


            let viewModel = this
            

            axios.get('https://api.chucknorris.io/jokes/random', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){

               viewModel.categoryResult = response.data.value

            //    viewModel.history.push(viewModel.categoryResult + " (From (any) category)")

                
                
            })
            .catch(function(err){
                alert(err)
            })



        },


        getSelectedCategory: function (){


            let viewModel = this

            


            let getSelectedOptions = document.getElementById("category-options");
            
                
            let getOption = getSelectedOptions.options[getSelectedOptions.selectedIndex].text;



                if(getOption === "any"){

                    this.getRandomFact()

                    $(".highlighted-output").fadeOut("slow");
                    $(".category-main").fadeIn("slow");
                    

                    console.log(getOption)

                }
                else {

                    $(".highlighted-output").fadeOut("slow");
                    $(".category-main").fadeIn("slow");
                    

                    console.log(getOption)


                    axios.get(`https://api.chucknorris.io/jokes/random?category=${getOption}`, {
                        headers: {
                            Accept: 'application/json'
                        }
                    })
                    .then(function(response){
        
        
        
                        viewModel.categoryResult = response.data.value
                        
                        // viewModel.history.push(viewModel.categoryResult + `(From (${getOption}) category)`)
         
                        
                    })
                    .catch(function(err){
                        alert(err)
                    })

                }


        },

        searchCategory: function (){

            let viewModel = this

            $(".category-main").fadeOut("slow");
            $(".highlighted-output").fadeIn("slow");
            


            

            let searchValue = document.getElementById("search").value;

            // I had to grab the text that was typed in input so I can use in my .then function
            viewModel.grabSearchValue = searchValue


            axios.get(`https://api.chucknorris.io/jokes/search?query=${searchValue}`, {
                        headers: {
                            Accept: 'application/json'
                        }
                    })
                    .then(function(response){


                        console.log(response)
                        console.log(viewModel.grabSearchValue)

                        //This conditional will clear the output when a new search is requested

                        if(viewModel.getHighlightedSearchValue.length){

                            viewModel.getHighlightedSearchValue.length = 0

                            

                        }

                        let finalText;


        
                        for(let i = 0; i < response.data.result.length; i++){

                            let storeSearchResults = response.data.result[i].value

                            if(storeSearchResults.indexOf(viewModel.grabSearchValue) > -1){
                                

                                let tempText = storeSearchResults.split(viewModel.grabSearchValue)
                                let highlightText = "<mark class='highlight'>" + viewModel.grabSearchValue 
                                + "</mark>"
                                

                                finalText = tempText[0] + highlightText + tempText[1]

                                //The output that is highlighted will pushed to the getHighlightedSearchValue array, this will be displayed to user
                                viewModel.getHighlightedSearchValue.push(finalText)


                            }



                                //pushing the results to the default getSearchValues array
                                viewModel.getSearchValues.push(storeSearchResults)

                                //Thus, I am able to push the output without any styling features into the History array
                                viewModel.history.push(viewModel.getSearchValues + ` (Searched: [${viewModel.grabSearchValue}] )`)


                        }
        
                       
                        
                    })
                    .catch(function(err){
                        alert(err)
                    })

        }

        
    },

    // Before Mount function allows my categories to be populated when the browser loads up initially

    beforeMount(){
        this.getListCategories()
     }
})