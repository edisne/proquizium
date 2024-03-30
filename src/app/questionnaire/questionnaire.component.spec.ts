import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireComponent } from './questionnaire.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionsService } from '../../services/questions.service';
import {
  mockQuestion,
  mockQuestionService,
} from '../../testing/questions.mock';
import { of } from 'rxjs/internal/observable/of';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let questionsService: QuestionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireComponent, BrowserAnimationsModule],
      providers: [{ provide: QuestionsService, useValue: mockQuestionService }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    questionsService = TestBed.inject(QuestionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call questionsService evaluate with observable of Question[]', () => {
    const spy = spyOn(questionsService, 'evaluate');
    const questions$ = of([mockQuestion]);

    questionsService.evaluate(questions$);

    expect(spy).toHaveBeenCalledWith(questions$);
  });
});
