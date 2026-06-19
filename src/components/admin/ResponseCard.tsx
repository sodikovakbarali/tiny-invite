"use client";

import { Calendar, Globe, MessageSquare, Tag, User } from "lucide-react";
import type { ResponseRecord } from "@/types/response";

interface ResponseCardProps {
  response: ResponseRecord;
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ResponseCard({ response }: ResponseCardProps) {
  const isYes = response.answer === "yes";

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            isYes
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {response.answer}
        </span>
        <time className="text-xs text-gray-500">
          {formatDate(response.created_at)}
        </time>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        {response.name && (
          <div className="flex items-start gap-2">
            <User className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Name
              </dt>
              <dd className="text-gray-800">{response.name}</dd>
            </div>
          </div>
        )}

        {response.selected_date && (
          <div className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Date
              </dt>
              <dd className="text-gray-800">{response.selected_date}</dd>
            </div>
          </div>
        )}

        {response.selected_activity && (
          <div className="flex items-start gap-2">
            <Tag className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Activity
              </dt>
              <dd className="text-gray-800">{response.selected_activity}</dd>
            </div>
          </div>
        )}

        {response.message && (
          <div className="flex items-start gap-2">
            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Message
              </dt>
              <dd className="whitespace-pre-wrap text-gray-800">
                {response.message}
              </dd>
            </div>
          </div>
        )}

        {response.user_agent && (
          <div className="flex items-start gap-2">
            <Globe className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                User agent
              </dt>
              <dd className="break-all text-xs text-gray-600">
                {response.user_agent}
              </dd>
            </div>
          </div>
        )}
      </dl>
    </article>
  );
}
