import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { App } from '@capacitor/app';
import { AlertController, ModalController } from '@ionic/angular';
import { AddEmployeeComponent } from 'src/app/components/add-employee/add-employee.component';
import { EditAdminComponent } from 'src/app/components/edit-admin/edit-admin.component';
import { DateService } from 'src/app/services/date.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { PatsyDataService } from 'src/app/services/patsy-data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  seconds: number = 0;
  status: boolean = false;
  employeeName: string = '';
  constructor(private router: Router, private modalController: ModalController, private idGenerator: IdGeneratorService, private patsyData: PatsyDataService, private dateService: DateService, private alertController: AlertController) {

   }

   ionViewWillEnter() {
    if(sessionStorage.getItem('Clock') == 'In') {
      const barista = localStorage.getItem('CurrentBarista');
      if(barista) {
        this.employeeName = barista;
      }
    }
   }

  ngOnInit() { }

  createEmployeeProfile(id: any, name: any, address: any, date: any, num: any, img: any) {
    let employee_Profile = {
      employeeId: id,
      employeeName: name,
      employeeAddress: address,
      employeeBdate: date,
      employeePnumber: num,
      employeeImage: img
    };
    console.log('Employee Account: ', employee_Profile);
    this.idGenerator.generateEmployeeProfile(employee_Profile);
    let dataToSend = { keyID: employee_Profile.employeeId, keyName: employee_Profile.employeeName, keyImg: employee_Profile.employeeImage[0] };
    this.router.navigate(['/employee-profile'], { queryParams: dataToSend });
  }

  async openEditAdminModal() {
    const modal = await this.modalController.create({
      component: EditAdminComponent
    });
    
    modal.onDidDismiss().then((data) => {
      const adminData = localStorage.getItem('admin');
      if (adminData) {
        const adminObject = JSON.parse(adminData);
        console.log(data.data?.addEmployee.username);
        adminObject.username = data.data?.addEmployee.username;
        adminObject.password = data.data?.addEmployee.password;
        const updatedAdminData = JSON.stringify(adminObject);
        localStorage.setItem('admin', updatedAdminData);
        this.patsyData.toastMessageSuccess('Admin Updated Successfully', 2000);
      } else {
        this.patsyData.toastMessageError('Admin Error');
      }
    });

    return await modal.present();
  }

  async openAddEmployeeModal() {
    const modal = await this.modalController.create({
      component: AddEmployeeComponent
    });

    modal.onDidDismiss().then((data) => {
      if(sessionStorage.getItem('loyalty') == 'true') {
          this.createEmployeeProfile(data.data?.addEmployee.e_id, data.data?.addEmployee.e_name, data.data?.addEmployee.e_address, data.data?.addEmployee.e_date, data.data?.addEmployee.e_num, data.data?.addEmployee.e_img)
          console.log(data.data?.addEmployee);
      }  else {
        console.log('Cancelled');
      }
    });
    return await modal.present();
  }

  back() {
    this.router.navigate(['home']);
  }

  inventory() {
    this.router.navigate(['inventory']);
  }
  home() {
    this.router.navigate(['home']);
  }
  points() {
    this.router.navigate(['points']);
  }
  report() {
    this.router.navigate(['report']);
  }
  async exit() {
    const confirmation = await this.patsyData.confirmationAlertMessage('Are you sure you want to exit?')
    if(confirmation) {
      this.router.navigate(['landing']);
      sessionStorage.removeItem('sessionToken');
    }
  }
}
