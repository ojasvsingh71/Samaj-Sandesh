import axios from "axios"

const news = async (req, res) => {
    try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: "global",
                language: "en",
                sortBy: "publishedAt",
                pageSize: 20,
                apiKey: process.env.NEWS_API_KEY,
            },
        });

        if (response.data.status === "ok") {
            res.json({ articles: response.data.articles });
        } else {
            res.json({ articles: [] });
        }
    } catch (err) {
        console.error("News API error:", err.message);
        res.status(500).json({ message: "Failed to fetch news" });
    }
}

export default news;