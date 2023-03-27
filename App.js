import './App.css';
import {FormControl,Select,MenuItem,Card,CardContent} from '@material-ui/core';
import {useState,useEffect} from 'react';
import Table from './Table';
import getsorteddata from './utilities';
import Boxes from './Boxes';
import Linegraph from './Linegraphs'
function App() {

  const [countrynames,setcountrynames] = useState([]);
  const [country,setInputcountry] = useState("worldwide");
  const [tabledata,setTableData] = useState([]);
  const [CasesType,setcasesType] = useState("cases")
  const [countryinfo,setcountryinfo] = useState([]);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setcountryinfo(data)
    })
  },[])
  useEffect (() => {
    const getcountriesdata = ( () =>{
      fetch("https://disease.sh/v3/covid-19/countries")
    .then(response => response.json())
    .then(data => {
      const countrynames = data.map((country) => ({
        name : country.country,
        value : country.countryInfo.iso2,

      }));
      setcountrynames(countrynames);
      getsorteddata(data);
      setTableData(data);
})
    
})
getcountriesdata();
},[]);

useEffect( () =>{

  
}


,[])





 const onCountryChange = (async (e) => {
   const countrycode = e.target.value;
   var url = country==="worldwide"?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countrycode}`;
   fetch(url)
   .then(response => response.json())
   .then(data => {
     setcountryinfo(data);
     
   })

  setInputcountry(countrycode);
})




  return (
    <div className = "app">
      <div className = "app_left">
        <div className = "app_header">
        <h1> Covid - Tracker WebApp </h1>
        

        <FormControl>
        <Select className = "app_search" 
        variant = "outlined" 
        value = {country}
        onChange = {onCountryChange}
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
         { countrynames.map((country) => (
           <MenuItem value = {country.value}>{country.name}</MenuItem>
         ))}
          
        </Select>
        </FormControl>

        </div>
        <div className = "information_boxes">
          <Boxes onClick = {(e) => setcasesType("cases")} isRed = {true} active = {CasesType === "cases"} title = "cases" cases = {countryinfo.todayCases} total = {countryinfo.cases}/>
          <Boxes onClick = {(e) => setcasesType("recovered")} active = {CasesType === "recovered"} title = "recovered" cases = {countryinfo.todayRecovered} total = {countryinfo.recovered}/>
          <Boxes onClick = {(e) => setcasesType("deaths")} isRed = {true} active = {CasesType === "deaths"} title = "deaths" cases = {countryinfo.todayDeaths} total = {countryinfo.deaths}/>

        </div>
      </div>
    <Card className = "app_right"> 
    <CardContent>
      
        <Table arraycountries = {tabledata}/>
      
      
      
        <Linegraph casestype={CasesType}/>
        
      
    </CardContent>
    </Card>
    </div>

  );
}

export default App;
