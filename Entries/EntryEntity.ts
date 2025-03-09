export class EntryEntity {
  constructor(
    public id: number,
    public title: string,
    public amount: number,
    public paymentMethod: number,
    public category: string,
    public date: string
  ) {}
}