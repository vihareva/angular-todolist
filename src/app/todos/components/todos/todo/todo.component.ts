import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DomainTodo, FilterType } from '../../../models/todos.models'
import { TodosService } from '../../../services/todos.service'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo!: DomainTodo
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ todoId: string; title: string }>()

  isEditMode = false
  newTitle = ''

  constructor(private todosService: TodosService) {}

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }

  activateEditModeHandler() {
    this.newTitle = this.todo.title
    this.isEditMode = true
  }

  editTitleHandler() {
    this.isEditMode = false
    this.editTodoEvent.emit({ todoId: this.todo.id, title: this.newTitle })
  }

  changeFilter(filter: FilterType) {
    this.todosService.changeFilter({ filter, todoId: this.todo.id })
  }
}
