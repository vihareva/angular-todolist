import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from '../../../../services/tasks.service'
import { combineLatest, combineLatestAll, map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from '../../../../models/task.models'
import { TodosService } from '../../../../services/todos.service'
import { TaskStatusEnum } from '../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>

  taskTitle = ''

  constructor(private tasksService: TasksService, private todosService: TodosService) {}

  ngOnInit(): void {
    // subscribe
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0]
        let tasksForTodo = tasks[this.todoId]
        const todos = res[1]

        const activeTodo = todos.find(tl => tl.id === this.todoId)

        if (activeTodo?.filter === 'completed') {
          tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatusEnum.completed)
        }
        if (activeTodo?.filter === 'active') {
          tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatusEnum.active)
        }
        return tasksForTodo
      })
    )

    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.addTask({ title: this.taskTitle, todoId: this.todoId })
    this.taskTitle = ''
  }

  removeTask(data: { taskId: string; todoId: string }) {
    this.tasksService.removeTask(data)
  }

  changeTask(data: { taskId: string; todoId: string; model: UpdateTaskModel }) {
    debugger
    this.tasksService.updateTask(data)
  }
}
