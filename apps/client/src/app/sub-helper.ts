import { Subscription } from 'rxjs';

export class SubHelper {
  private subs: Subscription[] = [];
  set sub(sub: Subscription) {
    this.subs.push(sub);
  }
  unsub(): void {
    this.subs.forEach(x => x.unsubscribe());
    this.subs = [];
  }
}
