import { useEffect, useState } from "react";

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
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Random Jokes API
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Joke Viewer
          </h1>
          <p className="mt-2 text-slate-600">
            Fetch a new joke whenever you want.
          </p>

          <button
            onClick={fetchJoke}
            className="mt-5 rounded-2xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
          >
            New Joke
          </button>
        </header>

        {loading && (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600">Loading joke...</p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl bg-red-100 p-5 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && joke && (
          <section className="rounded-3xl bg-white p-8 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
              Joke ID {joke.id}
            </p>

            <blockquote className="mt-4 text-2xl font-bold leading-10 text-slate-900">
              “{joke.content}”
            </blockquote>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-900">Categories</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {joke.categories?.length > 0 ? (
                  joke.categories.map((cat, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                    >
                      {cat}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No categories</span>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}