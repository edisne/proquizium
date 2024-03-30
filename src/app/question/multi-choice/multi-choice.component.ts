import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';

import { CardModule } from 'primeng/card';

import { Question } from '../../../interfaces/question';
import { Option } from '../../../interfaces/option';

@Component({
  selector: 'app-multi-choice',
  standalone: true,
  imports: [MultiSelectModule, CardModule, CommonModule],
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.scss',
})
export class MultiChoiceComponent {
  @Input() question: Question | undefined;
  @Output() userAnswer: EventEmitter<void> = new EventEmitter();

  onOptionSelected($event: MultiSelectChangeEvent) {
    if (this.question) {
      this.question.answer = $event.value.map((option: Option) => option.id);
      this.userAnswer.emit();
    }
  }

  onClear() {
    if (this.question) {
      this.question.answer = [];
      this.userAnswer.emit();
    }
  }

  identify(_: any, item: Option) {
    return item.id;
  }
}
