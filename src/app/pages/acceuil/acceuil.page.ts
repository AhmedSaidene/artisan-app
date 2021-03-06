import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

import {ClientsComponent } from '../../components/clients/clients.component';


import {AppComponent } from '../../app.component';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {

  constructor(private clientService: ClientService,
              public popoverController: PopoverController,
              private userService: UserService,
              private AppComponent: AppComponent) { }

  ngOnInit() {
  }
  resultat : any = [];
  documents : any = [];


  async search() {
  /**
   *   if(val && val != '') {
      this.clientService.search(val).subscribe((res) => {
        console.log(res)
        this.resultat = res
      })
    }
   */
    const popover = await this.popoverController.create({
      component: ClientsComponent
    });
    await popover.present();
  }
  user = {
    logo : '',
    userName : '',
    entreprise : '',
    role : ''
  };
getUserInfo() {
  this.userService.getUserProfile().subscribe((data) => {
    console.log(data)
    this.user.userName = data['nom'] + ' ' + data['prenom']
    console.log(this.user.userName)
    this.user.logo = data['logo']
    this.user.entreprise = data['entreprise']
    this.user.role = data['role']
    this.AppComponent.setUserValues(this.user.logo, this.user.userName , this.user.entreprise, this.user.role)
  })

}

  async _ionChange(event) {
    console.log(event.detail.value);
    const val = event.target.value.trim();
    
      await this.clientService.search(val).subscribe((clients) => {
        console.log(clients);
        this.resultat = clients['clients'];
       });
      
      const popover = await this.popoverController.create({
        component: ClientsComponent,
        cssClass: 'popover',
        translucent: true,
        componentProps: { clients: this.resultat }
      });
      await popover.present();
      const { data } = await popover.onWillDismiss();
      console.log('onDidDismiss ', data);
    
  }

}
