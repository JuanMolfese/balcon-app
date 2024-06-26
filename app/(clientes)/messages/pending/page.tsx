"use client"
import React from 'react';
import Link from 'next/link';

function pending() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-4/5">
        <div className="text-orange-500 text-6xl text-center mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-center mb-4">Pago Pendiente !</h1>
        <p className="text-center text-gray-700 mb-6"></p>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <Link href="/productos/">
              Volver a Pizza 3 APP
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default pending;