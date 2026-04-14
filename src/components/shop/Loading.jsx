"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-75">
      <img
        src={`${process.env.NEXT_PUBLIC_IMG_STATIC_URL}Loading_2.gif`}
        alt="Loading..."
        className="w-24 h-24 object-contain"
      />
    </div>
  );
}
