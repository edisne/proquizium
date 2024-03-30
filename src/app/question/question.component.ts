import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Question } from '../../interfaces/question';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { MultiLineInputComponent } from './multi-line-input/multi-line-input.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    SingleChoiceComponent,
    MultiChoiceComponent,
    MultiLineInputComponent,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() question: Question | undefined;
  @Output() userAnswer: EventEmitter<void> = new EventEmitter();

  onSingleSelect() {
    this.userAnswer.emit();
  }

  onMultiSelect() {
    this.userAnswer.emit();
  }

  onMultiLineInput() {
    this.userAnswer.emit();
  }
}
