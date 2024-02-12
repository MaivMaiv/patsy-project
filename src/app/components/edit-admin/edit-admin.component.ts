import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss'],
})
export class EditAdminComponent  implements OnInit {
  @Input() patsy_admin: any = {
    username: '',
    password: '',
    confirm: ''
  }
  currentUsername = '';
  currentPassword = '';
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const adminCredentials = localStorage.getItem('admin');
    if(adminCredentials) {
      const parsedData = JSON.parse(adminCredentials);
      console.log(parsedData.username);
      this.currentUsername = parsedData.username;
      this.currentPassword = parsedData.password;
    }
  }

  update() {
    this.modalController.dismiss({
      addEmployee: this.patsy_admin
    })
  }

  cancel() {
    this.modalController.dismiss({

    })
  }
}
