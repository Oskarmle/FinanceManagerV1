export class CategoryEntity {
  constructor(
    public id: number,
    public category: string,
    public entryCount: object[]
  ) {}
}
