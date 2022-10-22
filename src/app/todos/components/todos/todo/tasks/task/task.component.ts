import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskModel } from '../../../../../models/task.models'
import { TaskStatusEnum } from '../../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{ taskId: string; todoId: string }>()
  @Output() changeTaskEvent = new EventEmitter<{
    taskId: string
    todoId: string
    model: UpdateTaskModel
  }>()

  taskStatusEnum = TaskStatusEnum
  newTitle = ''
  editMode = false

  removeTaskHandler() {
    this.removeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id })
  }

  changeTaskStatusHandler(event: MouseEvent) {
    debugger
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    this.changeTask({ status: newStatus ? TaskStatusEnum.completed : TaskStatusEnum.active })
  }

  activateEditModeHandler() {
    this.editMode = true
    this.newTitle = this.task.title
  }

  editTitleHandler() {
    this.changeTask({ title: this.newTitle })

    this.newTitle = ''
    this.editMode = false
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      completed: this.task.completed,
      startDate: this.task.startDate,
      priority: this.task.priority,
      description: this.task.description,
      deadline: this.task.deadline,
      status: this.task.status,
      title: this.task.title,
      ...patch,
    }
    this.changeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model })
  }
}
