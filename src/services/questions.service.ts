import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

import { Question } from '../interfaces/question';
import { Condition } from '../interfaces/condition';

import * as data from '../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  questions$ = this.questionsSubject.asObservable();

  constructor() {
    const questions = JSON.parse(JSON.stringify(data)).default as Question[];
    this.questionsSubject.next(questions);
  }

  evaluate(questions$: Observable<Question[]>): Observable<Question[]> {
    return questions$.pipe(
      map((questions: Question[]) => {
        return questions.map((question: Question) => {
          if (question.condition) {
            question.is_triggered = question.condition.every(
              (cond: Condition) => {
                const requiredQuestion = questions.find(
                  (q: Question) => q.id === cond.question,
                );
                if (!requiredQuestion) return false;
                const answer = requiredQuestion.answer;
                if (Array.isArray(cond.value)) {
                  const sortedAnswer = Array.isArray(answer)
                    ? [...answer].sort()
                    : [];
                  const sortedValue = [...cond.value].sort();
                  return (
                    JSON.stringify(sortedAnswer) === JSON.stringify(sortedValue)
                  );
                } else {
                  return answer === cond.value;
                }
              },
            );
          } else {
            question.is_triggered = true;
          }
          return question;
        });
      }),
    );
  }
}
