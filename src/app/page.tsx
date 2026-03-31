"use client";

import { useState, useEffect } from "react";

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

const fortunes = [
  "오늘은 뜻밖의 행운이 찾아오는 날입니다.",
  "작은 결정이 큰 변화를 가져올 수 있습니다.",
  "주변 사람의 한마디에서 힌트를 얻게 됩니다.",
  "오늘 하루 긍정적인 에너지가 가득합니다.",
  "기다리던 좋은 소식이 곧 도착합니다.",
  "새로운 만남이 행운을 가져다줍니다.",
  "금전운이 상승하는 하루입니다.",
  "도전하면 반드시 좋은 결과가 있을 것입니다.",
  "오래된 인연에서 기쁜 소식이 옵니다.",
  "오늘의 선택이 미래를 바꿀 수 있습니다.",
  "예상치 못한 곳에서 행운이 찾아옵니다.",
  "자신을 믿으면 좋은 일이 생깁니다.",
  "오늘은 직감을 따라가 보세요.",
  "웃음이 행운을 부르는 하루입니다.",
  "사소한 것에 감사하면 큰 복이 옵니다.",
  "용기 있는 한 걸음이 행운의 시작입니다.",
  "하늘이 돕는 날, 자신감을 가지세요.",
  "오늘은 숫자 7이 행운을 가져다줍니다.",
  "마음먹은 일이 순조롭게 풀리는 날입니다.",
  "좋은 기운이 당신을 감싸고 있습니다.",
];

function getUserId(): number {
  const key = "daily_lotto_uid";
  let uid = localStorage.getItem(key);
  if (!uid) {
    uid = String(Math.floor(Math.random() * 1000000));
    localStorage.setItem(key, uid);
  }
  return parseInt(uid, 10);
}

function getDailyFortune(userId: number): string {
  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const seed = dateSeed + userId * 7;
  return fortunes[seed % fortunes.length];
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
  const [fortune, setFortune] = useState("");

  useEffect(() => {
    setFortune(getDailyFortune(getUserId()));
  }, []);

  const handleDraw = () => {
    setIsAnimating(true);
    setNumbers([]);

    setTimeout(() => {
      setNumbers(generateLottoNumbers());
      setIsAnimating(false);
    }, 800);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 py-8 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">Daily Lotto</h1>
      <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">행운의 로또 번호를 추첨해보세요</p>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 min-h-[60px] sm:min-h-[80px] items-center">
        {isAnimating ? (
          <div className="text-xl sm:text-2xl animate-pulse">추첨 중...</div>
        ) : numbers.length > 0 ? (
          numbers.map((num, i) => (
            <div
              key={i}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-base sm:text-xl font-bold text-white shadow-lg ${getBallColor(num)} animate-bounce`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {num}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm sm:text-lg text-center">
            버튼을 눌러 번호를 추첨하세요
          </div>
        )}
      </div>

      <button
        onClick={handleDraw}
        disabled={isAnimating}
        className="px-6 py-3 sm:px-8 sm:py-4 bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300 disabled:bg-gray-600 text-black font-bold text-base sm:text-lg rounded-full transition-colors shadow-lg cursor-pointer disabled:cursor-not-allowed"
      >
        번호 추첨하기
      </button>

      <div className="mt-10 sm:mt-14 px-4 py-4 bg-white/5 rounded-xl max-w-md w-full text-center">
        <p className="text-yellow-400 text-xs sm:text-sm font-semibold mb-1">오늘의 운세</p>
        <p className="text-gray-300 text-sm sm:text-base">{fortune || "운세를 불러오는 중..."}</p>
      </div>
    </main>
  );
}
