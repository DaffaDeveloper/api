 const axios = require('axios');

module.exports = function(app) {

    async function fetchHeckAI(content) {
        try {
            const response = await axios.get(
                `https://www.laurine.site/api/ai/heckai?query=${encodeURIComponent(content)}`
            );

            // Response API ini biasanya pakai `result`
            return response.data.result || response.data;
        } catch (error) {
            console.error("Error fetching from HeckAI:", error);
            throw error;
        }
    }

    app.get('/ai/luminai', async (req, res) => {
        try {
            const { text } = req.query;

            if (!text) {
                return res.status(400).json({
                    status: false,
                    error: 'Text is required'
                });
            }

            const result = await fetchHeckAI(text);

            res.status(200).json({
                status: true,
                result
            });

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });
};
