import { Component, OnInit } from '@angular/core';
declare const window: any;
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss']
})
export class Tab3Component implements OnInit {

  video: any
  canvas: any
  image: any

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, ) { }

  ngOnInit(): void {}

  
  async start_camera(){
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    this.video = document.getElementById('video') as HTMLVideoElement;
 
    this.video.srcObject = stream;
  };
  
  create_photo() {
    this.canvas =  document.getElementById('canvas') as HTMLCanvasElement
    this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    let image_data_url = this.canvas.toDataURL('image/jpeg').split(';base64,')[1];

    // this.image = this.canvas.toDataURL('image/jpeg').split(';base64,')[1]
    console.log(this.canvas.toDataURL('image/jpeg'));

    // let b64 = 'data:image/jpeg;base64,' + image_data_url;

    let file = this.b64toBlob(image_data_url);
    

    // this.saveImage(file)
    return 

    console.log(image_data_url);
  }

  b64toBlob(b64Data: any) {

    const bstr = atob(b64Data);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return u8arr

    // const file: File = new File([u8arr], "file", { type: 'img/pmg' })
    // console.log(file);
    // return file
  }

  saveImage(audioBlob: any) {

    const formData = new FormData()
    formData.append('image', audioBlob)

    let mem = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + audioBlob)
    this.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + audioBlob)

    console.log(mem)

    // this.http.post('https://c54b-93-175-28-10.in.ngrok.io/image', formData)
    // .subscribe(
    //   (resp: any)=>{
    //     console.log(resp['image'])
    //     this.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + resp['image'])
    //     // this.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + resp['image'])
    //     // this.ref.detectChanges();
    // })
  }

}
