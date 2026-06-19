"use client";

import { FormEvent, useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { PageViewCard } from "@/components/admin/PageViewCard";
import { ResponseCard } from "@/components/admin/ResponseCard";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { PageViewRecord, ResponseRecord } from "@/types/response";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [responses, setResponses] = useState<ResponseRecord[] | null>(null);
  const [pageViews, setPageViews] = useState<PageViewRecord[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.status === 401) {
        setError("Incorrect password.");
        setIsAuthenticated(false);
        setResponses(null);
        setPageViews(null);
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Failed to load responses.");
      }

      setResponses(data.responses ?? []);
      setPageViews(data.pageViews ?? []);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResponses(null);
      setPageViews(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-gradient min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wine/10">
            <ShieldCheck className="h-5 w-5 text-wine" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">
              Admin
            </h1>
            <p className="text-sm text-muted">
              Responses, page views, and visitor metadata
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Admin password
          </label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-wine/40 focus:outline-none focus:ring-2 focus:ring-wine/10"
              required
            />
          </div>

          {error && <ErrorMessage message={error} className="mt-4" />}

          <div className="mt-6">
            <PrimaryButton
              type="submit"
              isLoading={isLoading}
              className="w-full sm:w-auto"
            >
              View responses
            </PrimaryButton>
          </div>
        </form>

        {isLoading && responses === null && (
          <LoadingSpinner label="Fetching responses..." className="mt-8" />
        )}

        {isAuthenticated && responses !== null && pageViews !== null && (
          <div className="mt-8 space-y-10">
            <section className="space-y-4">
              <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
                {pageViews.length} page view{pageViews.length === 1 ? "" : "s"}
              </h2>

              {pageViews.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-8 text-center text-sm text-gray-500">
                  No page views yet. Share the link to start tracking opens.
                </div>
              ) : (
                pageViews.map((pageView) => (
                  <PageViewCard key={pageView.id} pageView={pageView} />
                ))
              )}
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
                {responses.length} response{responses.length === 1 ? "" : "s"}
              </h2>

              {responses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-8 text-center text-sm text-gray-500">
                  No responses yet. The suspense continues.
                </div>
              ) : (
                responses.map((response) => (
                  <ResponseCard key={response.id} response={response} />
                ))
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
