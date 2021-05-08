
export class GunComponent {
  public timeSinceLast = 0;
  constructor(
    public shotDelay = 150,
    public gunForce = -800) {}
};