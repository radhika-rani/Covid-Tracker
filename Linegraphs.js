import React,{useState,useEffect} from 'react'
import {Bar} from 'react-chartjs-2';
import numeral from "numeral";

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Covid cases',
        },
        legend: {
            display: true,
          },
    },
   
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

function buildgraphs(data,casestype){
    let graphdata = [];
    let lastinput;
    for(let date in data.cases){
        if(lastinput){
            let newdata ={
                x: date,
                y :data[casestype][date]-lastinput,

            }
            graphdata.push(newdata);
        }
        lastinput = data[casestype][date];
    }
    return graphdata;

}

const Linegraphs = ({casestype}) => {
    const [data,setdata] = useState([]);

    useEffect(()=>{
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data=>{
            setdata(buildgraphs(data,casestype));
          
            
        })

    },[casestype])


    return (
        
     <div className = "linegraph">   
            {data?.length>0 && (
        <Bar  data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
                label: `corona virus ${casestype}`,
              },
            ],
          }}
 options = {options}/>
        )}

        </div>
            )
}

export default Linegraphs;
