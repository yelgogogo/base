export class Regarray{
  id:number;
  name:string;
  owner:string;
  description:string;
  enable:boolean;
  regScope : string;
  regScopeAttr : any;
  findArray:any[];
  createTime:string;
  updateTime:string;
}
export class findReg {
  regFind : string;
  regFindAttr : any;
  regReplace : string;
}
export class File {
  // id: number;
  encoding:string;
  enable:boolean;
  filename:string;
  path:string;
  convFlag:boolean;
  convPath:string;
  createTime:string;
  updateTime:string;
}

export class Workspace {
  id: number;
  name:string;
  owner:string;
  path:string;
  zippath:string;
  description:string;
  createTime:string;
  files:any[];
  regs:any[];
}
export class User {
  id: number;
  name: string;
  password: string;
  email:string;
  city: string;
  building: string;
  status: string;
}

export class Engineer {
  id: number;
  name: string;
  password: string;
  email:string;
  city: string;
  building: string;
  status: string;
}

export class Survey {
  id: number;
  title:string;
  categoryid:number;
  category:string;
  area:string;
  subarea:string;
  status:string;
  statuscode:number;
  q1: number;
  q1txt:string;
  a1: number;
  q2: number;
  q2txt:string;
  a2: number;
  q3: number;
  q3txt:string;
  a3: number;
}
