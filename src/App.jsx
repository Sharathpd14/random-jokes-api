import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://api.freeapi.app/api/v1/public/randomjokes/joke/random";

export default function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL, {
        headers: { accept: "application/json" },
      });
      const data = await response.json();

      if (!response.ok || !data?.success || !data?.data) {
        throw new Error(data?.message || "Failed to fetch joke");
      }

      setJoke(data.data);
    } catch (err) {
      setError(err.message || "Fetch failed");
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <main className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <section className="joke-card">
        <header className="joke-header">
          <p className="eyebrow">Random Jokes API</p>
          <h1>Joke Viewer</h1>
          <p className="subtitle">Fresh humor delivered in one click.</p>
          <button type="button" onClick={fetchJoke} className="refresh-btn">
            {loading ? "Fetching..." : "Get New Joke"}
          </button>
        </header>

        {loading && (
          <div className="state-card">
            <div className="loader" />
            <p>Loading your next joke...</p>
          </div>
        )}

        {error && !loading && <div className="state-card error-card">{error}</div>}

        {!loading && !error && joke && (
          <section className="joke-content">
            <p className="joke-id">Joke ID {joke.id}</p>
            <blockquote>"{joke.content}"</blockquote>

            <div className="categories">
              <p>Categories</p>
              <div className="chips">
                {joke.categories?.length > 0 ? (
                  joke.categories.map((cat, index) => (
                    <span key={index} className="chip">
                      {cat}
                    </span>
                  ))
                ) : (
                  <span className="chip muted">No categories</span>
                )}
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}