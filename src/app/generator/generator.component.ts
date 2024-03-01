import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  @ViewChild('memeCanvas', { static: false }) myCanvas: any;
  topText: string = '';
  bottomText: string = '';

  fileEvent: any;
  textColor: string = '#000000';
  backgroundColor: string = '#ffffff';
  constructor() { }

  ngOnInit(): void {
  }

  imgPreview(e: any) {

    this.fileEvent = e;

    if (e instanceof Event && e.target instanceof HTMLInputElement && e.target.files && e.target.files.length > 0) {
      let canvas = this.myCanvas.nativeElement;
      let ctx = canvas.getContext('2d')
  
      let render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
  
  
      render.onload = function (event) {
        const img = new Image();
        img.src = event.target?.result as string;
  
        img.onload = function () {
          ctx.drawImage(img, 50, 150, 600, 500)
        }
        console.log(img)
      }
    }

   
  }

  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.imgPreview(this.fileEvent);

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.textColor;
    ctx.font = '50px comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(this.topText, canvas.width / 2, 100);
    ctx.fillText(this.bottomText, canvas.width / 2, 750);
  }

  canvasTextColor($event: ColorEvent) {
    this.textColor = $event.color.hex;
    this.drawText();
  }

  canvasBackgroundColor($event: ColorEvent){
      this.backgroundColor = $event.color.hex;
      this.drawText();
  }



  downloadImg(){
      let canvas = this.myCanvas.nativeElement;

      let image = canvas.toDataURL('image/png');

      let link = document.createElement('a');
      link.download = 'memeImage.png';
      link.href = image;
      link.click();
  }
}
