"use client";

import {
  Globe,
  Languages,
  Link2,
  MapPin,
  Monitor,
  Network,
} from "lucide-react";
import type { RequestMetadata } from "@/types/response";

interface VisitMetadataProps {
  metadata: RequestMetadata;
  className?: string;
}

function MetadataRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Globe;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </dt>
        <dd className="break-all text-gray-800">{value}</dd>
      </div>
    </div>
  );
}

function formatLocation(metadata: RequestMetadata): string | null {
  const parts = [metadata.city, metadata.region, metadata.country].filter(
    Boolean,
  );
  return parts.length > 0 ? parts.join(", ") : null;
}

export function VisitMetadata({ metadata, className = "" }: VisitMetadataProps) {
  const location = formatLocation(metadata);
  const hasData =
    metadata.ip_address ||
    location ||
    metadata.language ||
    metadata.referrer ||
    metadata.user_agent;

  if (!hasData) {
    return (
      <p className={`text-xs text-gray-400 ${className}`}>
        No visitor metadata captured (common in local dev).
      </p>
    );
  }

  return (
    <dl className={`space-y-3 text-sm ${className}`}>
      {metadata.ip_address && (
        <MetadataRow
          icon={Network}
          label="IP address"
          value={metadata.ip_address}
        />
      )}

      {location && (
        <MetadataRow icon={MapPin} label="Location" value={location} />
      )}

      {metadata.language && (
        <MetadataRow icon={Languages} label="Language" value={metadata.language} />
      )}

      {metadata.referrer && (
        <MetadataRow icon={Link2} label="Referrer" value={metadata.referrer} />
      )}

      {metadata.user_agent && (
        <MetadataRow
          icon={Monitor}
          label="Device / browser"
          value={metadata.user_agent}
        />
      )}
    </dl>
  );
}
