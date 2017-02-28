export class Regarray{
  id:number;
  name:string;
  owner:string;
  description:string;
  enable:boolean;
  share:boolean;
  visable:boolean;
  regScope : string;
  regScopeAttr : any;
  findArray:any[];
  createTime:string;
  updateTime:string;
}
export class Order {
  BackColor:string;
  CanceledUser:string;
  ForeColor:string;
  GoodsCount:number;
  GoodsID:number;
  GoodsName:string;
  GoodsTypeName:string;
  IsCanceled:boolean;
  IsDazhe:boolean;
  IsPresent:boolean;
  MaxDazhe:number;
  OpCode:string;
  OrderDetailID:number;
  OrderID:number;
  OrderSerialNumber:string;
  OrderTime:string;
  PackNo:number;
  PresentUser:string;
  PresentWay:string;
  Price:number;
  ProduceSerialNumber:string;
  ProduceSite:string;
  Remarks:string;
  RoomName:string;
  SendUser:string;
  Status:string;
  SubTotal:number;
  Unit:string;
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

export class GoodType {
  id:number;
  GoodsTypeName:string;
}

export class Good {
  DisplayOrder:number;
  GoodsCount:number;
  GoodsDetails:GoodsDetails[];
  // add for gourp control
  GoodsDetailsDone:boolean;
  //
  GoodsName:string;
  GoodsTypeName:string;
  ID:number;
  IsHot:boolean;
  IsPack:boolean;
  Price:number;
  Remarks:string;
  Sales:number;
  Unit:string;
}

export class GoodsDetails{
  // add for gourp control
  GroupLimit:number;
  //
  GoodsDetailCount:number;
  GoodsNamestring:string;
  GoodsTypeName:string;
  GroupCount:number;

  GroupName:string;
  ID:number;
  IsFixed:boolean;
  PackGoodsID:number;
  Price:number;
  Unit:string;
}

export class Manager{
  ConsumeAmount:number;
  CurrentBill:any[];
  HallOpen:number;
  HallOpenTotal:number;
  HallPosed:number;
  HallTotal:number;
  PosFinallyAmount:number;
  PosedAmount:number;
  PosedHallAmount:number;
  PosedRoomAmount:number;
  PosingAmount:number;
  PresentAmount:number;
  PresentAmountCompany:number;
  PresentAmountEmp:number;
  RoomOpen:number;
  RoomOpenTotal:number;
  RoomPosed:number;
  RoomTotal:number;
  SumDiscountAmount:number;
  SumServiceAmount:number;
}
export class Cart {
  // add for gourp control
  CartDone:boolean;
  //
  storename:string;
  RoomCode:string;
  RoomName:string;
  isPresent:boolean;
  roomID:string;
  userNo:string;
  cardNo:string;
  orderType:string;
  RoomOpCode:string;
  RoomTypeName:string;
  Sum:number;
  SubmitOrders:Good[];

}

export class Workspace {
  ConsumeAmount:string;
  DiscountAmount:string;
  FColor:string;
  GuestCount:number;
  GuestName:string;
  ID:string;
  MinConsume:string;
  OpenRoomDateTime:string;
  PresentAmount:string;
  PriceCase:string;
  ReservationDateTime:string;
  ReservationEmpName:string;
  RoomAreaId:string;
  RoomAreaName:string;
  RoomCode:string;
  RoomColor:string;
  RoomName:string;
  RoomOpCode:string;
  RoomOpenTimes:string;
  RoomStateName:string;
  RoomTypeName:string;
  ServiceAmount:string;
  // id: number;
  cols:number;
  rows:number;
  // color:string;
  // area:string;
  // name:string;
  // owner:string;
  // path:string;
  // zippath:string;
  // description:string;
  // createTime:string;
  // files:any[];
  // regs:any[];
}
export class User {
  id: number;
  user: string;
  username: string;
  password: string;
  rights:string[];
  email:string;
  city: string;
  building: string;
  status: string;
  remember:boolean;
  token:string;
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
