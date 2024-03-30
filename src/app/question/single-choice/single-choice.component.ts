import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

import { Option } from '../../../interfaces/option';
import { Question } from '../../../interfaces/question';

@Component({
  selector: 'app-single-choice',
  standalone: true,
  imports: [DropdownModule, CommonModule, CardModule],
  templateUrl: './single-choice.component.html',
  styleUrl: './single-choice.component.scss',
})
export class SingleChoiceComponent {
  @Input() question: Question | undefined;
  @Output() userAnswer: EventEmitter<Question> = new EventEmitter<Question>();

  onOptionChange(event: DropdownChangeEvent) {
    if (this.question) {
      this.question.answer = event.value.id;
      this.userAnswer.emit();
    }
  }
  getOptionName(selectedValue: number | number[]) {
    if (this.question?.options) {
      const option = this.question.options.find(
        (opt: Option) => opt.id === selectedValue,
      );
      return option ? option.verbose_name : '';
    }
    return '';
  }
}
