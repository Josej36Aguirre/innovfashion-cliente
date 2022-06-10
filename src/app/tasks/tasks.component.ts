import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  tasks: any[] = [];


  formulario: FormGroup = this.formBuilder.group({
    nombre: [],
    completado: [false]
  });                              

  taskEdit:any;
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
   this.getAll();
  }

  getAll(){
    this.taskService.getAll().subscribe((dataTask:any)=>{
      console.log('tareas', this.tasks)
      this.tasks = dataTask._embedded.task;
    });
  }

  save(){
    const values = this.formulario.value;

    let request;

    console.log('values',values);
    if(this.taskEdit){
     request =   this.taskService.update(this.taskEdit._links.self.href, values);
    }else{
     request = this.taskService.create(values);
    }
   request.subscribe(()=>{
      this.getAll();
      this.taskEdit = null;
      this.formulario.setValue({
        nombre: '',
        completado: false
      })
    });
    
  }

  edit(task:any){
    this.taskEdit = task;

    this.formulario.setValue({
      nombre: task.nombre,
      completado: task.completado
    })
  }
  delete(task: any){
    const ok = confirm('¿estas seguro de eliminar esta tarea?')
    if(ok){
      this.taskService.delete(task._links.self.href).subscribe((data) => {
        this.getAll();
        });
    }
  }
 

}
