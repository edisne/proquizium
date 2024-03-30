import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { Question } from '../../../interfaces/question';

@Component({
  selector: 'app-multi-line-input',
  standalone: true,
  imports: [FormsModule, CardModule, InputTextareaModule],
  templateUrl: './multi-line-input.component.html',
  styleUrl: './multi-line-input.component.scss',
})
export class MultiLineInputComponent {
  @Input() question: Question | undefined;
  @Output() userAnswer: EventEmitter<Question> = new EventEmitter<Question>();
}
