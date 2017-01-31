import { Engineer } from './hero';
// export const ENGINEERS: Engineer[] = [
// {  id: 1,  name: '工程师甲',email:'a@a.com',city:'Beijing',building:'Road A3',status:'working'}, 
// {  id: 2,  name: '工程师乙',email:'a@a.com',city:'Beijing',building:'Road A3',status:'working'},  
// {  id: 3,  name: '工程师丙',email:'a@a.com',city:'Beijing',building:'Road A3',status:'working'},  
// {  id: 4,  name: '工程师丁',email:'a@a.com',city:'Beijing',building:'Road A3',status:'working'}
// ];
export const NODEUPLOAD:string='http://localhost:3100/';
export const REGATTR: any[] = [
{id:2,value:'g',name:'Global'},
{id:2,value:'m',name:'MutipleRow'},
{id:2,value:'i',name:'CaseSensitive'},
{id:1,value:'i',name:'全局'},
{id:1,value:'g',name:'全局'},
{id:1,value:'m',name:'多行'}
];
export const LANGUAGETYPE: any[] = [
{id:1,name:'中文'},
{id:2,name:'English'}
];
export const STATUSTYPE: any[] = [
	{id: 2, statuscode:0, status:'new'},
	{id: 2, statuscode:1, status:'assigned'},
	{id: 2, statuscode:2, status:'processing'},
	{id: 2, statuscode:3, status:'pending'},
	{id: 2, statuscode:4, status:'resolved'},
	{id: 2, statuscode:5, status:'closed'},
	{id: 2, statuscode:6, status:'survey'},
	{id: 2, statuscode:9, status:'cancelled'},
	{id: 1, statuscode: 0, status: '新单子'},
	{id: 1, statuscode: 1, status: '分派'},
	{id: 1, statuscode: 2, status: '处理中'},
	{id: 1, statuscode: 3, status: '等待'},
	{id: 1, statuscode: 4, status: '已解决'},
	{id: 1, statuscode: 5, status: '关闭'},
	{id: 1, statuscode: 6, status: '调查'}, 
	{id: 1, statuscode: 9, status: '取消'}
];

export const CATEGORIES: any[] = [
{id:100,name:'categoryA',areas:[{id:110,name:'areaA',subareas:[{id:111,name:'subareaAA'},{id:112,name:'subareaAB'}]},{id:120,name:'areaB',subareas:[{id:121,name:'subareaBA'},{id:122,name:'subareaBB'}]}]},
{id:200,name:'categoryB',areas:[{id:201,name:'areaA'},{id:202,name:'areaB'}]},
{id:300,name:'categoryC',areas:[{id:301,name:'areaA'},{id:302,name:'areaB'}]},
{id:400,name:'categoryD',areas:[{id:401,name:'areaA'},{id:402,name:'areaB'}]},
{id:500,name:'categoryE',areas:[{id:501,name:'areaA'},{id:502,name:'areaB'}]}
];

