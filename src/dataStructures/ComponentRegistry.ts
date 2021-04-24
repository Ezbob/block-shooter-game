
export class ComponentRegistry {
  private componentIds = new Map<ComponentConstructor, number>()
  private nextId: number = 0;

  public register(c: ComponentConstructor): number {
    if (this.componentIds.has(c)) {
      return this.componentIds.get(c);
    }
    let res = this.nextId++;
    this.componentIds.set(c, res);
    return res;
  }

  public getId(c: ComponentConstructor): number | undefined {
    return this.componentIds.get(c);
  }
};
