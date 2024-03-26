
const axios = require('axios');


const data = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.publicapis.org/entries');

        let filteredData = data.entries;

        // Filter by category if provided in query params
        if (req.query.category) {
            const category = req.query.category.toLowerCase();
            filteredData = filteredData.filter(entry =>
                entry.Category.toLowerCase().includes(category)
            );
        }

        
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        
        const paginatedData = filteredData.slice(startIndex, endIndex);

        // pagination for data
        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(filteredData.length / limit),
            totalEntries: filteredData.length,
            hasNextPage: endIndex < filteredData.length,
            hasPreviousPage: startIndex > 0
        };

        
        const response = {
            pagination,
            data: paginatedData
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports={
    data
}