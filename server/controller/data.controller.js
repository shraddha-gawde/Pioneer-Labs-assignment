
const axios = require('axios');


const data = async(req, res)=>{
    try {
        // Fetch data from the public API
        const { data } = await axios.get('https://api.publicapis.org/entries');
    
        let filteredData = data.entries;
    
        // Filter by category if provided in query params
        if (req.query.category) {
          const category = req.query.category.toLowerCase();
          filteredData = filteredData.filter(entry =>
            entry.Category.toLowerCase().includes(category)
          );
        }
    
        // Limit the number of results if provided in query params
        if (req.query.limit) {
          const limit = parseInt(req.query.limit);
          filteredData = filteredData.slice(0, limit);
        }
    
        res.json(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
module.exports={
    data
}