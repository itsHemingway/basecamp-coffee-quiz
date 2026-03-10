"use client";

import { useState } from "react";
import Image from "next/image";

type Personality = "bold" | "cozy" | "zen" | "indulgent";

const personalities: Record<
  Personality,
  { name: string; drink: string; tagline: string; image: string }
> = {
  bold: {
    name: "Bold Adventurer",
    drink: "Double Espresso",
    tagline: "You live for intensity",
    image: "/espresso.jpg",
  },
  cozy: {
    name: "Cozy Classic",
    drink: "Medium Roast Drip",
    tagline: "Comfort in every cup",
    image: "/drip-coffee.jpg",
  },
  zen: {
    name: "Zen Minimalist",
    drink: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    image: "/black-coffee.jpg",
  },
  indulgent: {
    name: "Indulgent Treat",
    drink: "Mocha with Whip",
    tagline: "Coffee is dessert",
    image: "/mocha.jpg",
  },
};

const questions: {
  text: string;
  options: { emoji: string; text: string; personality: Personality }[];
}[] = [
  {
    text: "It's Friday evening. What's your ideal plan?",
    options: [
      {
        emoji: "🏔️",
        text: "Trying that new restaurant everyone's talking about",
        personality: "bold",
      },
      {
        emoji: "🛋️",
        text: "Home, couch, comfort show",
        personality: "cozy",
      },
      {
        emoji: "🧘",
        text: "Solo walk, podcast, early night",
        personality: "zen",
      },
      {
        emoji: "🍰",
        text: "Dessert-first dinner with your best friend",
        personality: "indulgent",
      },
    ],
  },
  {
    text: "How do you take your mornings?",
    options: [
      {
        emoji: "⚡",
        text: "Up before the alarm, ready to conquer",
        personality: "bold",
      },
      {
        emoji: "🌅",
        text: "Slow and warm — no rush",
        personality: "cozy",
      },
      {
        emoji: "🌿",
        text: "Quiet ritual, same time every day",
        personality: "zen",
      },
      {
        emoji: "🥐",
        text: "Breakfast first, always",
        personality: "indulgent",
      },
    ],
  },
  {
    text: "Pick a travel destination:",
    options: [
      {
        emoji: "🌋",
        text: "Iceland — lava fields and hot springs",
        personality: "bold",
      },
      {
        emoji: "🏡",
        text: "A cozy cabin in the mountains",
        personality: "cozy",
      },
      {
        emoji: "🍃",
        text: "Kyoto in the fall",
        personality: "zen",
      },
      {
        emoji: "🥂",
        text: "Paris — croissants and café au lait",
        personality: "indulgent",
      },
    ],
  },
  {
    text: "Your ideal work environment:",
    options: [
      {
        emoji: "🚀",
        text: "High-energy, fast-paced, always moving",
        personality: "bold",
      },
      {
        emoji: "🏠",
        text: "Working from home in my favorite spot",
        personality: "cozy",
      },
      {
        emoji: "🔇",
        text: "Quiet, focused, no distractions",
        personality: "zen",
      },
      {
        emoji: "🎶",
        text: "A buzzy café with good music",
        personality: "indulgent",
      },
    ],
  },
  {
    text: "What's your approach to trying new things?",
    options: [
      {
        emoji: "🎯",
        text: "First in line — I love being early",
        personality: "bold",
      },
      {
        emoji: "🤝",
        text: "I'll try it if a friend recommends it",
        personality: "cozy",
      },
      {
        emoji: "📖",
        text: "I research before committing",
        personality: "zen",
      },
      {
        emoji: "✨",
        text: "Only if it sounds delicious",
        personality: "indulgent",
      },
    ],
  },
  {
    text: "Pick a weekend morning vibe:",
    options: [
      {
        emoji: "🏃",
        text: "Up early for a run, then tackle the day",
        personality: "bold",
      },
      {
        emoji: "📚",
        text: "Reading in bed with something warm",
        personality: "cozy",
      },
      {
        emoji: "🌄",
        text: "Watching the sunrise in silence",
        personality: "zen",
      },
      {
        emoji: "🧇",
        text: "Brunch with all the toppings",
        personality: "indulgent",
      },
    ],
  },
];

type AppState = "intro" | "quiz" | "result";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Personality[]>([]);
  const [selectedOption, setSelectedOption] = useState<Personality | null>(null);
  const [result, setResult] = useState<Personality | null>(null);

  function handleStart() {
    setAppState("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
  }

  function handleAnswer(personality: Personality) {
    if (selectedOption !== null) return;
    setSelectedOption(personality);

    setTimeout(() => {
      const newAnswers = [...answers, personality];
      if (currentQuestion < questions.length - 1) {
        setAnswers(newAnswers);
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        const counts: Record<Personality, number> = {
          bold: 0,
          cozy: 0,
          zen: 0,
          indulgent: 0,
        };
        newAnswers.forEach((a) => counts[a]++);
        const winner = (Object.keys(counts) as Personality[]).reduce((a, b) =>
          counts[a] >= counts[b] ? a : b
        );
        setResult(winner);
        setAppState("result");
      }
    }, 400);
  }

  function handleReset() {
    setAppState("intro");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setResult(null);
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #F5ECD7 0%, #EDD9B8 100%)" }}
    >
      <div className="w-full max-w-lg">
        {appState === "intro" && (
          <div
            className="rounded-3xl p-10 text-center shadow-xl"
            style={{ backgroundColor: "#FFFDF8" }}
          >
            <div className="text-5xl mb-4">☕</div>
            <h1
              className="text-4xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#3D2B1F" }}
            >
              What&apos;s Your Coffee Personality?
            </h1>
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "#7A5C44" }}
            >
              Six quick questions about your vibe, your mornings, and your
              weekends — and we&apos;ll tell you exactly what&apos;s in your cup.
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-4 rounded-full text-lg font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
              style={{ backgroundColor: "#B07D4A" }}
            >
              Find My Coffee
            </button>
          </div>
        )}

        {appState === "quiz" && (
          <div
            className="rounded-3xl p-8 shadow-xl"
            style={{ backgroundColor: "#FFFDF8" }}
          >
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2" style={{ color: "#7A5C44" }}>
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: "#EDD9B8" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, backgroundColor: "#B07D4A" }}
                />
              </div>
            </div>

            <h2
              className="text-2xl font-bold mb-6 leading-snug"
              style={{ fontFamily: "var(--font-playfair)", color: "#3D2B1F" }}
            >
              {questions[currentQuestion].text}
            </h2>

            <div className="flex flex-col gap-3">
              {questions[currentQuestion].options.map((option) => {
                const isSelected = selectedOption === option.personality;
                return (
                  <button
                    key={option.personality}
                    onClick={() => handleAnswer(option.personality)}
                    className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.99] shadow-sm"
                    style={{
                      backgroundColor: isSelected ? "#B07D4A" : "#F5ECD7",
                      color: isSelected ? "#FFFDF8" : "#3D2B1F",
                      border: isSelected ? "2px solid #B07D4A" : "2px solid transparent",
                    }}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium">{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {appState === "result" && result && (
          <div
            className="rounded-3xl overflow-hidden shadow-xl"
            style={{ backgroundColor: "#FFFDF8" }}
          >
            <div className="relative w-full h-64">
              <Image
                src={personalities[result].image}
                alt={personalities[result].drink}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-8 text-center">
              <p
                className="text-sm font-bold uppercase tracking-widest mb-2"
                style={{ color: "#B07D4A" }}
              >
                You&apos;re a
              </p>
              <h2
                className="text-4xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "var(--font-playfair)", color: "#3D2B1F" }}
              >
                {personalities[result].name}
              </h2>
              <p
                className="text-xl font-bold mb-2"
                style={{ color: "#3D2B1F" }}
              >
                {personalities[result].drink}
              </p>
              <p
                className="text-lg mb-8"
                style={{ color: "#7A5C44" }}
              >
                {personalities[result].tagline}
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 border-2"
                style={{
                  borderColor: "#B07D4A",
                  color: "#B07D4A",
                  backgroundColor: "transparent",
                }}
              >
                Take it again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
