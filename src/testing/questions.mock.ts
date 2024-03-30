import { of } from 'rxjs';
import { Question } from '../interfaces/question';

export const mockQuestionService = {
  evaluate: () => of([]),
};

export const mockQuestion: Question = {
  id: 1,
  sort_id: 1,
  title: 'Mock Question',
  type: 'single_choice',
  options: [
    { id: 1, verbose_name: 'Mock Option 1', value: 'Mock Value 1' },
    { id: 2, verbose_name: 'Mock Option 2', value: 'Mock Value 2' },
  ],
  condition: null,
  is_triggered: true,
  answer: 1,
};

export const emptyMockQuestion: Question = {
  id: 0,
  sort_id: 0,
  title: '',
  type: 'single_choice',
  options: [],
  condition: null,
  is_triggered: false,
};
