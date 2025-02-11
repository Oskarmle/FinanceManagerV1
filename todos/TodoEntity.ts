export class TodoEntity {
  public completed: boolean = false;

  constructor(public id: number, public todo: string) {}
}
