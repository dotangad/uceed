import React, { createContext, useState } from "react";
import * as _ from "lodash";

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
}>({ questions: [], setSolution: () => { } });

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>(
    Array(NAT_QUESTIONS + MSQ_QUESTIONS + MCQ_QUESTIONS)
      .fill('-')
      .map((_, i) => ({
        qno: i + 1,
        section: i < NAT_QUESTIONS ? 'NAT' : i < NAT_QUESTIONS + MSQ_QUESTIONS ? 'MSQ' : 'MCQ'
      } as Question))
  );

  function setSolution(qno: number, answer?: QuestionAnswer | undefined) {
    if (qno < 1 || qno > questions.length) throw new Error("Invalid question number");

    setQuestions(q => {
      const nq = _.clone(q);

      for (let i = 0; i < nq.length; i++) {
        if (nq[i]?.qno === qno) {
          nq[i].answer = answer;
          break;
        }
      }

      return nq;
    });
  }

  return (
    <QuestionContext.Provider value={{
      questions,
      setSolution
    }}>
      {children}
    </QuestionContext.Provider>
  );
};
