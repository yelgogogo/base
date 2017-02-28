import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class MissionService {
  // Observable string sources
  private missionAnnouncedSource = new Subject<number>();
  private missionConfirmedSource = new Subject<string>();
  private modeChangedSource = new Subject<boolean>();
  private LoginSource = new Subject<boolean>();
  public share :boolean=false;
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  modeChanged$ = this.modeChangedSource.asObservable();
  Login$= this.LoginSource.asObservable();
  // Service message commands
  announceMission(mission: number) {
    this.missionAnnouncedSource.next(mission);
  }
  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
  Login(token: boolean) {
    this.LoginSource.next(token);
  }
  changeMode(mode: boolean) {
    this.share=mode;
    this.modeChangedSource.next(mode);
  }
}
