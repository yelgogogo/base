import { Injectable } from '@angular/core';
import { Headers, Http, Response,URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Workspace,Engineer,Survey,User,File,Regarray } from './Hero';
// import { ENGINEERS } from './mock-data';

@Injectable()
export class HeroService {
  private WorkspacesUrl = 'http://localhost:3100/workspaces';  // URL to web api Workspaces
  private engineersUrl = 'http://localhost:3100/engineers'; // URL to web api engineers
  private surveysUrl = 'http://localhost:3100/surveys'; // URL to web api engineers
  private usersUrl = 'http://localhost:3100/users'; // URL to web api engineers
  private regsUrl = 'http://localhost:3100/regs'; // URL to web api regs
  private convUrl = 'http://localhost:3100/rep'; // URL to web api rep
  constructor(private http: Http) { }

  

  getEngineers(): Promise<Engineer[]> {
    return this.http
      .get(this.engineersUrl)
      .toPromise()
      .then(response => response.json().data as Engineer[])
      .catch(this.handleError);
    // return Promise.resolve(ENGINEERS);
  }

  getWorkspaces(): Promise<Workspace[]> {
    return this.http
      .get(this.WorkspacesUrl)
      .toPromise()
      .then(response => response.json() as Workspace[])
      .catch(this.handleError);
  }

  getRegs(): Promise<Regarray[]> {
    return this.http
      .get(this.regsUrl)
      .toPromise()
      .then(response => {
        console.log(response);
        return response.json() as Regarray[]})
      .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http
      .get(this.usersUrl)
      .toPromise()
      .then(response => {
        console.log(response);
        return response.json() as User[]})
      .catch(this.handleError);
  }

  getUserByName(name: string): Promise<User> {
    return this.getUsers()
      .then(users => {
        console.log(users);
        return users.find(user => user.name === name)
      });
  }

  getConv(file:File,regs:Regarray[]): Promise<File> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('file', JSON.stringify(file));
    params.set('regs', JSON.stringify(regs));
    // console.log(this.convUrl);
    // console.log(params);
    return this.http
      .get(this.convUrl,{ search: params })
      .toPromise()
      .then(response => response.json() as File)
      .catch(this.handleError);
  }

  getSurveys(): Promise<Survey[]> {
    return this.http
      .get(this.surveysUrl)
      .toPromise()
      .then(response => response.json().data as Survey[])
      .catch(this.handleError);
  }

  getWorkspace(id: number): Promise<Workspace> {
    return this.getWorkspaces()
      .then(Workspaces => Workspaces.find(Workspace => Workspace.id === id));
  }

  getSurvey(id: number): Promise<Survey> {
    return this.getSurveys()
      .then(surveys => surveys.find(survey => survey.id === id));
  }



  getWorkspaceByOwner(owner: string): Promise<Workspace[]> {
    return this.getWorkspaces()
      .then(Workspaces => Workspaces.filter(Workspace => Workspace.owner === owner));
  }

  save(Workspace: Workspace): Promise<Workspace> {
    if (Workspace.id) {
      return this.put(Workspace);
    }
    return this.post(Workspace);
  }

  saveSurvey(survey: Survey): Promise<Survey> {
    if (survey.id) {
      return this.putSurvey(survey);
    }
    return this.postSurvey(survey);
  }

  saveEngineer(engineer: Engineer): Promise<Engineer> {
    if (engineer.id) {
      return this.putEngineer(engineer);
    }
    return this.postEngineer(engineer);
  }

  delete(Workspace: Workspace): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.WorkspacesUrl}/${Workspace.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Update existing Workspace
  private put(Workspace: Workspace): Promise<Workspace> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let putworkspaceurl = `${this.WorkspacesUrl}/${Workspace.id}`;

    return this.http
      .put(putworkspaceurl, JSON.stringify(Workspace), { headers: headers })
      .toPromise()
      .then(() => Workspace)
      .catch(this.handleError);
  }

  // Add new Workspace
  private post(Workspace: Workspace): Promise<Workspace> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.WorkspacesUrl, JSON.stringify(Workspace), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Add new Engineer
  private postEngineer(engineer: Engineer): Promise<Engineer> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.engineersUrl, JSON.stringify(engineer), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Add new Survey
  private postSurvey(survey: Survey): Promise<Survey> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.surveysUrl, JSON.stringify(survey), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update Survey
  private putSurvey(survey: Survey): Promise<Survey> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.surveysUrl}/${survey.id}`;

    return this.http
      .put(url, JSON.stringify(survey), { headers: headers })
      .toPromise()
      .then(() => survey)
      .catch(this.handleError);
  }

  // Update existing Workspace
  private putEngineer(engineer: Engineer): Promise<Engineer> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.engineersUrl}/${engineer.id}`;

    return this.http
      .put(url, JSON.stringify(engineer), { headers: headers })
      .toPromise()
      .then(() => engineer)
      .catch(this.handleError);
  }
  


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
