import { Observable, of } from 'rxjs';
import { QuestionsService } from './questions.service';
import { Question } from '../interfaces/question';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(() => {
    service = new QuestionsService();
  });

  it('should trigger questions with satisfied conditions', () => {
    const questions$: Observable<Question[]> = of([
      {
        id: 1,
        title: 'Question 1',
        sort_id: 1,
        answer: 1,
        condition: null,
        is_triggered: false,
        type: 'single_choice',
      },
      {
        id: 2,
        title: 'Question 2',
        sort_id: 2,
        answer: 0,
        condition: [{ question: 1, value: 1 }],
        is_triggered: false,
        type: 'single_choice',
      },
    ]);
    service.evaluate(questions$).subscribe((questions) => {
      expect(questions[1].is_triggered).toBe(true);
    });
  });

  it('should trigger questions with satisfied conditions (array)', () => {
    const questions$: Observable<Question[]> = of([
      {
        id: 1,
        sort_id: 1,
        title: 'Question 1',
        answer: [1, 2, 3],
        condition: null,
        is_triggered: false,
        type: 'multiple_choice',
      },
      {
        id: 2,
        sort_id: 2,
        title: 'Question 2',
        type: 'single_choice',
        answer: 0,
        condition: [{ question: 1, value: [1, 2, 3] }],
        is_triggered: false,
      },
    ]);
    service.evaluate(questions$).subscribe((questions) => {
      expect(questions[1].is_triggered).toBe(true);
    });
  });

  it('should not trigger questions with unsatisfied conditions', () => {
    const questions$: Observable<Question[]> = of([
      {
        id: 1,
        answer: 1,
        condition: null,
        is_triggered: false,
        sort_id: 1,
        title: 'Question 1',
        type: 'single_choice',
      },
      {
        id: 2,
        answer: 0,
        condition: [{ question: 1, value: 0 }],
        is_triggered: false,
        sort_id: 1,
        title: 'Question 2',
        type: 'single_choice',
      },
    ]);
    service.evaluate(questions$).subscribe((questions) => {
      expect(questions[1].is_triggered).toBe(false);
    });
  });
  it('should not trigger questions with unsatisfied conditions (array)', () => {
    const questions$: Observable<Question[]> = of([
      {
        id: 1,
        sort_id: 1,
        title: 'Question 1',
        answer: [1, 2, 3],
        condition: null,
        is_triggered: false,
        type: 'multiple_choice',
      },
      {
        id: 2,
        sort_id: 2,
        title: 'Question 2',
        type: 'single_choice',
        answer: 0,
        condition: [{ question: 1, value: [4, 5, 6] }],
        is_triggered: false,
      },
    ]);
    service.evaluate(questions$).subscribe((questions) => {
      expect(questions[1].is_triggered).toBe(false);
    });
  });

  it('should not trigger questions with unsatisfied conditions (nested conditions)', () => {
    const questions$: Observable<Question[]> = of([
      {
        id: 1,
        sort_id: 1,
        title: 'Question 1',
        answer: 1,
        condition: null,
        is_triggered: false,
        type: 'single_choice',
      },
      {
        id: 2,
        sort_id: 2,
        title: 'Question 2',
        type: 'single_choice',
        answer: 0,
        condition: [
          { question: 1, value: 1 },
          { question: 3, value: 2 },
        ],
        is_triggered: false,
      },
      {
        id: 3,
        sort_id: 3,
        title: 'Question 3',
        type: 'single_choice',
        answer: 3,
        condition: null,
        is_triggered: false,
      },
    ]);
    service.evaluate(questions$).subscribe((questions) => {
      expect(questions[1].is_triggered).toBe(false);
    });
  });

  it('should trigger questions with satisfied conditions (nested conditions)', () => {
    const questions$: Observable<Question[]> = of([
      {
        id: 1,
        sort_id: 1,
        title: 'Question 1',
        answer: 1,
        condition: null,
        is_triggered: false,
        type: 'single_choice',
      },
      {
        id: 2,
        sort_id: 2,
        title: 'Question 2',
        type: 'single_choice',
        answer: 0,
        condition: [
          { question: 1, value: 1 },
          { question: 3, value: 2 },
        ],
        is_triggered: false,
      },
      {
        id: 3,
        sort_id: 3,
        title: 'Question 3',
        type: 'single_choice',
        answer: 2,
        condition: [{ question: 1, value: 1 }],
        is_triggered: false,
      },
    ]);
    service.evaluate(questions$).subscribe((questions) => {
      expect(questions[1].is_triggered).toBe(true);
    });
  });
  it('should trigger questions with satisfied conditions (mixed types)', () => {
    const questions$: Observable<Question[]> = of([
      {
        id: 1,
        sort_id: 1,
        title: 'Question 1',
        answer: 1,
        condition: null,
        is_triggered: false,
        type: 'single_choice',
      },
      {
        id: 2,
        sort_id: 2,
        title: 'Question 2',
        type: 'single_choice',
        answer: 0,
        condition: [{ question: 1, value: 1 }],
        is_triggered: false,
      },
      {
        id: 3,
        sort_id: 3,
        title: 'Question 3',
        type: 'multiple_choice',
        answer: [1, 2],
        condition: null,
        is_triggered: false,
      },
      {
        id: 4,
        sort_id: 4,
        title: 'Question 4',
        type: 'multiple_choice',
        answer: [1, 2],
        condition: [{ question: 3, value: [1, 2] }],
        is_triggered: false,
      },
      {
        id: 5,
        sort_id: 5,
        title: 'Question 5',
        type: 'single_choice',
        answer: 1,
        condition: [{ question: 4, value: [1, 2] }],
        is_triggered: false,
      },
    ]);
    service.evaluate(questions$).subscribe((questions) => {
      expect(questions[3].is_triggered).toBe(true);
      expect(questions[4].is_triggered).toBe(true);
    });
  });
});
