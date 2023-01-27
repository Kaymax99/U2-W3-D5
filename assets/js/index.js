let jsonArray = []
const getSongs = async function () {
    try {
        let res = await fetch(
            'https://striveschool-api.herokuapp.com/api/deezer/search?q=starset'
        );  
        if (res.ok) {
            let data = await res.json()
            jsonArray = data.data
            console.log(jsonArray)
            //
        } 
    }
    catch (error) {
        console.log(error)
    }
};
getSongs()

console.log(jsonArray)