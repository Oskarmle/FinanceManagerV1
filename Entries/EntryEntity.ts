export class EntryEntity {
  constructor(
    public id: number,
    public title: string,
    public amount: number,
    public paymentMethod: number,
    public category: { id: number; category: string },
    public datetime: string
  ) {}
}
