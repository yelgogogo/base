export class InMemoryDataService {
  createDb() {
    
    let regs = [
      {id:1,owner:'Michael',description:'aaa->ReplaceA',enable:true,regScope : 'atest.',regScopeAttr : 'g',regFind : 'aaa',regFindAttr : 'i',regReplace : 'ReplaceA'},
      {id:2,owner:'Michael',description:'bbb->ReplaceB',enable:true,regScope : 'btest..',regScopeAttr : 'g',regFind : 'bbb',regFindAttr : 'i',regReplace : 'ReplaceBB'},
      {id:3,owner:'Michael',description:'ccc->ReplaceC',enable:true,regScope : 'ctest...',regScopeAttr : 'g',regFind : 'ccc',regFindAttr : 'i',regReplace : 'ReplaceCCC'}
    ];
    let files = [
      {id: 1, enable:true, filename:'ASQERA1.rx', path:'uploads\\ASQERA1.rx', convFlag:true,convPath:'test\\ASQERA1.rx',createTime:'',updateTime:''},
      {id: 2, enable:true, filename:'ASQERA2.rx', path:'uploads\\ASQERA2.rx', convFlag:false,convPath:'',createTime:'test\\ASQERA1.rx',updateTime:''}
    ];
    let workspaces = [
      {id: 1,name:'test',owner:'Michael',createTime:'2017-01-01 00:00:00',description:'',files:files,regs:regs},
      {id: 2,name:'test2',owner:'Michael',createTime:'2017-01-02 00:00:00',description:'',files:files,regs:regs}
    ];
    let engineers = [
      {  id: 1,  name: '工程师甲',email:'a@a.com',city:'Beijing',building:'Road A3',status:'working'}, 
      {  id: 2,  name: '工程师乙',email:'a@a.com',city:'Beijing',building:'Road A3',status:'working'},  
      {  id: 3,  name: '工程师丙',email:'a@a.com',city:'Beijing',building:'Road A3',status:'working'},  
      {  id: 4,  name: '工程师丁',email:'a@a.com',city:'Beijing',building:'Road A3',status:'working'}
    ];
    let surveys = [
      { id: 0,title:'',categoryid:0,category:'',  area:'', subarea:'',  status:'',  statuscode:0,  q1: 0,  q1txt:'',  a1: 0,  q2: 0,  q2txt:'',  a2: 0,  q3: 0,  q3txt:'',  a3: 0},
      { id: 14,title:'',categoryid:0,category:'',  area:'', subarea:'',  status:'',  statuscode:0,  q1: 0,  q1txt:'',  a1: 1,  q2: 0,  q2txt:'',  a2: 1,  q3: 0,  q3txt:'',  a3: 1}
    ];
    let users = [
      {id:1,name:'Michael',email:'001@wic.com',city:'Beijing',building:'Road A3',status:'online'},
      {id:2,name:'Michael',email:'002@wic.com',city:'Beijing',building:'Road A3',status:'online'},
      {id:3,name:'Michael',email:'003@wic.com',city:'Beijing',building:'Road A3',status:'online'},
      {id:4,name:'Michael',email:'004@wic.com',city:'Beijing',building:'Road A3',status:'online'},
      {id:5,name:'Michael',email:'005@wic.com',city:'Beijing',building:'Road A3',status:'online'},
      {id:6,name:'Michael',email:'006@wic.com',city:'Beijing',building:'Road A3',status:'online'}
    ];

    return { workspaces,regs,engineers,surveys,users };
  }
}
