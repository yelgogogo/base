import { Injectable } from '@angular/core';
import { Headers, Http, Response,URLSearchParams } from '@angular/http';
//import {  } from '@angular/http';
// import { InMemoryDataService } from './in-memory-data.service';
import 'rxjs/add/operator/toPromise';

import { Workspace,Engineer,Survey,User,File,Regarray,Good,Cart,Order,Manager } from './hero';
import { HOST } from './mock-data';


@Injectable()
export class HeroService {
  //private workspacesUrl = HOST+'workspaces';  // URL to web api Workspaces
  private workspacesUrl = HOST +'WebServiceEx.asmx/JSON_Get_Room';
  private engineersUrl = HOST+'engineers'; // URL to web api engineers
  private surveysUrl = HOST+'surveys'; // URL to web api engineers
  private usersUrl = HOST+'WebServiceEx.asmx/JSON_CheckPassword'; // URL to web api engineers
  private userbynameUrl = HOST+'WebServiceEx.asmx/JSON_CheckPassword'; // URL to web api engineers
  private regsUrl = HOST+'regs'; // URL to web api regs
  private convUrl = HOST+'rep'; // URL to web api rep
  private downloadUrl = HOST+'download'; // URL to web api rep
  private delconvUrl = HOST+'delconvf';
  private goodsUrl = HOST+'WebServiceEx.asmx/JSON_Get_RoomGoods';
  private ordersUrl = HOST+'WebServiceEx.asmx/JSON_GetRoomOrderList';
  private cartUrl = HOST+'WebServiceEx.asmx/JSON_Add_Orders';
  private managerUrl = HOST+'WebServiceEx.asmx/JSON_GetManagerOverView';
  private giftUrl = HOST+'WebServiceEx.asmx/JSON_Get_PresentGoods';
  private saveUrl = HOST+'WebServiceEx.asmx/JSON_Get_KeepGoods';
  
  constructor(private http: Http) { }

  getCart(wk:Workspace):Promise<Cart> {
    let cartdata= new Cart();
    cartdata.storename='base_cart';
    if(localStorage.getItem('base_cart') ){
      let localdata=JSON.parse(localStorage.getItem('base_cart'));
      if (localdata.RoomCode === wk.RoomCode){
        cartdata = localdata;
      }else{
        cartdata.roomID = wk.ID;
        cartdata.Sum = 0; 
        cartdata.RoomCode = wk.RoomCode; 
        cartdata.RoomOpCode = wk.RoomOpCode;
        cartdata.RoomName = wk.RoomName; 
        cartdata.RoomTypeName = wk.RoomTypeName;   
        cartdata.SubmitOrders = []; 
        cartdata.userNo=JSON.parse(localStorage.getItem('rapper_token')).username;
        cartdata.cardNo='';
        cartdata.isPresent=false;
        cartdata.orderType='落单';
        cartdata.CartDone=true;
      } 
    }else{
        cartdata.roomID = wk.ID;
        cartdata.Sum = 0; 
        cartdata.RoomOpCode = wk.RoomOpCode;
        cartdata.RoomCode = wk.RoomCode; 
        cartdata.RoomName = wk.RoomName; 
        cartdata.RoomTypeName = wk.RoomTypeName;   
        cartdata.SubmitOrders = []; 
        cartdata.userNo=JSON.parse(localStorage.getItem('rapper_token')).username;
        cartdata.cardNo='';
        cartdata.isPresent=false;
        cartdata.orderType='落单';
        cartdata.CartDone=true;
    } 
    let body = JSON.stringify(cartdata);
    localStorage.setItem('base_cart', body);
    return Promise.resolve(cartdata);
  }

  getGiftCart(wk:Workspace):Promise<Cart> {
    let cartdata= new Cart();
    cartdata.storename='base_giftcart';
    if(localStorage.getItem('base_giftcart') ){
      let localdata=JSON.parse(localStorage.getItem('base_giftcart'));
      if (localdata.RoomCode === wk.RoomCode){
        cartdata = localdata;
      }else{
        cartdata.roomID = wk.ID;
        cartdata.Sum = 0; 
        cartdata.RoomCode = wk.RoomCode; 
        cartdata.RoomOpCode = wk.RoomOpCode;
        cartdata.RoomName = wk.RoomName; 
        cartdata.RoomTypeName = wk.RoomTypeName;   
        cartdata.SubmitOrders = []; 
        cartdata.userNo=JSON.parse(localStorage.getItem('rapper_token')).username;
        cartdata.cardNo='';
        cartdata.isPresent=true;
        cartdata.orderType='赠送';
        cartdata.CartDone=true;
      } 
    }else{
        cartdata.roomID = wk.ID;
        cartdata.Sum = 0; 
        cartdata.RoomOpCode = wk.RoomOpCode;
        cartdata.RoomCode = wk.RoomCode; 
        cartdata.RoomName = wk.RoomName; 
        cartdata.RoomTypeName = wk.RoomTypeName;   
        cartdata.SubmitOrders = []; 
        cartdata.userNo=JSON.parse(localStorage.getItem('rapper_token')).username;
        cartdata.cardNo='';
        cartdata.isPresent=true;
        cartdata.orderType='赠送';
        cartdata.CartDone=true;
    } 
    let body = JSON.stringify(cartdata);
    localStorage.setItem(cartdata.storename, body);
    return Promise.resolve(cartdata);
  }

  getEngineers(): Promise<Engineer[]> {
    return this.http
      .get(this.engineersUrl)
      .toPromise()
      .then(response => response.json().data as Engineer[])
      .catch(this.handleError);
    // return Promise.resolve(ENGINEERS);
  }


  getManager(): Promise<Manager[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let postdata = {};

    return this.http
      .post(this.managerUrl, JSON.stringify(postdata), { headers: headers })
      .toPromise()
      .then(response => {
        //console.log("submitCart");
     
        let json=response.json().d;
        // json=json.replace(/Room\:/,'"Room":');
        // json=json.replace(/Orders\:/,'"Orders":');
        //  //console.log(JSON.parse(json));
        return JSON.parse(json);
      })
      .catch(this.handleError);

    // return this.http
    //   .get(this.managerUrl)
    //   .toPromise()
    //   // .then(response => response.json() as Workspace[])
    //    .then(response => {
    //      // //console.log(JSON.parse(response.json().data.d));
    //     return JSON.parse(response.json().data.d) as Manager[];})
    //   .catch(this.handleError);
  }

  submitCart(cart:Cart): Promise<String> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let postdata = {submitMobile:JSON.stringify(cart)};

    return this.http
      .post(this.cartUrl, JSON.stringify(postdata), { headers: headers })
      .toPromise()
      .then(response => {
        //console.log("submitCart");
     
        let json=response.json().d;
        // json=json.replace(/Room\:/,'"Room":');
        // json=json.replace(/Orders\:/,'"Orders":');
        //  //console.log(JSON.parse(json));
        return json;
      })
      .catch(this.handleError);

    // return this.http
    //   .get(this.ordersUrl)
    //   .toPromise()
    //   // .then(response => response.json() as Workspace[])
    //    .then(response => {
    //      // //console.log(JSON.parse(response.json().data.d));
    //     return JSON.parse(response.json().data.d) as Order[];})
    //   .catch(this.handleError);
  }

  getOrders(wk:Workspace): Promise<Order[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let postdata = {roomID:wk.ID,opCode:wk.RoomOpCode};

    return this.http
      .post(this.ordersUrl, JSON.stringify(postdata), { headers: headers })
      .toPromise()
      .then(response => {
        //console.log("getOrders");
     
        let json=response.json().d;
        json=json.replace(/Room\:/,'"Room":');
        json=json.replace(/Orders\:/,'"Orders":');
         //console.log(JSON.parse(json));
        return JSON.parse(json).Orders as Order[];})
      .catch(this.handleError);

    // return this.http
    //   .get(this.ordersUrl)
    //   .toPromise()
    //   // .then(response => response.json() as Workspace[])
    //    .then(response => {
    //      // //console.log(JSON.parse(response.json().data.d));
    //     return JSON.parse(response.json().data.d) as Order[];})
    //   .catch(this.handleError);
  }

  getWorkspaces(): Promise<Workspace[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.workspacesUrl, JSON.stringify(Workspace), { headers: headers })
      .toPromise()
      .then(response => {
      //console.log(response);
        return JSON.parse(response.json().d) as Workspace[];})
      .catch(this.handleError);

    // return this.http
    //   .get(this.workspacesUrl)
    //   .toPromise()
    //   // .then(response => response.json() as Workspace[])
    //    .then(response => {
    //     //console.log(response);
    //     return JSON.parse(response.json().data.d) as Workspace[];})
    //   .catch(this.handleError);
  }

  getGoods(wk:Workspace): Promise<Good[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let postdata = {roomID:wk.ID};
    return this.http
      .post(this.goodsUrl, JSON.stringify(postdata), { headers: headers })
      .toPromise()
      .then(response => {
      // //console.log(response);
        let tmp:Good[] = JSON.parse(response.json().d);
        tmp.forEach(t=>{
          if(t.GoodsDetails){
            t.GoodsDetails.forEach(g=>{if(!g.GroupLimit){g.GroupLimit=g.GroupCount}});
            t.GoodsDetailsDone=false;
          }else{
            t.GoodsDetailsDone=true;
          }
        })
        
        return tmp as Good[];})
      .catch(this.handleError);

    // return this.http
    //   .get(this.goodsUrl)
    //   .toPromise()
    //   // .then(response => response.json() as Workspace[])
    //    .then(response => {
    //      // //console.log(JSON.parse(response.json().data.d));
    //     return JSON.parse(response.json().data.d) as Good[];})
    //   .catch(this.handleError);
  }

  getGift(roomID:string,user:User): Promise<Good[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let postdata = {roomID:roomID,PresentUserNO:user.username};
    return this.http
      .post(this.giftUrl, JSON.stringify(postdata), { headers: headers })
      .toPromise()
      .then(response => {
      // //console.log(response);
        let tmp:Good[] = JSON.parse(response.json().d);
        tmp.forEach(t=>{
          if(t.GoodsDetails){
            t.GoodsDetails.forEach(g=>{if(!g.GroupLimit){g.GroupLimit=g.GroupCount}});
            t.GoodsDetailsDone=false;
          }else{
            t.GoodsDetailsDone=true;
          }
        })
        
        return tmp as Good[];})
      .catch(this.handleError);

    // return this.http
    //   .get(this.goodsUrl)
    //   .toPromise()
    //   // .then(response => response.json() as Workspace[])
    //    .then(response => {
    //      // //console.log(JSON.parse(response.json().data.d));
    //     return JSON.parse(response.json().data.d) as Good[];})
    //   .catch(this.handleError);
  }

  getSave(roomID:string,user:User): Promise<Good[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let postdata = {roomID:roomID};
    return this.http
      .post(this.saveUrl, JSON.stringify(postdata), { headers: headers })
      .toPromise()
      .then(response => {
      // //console.log(response);
        let tmp:Good[] = JSON.parse(response.json().d);
        tmp.forEach(t=>{
          if(t.GoodsDetails){
            t.GoodsDetails.forEach(g=>{if(!g.GroupLimit){g.GroupLimit=g.GroupCount}});
            t.GoodsDetailsDone=false;
          }else{
            t.GoodsDetailsDone=true;
          }
        })
        
        return tmp as Good[];})
      .catch(this.handleError);

    // return this.http
    //   .get(this.goodsUrl)
    //   .toPromise()
    //   // .then(response => response.json() as Workspace[])
    //    .then(response => {
    //      // //console.log(JSON.parse(response.json().data.d));
    //     return JSON.parse(response.json().data.d) as Good[];})
    //   .catch(this.handleError);
  }

  getRegs(user:string): Promise<Regarray[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('user', user);

    return this.http
      .get(this.regsUrl,{ search: params })
      .toPromise()
      .then(response => response.json() as Regarray[])
      .catch(this.handleError);

    // return this.http
    //   .get(this.regsUrl)
    //   .toPromise()
    //   .then(response => {
    //     //console.log(response);
    //     return response.json() as Regarray[]})
    //   .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http
      .get(this.usersUrl)
      .toPromise()
      .then(response => {
        //console.log(response);
        // return response.json() as User[]})
        return response.json().data as User[]})
      .catch(this.handleError);
  }

  postUser(user: User): Promise<User> {
    // let params: URLSearchParams = new URLSearchParams();
    // params.set('user', JSON.stringify(user));
    // //console.log(params);
    // //console.log(user);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.usersUrl, JSON.stringify(user), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
      
    // return this.http
    //   .get(this.userbynameUrl,{ search: params })
    //   .toPromise()
    //   .then(response => response.json() as User)
    //   .catch(this.handleError);
  }

  getUserByName(userin: User): Promise<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let postdata = {username:userin.username,password:userin.password};

    return this.http
      .post(this.userbynameUrl, JSON.stringify(postdata), { headers: headers })
      .toPromise()
      .then(response => {
        //console.log("getUserByName");
     
        let json=response.json().d;
        json=json.replace(/user\:/,'"user":');
        json=json.replace(/rights\:/,'"rights":');
        json=json.replace(/\'/g,'"');
         //console.log(JSON.parse(json));
        return JSON.parse(json);})
      .catch(this.handleError);

    // return this.getUsers()
    //   .then(users => users.find(user => user.name === userin.name));
    // let params: URLSearchParams = new URLSearchParams();
    // params.set('user', JSON.stringify(user));

    // return this.http
    //   .get(this.userbynameUrl,{ search: params })
    //   .toPromise()
    //   .then(response => response.json() as User)
    //   .catch(this.handleError);
  }

  getConv(file:File,regs:Regarray[]): Promise<File> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('file', JSON.stringify(file));
    params.set('regs', JSON.stringify(regs));
    // //console.log(this.convUrl);
    // //console.log(params);
    return this.http
      .get(this.convUrl,{ search: params })
      .toPromise()
      .then(response => response.json() as File)
      .catch(this.handleError);
  }

  getDownload(workspace:Workspace): Promise<Workspace> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('workspace', JSON.stringify(workspace));
    // //console.log(this.convUrl);
    // //console.log(params);
    return this.http
      .get(this.downloadUrl,{ search: params })
      .toPromise()
      .then(response => response.json() as Workspace)
      .catch(this.handleError);
  }

  getSurveys(): Promise<Survey[]> {
    return this.http
      .get(this.surveysUrl)
      .toPromise()
      .then(response => response.json().data as Survey[])
      .catch(this.handleError);
  }

  getRegarray(id: number): Promise<Regarray> {
    return this.getRegs(JSON.parse(localStorage.getItem('rapper_token')).name)
      .then(Workspaces => Workspaces.find(Regarray => Regarray.id === id));
  }

  getWorkspace(id: string): Promise<Workspace> {
    return this.getWorkspaces()
      .then(Workspaces => {
        return Workspaces.find(Workspace => Workspace.ID === id)
      });
  }

  getSurvey(id: number): Promise<Survey> {
    return this.getSurveys()
      .then(surveys => surveys.find(survey => survey.id === id));
  }



  // getWorkspaceByOwner(owner: string): Promise<Workspace[]> {
  //   return this.getWorkspaces()
  //     .then(Workspaces => Workspaces.filter(Workspace => Workspace.owner === owner));
  // }

  save(Workspace: Workspace): Promise<Workspace> {
    if (Workspace.ID) {
      return this.put(Workspace);
    }
    return this.post(Workspace);
  }

  saveRegarray(regarray: Regarray): Promise<Regarray> {
    if (regarray.id) {
      return this.putRegarray(regarray);
    }
    return this.postRegarray(regarray);
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

    let url = `${this.workspacesUrl}/${Workspace.ID}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  deleteReg(Regarray: Regarray): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.regsUrl}/${Regarray.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  deleteConvFile(file: File): Promise<File> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('file', JSON.stringify(file));
    // //console.log(this.convUrl);
    // //console.log(params);
    // return this.http
    //   .get(this.convUrl,{ search: params })
    //   .toPromise()
    //   .then(response => response.json() as File)
    //   .catch(this.handleError);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    let url = this.delconvUrl;

    return this.http
      .delete(url, { search: params })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Update existing Workspace
  private put(Workspace: Workspace): Promise<Workspace> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let putworkspaceurl = `${this.workspacesUrl}/${Workspace.ID}`;

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
      .post(this.workspacesUrl, JSON.stringify(Workspace), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Update existing Regarray
  private putRegarray(Regarray: Regarray): Promise<Regarray> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let putworkspaceurl = `${this.regsUrl}/${Regarray.id}`;

    return this.http
      .put(putworkspaceurl, JSON.stringify(Regarray), { headers: headers })
      .toPromise()
      .then(() => Regarray)
      .catch(this.handleError);
  }

  // Add new Regarray
  private postRegarray(Regarray: Regarray): Promise<Regarray> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.regsUrl, JSON.stringify(Regarray), { headers: headers })
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

  // Update existing Engineer
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
