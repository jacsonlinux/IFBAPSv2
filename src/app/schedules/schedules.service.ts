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

export interface Reagents {
  name: string;
  exist: boolean;
}

export interface Equipment {
  description: string;
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

  equipmentCollection: AngularFirestoreCollection<any>;
  equipments: Observable<any>;

  equipmentDoc: AngularFirestoreDocument<any>;
  equipment: Observable<any>;

  reagentCollection: AngularFirestoreCollection<any>;
  reagents: Observable<any>;

  reagentDoc: AngularFirestoreDocument<any>;
  reagent: Observable<any>;

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
        .orderBy('description'));

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

  getReagents() {
    this.reagentCollection = this.angularFirestore
      .collection<Reagents>('reagents', ref => ref
        .orderBy('description'));

    this.reagents = this.reagentCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Reagents;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.reagents;
  }

  getEquipaments() {
    this.equipmentCollection = this.angularFirestore
      .collection<Equipment>('equipments', ref => ref
        .orderBy('description'));

    this.equipments = this.equipmentCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Equipment;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.equipments;
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

  addEquipment() {
    const equipments = [
      {description: 'FALTA EUIPAMENTO AKI', exist: true},
    ];
    for (const entry of equipments) {
      console.log(entry);
      this.angularFirestore
        .collection('equipments')
        .add(entry)
        .then(() => true)
        .catch(err => err.message);
    }
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
      {description: '1,4 diclorobenzeno', exist: true},
      {description: '2,4 dinitrofenilhidrazina pa', exist: true},
      {description: '4-(piridil-2-azo)-resorcina sal monosódico ', exist: true},
      {description: 'acetato de amônio', exist: true},
      {description: 'acetato de cálcio', exist: true},
      {description: 'acetato de chumbo ', exist: true},
      {description: 'acetato de cobre ii', exist: true},
      {description: 'acetato de etila', exist: true},
      {description: 'acetato de potássio', exist: true},
      {description: 'acetato de sódio anidro', exist: true},
      {description: 'acetato de sódio p.a', exist: true},
      {description: 'acetato de sódio trihidratado', exist: true},
      {description: 'acetona p.a.', exist: true},
      {description: 'ácido (orto)periodico p.a. ', exist: true},
      {description: 'ácido acético glacial', exist: true},
      {description: 'ácido acetilsalicilico', exist: true},
      {description: 'ácido benzóico', exist: true},
      {description: 'ácido benzóico', exist: true},
      {description: 'ácido bórico', exist: true},
      {description: 'ácido bórico', exist: true},
      {description: 'ácido butírico', exist: true},
      {description: 'ácido cinâmico', exist: true},
      {description: 'ácido cítrico', exist: true},
      {description: 'ácido clorídrico', exist: true},
      {description: 'ácido dl-málico', exist: true},
      {description: 'ácido fosfórico (orto)', exist: true},
      {description: 'ácido glutâmico', exist: true},
      {description: 'ácido l-ascórbico', exist: true},
      {description: 'ácido lático', exist: true},
      {description: 'ácido nicotínico', exist: true},
      {description: 'ácido nítrico', exist: true},
      {description: 'ácido nitrobenzóico', exist: true},
      {description: 'ácido oleico', exist: true},
      {description: 'ácido oxálico', exist: true},
      {description: 'ácido perclórico p.a.', exist: true},
      {description: 'ácido succinico', exist: true},
      {description: 'ácido sulfúrico', exist: true},
      {description: 'ácido sulfussalicílico', exist: true},
      {description: 'ácido tânico', exist: true},
      {description: 'ácido tartárico', exist: true},
      {description: 'ácido tricloro acético', exist: true},
      {description: 'ácido tricloro acético', exist: true},
      {description: 'alaranjado de metila', exist: true},
      {description: 'alaranjado g', exist: true},
      {description: 'álcool (n) butílico', exist: true},
      {description: 'álcool amílico', exist: true},
      {description: 'álcool benzilíco p.a.', exist: true},
      {description: 'álcool etílico 95% p.a.', exist: true},
      {description: 'álcool etílico absoluto 99,8%', exist: true},
      {description: 'álcool isoamilico / 2-pentanol', exist: true},
      {description: 'álcool isobutílico - isobutanol', exist: true},
      {description: 'álcool isopropilico', exist: true},
      {description: 'álcool metílico / metanol', exist: true},
      {description: 'aldeído benzóico', exist: true},
      {description: 'alizarina', exist: true},
      {description: 'amido solúvel pa', exist: true},
      {description: 'anidrido acético', exist: true},
      {description: 'anidrido propiônico', exist: true},
      {description: 'anilina', exist: true},
      {description: 'arsenito de sódio', exist: true},
      {description: 'azida de sódio p.a.', exist: true},
      {description: 'azida de sódio solução 10%', exist: true},
      {description: 'azul de alcian p.a', exist: true},
      {description: 'azul de bromofenol', exist: true},
      {description: 'azul de bromotimol', exist: true},
      {description: 'azul de metileno', exist: true},
      {description: 'azul de toluidina', exist: true},
      {description: 'benzaldeído', exist: true},
      {description: 'bicarbonato de potássio', exist: true},
      {description: 'bicarbonato de sódio acs', exist: true},
      {description: 'biftalato de potássio', exist: true},
      {description: 'bissulfato de sódio', exist: true},
      {description: 'borohidreto de sódio p.a.', exist: true},
      {description: 'bromato de potássio', exist: true},
      {description: 'brometo de potássio', exist: true},
      {description: 'bromo solução 0,1 mol/l', exist: true},
      {description: 'butanol -1 p.a.', exist: true},
      {description: 'butanol -2 p.a.', exist: true},
      {description: 'cânfora', exist: true},
      {description: 'carbonato de bário', exist: true},
      {description: 'carbonato de bário', exist: true},
      {description: 'carbonato de cálcio', exist: true},
      {description: 'carbonato de cálcio', exist: true},
      {description: 'carbonato de potássio', exist: true},
      {description: 'carbonato de sódio anidro', exist: true},
      {description: 'carbono tretraclorídrico', exist: true},
      {description: 'carvão ativo granulado', exist: true},
      {description: 'celulose veracel', exist: true},
      {description: 'chumbo', exist: true},
      {description: 'cianeto de sódio', exist: true},
      {description: 'ciclohexano', exist: true},
      {description: 'ciclohexano', exist: true},
      {description: 'ciclohexanol', exist: true},
      {description: 'ciclohexanona', exist: true},
      {description: 'ciclohexeno', exist: true},
      {description: 'citrato de amônio', exist: true},
      {description: 'citrato de potássio', exist: true},
      {description: 'citrato de sódio', exist: true},
      {description: 'cloramina t p.a.', exist: true},
      {description: 'cloreto de aluminio 6.h2o', exist: true},
      {description: 'cloreto de aluminio anidro', exist: true},
      {description: 'cloreto de amônio', exist: true},
      {description: 'cloreto de bário 2h2o', exist: true},
      {description: 'cloreto de bário 2h2o', exist: true},
      {description: 'cloreto de bário dihidratado', exist: true},
      {description: 'cloreto de bário dihidratado', exist: true},
      {description: 'cloreto de bário p.a', exist: true},
      {description: 'cloreto de benzoíla', exist: true},
      {description: 'cloreto de cálcio anidro', exist: true},
      {description: 'cloreto de cálcio dihidrato', exist: true},
      {description: 'cloreto de cálcio dihidrato', exist: true},
      {description: 'cloreto de ferro ii', exist: true},
      {description: 'cloreto de ferro iii hexahidratado', exist: true},
      {description: 'cloreto de ferro iii hexahidratado', exist: true},
      {description: 'cloreto de ferro ll', exist: true},
      {description: 'cloreto de ferro lll', exist: true},
      {description: 'cloreto de ferro lll (ico) p.a', exist: true},
      {description: 'cloreto de lítio', exist: true},
      {description: 'cloreto de magnésio 6.h2o', exist: true},
      {description: 'cloreto de magnésio hexahidratado', exist: true},
      {description: 'cloreto de mercúrio ll', exist: true},
      {description: 'cloreto de metileno', exist: true},
      {description: 'cloreto de potássio', exist: true},
      {description: 'cloreto de potássio', exist: true},
      {description: 'cloreto de potássio', exist: true},
      {description: 'cloreto de potássio', exist: true},
      {description: 'cloreto de potássio', exist: true},
      {description: 'cloreto de potássio p.a', exist: true},
      {description: 'cloreto de sódio', exist: true},
      {description: 'cloreto de sódio', exist: true},
      {description: 'cloreto de zinco', exist: true},
      {description: 'cloreto de zinco', exist: true},
      {description: 'cloreto de zinco', exist: true},
      {description: 'cloridrato de hidroxilamina', exist: true},
      {description: 'cloroformio', exist: true},
      {description: 'clorofórmio', exist: true},
      {description: 'cloroformio estabilizado c amileno', exist: true},
      {description: 'cmc', exist: true},
      {description: 'cromato de potássio', exist: true},
      {description: 'd+ glucose anidra pa', exist: true},
      {description: 'd+ glucose anidra pa', exist: true},
      {description: 'd-glicose anidra (dixtrose)', exist: true},
      {description: 'diclorometano', exist: true},
      {description: 'dicromato de potássio', exist: true},
      {description: 'dicromato de potássio', exist: true},
      {description: 'difenilamina', exist: true},
      {description: 'dimetil sulfóxido', exist: true},
      {description: 'dimetilglioxima p.a.', exist: true},
      {description: 'dióxido de selênio', exist: true},
      {description: 'd-norvaline', exist: true},
      {description: 'edta sal dissódico', exist: true},
      {description: 'enxofre', exist: true},
      {description: 'essência erva doce', exist: true},
      {description: 'éter de petróleo', exist: true},
      {description: 'éter etílico', exist: true},
      {description: 'etileno glicol', exist: true},
      {description: 'extrato glicólico de babosa', exist: true},
      {description: 'fenantrolina 1,10 (orto)', exist: true},
      {description: 'fenantrolina 1,10 (orto)', exist: true},
      {description: 'fenol solução 90%', exist: true},
      {description: 'fenolftaleína', exist: true},
      {description: 'fenolftaleína', exist: true},
      {description: 'ferricianeto de potássio', exist: true},
      {description: 'ferrocianeto de potássio', exist: true},
      {description: 'ferrocianeto de potássio tri hidratado', exist: true},
      {description: 'ferroin', exist: true},
      {description: 'fluoreto de potássio', exist: true},
      {description: 'fluoreto de sódio', exist: true},
      {description: 'formaldeído', exist: true},
      {description: 'formaldeído', exist: true},
      {description: 'fosfato de amônio monobásico', exist: true},
      {description: 'fosfato de potássio bibasico . 3 h2o', exist: true},
      {description: 'fosfato de potássio monobasico anidro', exist: true},
      {description: 'fosfato de potássio monobasico monohidro', exist: true},
      {description: 'fosfato de sódio bibásico . 12 h2o', exist: true},
      {description: 'fosfato de sódio bibásico anidro', exist: true},
      {description: 'fosfato de sódio dibásico anidro', exist: true},
      {description: 'fosfato de sódio dibásico dihidratado', exist: true},
      {description: 'fosfato de sódio dibásico monohidratado', exist: true},
      {description: 'fosfato de sódio monobásico anidro', exist: true},
      {description: 'fosfato de sódio monobásico.h2o monohidratado', exist: true},
      {description: 'fosfato de sódio monobásico.h2o monohidratado', exist: true},
      {description: 'frutooligassacarídeo', exist: true},
      {description: 'fucsina básica', exist: true},
      {description: 'glicerina', exist: true},
      {description: 'glicina (ácido amino acético)', exist: true},
      {description: 'glicose', exist: true},
      {description: 'glucose anidra', exist: true},
      {description: 'glutamato de sódio', exist: true},
      {description: 'goma arábica', exist: true},
      {description: 'graxa de silicone', exist: true},
      {description: 'guaiacol', exist: true},
      {description: 'heptano', exist: true},
      {description: 'hexametafosfato de de sódio', exist: true},
      {description: 'hexano', exist: true},
      {description: 'hexano ', exist: true},
      {description: 'hexano p.a', exist: true},
      {description: 'hexano p.a (solvente recuperado)', exist: true},
      {description: 'hidroquinona puríssima', exist: true},
      {description: 'hidróxido de alumínio', exist: true},
      {description: 'hidróxido de amônio', exist: true},
      {description: 'hidróxido de cálcio', exist: true},
      {description: 'hidróxido de potássio', exist: true},
      {description: 'hidróxido de potássio', exist: true},
      {description: 'hidróxido de sódio', exist: true},
      {description: 'hidróxido de sódio em perolas', exist: true},
      {description: 'iodato de potássio', exist: true},
      {description: 'iodeto de mercúrio', exist: true},
      {description: 'iodeto de potássio', exist: true},
      {description: 'iodo', exist: true},
      {description: 'l-metionlina', exist: true},
      {description: 'lactose (d)', exist: true},
      {description: 'lactose monohidratada', exist: true},
      {description: 'lauril sulfato de sódio', exist: true},
      {description: 'lauril sulfato de sódio', exist: true},
      {description: 'lugol fraco solução 2%', exist: true},
      {description: 'metabissulfito de sódio', exist: true},
      {description: 'metanol', exist: true},
      {description: 'metanol', exist: true},
      {description: 'metanol', exist: true},
      {description: 'molibdato de amônio', exist: true},
      {description: 'murexida', exist: true},
      {description: 'murexida', exist: true},
      {description: 'naftaleno', exist: true},
      {description: 'ninhidrina', exist: true},
      {description: 'ninhidrina', exist: true},
      {description: 'nipazol', exist: true},
      {description: 'nitrato de amônio . solução 2,0 mol.l-1', exist: true},
      {description: 'nitrato de cálcio', exist: true},
      {description: 'nitrato de chumbo', exist: true},
      {description: 'nitrato de estrôncio', exist: true},
      {description: 'nitrato de estrôncio', exist: true},
      {description: 'nitrato de ferro (ico)', exist: true},
      {description: 'nitrato de lítio anidro', exist: true},
      {description: 'nitrato de magnésio', exist: true},
      {description: 'nitrato de prata', exist: true},
      {description: 'nitrito de sódio', exist: true},
      {description: 'nitrofenol-4', exist: true},
      {description: 'óleo', exist: true},
      {description: 'óleo de côco', exist: true},
      {description: 'óleo de imersão', exist: true},
      {description: 'óleo de silicone', exist: true},
      {description: 'óleo processado', exist: true},
      {description: 'oxalato de amônio', exist: true},
      {description: 'oxalato de potássio', exist: true},
      {description: 'oxalato de sódio', exist: true},
      {description: 'óxido de alumínio p.a.', exist: true},
      {description: 'óxido de cromo iii', exist: true},
      {description: 'papaína', exist: true},
      {description: 'pectina cítrica', exist: true},
      {description: 'pepsina', exist: true},
      {description: 'perclorato de bário', exist: true},
      {description: 'perclorato de ferro anidro', exist: true},
      {description: 'periodato de sódio', exist: true},
      {description: 'permanganato de potássio', exist: true},
      {description: 'peróxido de hidrogênio', exist: true},
      {description: 'peróxido de hidrogênio 10 volumes', exist: true},
      {description: 'persulfato de amônio', exist: true},
      {description: 'persulfato de amônio p.a.', exist: true},
      {description: 'piridina', exist: true},
      {description: 'preto de eriocromo', exist: true},
      {description: 'prolina', exist: true},
      {description: 'resíduo tolueno + etanol', exist: true},
      {description: 'resorcina', exist: true},
      {description: 'sacarose d+', exist: true},
      {description: 'sílica gel (cromatografia)', exist: true},
      {description: 'sílica gel (cromatografia) 60mm', exist: true},
      {description: 'sílica gel azul de 4-8 mm', exist: true},
      {description: 'soda cáustica', exist: true},
      {description: 'solução de karl fischer (piridina)', exist: true},
      {description: 'subcarbonato de bismuto', exist: true},
      {description: 'sulfato de aluminio e potássio pa', exist: true},
      {description: 'sulfato de amônio', exist: true},
      {description: 'sulfato de cobre ii . 5h2o', exist: true},
      {description: 'sulfato de cobre ii . 5h2o', exist: true},
      {description: 'sulfato de cobre ii anidro', exist: true},
      {description: 'sulfato de ferro ii', exist: true},
      {description: 'sulfato de ferro ii e amônio (oso)', exist: true},
      {description: 'sulfato de magnésio . 7 h2o', exist: true},
      {description: 'sulfato de magnésio anidro', exist: true},
      {description: 'sulfato de manganês ll', exist: true},
      {description: 'sulfato de mercúrio ii', exist: true},
      {description: 'sulfato de potássio', exist: true},
      {description: 'sulfato de prata', exist: true},
      {description: 'sulfato de sódio', exist: true},
      {description: 'sulfato de sódio anidro', exist: true},
      {description: 'sulfato de zinco', exist: true},
      {description: 'sulfato ferroso', exist: true},
      {description: 'sulfato ferroso', exist: true},
      {description: 'tartarato de potássio', exist: true},
      {description: 'tartarato de sódio', exist: true},
      {description: 'tartarato de sódio e potássio', exist: true},
      {description: 'telurito de potássio', exist: true},
      {description: 'tiocianato de potássio', exist: true},
      {description: 'tiossulfato de sódio', exist: true},
      {description: 'tiosulfato de sódio anidro', exist: true},
      {description: 'tolueno', exist: true},
      {description: 'tolueno', exist: true},
      {description: 'tris(hidroximetil)amino metano', exist: true},
      {description: 'uréia pa', exist: true},
      {description: 'uréia pa', exist: true},
      {description: 'uréia pa', exist: true},
      {description: 'verde de bromocresol', exist: true},
      {description: 'verde malaquita', exist: true},
      {description: 'vermelho congo', exist: true},
      {description: 'vermelho cresol', exist: true},
      {description: 'vermelho de metila', exist: true},
      {description: 'vinagre', exist: true }
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
