let dropdownDiv = document.querySelector("#dropdown");

//Creating the select element and appending it my dropdown container.
let chartSelect = document.createElement("select");
dropdownDiv.append(chartSelect);

//Creating an array to store different the chart options.
let chartData = [
    {value: "rt_score", text: "Rotten Tomatoes Scores"},
    {value: "running_time", text: "Film Runtimes"},
    {value: "people", text: "Number of Characters"}
];

//Creating the dropdown options.
chartData.forEach(function(attribute) {
    let optionElement = document.createElement("option");
    optionElement.value = attribute.value;
    optionElement.innerHTML = attribute.text;
    chartSelect.append(optionElement);
});

//Creating a function that fetches all 22 Studio Ghibli films from the API.
async function getGhibli() {

    //Sending a request to the Studio Ghibli API and storing the response.
    let response = await fetch("https://ghibliapi.vercel.app/films");

    //Converting the response into JSON.
    let json = await response.json();


    return json;
}



//Getting the data and creating the chart.
async function setup() {

    //Using await to get all the films instead returning a Promise.
    let films = await getGhibli();

    //Sorting the films in order of their release year, from old to new.
    films.sort((a, b) => Number(a.release_date) - Number(b.release_date));

    //Storing the canvas where the chart will appear in a variable.
    let ctx = document.getElementById('barChart');

    //Creating the bar chart and saving it in a variable.
    let ghibliChart = new Chart(ctx, {
        type: 'bar',
        data: {
            //Creating array of the film titles for the x-axis 
            labels: films.map(film => film.title + " (" + film.release_date + ")"),
            //Creating an array of the scores.
            datasets : [{
                label: "Rotten Tomato Score of Film",
                data: films.map(film => Number(film.rt_score)),
                borderWidth: 1
            }]

        },
        options: {
            //Enabling dynamic window resizing.
            responsive: true,
            
            //Adding a title to the chart.
            plugins: {
                title: {
                    display: true,
                    text: "Rotten Tomatoes Scores of Studio Ghibli Films"
            }},

            //Labeling the y-axis.
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Rotten Tomatoes Score (%)"
                    }
                }
            }
        
        }}
        );


    //Listening for the when dropdown changes so the chart displays different data.
    chartSelect.addEventListener("change", e => {
        if (chartSelect.value === "rt_score") {
            ghibliChart.data.datasets[0].label = "Rotten Tomato Score of Film";
            ghibliChart.data.datasets[0].data = films.map(film => Number(film.rt_score));
            ghibliChart.options.plugins.title.text = "Rotten Tomatoes Scores of Studio Ghibli Films";
            ghibliChart.options.scales.y.title.text = "Rotten Tomatoes Score(%)";

            //Updating the chart so the new data appears.
            ghibliChart.update();

        } else if (chartSelect.value === "running_time") {
            ghibliChart.data.datasets[0].label = "Runtime of Film";
            ghibliChart.data.datasets[0].data = films.map(film => Number(film.running_time));
            ghibliChart.options.plugins.title.text = "Runtime of Studio Ghibli Films";
            ghibliChart.options.scales.y.title.text = "Runtime (Minutes)";


            ghibliChart.update();

        } else if (chartSelect.value === "people") {
            ghibliChart.data.datasets[0].label = "# of Characters";
            ghibliChart.data.datasets[0].data = films.map(film => film.people.length);
            ghibliChart.options.plugins.title.text = "Number of Characters in Studio Ghibli Films";
            ghibliChart.options.scales.y.title.text = "Number of Characters";


            ghibliChart.update();
        }
    })

    //Printing all the films information in the console.
    console.log(films);
}

setup();