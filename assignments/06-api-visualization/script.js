//Creating a function that fetches all 22 Studio Ghibli films from the API.
async function getGhibli() {

    //Sending a request to the Studio Ghibli API and storing the response.
    let response = await fetch("https://ghibliapi.vercel.app/films");

    //The response is converted into json.
    let json = await response.json();


    return json;
}



//Getting the data and creating the chart.
async function setup() {

    //Need to use await or else we get a Promised returned. Get all the films.
    let films = await getGhibli();

    //Sorting the films in order of their release year.
    films.sort((a, b) => Number(a.release_date) - Number(b.release_date));

    //Putting the canvas where the chart will appear in a variable.
    let ctx = document.getElementById('barChart');

    //Creating the bar chart.
    new Chart( ctx, {
        type: 'bar',
        data: {
            labels: films.map(film => film.title + " (" + film.release_date + ")"),
            datasets : [{
                label: 'Rotten Tomato Score of Film',
                data: films.map(film => Number(film.rt_score)),
                borderWidth: 1
            }]

        },
        options: {
            //Enables dynamic window resizing
            responsive: true,
            
            //Adds a title to the chart.
            plugins: {
                title: {
                    display: true,
                    text: 'Rotten Tomatoes Scores of Studio Ghibli Films'
            }}}}
        );


    //Printing all the films in the console.
    console.log(films);
}

setup();