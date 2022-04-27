import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare const MediaRecorder: any;
declare const navigator: any;

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss']
})
export class Tab2Component implements OnInit {

  text = "";

  public isRecording: boolean = false;
  private chunks: any = [];
  private mediaRecorder: any;

  constructor(public http: HttpClient, private ref: ChangeDetectorRef) {

  }

  public record() {
    this.isRecording = true;
    this.mediaRecorder.start();
  }

  public stop() {
    this.isRecording = false;
    this.mediaRecorder.stop();
  }

  saveAudio(audioBlob: any) {

    const formData = new FormData()

    let audioName;

    formData.append('audio', audioBlob, 'audio')

    this.http.post('https://c54b-93-175-28-10.in.ngrok.io/speech', formData)
    .subscribe(
      (resp: any)=>{
        this.text = resp['text']
        console.log(resp['text'])
        this.ref.detectChanges();
      }
    )
  }

  ngOnInit(): void {
    const onSuccess = (stream: any) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = (e: any) => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        audio.load();
        audio.play();

        this.saveAudio(blob);
      };

      this.mediaRecorder.ondataavailable = (e: any) => this.chunks.push(e.data);
    };

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream: any) {
          onSuccess(stream)
        })
        .catch(function (e: any) {console.log(e) });
    }
    else { console.log("! navigator.mediaDevices.getUserMedia")}
  }
}
