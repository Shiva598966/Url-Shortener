import { useEffect, useState } from "react";
import "./App.css";
import toast from "react-hot-toast";

const API = "http://localhost:3000";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async function fetchUrls() {
    try {
      const response = await fetch(`${API}/urls`);

      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }

      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't load history.");
    }
  }

  async function handleShorten() {
    if (url.trim() === "") {
      toast.error("Please enter a URL.");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();

      setShortUrl(data.shortUrl);
      setUrl("");

      fetchUrls();

      toast.success("Short URL created!");
    } catch (error) {
      console.error(error);
      toast.error("Server is not reachable.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteUrl(id) {
    try {
      const response = await fetch(`${API}/urls/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      toast.success("URL deleted!");

      fetchUrls();
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete URL.");
    }
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="container">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="card">
        <h1>🌐 URL Shortener</h1>

        <p className="subtitle">
          Fast • Secure • Easy to Use
        </p>

        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleShorten}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Shortening...
            </>
          ) : (
            "🚀 Shorten URL"
          )}
        </button>

        {shortUrl && (
          <div className="result">
            <h3>✅ Your Short URL</h3>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>

            <button
              className="copyBtn"
              onClick={() => copyToClipboard(shortUrl)}
            >
              📋 Copy URL
            </button>
          </div>
        )}
      </div>

      {urls.length > 0 && (
        <div className="history">
          <h2>Recent URLs</h2>

          {urls.map((item) => (
            <div
              className="historyCard"
              key={item._id}
            >
              <div className="historySection">
                <span className="label">
                  🌐 Original URL
                </span>

                <p className="originalUrl">
                  {item.originalUrl}
                </p>
              </div>

              <div className="historySection">
                <span className="label">
                  🔗 Short URL
                </span>

                <a
                  href={`${API}/${item.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`${API}/${item.shortCode}`}
                </a>
              </div>

              <div className="historyFooter">
                <span>
                  📅{" "}
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </span>

                <span>
                  👆 {item.clicks} Clicks
                </span>
              </div>

              <div className="historyButtons">
                <button
                  className="copyBtn"
                  onClick={() =>
                    copyToClipboard(
                      `${API}/${item.shortCode}`
                    )
                  }
                >
                  📋 Copy
                </button>

                <button
                  className="deleteBtn"
                  onClick={() =>
                    deleteUrl(item._id)
                  }
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;