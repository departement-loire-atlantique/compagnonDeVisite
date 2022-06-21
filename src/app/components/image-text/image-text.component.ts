import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.scss']
})
export class ImageTextComponent  {

  @Input()
  img: string | undefined;

  @Input()
  text: string | undefined;

  constructor() { }


}
