 const axios = require("axios");

module.exports = function (app) {

    // API key untuk WhyUX react
    const apiKeys = [
        "8e62ceb90d9261f7da2311c2ad8a34044c3759addbe97e813cedb8472b8bdc48",
        "9d7feb76aa9da4fee2e14e993f69ceae24c8b0f621db9622c377a593e3fd2abc"
    ];

    function getRandomKey() {
        return apiKeys[Math.floor(Math.random() * apiKeys.length)];
    }

    // ----------------------------------------
    //  REACT API (link & emoji via query)
    // ----------------------------------------
    app.get("/api/react", async (req, res) => {
        try {
            const { link, emoji } = req.query;

            if (!link) {
                return res.status(400).json({
                    status: false,
                    error: "Parameter 'link' wajib diisi"
                });
            }

            const key = getRandomKey();

            // API asli WhyUX
            const url =
                `https://react.whyux-xec.my.id/api/rch?` +
                `key=${key}` +
                `&link=${encodeURIComponent(link)}` +
                `&emoji=${encodeURIComponent(emoji || "")}`;

            const response = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0"
                }
            });

            // Output EXACT seperti server kamu
            res.status(200).json({
                status: true,
                creator: "Daffa",
                result: response.data
            });

        } catch (err) {
            res.status(500).json({
                status: false,
                creator: "Daffa",
                error: err.response?.data || err.message
            });
        }
    });
};
