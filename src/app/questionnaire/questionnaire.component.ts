import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';

import { PanelModule } from 'primeng/panel';

import { QuestionsService } from '../services/questions.service';
import { QuestionComponent } from '../question/question.component';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [PanelModule, AsyncPipe, QuestionComponent, JsonPipe],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent {
  private readonly questionsService = inject(QuestionsService);
  questions$: Observable<Question[]> = this.questionsService.questions$;

  onUserAnswer() {
    this.questions$ = this.questionsService.evaluate(this.questions$);
  }
}
