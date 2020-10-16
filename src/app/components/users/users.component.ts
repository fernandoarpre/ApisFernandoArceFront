import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {UsersService} from '../../services/users.service';
import {User} from '../../models/User'

import { NotifierService } from "angular-notifier";

declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  error = '';
  isEdit = false;
  users: User[]
  user: User
  formUser: FormGroup
  userObj = new User
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    notifierService: NotifierService
  ) { 

    this.formUser = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getUsers()
  }

  get form() { return this.formUser.controls; }

  onSubmit(){
    if (this.formUser.invalid) {
      this.notifier.notify("warning", "Por favor revise el formulario");
        return;
    }

    if(!this.isEdit){
      this.userObj.idUser = null;
    }else{
      this.userObj.idUser = this.user.idUser;
    }
    
    this.userObj.email = this.form.email.value;
    this.userObj.password = this.form.password.value;

    this.saveUsers();
  }

  editUser(idUser: number){
    this.showModal();
    this.isEdit = true;
    this.user = this.users.find(r => r.idUser == idUser);
    this.form["email"].setValue(this.user.email);
    this.form["password"].setValue(this.user.password);
}

  showModal():void {
    $("#myModal").modal('show');
    $("#formUser")[0].reset();
  }
  hideModal():void {
    $("#myModal").modal('hide');
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data.response;
      },
      error => {
        console.log(error)
      });
  }

  saveUsers(){
    this.userService.saveUsers(this.userObj)
    .subscribe(data => {
      this.isEdit = false;
      this.hideModal();
      this.getUsers();
      if(data.response)
        this.notifier.notify("success", data.msg);
      else
        this.notifier.notify("error", data.msg);
    },error => {
      console.log(error)
      this.isEdit = false;
    })
  }

  deleteUser(idUser: number){
    this.userService.deleteUsers(idUser)
    .subscribe(data => {
      this.getUsers();
      this.isEdit = false;
      if(data.response)
        this.notifier.notify("success", data.msg);
      else
        this.notifier.notify("error", data.msg);
    },error => {
      console.log(error)
    })
  }

}
