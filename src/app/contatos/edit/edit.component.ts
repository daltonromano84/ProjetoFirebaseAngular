import { Component, OnInit, Input } from '@angular/core';
import { Contato } from '../shared/contato';
import { ContatoService } from '../shared/contato.service';
import { ContatoDataService } from '../shared/contato-data.service';
// import   '../../../assets/smtp.js';
 declare let Email: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  contato: Contato
  key: string = '';

  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService) { }

  ngOnInit() {
    this.contato = new Contato();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato && data.key) {
        this.contato = new Contato();
        this.contato.nome = data.contato.nome;
        this.contato.telefone = data.contato.telefone;
        this.key = data.key;
      }
    })
  }

  onSubmit() {
    if (this.key) {
      this.contatoService.update(this.contato, this.key);
    } else {
      this.contatoService.insert(this.contato);
    }

    this.contato = new Contato();
  }

  sendEmail() {

    Email.send({
    Host : 'smtp.elasticemail.com',
    Username : 'dalton84@gmail.com',
    Password : 'CA84E00D5D0A17244A4D6A4AB799EBCAE141',
    To : 'dalton84@gmail.com',
    From : 'dalton84@gmail.com',
    Subject : 'teste',
    Body : `
    <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>${this.contato.nome} <br /> <b>Email: </b><br /> <b>Subject: </b>${this.contato.telefone}<br /> <b>Message:</b> <br /> skdjslkdsd <br><br> <b>~End of Message.~</b> `,
    Attachments : [
      {
        name : "smtpjs.pdf",
        path : "https://firebasestorage.googleapis.com/v0/b/ionic-angular-course-6cf60.appspot.com/o/uploads%2FManual%20de%20Reuni%C3%B5es%20e%20Chamadas%20do%20Microsoft%20Teams.pdf?alt=media&token=61ffe463-5571-46d8-8aef-e5f8a490b84c"
      }]


    }).then( message => {alert(message);  } );

    }
}
