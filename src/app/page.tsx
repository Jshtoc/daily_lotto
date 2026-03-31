"use client";

import { useState } from "react";

function generateLottoNumbers(): number[] {
  const numbers: number[] = [];
  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers.sort((a, b) => a - b);
}

function getBallColor(num: number): string {
  if (num <= 10) return "bg-yellow-400";
  if (num <= 20) return "bg-blue-500";
  if (num <= 30) return "bg-red-500";
  if (num <= 40) return "bg-gray-500";
  return "bg-green-500";
}

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDraw = () => {
    setIsAnimating(true);
    setNumbers([]);

    setTimeout(() => {
      setNumbers(generateLottoNumbers());
      setIsAnimating(false);
    }, 800);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Daily Lotto</h1>
      <p className="text-gray-400 mb-12">행운의 로또 번호를 추첨해보세요</p>

      <div className="flex gap-4 mb-12 min-h-[80px] items-center">
        {isAnimating ? (
          <div className="text-2xl animate-pulse">추첨 중...</div>
        ) : numbers.length > 0 ? (
          numbers.map((num, i) => (
            <div
              key={i}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg ${getBallColor(num)} animate-bounce`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {num}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-lg">
            버튼을 눌러 번호를 추첨하세요
          </div>
        )}
      </div>

      <button
        onClick={handleDraw}
        disabled={isAnimating}
        className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-black font-bold text-lg rounded-full transition-colors shadow-lg cursor-pointer disabled:cursor-not-allowed"
      >
        번호 추첨하기
      </button>
    </main>
  );
}
