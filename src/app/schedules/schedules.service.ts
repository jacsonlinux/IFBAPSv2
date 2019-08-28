import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Schedule {
  title: any;
  start: any;
  end: any;
  place: any;
  user: any;
}

export interface Place {
  block: string;
  code: string;
  description: string;
  email: string;
  status: boolean;
}

export interface Course {
  name: string;
}

export interface Class {
  name: string;
}

export interface Subject {
  name: string;
}

export interface Item {
  name: string;
  exist: boolean;
}

@Injectable()
export class SchedulesService {

  private selectedDate = new BehaviorSubject(null);
  currentDate = this.selectedDate.asObservable();

  scheduleCollection: AngularFirestoreCollection<any>;
  schedules: Observable<any>;

  placeCollection: AngularFirestoreCollection<any>;
  places: Observable<any>;

  placeDoc: AngularFirestoreDocument<any>;
  place: Observable<any>;

  courseCollection: AngularFirestoreCollection<any>;
  courses: Observable<any>;

  courseDoc: AngularFirestoreDocument<any>;
  course: Observable<any>;

  classCollection: AngularFirestoreCollection<any>;
  classes: Observable<any>;

  classDoc: AngularFirestoreDocument<any>;
  class: Observable<any>;

  subjectCollection: AngularFirestoreCollection<any>;
  subjects: Observable<any>;

  subjectDoc: AngularFirestoreDocument<any>;
  subject: Observable<any>;

  itemCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;

  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  constructor( private angularFirestore: AngularFirestore ) { console.log('SchedulesService'); }

  changeDate(date) {
    this.selectedDate.next(date);
  }

  getSchedules(placeID: string) {
    const now = new Date();
    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('place', '==', placeID)
        .where('start', '>', now)
        .orderBy('start', 'asc')
      );
    this.schedules = this.scheduleCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Schedule;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.schedules;
  }

  getSchedulesUser(place: string, user: string ) {
    const now = new Date();
    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('place', '==', place)
        .where( 'user', '==', user)
        .where('start', '>', now)
        .orderBy('start', 'asc')
      );
    this.schedules = this.scheduleCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Schedule;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.schedules;
  }

  getPlaces() {
    this.placeCollection = this.angularFirestore
      .collection<Place>('places', ref => ref
        .orderBy('code'));

    this.places = this.placeCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Place;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.places;
  }

  getItems() {
    this.itemCollection = this.angularFirestore
      .collection<Item>('items', ref => ref
        .orderBy('name'));

    this.items = this.itemCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Item;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.items;
  }

  getCourses() {
    this.courseCollection = this.angularFirestore
      .collection<Course>('courses', ref => ref
        .orderBy('name'));

    this.courses = this.courseCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Course;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.courses;
  }

  getClasses() {
  this.classCollection = this.angularFirestore
    .collection<Class>('classes', ref => ref
      .orderBy('name'));

  this.classes = this.classCollection
    .snapshotChanges().map(actions => {
      return actions.map(res => {
        const data = res.payload.doc.data() as Class;
        const id = res.payload.doc.id;
        return { id, data };
      });
    });
  return this.classes;
}

  getSubjects() {
    this.subjectCollection = this.angularFirestore
      .collection<Subject>('subjects', ref => ref
        .orderBy('name'));

    this.subjects = this.subjectCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Subject;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.subjects;
  }

  deleteSchedule(scheduleID: string) {
    return  this.angularFirestore
      .collection('schedules')
      .doc(scheduleID)
      .delete()
      .then(() => true )
      .catch(err => err.message);
  }

  newSchedule(schedule) {
    return this.angularFirestore
      .collection('schedules')
      .add(schedule)
      .then(() => true )
      .catch(err => err.message);
  }

  validateSchedule(schedule: Schedule) {

    const startDay = new Date(
      schedule.start.getFullYear(),
      schedule.start.getMonth(),
      schedule.start.getDate(),
      0, 0, 0);

    const endDay = new Date(
      schedule.start.getFullYear(),
      schedule.start.getMonth(),
      schedule.start.getDate(),
      23, 59, 59);


    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('place', '==', schedule.place)
        .where('start', '>=', startDay)
        .where('start', '<=', endDay)
        .orderBy('start', 'asc')
      );
    this.schedules = this.scheduleCollection.snapshotChanges().map(actions => {
      return actions.map(res => {
        const data = res.payload.doc.data() as Schedule;
        const id = res.payload.doc.id;
        return { id, data };
      });
    });
    return this.schedules;
  }

  getPlace(placeID: string) {
    this.placeDoc = this.angularFirestore.doc('places/' + placeID);
    this.place = this.placeDoc.valueChanges();
    return this.place;
  }

  addItems() {
    const items = [
      {description: 'almofariz pestilo 120 ml porcelana', exist: true},
      {description: 'balão fundo chato  500 ml vidro', exist: true},
      {description: 'balão fundo chato 100 ml vidro', exist: true},
      {description: 'balão fundo chato 1000 ml vidro', exist: true},
      {description: 'balão fundo chato 200 ml vidro', exist: true},
      {description: 'balão fundo chato 25 ml vidro', exist: true},
      {description: 'balão fundo chato 250 ml vidro', exist: true},
      {description: 'balão fundo chato 50 ml vidro', exist: true},
      {description: 'balão fundo redondo 100 ml vidro', exist: true},
      {description: 'balão fundo redondo 1000 ml vidro', exist: true},
      {description: 'balão fundo redondo 250 ml vidro', exist: true},
      {description: 'balão fundo redondo 500 ml vidro', exist: true},
      {description: 'balão volumétrico 10 ml vidro', exist: true},
      {description: 'balão volumétrico 100 ml vidro', exist: true},
      {description: 'balão volumétrico 1000 ml vidro', exist: true},
      {description: 'balão volumétrico 200 ml vidro', exist: true},
      {description: 'balão volumétrico 25 ml vidro', exist: true},
      {description: 'balão volumétrico 250 ml vidro', exist: true},
      {description: 'balão volumétrico 5 ml vidro', exist: true},
      {description: 'balão volumétrico 50 ml vidro', exist: true},
      {description: 'balão volumétrico 500 ml vidro', exist: true},
      {description: 'bandeja grande plastico', exist: true},
      {description: 'bandeja média plastico', exist: true},
      {description: 'bandeja pequena plastico', exist: true},
      {description: 'barrilete  20 l', exist: true},
      {description: 'bastão 10x300 mm vidro', exist: true},
      {description: 'bastão 15x300 mm vidro', exist: true},
      {description: 'bastão 3x300 mm vidro', exist: true},
      {description: 'bastão 6x300 mm vidro', exist: true},
      {description: 'bastão 8x300 mm vidro', exist: true},
      {description: 'becker 100 ml polietileno', exist: true},
      {description: 'becker 100 ml vidro', exist: true},
      {description: 'becker 1000 ml polietileno', exist: true},
      {description: 'becker 1000 ml vidro', exist: true},
      {description: 'becker 150 ml vidro', exist: true},
      {description: 'becker 2000 ml polietileno', exist: true},
      {description: 'becker 250 ml polietileno', exist: true},
      {description: 'becker 250 ml vidro', exist: true},
      {description: 'becker 400 ml vidro', exist: true},
      {description: 'becker 50 ml polietileno', exist: true},
      {description: 'becker 50 ml vidro', exist: true},
      {description: 'becker 500 ml polietileno', exist: true},
      {description: 'becker 600 ml polietileno', exist: true},
      {description: 'becker 600 ml vidro', exist: true},
      {description: 'bico de bunsen', exist: true},
      {description: 'borbulhador 150 ml vidro', exist: true},
      {description: 'bureta valvula teflon 10 ml vidro', exist: true},
      {description: 'bureta valvula teflon 25 ml vidro', exist: true},
      {description: 'bureta valvula teflon 50 ml vidro', exist: true},
      {description: 'cadinho 100 ml porcelana', exist: true},
      {description: 'cadinho 20 ml porcelana', exist: true},
      {description: 'cadinho 35 ml porcelana', exist: true},
      {description: 'cadinho 40 ml porcelana', exist: true},
      {description: 'cadinho 50 ml porcelana', exist: true},
      {description: 'cálice 125 ml vidro', exist: true},
      {description: 'capsula 150 ml alumínio', exist: true},
      {description: 'capsula 25 ml porcelana', exist: true},
      {description: 'capsula 30 ml porcelana', exist: true},
      {description: 'capsula 50 ml porcelana', exist: true},
      {description: 'condensador tipo bolha vidro', exist: true},
      {description: 'condensador tipo expiral vidro', exist: true},
      {description: 'condensador tipo reto vidro', exist: true},
      {description: 'cone de inhoff 1000 ml vidro', exist: true},
      {description: 'erlenmeyer 100 ml vidro', exist: true},
      {description: 'erlenmeyer 1000 ml vidro', exist: true},
      {description: 'erlenmeyer 125 ml vidro', exist: true},
      {description: 'erlenmeyer 2000 ml vidro', exist: true},
      {description: 'erlenmeyer 250 ml vidro', exist: true},
      {description: 'erlenmeyer 50 ml vidro', exist: true},
      {description: 'erlenmeyer 500 ml vidro', exist: true},
      {description: 'escova para tubos média', exist: true},
      {description: 'escova para tubos pequena', exist: true},
      {description: 'espatula cabo de madeira grande', exist: true},
      {description: 'espatula cabo de madeira pequena', exist: true},
      {description: 'espatula média concava', exist: true},
      {description: 'espatula pequena concava', exist: true},
      {description: 'extrator soxhlet 250 ml vidro', exist: true},
      {description: 'filtro de proteção pra pêra', exist: true},
      {description: 'filtro de seringa com membrana de acetato de celulose', exist: true},
      {description: 'fita indicadora de ph', exist: true},
      {description: 'frasco 1000 ml polietileno', exist: true},
      {description: 'frasco 1000 ml vidro', exist: true},
      {description: 'frasco 125 ml p/ indicador vidro', exist: true},
      {description: 'frasco 250 ml vidro', exist: true},
      {description: 'frasco 400 ml vidro', exist: true},
      {description: 'frasco 500 ml vidro', exist: true},
      {description: 'frasco 800 ml vidro', exist: true},
      {description: 'frasco ambar 100 ml vidro', exist: true},
      {description: 'funil de buchner porcelana', exist: true},
      {description: 'funil de decantação 250 ml vidro', exist: true},
      {description: 'funil de decantação 500 ml vidro', exist: true},
      {description: 'funil de separação 250 ml vidro', exist: true},
      {description: 'funil de separação 500 ml vidro', exist: true},
      {description: 'funil de separação 60 ml vidro', exist: true},
      {description: 'funil de vidro grande vidro', exist: true},
      {description: 'funil de vidro médio vidro', exist: true},
      {description: 'funil de vidro pequeno vidro', exist: true},
      {description: 'funil plástico plastico', exist: true},
      {description: 'grau com pestilo porcelana', exist: true},
      {description: 'kit destilação arraste a vapor vidro', exist: true},
      {description: 'kit destilação fracionada vidro', exist: true},
      {description: 'kitassato 250 ml vidro', exist: true},
      {description: 'kitassato 500 ml vidro', exist: true},
      {description: 'macaco elevatório', exist: true},
      {description: 'membrana filtrante pacote 50', exist: true},
      {description: 'micropipeta 20 a 200 ul', exist: true},
      {description: 'micropipeta 200 a 1000 ul', exist: true},
      {description: 'micropipeta 2000 a 10000 ul', exist: true},
      {description: 'pêra automática', exist: true},
      {description: 'pêra verde', exist: true},
      {description: 'pêra vermelha', exist: true},
      {description: 'pinça com mufa para bureta', exist: true},
      {description: 'pinça p/ cadinho metal', exist: true},
      {description: 'pipeta graduada 1 ml vidro', exist: true},
      {description: 'pipeta graduada 10 ml vidro', exist: true},
      {description: 'pipeta graduada 25 ml vidro', exist: true},
      {description: 'pipeta graduada 3 ml vidro', exist: true},
      {description: 'pipeta graduada 5 ml vidro', exist: true},
      {description: 'pipeta volumétrica 1 ml vidro', exist: true},
      {description: 'pipeta volumétrica 10 ml vidro', exist: true},
      {description: 'pipeta volumétrica 100 ml vidro', exist: true},
      {description: 'pipeta volumétrica 15 ml vidro', exist: true},
      {description: 'pipeta volumétrica 2 ml vidro', exist: true},
      {description: 'pipeta volumétrica 20 ml vidro', exist: true},
      {description: 'pipeta volumétrica 25 ml vidro', exist: true},
      {description: 'pipeta volumétrica 5 ml vidro', exist: true},
      {description: 'pipeta volumétrica 50 ml vidro', exist: true},
      {description: 'pissete 250 ml polietileno', exist: true},
      {description: 'pissete 500 ml polietileno', exist: true},
      {description: 'placa cormatográfica caixa', exist: true},
      {description: 'placa de petri polietileno', exist: true},
      {description: 'placas de petri vidro', exist: true},
      {description: 'proveta graduada  50 ml vidro', exist: true},
      {description: 'proveta graduada  ml 5 ml vidro', exist: true},
      {description: 'proveta graduada 10 ml vidro', exist: true},
      {description: 'proveta graduada 100 ml c/ tampa vidro', exist: true},
      {description: 'proveta graduada 100 ml polietileno', exist: true},
      {description: 'proveta graduada 100 ml vidro', exist: true},
      {description: 'proveta graduada 1000 ml c/ tampa', exist: true},
      {description: 'proveta graduada 1000 ml polietileno', exist: true},
      {description: 'proveta graduada 1000 ml vidro', exist: true},
      {description: 'proveta graduada 1000 ml vidro', exist: true},
      {description: 'proveta graduada 25 ml polietileno', exist: true},
      {description: 'proveta graduada 250 ml polietileno', exist: true},
      {description: 'proveta graduada 5 ml vidro', exist: true},
      {description: 'proveta graduada 50 ml polietileno', exist: true},
      {description: 'proveta graduada 50 ml vidro', exist: true},
      {description: 'proveta graduada 500 ml polietileno', exist: true},
      {description: 'proveta graduada 500 ml vidro', exist: true},
      {description: 'proveta graduada c/ tampa 10 ml vidro', exist: true},
      {description: 'proveta graduada c/ tampa 50 ml vidro', exist: true},
      {description: 'seringa descartável 3 ml', exist: true},
      {description: 'suporte para laminas de vidro inox', exist: true},
      {description: 'suporte para pipetas', exist: true},
      {description: 'suporte universal', exist: true},
      {description: 'termometro mercúrio 130 °c vidro', exist: true},
      {description: 'tubo de ensaio 10x100 mm > vidro', exist: true},
      {description: 'vidro de relógio 150mm vidro', exist: true},
      {description: 'vidro de relógio 6mm vidro', exist: true }
    ];
    for (const entry of items) {
      console.log(entry);
      this.angularFirestore
        .collection('items')
        .add(entry)
        .then(() => true)
        .catch(err => err.message);
    }
  }

  addPlaces() {
    const places = [
      {code: 'A02', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A03', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A04', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A05', description: 'Lab. Informática I ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A06', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A08', description: 'Lab. Informática II ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A09', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A10', description: 'Lab. Electronics and Electricity ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A11', description: 'Lab. Technical Drawing ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A12', description: 'Science and Tec Specialization. Environmental - Lab. Chemistry ', status: true,
        email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A14', description: 'Postgrad. Science and Tec. Environmental LITE - Lab. Interd de Tec. Educational. ',
        Status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A17', description: 'Auditorium', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A18', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A19', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A20', description: 'Lab. Sensory Analysis', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A21', description: 'Lab. Instrumental PPGCTA and CTEAM ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A22', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A24', description: 'Lab. Chemistry ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A26', description: 'Refectory', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'C01', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C02', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C03', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C04', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C05', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C07', description: 'Lab. Informática I ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C08', description: 'Lab. Informática II ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C09', description: 'Lab. Networking ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C10', description: 'Lab. Assembly and Maintenance Guide ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C11', description: 'Lab. Food Processing ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C12', description: 'Lab. Biology and Microbiology ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C14', description: 'Lab. Distillation and Extraction of Essential Oils', status: true,
        email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C17', description: 'Lab. Química Geral / Órganica ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C18', description: 'Lab. General Chemistry / Inorganic / Physical Chemistry ', status: true,
        email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C19', description: 'Lab. Biofuels / Unit Op. / Transport Phenomena ', status: true,
        email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C20', description: 'Lab. Physics / Mathematics', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C21', description: 'Lab. Humanities', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C22', description: 'Lab. Indigenous Intercultural ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C27', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C28', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'}
    ];
    for (const entry of places) {
      this.angularFirestore
        .collection('places')
        .add(entry)
        .then(() => true)
        .catch(err => err.message);
    }
  }

  addReagent() {
    const reagent = [
      {reagent: '1,4 diclorobenzeno', exist: true},
      {reagent: '2,4 dinitrofenilhidrazina pa', exist: true},
      {reagent: '4-(piridil-2-azo)-resorcina sal monosódico ', exist: true},
      {reagent: 'acetato de amônio', exist: true},
      {reagent: 'acetato de cálcio', exist: true},
      {reagent: 'acetato de chumbo ', exist: true},
      {reagent: 'acetato de cobre ii', exist: true},
      {reagent: 'acetato de etila', exist: true},
      {reagent: 'acetato de potássio', exist: true},
      {reagent: 'acetato de sódio anidro', exist: true},
      {reagent: 'acetato de sódio p.a', exist: true},
      {reagent: 'acetato de sódio trihidratado', exist: true},
      {reagent: 'acetona p.a.', exist: true},
      {reagent: 'ácido (orto)periodico p.a. ', exist: true},
      {reagent: 'ácido acético glacial', exist: true},
      {reagent: 'ácido acetilsalicilico', exist: true},
      {reagent: 'ácido benzóico', exist: true},
      {reagent: 'ácido benzóico', exist: true},
      {reagent: 'ácido bórico', exist: true},
      {reagent: 'ácido bórico', exist: true},
      {reagent: 'ácido butírico', exist: true},
      {reagent: 'ácido cinâmico', exist: true},
      {reagent: 'ácido cítrico', exist: true},
      {reagent: 'ácido clorídrico', exist: true},
      {reagent: 'ácido dl-málico', exist: true},
      {reagent: 'ácido fosfórico (orto)', exist: true},
      {reagent: 'ácido glutâmico', exist: true},
      {reagent: 'ácido l-ascórbico', exist: true},
      {reagent: 'ácido lático', exist: true},
      {reagent: 'ácido nicotínico', exist: true},
      {reagent: 'ácido nítrico', exist: true},
      {reagent: 'ácido nitrobenzóico', exist: true},
      {reagent: 'ácido oleico', exist: true},
      {reagent: 'ácido oxálico', exist: true},
      {reagent: 'ácido perclórico p.a.', exist: true},
      {reagent: 'ácido succinico', exist: true},
      {reagent: 'ácido sulfúrico', exist: true},
      {reagent: 'ácido sulfussalicílico', exist: true},
      {reagent: 'ácido tânico', exist: true},
      {reagent: 'ácido tartárico', exist: true},
      {reagent: 'ácido tricloro acético', exist: true},
      {reagent: 'ácido tricloro acético', exist: true},
      {reagent: 'alaranjado de metila', exist: true},
      {reagent: 'alaranjado g', exist: true},
      {reagent: 'álcool (n) butílico', exist: true},
      {reagent: 'álcool amílico', exist: true},
      {reagent: 'álcool benzilíco p.a.', exist: true},
      {reagent: 'álcool etílico 95% p.a.', exist: true},
      {reagent: 'álcool etílico absoluto 99,8%', exist: true},
      {reagent: 'álcool isoamilico / 2-pentanol', exist: true},
      {reagent: 'álcool isobutílico - isobutanol', exist: true},
      {reagent: 'álcool isopropilico', exist: true},
      {reagent: 'álcool metílico / metanol', exist: true},
      {reagent: 'aldeído benzóico', exist: true},
      {reagent: 'alizarina', exist: true},
      {reagent: 'amido solúvel pa', exist: true},
      {reagent: 'anidrido acético', exist: true},
      {reagent: 'anidrido propiônico', exist: true},
      {reagent: 'anilina', exist: true},
      {reagent: 'arsenito de sódio', exist: true},
      {reagent: 'azida de sódio p.a.', exist: true},
      {reagent: 'azida de sódio solução 10%', exist: true},
      {reagent: 'azul de alcian p.a', exist: true},
      {reagent: 'azul de bromofenol', exist: true},
      {reagent: 'azul de bromotimol', exist: true},
      {reagent: 'azul de metileno', exist: true},
      {reagent: 'azul de toluidina', exist: true},
      {reagent: 'benzaldeído', exist: true},
      {reagent: 'bicarbonato de potássio', exist: true},
      {reagent: 'bicarbonato de sódio acs', exist: true},
      {reagent: 'biftalato de potássio', exist: true},
      {reagent: 'bissulfato de sódio', exist: true},
      {reagent: 'borohidreto de sódio p.a.', exist: true},
      {reagent: 'bromato de potássio', exist: true},
      {reagent: 'brometo de potássio', exist: true},
      {reagent: 'bromo solução 0,1 mol/l', exist: true},
      {reagent: 'butanol -1 p.a.', exist: true},
      {reagent: 'butanol -2 p.a.', exist: true},
      {reagent: 'cânfora', exist: true},
      {reagent: 'carbonato de bário', exist: true},
      {reagent: 'carbonato de bário', exist: true},
      {reagent: 'carbonato de cálcio', exist: true},
      {reagent: 'carbonato de cálcio', exist: true},
      {reagent: 'carbonato de potássio', exist: true},
      {reagent: 'carbonato de sódio anidro', exist: true},
      {reagent: 'carbono tretraclorídrico', exist: true},
      {reagent: 'carvão ativo granulado', exist: true},
      {reagent: 'celulose veracel', exist: true},
      {reagent: 'chumbo', exist: true},
      {reagent: 'cianeto de sódio', exist: true},
      {reagent: 'ciclohexano', exist: true},
      {reagent: 'ciclohexano', exist: true},
      {reagent: 'ciclohexanol', exist: true},
      {reagent: 'ciclohexanona', exist: true},
      {reagent: 'ciclohexeno', exist: true},
      {reagent: 'citrato de amônio', exist: true},
      {reagent: 'citrato de potássio', exist: true},
      {reagent: 'citrato de sódio', exist: true},
      {reagent: 'cloramina t p.a.', exist: true},
      {reagent: 'cloreto de aluminio 6.h2o', exist: true},
      {reagent: 'cloreto de aluminio anidro', exist: true},
      {reagent: 'cloreto de amônio', exist: true},
      {reagent: 'cloreto de bário 2h2o', exist: true},
      {reagent: 'cloreto de bário 2h2o', exist: true},
      {reagent: 'cloreto de bário dihidratado', exist: true},
      {reagent: 'cloreto de bário dihidratado', exist: true},
      {reagent: 'cloreto de bário p.a', exist: true},
      {reagent: 'cloreto de benzoíla', exist: true},
      {reagent: 'cloreto de cálcio anidro', exist: true},
      {reagent: 'cloreto de cálcio dihidrato', exist: true},
      {reagent: 'cloreto de cálcio dihidrato', exist: true},
      {reagent: 'cloreto de ferro ii', exist: true},
      {reagent: 'cloreto de ferro iii hexahidratado', exist: true},
      {reagent: 'cloreto de ferro iii hexahidratado', exist: true},
      {reagent: 'cloreto de ferro ll', exist: true},
      {reagent: 'cloreto de ferro lll', exist: true},
      {reagent: 'cloreto de ferro lll (ico) p.a', exist: true},
      {reagent: 'cloreto de lítio', exist: true},
      {reagent: 'cloreto de magnésio 6.h2o', exist: true},
      {reagent: 'cloreto de magnésio hexahidratado', exist: true},
      {reagent: 'cloreto de mercúrio ll', exist: true},
      {reagent: 'cloreto de metileno', exist: true},
      {reagent: 'cloreto de potássio', exist: true},
      {reagent: 'cloreto de potássio', exist: true},
      {reagent: 'cloreto de potássio', exist: true},
      {reagent: 'cloreto de potássio', exist: true},
      {reagent: 'cloreto de potássio', exist: true},
      {reagent: 'cloreto de potássio p.a', exist: true},
      {reagent: 'cloreto de sódio', exist: true},
      {reagent: 'cloreto de sódio', exist: true},
      {reagent: 'cloreto de zinco', exist: true},
      {reagent: 'cloreto de zinco', exist: true},
      {reagent: 'cloreto de zinco', exist: true},
      {reagent: 'cloridrato de hidroxilamina', exist: true},
      {reagent: 'cloroformio', exist: true},
      {reagent: 'clorofórmio', exist: true},
      {reagent: 'cloroformio estabilizado c amileno', exist: true},
      {reagent: 'cmc', exist: true},
      {reagent: 'cromato de potássio', exist: true},
      {reagent: 'd+ glucose anidra pa', exist: true},
      {reagent: 'd+ glucose anidra pa', exist: true},
      {reagent: 'd-glicose anidra (dixtrose)', exist: true},
      {reagent: 'diclorometano', exist: true},
      {reagent: 'dicromato de potássio', exist: true},
      {reagent: 'dicromato de potássio', exist: true},
      {reagent: 'difenilamina', exist: true},
      {reagent: 'dimetil sulfóxido', exist: true},
      {reagent: 'dimetilglioxima p.a.', exist: true},
      {reagent: 'dióxido de selênio', exist: true},
      {reagent: 'd-norvaline', exist: true},
      {reagent: 'edta sal dissódico', exist: true},
      {reagent: 'enxofre', exist: true},
      {reagent: 'essência erva doce', exist: true},
      {reagent: 'éter de petróleo', exist: true},
      {reagent: 'éter etílico', exist: true},
      {reagent: 'etileno glicol', exist: true},
      {reagent: 'extrato glicólico de babosa', exist: true},
      {reagent: 'fenantrolina 1,10 (orto)', exist: true},
      {reagent: 'fenantrolina 1,10 (orto)', exist: true},
      {reagent: 'fenol solução 90%', exist: true},
      {reagent: 'fenolftaleína', exist: true},
      {reagent: 'fenolftaleína', exist: true},
      {reagent: 'ferricianeto de potássio', exist: true},
      {reagent: 'ferrocianeto de potássio', exist: true},
      {reagent: 'ferrocianeto de potássio tri hidratado', exist: true},
      {reagent: 'ferroin', exist: true},
      {reagent: 'fluoreto de potássio', exist: true},
      {reagent: 'fluoreto de sódio', exist: true},
      {reagent: 'formaldeído', exist: true},
      {reagent: 'formaldeído', exist: true},
      {reagent: 'fosfato de amônio monobásico', exist: true},
      {reagent: 'fosfato de potássio bibasico . 3 h2o', exist: true},
      {reagent: 'fosfato de potássio monobasico anidro', exist: true},
      {reagent: 'fosfato de potássio monobasico monohidro', exist: true},
      {reagent: 'fosfato de sódio bibásico . 12 h2o', exist: true},
      {reagent: 'fosfato de sódio bibásico anidro', exist: true},
      {reagent: 'fosfato de sódio dibásico anidro', exist: true},
      {reagent: 'fosfato de sódio dibásico dihidratado', exist: true},
      {reagent: 'fosfato de sódio dibásico monohidratado', exist: true},
      {reagent: 'fosfato de sódio monobásico anidro', exist: true},
      {reagent: 'fosfato de sódio monobásico.h2o monohidratado', exist: true},
      {reagent: 'fosfato de sódio monobásico.h2o monohidratado', exist: true},
      {reagent: 'frutooligassacarídeo', exist: true},
      {reagent: 'fucsina básica', exist: true},
      {reagent: 'glicerina', exist: true},
      {reagent: 'glicina (ácido amino acético)', exist: true},
      {reagent: 'glicose', exist: true},
      {reagent: 'glucose anidra', exist: true},
      {reagent: 'glutamato de sódio', exist: true},
      {reagent: 'goma arábica', exist: true},
      {reagent: 'graxa de silicone', exist: true},
      {reagent: 'guaiacol', exist: true},
      {reagent: 'heptano', exist: true},
      {reagent: 'hexametafosfato de de sódio', exist: true},
      {reagent: 'hexano', exist: true},
      {reagent: 'hexano ', exist: true},
      {reagent: 'hexano p.a', exist: true},
      {reagent: 'hexano p.a (solvente recuperado)', exist: true},
      {reagent: 'hidroquinona puríssima', exist: true},
      {reagent: 'hidróxido de alumínio', exist: true},
      {reagent: 'hidróxido de amônio', exist: true},
      {reagent: 'hidróxido de cálcio', exist: true},
      {reagent: 'hidróxido de potássio', exist: true},
      {reagent: 'hidróxido de potássio', exist: true},
      {reagent: 'hidróxido de sódio', exist: true},
      {reagent: 'hidróxido de sódio em perolas', exist: true},
      {reagent: 'iodato de potássio', exist: true},
      {reagent: 'iodeto de mercúrio', exist: true},
      {reagent: 'iodeto de potássio', exist: true},
      {reagent: 'iodo', exist: true},
      {reagent: 'l-metionlina', exist: true},
      {reagent: 'lactose (d)', exist: true},
      {reagent: 'lactose monohidratada', exist: true},
      {reagent: 'lauril sulfato de sódio', exist: true},
      {reagent: 'lauril sulfato de sódio', exist: true},
      {reagent: 'lugol fraco solução 2%', exist: true},
      {reagent: 'metabissulfito de sódio', exist: true},
      {reagent: 'metanol', exist: true},
      {reagent: 'metanol', exist: true},
      {reagent: 'metanol', exist: true},
      {reagent: 'molibdato de amônio', exist: true},
      {reagent: 'murexida', exist: true},
      {reagent: 'murexida', exist: true},
      {reagent: 'naftaleno', exist: true},
      {reagent: 'ninhidrina', exist: true},
      {reagent: 'ninhidrina', exist: true},
      {reagent: 'nipazol', exist: true},
      {reagent: 'nitrato de amônio . solução 2,0 mol.l-1', exist: true},
      {reagent: 'nitrato de cálcio', exist: true},
      {reagent: 'nitrato de chumbo', exist: true},
      {reagent: 'nitrato de estrôncio', exist: true},
      {reagent: 'nitrato de estrôncio', exist: true},
      {reagent: 'nitrato de ferro (ico)', exist: true},
      {reagent: 'nitrato de lítio anidro', exist: true},
      {reagent: 'nitrato de magnésio', exist: true},
      {reagent: 'nitrato de prata', exist: true},
      {reagent: 'nitrito de sódio', exist: true},
      {reagent: 'nitrofenol-4', exist: true},
      {reagent: 'óleo', exist: true},
      {reagent: 'óleo de côco', exist: true},
      {reagent: 'óleo de imersão', exist: true},
      {reagent: 'óleo de silicone', exist: true},
      {reagent: 'óleo processado', exist: true},
      {reagent: 'oxalato de amônio', exist: true},
      {reagent: 'oxalato de potássio', exist: true},
      {reagent: 'oxalato de sódio', exist: true},
      {reagent: 'óxido de alumínio p.a.', exist: true},
      {reagent: 'óxido de cromo iii', exist: true},
      {reagent: 'papaína', exist: true},
      {reagent: 'pectina cítrica', exist: true},
      {reagent: 'pepsina', exist: true},
      {reagent: 'perclorato de bário', exist: true},
      {reagent: 'perclorato de ferro anidro', exist: true},
      {reagent: 'periodato de sódio', exist: true},
      {reagent: 'permanganato de potássio', exist: true},
      {reagent: 'peróxido de hidrogênio', exist: true},
      {reagent: 'peróxido de hidrogênio 10 volumes', exist: true},
      {reagent: 'persulfato de amônio', exist: true},
      {reagent: 'persulfato de amônio p.a.', exist: true},
      {reagent: 'piridina', exist: true},
      {reagent: 'preto de eriocromo', exist: true},
      {reagent: 'prolina', exist: true},
      {reagent: 'resíduo tolueno + etanol', exist: true},
      {reagent: 'resorcina', exist: true},
      {reagent: 'sacarose d+', exist: true},
      {reagent: 'sílica gel (cromatografia)', exist: true},
      {reagent: 'sílica gel (cromatografia) 60mm', exist: true},
      {reagent: 'sílica gel azul de 4-8 mm', exist: true},
      {reagent: 'soda cáustica', exist: true},
      {reagent: 'solução de karl fischer (piridina)', exist: true},
      {reagent: 'subcarbonato de bismuto', exist: true},
      {reagent: 'sulfato de aluminio e potássio pa', exist: true},
      {reagent: 'sulfato de amônio', exist: true},
      {reagent: 'sulfato de cobre ii . 5h2o', exist: true},
      {reagent: 'sulfato de cobre ii . 5h2o', exist: true},
      {reagent: 'sulfato de cobre ii anidro', exist: true},
      {reagent: 'sulfato de ferro ii', exist: true},
      {reagent: 'sulfato de ferro ii e amônio (oso)', exist: true},
      {reagent: 'sulfato de magnésio . 7 h2o', exist: true},
      {reagent: 'sulfato de magnésio anidro', exist: true},
      {reagent: 'sulfato de manganês ll', exist: true},
      {reagent: 'sulfato de mercúrio ii', exist: true},
      {reagent: 'sulfato de potássio', exist: true},
      {reagent: 'sulfato de prata', exist: true},
      {reagent: 'sulfato de sódio', exist: true},
      {reagent: 'sulfato de sódio anidro', exist: true},
      {reagent: 'sulfato de zinco', exist: true},
      {reagent: 'sulfato ferroso', exist: true},
      {reagent: 'sulfato ferroso', exist: true},
      {reagent: 'tartarato de potássio', exist: true},
      {reagent: 'tartarato de sódio', exist: true},
      {reagent: 'tartarato de sódio e potássio', exist: true},
      {reagent: 'telurito de potássio', exist: true},
      {reagent: 'tiocianato de potássio', exist: true},
      {reagent: 'tiossulfato de sódio', exist: true},
      {reagent: 'tiosulfato de sódio anidro', exist: true},
      {reagent: 'tolueno', exist: true},
      {reagent: 'tolueno', exist: true},
      {reagent: 'tris(hidroximetil)amino metano', exist: true},
      {reagent: 'uréia pa', exist: true},
      {reagent: 'uréia pa', exist: true},
      {reagent: 'uréia pa', exist: true},
      {reagent: 'verde de bromocresol', exist: true},
      {reagent: 'verde malaquita', exist: true},
      {reagent: 'vermelho congo', exist: true},
      {reagent: 'vermelho cresol', exist: true},
      {reagent: 'vermelho de metila', exist: true},
      {reagent: 'vinagre', exist: true }
    ];
    for (const entry of reagent) {
      console.log(entry);
      this.angularFirestore
        .collection('reagents')
        .add(entry)
        .then(() => true)
        .catch(err => err.message);
    }
  }

}
