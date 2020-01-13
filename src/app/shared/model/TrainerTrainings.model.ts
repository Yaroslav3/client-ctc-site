export class TrainerTrainings {
  id: number;
  name: string;
  idTrainers: number;

  constructor(name?: string, id?: number, idTrainers?: number) {
    this.id = id;
    this.name = name;
    this.idTrainers = idTrainers;
  }
}
