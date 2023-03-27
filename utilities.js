const getsorteddata = (array) => {
    array.sort(function(a,b){return b.cases-a.cases})
}
export default getsorteddata;