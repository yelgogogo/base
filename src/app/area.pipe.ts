import { Pipe, PipeTransform } from '@angular/core';

import { Workspace } from './hero';

@Pipe({ name: 'AreaPipe' })
export class AreaPipe implements PipeTransform {
  transform(all: Workspace[], args: string): any{
  	if  (args==''){return all}
  	if (all==null) {
      return null;
    }
    return all.filter(f => {
    	if(f.RoomAreaName)
    	{ return f.RoomAreaName===args};
    });
  }
}