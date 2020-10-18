
export const ComponentManager = new class {
  private componentIds = new Map<{new(...a: any): any}, number>();
  private nextId: number = 0;

  public register(c: {new(...a: any): any}): number {
    if (this.componentIds.has(c)) {
      return this.componentIds.get(c);
    }
    let res = this.nextId++;
    this.componentIds.set(c, res);
    return res;
  }

  public getId(c: {new(...a: any): any}): number | undefined {
    return this.componentIds.get(c);
  }
};
