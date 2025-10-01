import React from "react";

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          Made by{" "}
          <a
            href="https://github.com/gustavonobrega"
            target="_blank"
            className="font-semibold text-gray-700"
          >
            Gustavo
          </a>
        </p>
      </div>
    </footer>
  );
}
