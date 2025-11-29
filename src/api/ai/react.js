 const axios = require("axios");

module.exports = function (app) {

    const apiKeys = [
        "8e62ceb90d9261f7da2311c2ad8a34044c3759addbe97e813cedb8472b8bdc48",
        "9d7feb76aa9da4fee2e14e993f69ceae24c8b0f621db9622c377a593e3fd2abc"
    ];

    function getRandomKey() {
        return apiKeys[Math.floor(Math.random() * apiKeys.length)];
    }

    app.get("/api/react", async (req, res) => {
        try {
            const { link, emoji } = req.query;

            if (!link) {
                return res.status(400).json({
                    status: false,
                    error: "Parameter 'link' wajib diisi"
                });
            }

            const apiKey = getRandomKey();

            // URL baru (TANPA ?key=)
            const url =
                `https://react.whyux-xec.my.id/api/rch` +
                `?link=${encodeURIComponent(link)}` +
                `&emoji=${encodeURIComponent(emoji || "")}`;

            // KIRIM API-KEY DI HEADER
            const response = await axios.get(url, {
                headers: {
                    "x-api-key": apiKey,
                    "User-Agent": "Mozilla/5.0"
                }
            });

            res.status(200).json({
                status: true,
                creator: "dafa",
                result: response.data
            });

        } catch (err) {
            res.status(500).json({
                status: false,
                creator: "dafa",
                error: err.response?.data || err.message
            });
        }
    });
};
