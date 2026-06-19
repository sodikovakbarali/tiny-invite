"use client";

import { Eye } from "lucide-react";
import { VisitMetadata } from "@/components/admin/VisitMetadata";
import type { PageViewRecord } from "@/types/response";

interface PageViewCardProps {
  pageView: PageViewRecord;
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

export function PageViewCard({ pageView }: PageViewCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
          <Eye className="h-3.5 w-3.5" />
          Page view
        </span>
        <time className="text-xs text-gray-500">
          {formatDate(pageView.created_at)}
        </time>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        {pageView.name && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Name param
            </dt>
            <dd className="text-gray-800">{pageView.name}</dd>
          </div>
        )}

        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Path
          </dt>
          <dd className="text-gray-800">{pageView.path}</dd>
        </div>
      </dl>

      <VisitMetadata metadata={pageView} className="mt-4 border-t border-gray-100 pt-4" />
    </article>
  );
}
