"use client";

import Image from "next/image";
import { CheckCircle, FileText, FlaskConical } from "lucide-react";

export default function CertificationSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-12 px-6 space-y-10">
      {/* Top Text */}
      <p className="text-center max-w-3xl text-gray-700 text-xl">
        At EA Labs, an ISO, NABL & ICMR certified diagnostics center, we combine
        cutting-edge analyzers, globally validated assays, and rigorous quality
        controls to deliver clean, actionable results.
      </p>

      {/* Logos */}
      <div className="flex flex-wrap items-center justify-center gap-12">
        <Image
          src="https://static.thenounproject.com/png/2292434-200.png" // replace with your local path
          alt="ISO Certified"
          width={120}
          height={120}
        />
        <Image
          src="https://static.thenounproject.com/png/2292434-200.png"
          alt="ICMR Certified"
          width={140}
          height={100}
        />
        <Image
          src="https://static.thenounproject.com/png/2292434-200.png"
          alt="NABL Certified"
          width={120}
          height={120}
        />
      </div>

      {/* Red Features Bar */}
      <div className="flex flex-col md:flex-row bg-red-600 text-white rounded-2xl overflow-hidden shadow-md w-full max-w-4xl">
        {/* Item */}
        <div className="flex-1 flex items-center gap-3 p-6 border-b md:border-b-0 md:border-r border-red-400">
          <CheckCircle className="h-8 w-8" />
          <span className="text-lg font-medium">Multi-level QC</span>
        </div>

        <div className="flex-1 flex items-center gap-3 p-6 border-b md:border-b-0 md:border-r border-red-400">
          <FileText className="h-8 w-8" />
          <span className="text-lg font-medium">Same-day Reports</span>
        </div>

        <div className="flex-1 flex items-center gap-3 p-6">
          <FlaskConical className="h-8 w-8" />
          <span className="text-lg font-medium">Home Collection</span>
        </div>
      </div>
    </section>
  );
}
