import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../schedules.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  places;

  constructor( private schedulesService: SchedulesService, private appService: AppService, private router: Router) {
    console.log('PlaceComponent');
  }

  clickPlace(placeName) {
    this.appService.changePlaceName(placeName);
  }

  setPlaces() {
    const data = {
      block_a: [
        {code: 'A02', description: 'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code: 'A03', description: 'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code: 'A04', description: 'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code: 'A05', description: 'Lab. Informática I', status: true, email: 'email@ifba.edu.br' },
        {code: 'A06', description: 'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code: 'A08', description: 'Lab. Informática II', status: true, email: 'email@ifba.edu.br' },
        {code: 'A09', description: 'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code: 'A10', description: 'Lab. Eletrônica e Eletricidade', status: true, email: 'email@ifba.edu.br' },
        {code: 'A11', description: 'Lab. Desenho Técnico', status: true, email: 'email@ifba.edu.br' },
        {code: 'A12', description: 'ESPEC. CIÊNCIA E TEC. AMBIENTAL\nLABAQUIM Lab. Química', status: true, email: 'email@ifba.edu.br' },
        {code: 'A14', description: 'PÓS-GRAD. CIÊNCIA E TEC. AMB. LITE\n– Lab. INTERD. DE TEC.\nEDUCACIONAIS', status: true, email: 'email@ifba.edu.br' },
        {code: 'A17', description: 'Auditório', status: true, email: 'email@ifba.edu.br' },
        {code: 'A18', description: 'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code: 'A19', description: 'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code: 'A20', description: 'Lab. Análise Sensorial', status: true, email: 'email@ifba.edu.br' },
        {code: 'A21', description: 'Lab. Instrumental PPGCTA E\nCTEAM', status: true, email: 'email@ifba.edu.br' },
        {code: 'A22', description: 'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code: 'A24', description: 'Lab. Química', status: true, email: 'email@ifba.edu.br' },
        {code: 'A26', description: 'Refeitório', status: true, email: 'email@ifba.edu.br' }
      ],
      block_c: [
        {code:  'C01', description:  'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code:  'C02', description:  'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code:  'C03', description:  'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code:  'C04', description:  'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code:  'C05', description:  'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code:  'C07', description:  'Lab. Informática I', status: true, email: 'email@ifba.edu.br' },
        {code:  'C08', description:  'Lab. Informática II', status: true, email: 'email@ifba.edu.br' },
        {code:  'C09', description:  'Lab. de Redes de Computadores', status: true, email: 'email@ifba.edu.br' },
        {code:  'C10', description:  'Lab. de Montagem e Manutenção de Computadores', status: true, email: 'email@ifba.edu.br' },
        {code:  'C11', description:  'Lab. Processamento de Alimentos', status: true, email: 'email@ifba.edu.br' },
        {code:  'C12', description:  'Lab. Biologia e Microbiologia', status: true, email: 'email@ifba.edu.br' },
        {code:  'C14', description:  'Lab. Destilação e Extração de Óleos Essenciais', status: true, email: 'email@ifba.edu.br' },
        {code:  'C17', description:  'Lab. Química Geral / Ôrganica', status: true, email: 'email@ifba.edu.br' },
        {code:  'C18', description:  'Lab. Química Geral / Inorganica / Físico-Química', status: true, email: 'email@ifba.edu.br' },
        {code:  'C19', description:  'Lab. Biocombustíveis / Op. Unitárias / Fenômenos de Transporte ', status: true, email: 'email@ifba.edu.br' },
        {code:  'C20', description:  'Lab. Física / Matemática', status: true, email: 'email@ifba.edu.br' },
        {code:  'C21', description:  'Lab. Ciências Humanas', status: true, email: 'email@ifba.edu.br' },
        {code:  'C22', description:  'Lab. Intercultural Indígigena', status: true, email: 'email@ifba.edu.br' },
        {code:  'C27', description:  'Sala de Aula', status: true, email: 'email@ifba.edu.br' },
        {code:  'C28', description:  'Sala de Aula', status: true, email: 'email@ifba.edu.br' }
      ]
    };
    this.schedulesService.setPlaces(data);
  }

  ngOnInit() {
    this.places = this.schedulesService.getPlaces().map(res => res);
    if (this.router.url === '/schedules') {
      this.appService.changePlaceName('Scheduling Places');
    }
  }

}
