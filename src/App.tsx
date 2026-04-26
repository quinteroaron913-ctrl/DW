/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  ChevronRight, 
  RotateCcw, 
  Share2, 
  Brain, 
  Shield, 
  Heart, 
  Zap, 
  Users 
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts';
import { QUESTIONS, CHARACTERS, Dimension, Character } from './constants';

type Screen = 'start' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScores, setUserScores] = useState<Record<Dimension, number>>({
    [Dimension.Bravery]: 0,
    [Dimension.Intelligence]: 0,
    [Dimension.Empathy]: 0,
    [Dimension.Independence]: 0,
    [Dimension.Loyalty]: 0,
  });
  const [resultData, setResultData] = useState<{ character: Character, matchPercentage: number } | null>(null);

  const startQuiz = () => {
    setUserScores({
      [Dimension.Bravery]: 0,
      [Dimension.Intelligence]: 0,
      [Dimension.Empathy]: 0,
      [Dimension.Independence]: 0,
      [Dimension.Loyalty]: 0,
    });
    setCurrentQuestionIndex(0);
    setResultData(null);
    setScreen('quiz');
  };

  const handleOptionSelect = (scores: Partial<Record<Dimension, number>>) => {
    if (screen !== 'quiz') return;

    setUserScores(prev => {
      const next = { ...prev };
      Object.entries(scores).forEach(([dim, val]) => {
        next[dim as Dimension] += val || 0;
      });
      return next;
    });

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let bestMatch = CHARACTERS[0];
    let maxTotalScore = -Infinity;

    const dimensions = Object.values(Dimension);
    const userVector = dimensions.map(dim => userScores[dim]);
    const userMagnitude = Math.sqrt(userVector.reduce((sum, val) => sum + val * val, 0)) || 1;

    // Determine user's primary trait
    let maxUserVal = -1;
    let primaryUserDim = dimensions[0];
    dimensions.forEach(dim => {
      if (userScores[dim] > maxUserVal) {
        maxUserVal = userScores[dim];
        primaryUserDim = dim;
      }
    });

    CHARACTERS.forEach(char => {
      const charVector = dimensions.map(dim => char.baseStats[dim]);
      const charMagnitude = Math.sqrt(charVector.reduce((sum, val) => sum + val * val, 0));

      // 1. Base Cosine Similarity
      const dotProduct = userVector.reduce((sum, val, i) => sum + val * charVector[i], 0);
      const cosineSim = dotProduct / (userMagnitude * charMagnitude);

      // 2. Trait Alignment Bonus
      // Find character's primary trait
      let maxCharVal = -1;
      let primaryCharDim = dimensions[0];
      dimensions.forEach(dim => {
        if (char.baseStats[dim] > maxCharVal) {
          maxCharVal = char.baseStats[dim];
          primaryCharDim = dim;
        }
      });

      let bonus = 0;
      // If primary traits match, give a significant boost
      if (primaryUserDim === primaryCharDim) {
        bonus += 0.15;
      }

      // 3. Inverse Euclidean Distance (normalized)
      // Penalize characters that are "too far away" in specific dimensions even if cosine is high
      let euclideanDist = 0;
      dimensions.forEach(dim => {
        // User scores are roughly 0-15, char stats are 0-10. Normalize user to 0-10.
        const normalizedUser = (userScores[dim] / 15) * 10;
        euclideanDist += Math.pow(normalizedUser - char.baseStats[dim], 2);
      });
      const distScore = 1 / (1 + Math.sqrt(euclideanDist) / 10); // 0 to 1 range

      // Hybrid Score
      const totalScore = (cosineSim * 0.6) + (distScore * 0.25) + bonus;
      
      if (totalScore > maxTotalScore) {
        maxTotalScore = totalScore;
        bestMatch = char;
      }
    });

    // Calculate a display-friendly match percentage
    // Since we added bonuses, we need to clamp and scale.
    // Base similarity is usually high, so we stretch it to be more discriminative.
    const displayPercentage = Math.min(99, Math.max(65, Math.round(maxTotalScore * 85)));

    setResultData({
      character: bestMatch,
      matchPercentage: displayPercentage
    });
    setScreen('result');
  };

  return (
    <div className="min-h-screen bg-bg-natural text-text-main font-sans selection:bg-accent-blue/10 selection:text-accent-blue">
      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <StartScreen key="start" onStart={startQuiz} />
        )}
        {screen === 'quiz' && (
          <QuizScreen 
            key="quiz"
            currentIndex={currentQuestionIndex}
            onSelect={handleOptionSelect}
          />
        )}
        {screen === 'result' && resultData && (
          <ResultScreen 
            key="result"
            character={resultData.character}
            matchPercentage={resultData.matchPercentage}
            userScores={userScores}
            onRetry={startQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StartScreen({ onStart }: { onStart: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 p-6 rounded-2xl bg-white/40 shadow-sm border border-white/60"
      >
        <Compass className="w-12 h-12 text-accent-blue" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-6xl font-serif text-accent-blue mb-12 tracking-tight"
      >
        Doctor Who Companions
      </motion.h1>
      
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="px-12 py-4 bg-accent-blue text-white rounded-full font-semibold text-lg shadow-lg shadow-accent-blue/20 hover:bg-accent-blue/90 transition-all flex items-center gap-2 group"
      >
        开始测试
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
}

function QuizScreen({ currentIndex, onSelect }: { currentIndex: number, onSelect: (scores: Partial<Record<Dimension, number>>) => void, key?: string }) {
  const question = QUESTIONS[currentIndex];
  
  if (!question) {
    return null;
  }

  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-xl mx-auto min-h-screen flex flex-col justify-center p-6"
    >
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <span className="text-[11px] font-bold text-accent-blue uppercase tracking-[0.2em]">The Companion Archives</span>
          <span className="text-xl font-mono text-accent-blue">{currentIndex + 1} <span className="text-border-natural">/ {QUESTIONS.length}</span></span>
        </div>
        <div className="h-1 w-full bg-white rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-accent-blue"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-medium mb-12 text-text-main leading-snug">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelect(option.scores)}
                className="w-full p-6 text-left cursor-pointer bg-white/30 border border-white/50 rounded-2xl shadow-sm transition-all flex items-center justify-between group"
              >
                <span className="text-lg text-text-main group-hover:text-accent-blue transition-colors">{option.text}</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-accent-blue" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function ResultScreen({ 
  character, 
  matchPercentage, 
  userScores, 
  onRetry 
}: { 
  character: Character, 
  matchPercentage: number,
  userScores: Record<Dimension, number>, 
  onRetry: () => void, 
  key?: string 
}) {
  const radarData = useMemo(() => {
    return Object.values(Dimension).map(dim => {
      // Normalize user score to a 0-1 range first. 
      // Max raw score for a dim is roughly 15-20.
      const normalized = Math.min(1, userScores[dim] / 18);
      
      // Squash it into a 4-9 range to prevent "extreme" looking graphs
      const squashedValue = 4 + (normalized * 5);

      return {
        subject: dim === Dimension.Bravery ? '勇敢' : 
                 dim === Dimension.Intelligence ? '理智' :
                 dim === Dimension.Empathy ? '感性' :
                 dim === Dimension.Independence ? '独立' : '忠诚',
        A: squashedValue,
        fullMark: 10,
      };
    });
  }, [userScores]);

  const dimensionDescriptions = {
    [Dimension.Bravery]: "勇于直面未知的宇宙边缘",
    [Dimension.Intelligence]: "逻辑与知识是你最强的护盾",
    [Dimension.Empathy]: "感知万物心跳的共情能力",
    [Dimension.Independence]: "坚守自我意志，从不妥协",
    [Dimension.Loyalty]: "旅途中最值得信赖的支柱",
  };

  const dimensionLabels = {
    [Dimension.Bravery]: "勇敢",
    [Dimension.Intelligence]: "理智",
    [Dimension.Empathy]: "感性",
    [Dimension.Independence]: "独立",
    [Dimension.Loyalty]: "忠诚",
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto flex flex-col min-h-screen"
    >
      {/* Top Nav */}
      <nav className="w-full pt-10 px-6 md:px-16 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent-blue flex items-center justify-center rounded-sm">
            <div className="w-1.5 h-3 border border-white opacity-40"></div>
          </div>
          <span className="text-[13px] font-bold tracking-widest uppercase opacity-60">The Companion Archives</span>
        </div>
        <div className="text-[13px] text-label-muted italic hidden sm:block">Result Analysis Completed</div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row px-6 md:px-16 py-12 gap-12 lg:gap-20">
        
        {/* Left Column: Character Identity */}
        <div className="lg:flex-[1.2] flex flex-col justify-center">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[14px] uppercase tracking-[0.3em] text-label-muted">Your Ideal Companion</span>
              <div className="h-px flex-1 bg-border-natural opacity-30"></div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-accent-blue/60 uppercase tracking-tighter">Similarity</span>
                <span className="text-2xl font-serif text-accent-blue">{matchPercentage}%</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-serif text-accent-blue leading-tight tracking-tighter">
              {character.name}
            </h1>
          </header>

          <blockquote className="border-l-2 border-border-natural pl-6 py-2 mb-10 italic font-serif text-xl md:text-2xl text-label-muted leading-relaxed">
            "{character.quote}"
          </blockquote>

          <div className="bg-white/40 p-10 rounded-[2rem] shadow-sm border border-white/60">
            <p className="leading-relaxed text-[17px] text-text-main text-justify font-medium">
              {character.analysis}
            </p>
          </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="lg:flex-1 flex flex-col justify-center">
          <div className="aspect-square w-full flex items-center justify-center relative bg-white/20 rounded-[40px] border border-white/40 mb-8 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#D4CDC3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#7E7469', fontSize: 11, fontWeight: 600 }}
                />
                <Radar
                  name="User"
                  dataKey="A"
                  stroke="#2A4B7C"
                  fill="#2A4B7C"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {Object.values(Dimension).map((dim) => (
              <div key={dim} className="flex flex-col border-b border-border-natural pb-2">
                <span className="text-[11px] font-bold text-accent-blue uppercase tracking-wider">{dimensionLabels[dim as Dimension]}</span>
                <span className="text-[13px] text-label-muted">{dimensionDescriptions[dim as Dimension]}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="h-40 lg:h-24 px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between border-t border-border-natural/50 bg-white/10 mt-auto py-6 sm:py-0">
        <div className="text-[11px] text-label-muted tracking-widest mb-6 sm:mb-0 uppercase bg-accent-blue/5 px-3 py-1 rounded">
          COORD: 51.5074° N, 0.1278° W • TARDIS ARCHIVES
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button 
            onClick={onRetry}
            className="flex-1 sm:flex-none px-8 py-3 rounded-full border border-accent-blue text-accent-blue text-[13px] font-semibold hover:bg-accent-blue hover:text-white transition-all"
          >
            RETRY TEST
          </button>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Doctor Who Companions Quiz',
                  text: `我测出最匹配的旅伴是 ${character.name}！`,
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="flex-1 sm:flex-none px-8 py-3 rounded-full bg-accent-blue text-white text-[13px] font-semibold shadow-lg shadow-accent-blue/10 hover:shadow-accent-blue/20 transition-all"
          >
            SHARE RESULT
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
