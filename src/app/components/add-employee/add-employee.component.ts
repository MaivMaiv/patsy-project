import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent  implements OnInit {
  isUploaded: boolean = false;
  @Input() patsy_employee: any = {
    e_name: '',
    e_address: '',
    e_num: '',
    e_date: '',
    e_img: [],
    e_id :'',
  }
  public pickerColumns = [
    {
      name: 'month',
      options: [
        { text: 'January', value: 1 },
        { text: 'February', value: 2 },
        { text: 'March', value: 3 },
        { text: 'April', value: 4 },
        { text: 'May', value: 5 },
        { text: 'June', value: 6 },
        { text: 'July', value: 7 },
        { text: 'August', value: 8 },
        { text: 'September', value: 9 },
        { text: 'October', value: 10 },
        { text: 'November', value: 11 },
        { text: 'December', value: 12 },
      ],
    },
    {
      name: 'day',
      options: [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
        { text: '5', value: '5' },
        { text: '6', value: '6' },
        { text: '7', value: '7' },
        { text: '8', value: '8' },
        { text: '9', value: '9' },
        { text: '10', value: '10' },
        { text: '11', value: '11' },
        { text: '12', value: '12' },
        { text: '13', value: '13' },
        { text: '14', value: '14' },
        { text: '15', value: '15' },
        { text: '16', value: '16' },
        { text: '17', value: '17' },
        { text: '18', value: '18' },
        { text: '19', value: '19' },
        { text: '20', value: '20' },
        { text: '21', value: '21' },
        { text: '22', value: '22' },
        { text: '23', value: '23' },
        { text: '24', value: '24' },
        { text: '25', value: '25' },
        { text: '26', value: '26' },
        { text: '27', value: '27' },
        { text: '28', value: '28' },
        { text: '29', value: '29' },
        { text: '30', value: '30' },
        { text: '31', value: '31' },
      ],
    },
    {
      name: 'year',
      options: [
        { text: '1950', value: 1950 },
        { text: '1951', value: 1951 },
        { text: '1952', value: 1952 },
        { text: '1953', value: 1953 },
        { text: '1954', value: 1954 },
        { text: '1955', value: 1955 },
        { text: '1956', value: 1956 },
        { text: '1957', value: 1957 },
        { text: '1958', value: 1958 },
        { text: '1959', value: 1959 },
        { text: '1960', value: 1960 },
        { text: '1961', value: 1961 },
        { text: '1962', value: 1962 },
        { text: '1963', value: 1963 },
        { text: '1964', value: 1964 },
        { text: '1965', value: 1965 },
        { text: '1966', value: 1966 },
        { text: '1967', value: 1967 },
        { text: '1968', value: 1968 },
        { text: '1969', value: 1969 },
        { text: '1970', value: 1970 },
        { text: '1971', value: 1971 },
        { text: '1972', value: 1972 },
        { text: '1973', value: 1973 },
        { text: '1974', value: 1974 },
        { text: '1975', value: 1975 },
        { text: '1976', value: 1976 },
        { text: '1977', value: 1977 },
        { text: '1978', value: 1978 },
        { text: '1979', value: 1979 },
        { text: '1980', value: 1980 },
        { text: '1981', value: 1981 },
        { text: '1982', value: 1982 },
        { text: '1983', value: 1983 },
        { text: '1984', value: 1984 },
        { text: '1985', value: 1985 },
        { text: '1986', value: 1986 },
        { text: '1987', value: 1987 },
        { text: '1988', value: 1988 },
        { text: '1989', value: 1989 },
        { text: '1990', value: 1990 },
        { text: '1991', value: 1991 },
        { text: '1992', value: 1992 },
        { text: '1993', value: 1993 },
        { text: '1994', value: 1994 },
        { text: '1995', value: 1995 },
        { text: '1996', value: 1996 },
        { text: '1997', value: 1997 },
        { text: '1998', value: 1998 },
        { text: '1999', value: 1999 },
        { text: '2000', value: 2000 },
        { text: '2001', value: 2001 },
        { text: '2002', value: 2002 },
        { text: '2003', value: 2003 },
        { text: '2004', value: 2004 },
        { text: '2005', value: 2005 },
        { text: '2006', value: 2006 },
        { text: '2007', value: 2007 },
        { text: '2008', value: 2008 },
        { text: '2009', value: 2009 },
        { text: '2010', value: 2010 },
        { text: '2011', value: 2011 },
        { text: '2012', value: 2012 },
        { text: '2013', value: 2013 },
        { text: '2014', value: 2014 },
        { text: '2015', value: 2015 },
        { text: '2016', value: 2016 },
        { text: '2017', value: 2017 },
        { text: '2018', value: 2018 },
        { text: '2019', value: 2019 },
        { text: '2020', value: 2020 },
        { text: '2021', value: 2021 },
        { text: '2022', value: 2022 },
        { text: '2023', value: 2023 },
        { text: '2024', value: 2024 },
        { text: '2025', value: 2025 },
        { text: '2026', value: 2026 },
        { text: '2027', value: 2027 },
        { text: '2028', value: 2028 },
        { text: '2029', value: 2029 },
        { text: '2030', value: 2030 },
      ],
    },
  ];
  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: {
        month: { text: any };
        day: { text: any };
        year: { text: any };
      }) => {
        this.patsy_employee.e_date =
          value.month.text + ', ' + value.day.text + ', ' + value.year.text;
        console.log(this.patsy_employee.e_date);
      },
    },
  ];
  constructor(private modalController: ModalController, private idGeneratorService: IdGeneratorService) { }

  ngOnInit() {
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.patsy_employee.e_img.push(dataUrl);
        console.log(this.patsy_employee.e_img);
        this.isUploaded = true;
      };
      reader.readAsDataURL(file);
    }
  }

  reset() {
    this.patsy_employee.e_name = '';
    this.patsy_employee.e_date = '';
    this.patsy_employee.e_img.length = 0;
    const imageInput = document.getElementById(
      'imageInput'
    ) as HTMLInputElement;
    if (imageInput) {
      imageInput.value = '';
    }
  }

  add() {
    sessionStorage.setItem('loyalty', 'true');
    const id = this.idGeneratorService.generateEmployeeID();
    console.log(id);
    this.patsy_employee.e_id = id;
    this.modalController.dismiss({
      addEmployee: this.patsy_employee
    })
  }
  
  cancel() {
    sessionStorage.setItem('loyalty', 'false');
    this.modalController.dismiss({

    })
  }
}
