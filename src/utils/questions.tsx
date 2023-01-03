import * as _ from "lodash";
import React, { createContext, useEffect, useState } from "react";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

export const NAT_QUESTIONS = 20;
export const MSQ_QUESTIONS = 25;
export const MCQ_QUESTIONS = 40;

export type MCQAnswer = 'A' | 'B' | 'C' | 'D';
export type QuestionAnswer = number | MCQAnswer | MCQAnswer[];
export type Question = {
  qno: number;
  answer?: QuestionAnswer;
  section: 'NAT' | 'MSQ' | 'MCQ';
};

export const QuestionContext = createContext<{
  questions: Question[];
  setSolution: (qno: number, answer?: QuestionAnswer | undefined) => void;
  clearAll: () => void;
  currentQIdx: number;
  nextQuestion: () => void;
  prevQuestion: () => void;
  canNextQuestion: () => boolean;
  canPrevQuestion: () => boolean;
  setCurrentQIdx: (idx: number) => void;
}>({
  questions: [],
  setSolution: () => { },
  clearAll: () => { },
  currentQIdx: 0,
  nextQuestion: () => { },
  prevQuestion: () => { },
  canNextQuestion: () => false,
  canPrevQuestion: () => false,
  setCurrentQIdx: () => { }
});

const questionsAtom = atomWithStorage('questions',
  Array(NAT_QUESTIONS + MSQ_QUESTIONS + MCQ_QUESTIONS)
    .fill('-')
    .map((_, i) => ({
      qno: i + 1,
      section: i < NAT_QUESTIONS ? 'NAT' : i < NAT_QUESTIONS + MSQ_QUESTIONS ? 'MSQ' : 'MCQ'
    } as Question))
);

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [currentQIdx, setCurrentQIdx] = useState(0);

  function setSolution(qno: number, answer?: QuestionAnswer | undefined) {
    if (qno < 1 || qno > questions.length) throw new Error("Invalid question number");

    setQuestions(q => {
      const nq = _.clone(q);

      for (let i = 0; i < nq.length; i++) {
        if (nq[i]?.qno === qno) {
          // @ts-ignore
          nq[i].answer = answer;
          break;
        }
      }

      return nq;
    });
  }

  function clearAll() {
    setQuestions(
      Array(NAT_QUESTIONS + MSQ_QUESTIONS + MCQ_QUESTIONS)
        .fill('-')
        .map((_, i) => ({
          qno: i + 1,
          section: i < NAT_QUESTIONS ? 'NAT' : i < NAT_QUESTIONS + MSQ_QUESTIONS ? 'MSQ' : 'MCQ'
        } as Question))
    );
  }

  function nextQuestion() {
    setCurrentQIdx(currentQIdx + 1)
  }

  function prevQuestion() {
    setCurrentQIdx(currentQIdx - 1)
  }

  function canNextQuestion() {
    return currentQIdx < questions.length - 1;
  }

  function canPrevQuestion() {
    return currentQIdx > 0;
  }

  return (
    <QuestionContext.Provider value={{
      questions,
      setSolution,
      clearAll,
      currentQIdx,
      canNextQuestion,
      canPrevQuestion,
      nextQuestion,
      prevQuestion,
      setCurrentQIdx
    }}>
      {children}
    </QuestionContext.Provider>
  );
};
