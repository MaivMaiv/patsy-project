import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  constructor() {}
  generatePatsyID(): string {
    const randomString = Math.random().toString(36).substr(2, 8);
    const prefix = 'patsy_loyalty-';
    return prefix + randomString;
  }
  generateEmployeeID(): string {
    const randomString = Math.random().toString(36).substr(2, 8);
    const prefix = 'patsy_employee-';
    return prefix + randomString;
  }
  generateLoyaltyProfile(profile: any) {
    console.log(profile);
    const patsyProfile = {
      id: profile.patsyId,
      name: profile.patsyName,
      bday: profile.patsyBirthdate,
      pref: profile.patsyFavourite,
      points: 0
    };
    const profileString = JSON.stringify(patsyProfile);
    localStorage.setItem(patsyProfile.id, profileString);
    console.log('Account: ', localStorage.getItem(patsyProfile.id));
  }
  generateEmployeeProfile(profile: any) {
    console.log(profile);
    const employeeProfile = {
      id: profile.employeeId,
      name: profile.employeeName,
      date: profile.employeeBdate,
      img: profile.employeeImage
    };
    const profileString = JSON.stringify(employeeProfile);
    localStorage.setItem(employeeProfile.id, profileString);
    console.log('Account: ', localStorage.getItem(employeeProfile.id));
  }
}
