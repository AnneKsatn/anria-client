import { Component, OnInit } from '@angular/core';
declare const RTCPeerConnection: any;
declare const MediaRecorder: any;
declare const navigator: any;
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component implements OnInit {

  // peer connection
  // idFromControl: any = 0
  email: any = 0

  pc: any = null;

  // data channel
  dc: any = null
  dcInterval = null

  createPeerConnection() {

    var config = {
      sdpSemantics: 'unified-plan',
      iceServers: [{urls: ['stun:stun.l.google.com:19302']}]
    };

    this.pc = new RTCPeerConnection(config);

    // connect audio / video
    this.pc.addEventListener('track', function (evt: any) {
      if (evt.track.kind == 'video') {
        var element = document.getElementById('video') as HTMLVideoElement;
        element.srcObject = evt.streams[0];
      }
      else {
        var elementAudio = document.getElementById('audio') as HTMLAudioElement;
        elementAudio.srcObject = evt.streams[0];
      }
    });

    return this.pc;
  }

  negotiate() {

    let qeq: any = this
    return this.pc.createOffer().then(function (offer: any) {
      return qeq.pc.setLocalDescription(offer);
    }).then(function () {

      // wait for ICE gathering to complete
      return new Promise((resolve: any) => {
        if (qeq.pc.iceGatheringState === 'complete') {
          resolve();
        } else {
          function checkState() {
            if (qeq.pc.iceGatheringState === 'complete') {
              qeq.pc.removeEventListener('icegatheringstatechange', checkState);
              resolve();
            }
          }
          qeq.pc.addEventListener('icegatheringstatechange', checkState);
        }
      });
    }).then(function () {
      var offer = qeq.pc.localDescription;
      var codec;

      codec = 'default'

      // document.getElementById('offer-sdp').textContent = offer.sdp;

      // return fetch('http://192.168.1.91:8000/offer_cv', {
      return fetch('http://127.0.0.1:8000/offer_cv', {
        body: JSON.stringify({
          sdp: offer.sdp,
          type: offer.type,
          video_transform: "none",
          id: qeq.email
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        // mode: 'no-cors'
      });
    }).then(function (response: any) {
      return response.json();
    }).then(function (answer: any) {
      // document.getElementById('answer-sdp').textContent = answer.sdp;
      return qeq.pc.setRemoteDescription(answer);
    }).catch(function (e: any) {
      alert(e);
    });
  }

  start() {
    // document.getElementById('start').style.display = 'none';

    this.pc = this.createPeerConnection();
    console.log("Createt Peer Connection", this.pc)
    var time_start: any = null;

    function current_stamp() {
      if (time_start === null) {
        time_start = new Date().getTime();
        return 0;
      } else {
        return new Date().getTime() - time_start;
      }
    }

    var constraints: any = {
      audio: true,
      video: {
        // facingMode: { exact: "environment" }
      }
    };

    if (constraints.audio || constraints.video) {
      // if (constraints.video) {
      //   document.getElementById('media').style.display = 'block';
      // }

      console.log(this.pc)
      console.log("this.pc")

      // let pc2 = this.pc

      const onSuccess = (stream: any) => {
        console.log(this)
        let qeq = this
        stream.getTracks().forEach(function (track: any) {
          qeq.pc.addTrack(track, stream);
        });
        return this.negotiate();
      };

      // navigator.mediaDevices.getUserMedia = (
      //   navigator.mediaDevices.getUserMedia ||
      //   navigator.mediaDevices.webkitGetUserMedia ||
      //   navigator.mediaDevices.mozGetUserMedia ||
      //   navigator.mediaDevices.msGetUserMedia);

      // navigator.mediaDevices.getUserMedia({ audio: true, video: true }, onSuccess, (e: any) => console.log(e));

      let qeq = this
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream: any) {
        console.log(qeq)
        stream.getTracks().forEach(function (track: any) {
          qeq.pc.addTrack(track, stream);
        });
        return qeq.negotiate();
      }, function (err: any) {
        console.log("failed to getUserMedia", err)
        alert(err)
      });

    } else {
      this.negotiate();
    }

    // document.getElementById('stop').style.display = 'inline-block';
  }

  stop() {
    // document.getElementById('stop').style.display = 'none';
    // document.getElementById('start').style.display = 'inline-block';
    // close data channel
    if (this.dc) {
      this.dc.close();
    }

    // close transceivers
    if (this.pc.getTransceivers) {
      this.pc.getTransceivers().forEach(function (transceiver: any) {
        if (transceiver.stop) {
          transceiver.stop();
        }
      });
    }

    // close local audio / video
    this.pc.getSenders().forEach(function (sender: any) {
      sender.track.stop();
    });

    // close peer connection

    let qeq = this
    setTimeout(function () {
      qeq.pc.close();
    }, 500);
  }

  sdpFilterCodec(kind: any, codec: any, realSdp: any) {
    var allowed = []
    var rtxRegex = new RegExp('a=fmtp:(\\d+) apt=(\\d+)\r$');
    var codecRegex = new RegExp('a=rtpmap:([0-9]+) ' + this.escapeRegExp(codec))
    var videoRegex = new RegExp('(m=' + kind + ' .*?)( ([0-9]+))*\\s*$')

    var lines = realSdp.split('\n');

    var isKind = false;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('m=' + kind + ' ')) {
        isKind = true;
      } else if (lines[i].startsWith('m=')) {
        isKind = false;
      }

      if (isKind) {
        var match = lines[i].match(codecRegex);
        if (match) {
          allowed.push(parseInt(match[1]));
        }

        match = lines[i].match(rtxRegex);
        if (match && allowed.includes(parseInt(match[2]))) {
          allowed.push(parseInt(match[1]));
        }
      }
    }

    var skipRegex = 'a=(fmtp|rtcp-fb|rtpmap):([0-9]+)';
    var sdp = '';

    isKind = false;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('m=' + kind + ' ')) {
        isKind = true;
      } else if (lines[i].startsWith('m=')) {
        isKind = false;
      }

      if (isKind) {
        var skipMatch = lines[i].match(skipRegex);
        if (skipMatch && !allowed.includes(parseInt(skipMatch[2]))) {
          continue;
        } else if (lines[i].match(videoRegex)) {
          console.log("lines[i]")
          console.log(lines[i])
          sdp += lines[i].replace(videoRegex, '$1 ' + allowed.join(' ')) + '\n';
        } else {
          sdp += lines[i] + '\n';
        }
      } else {
        sdp += lines[i] + '\n';
      }
    }

    return sdp;
  }

  escapeRegExp(string: any) {
    console.log("here")
    console.log(string)
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }


  constructor() { 

  }

  ngOnInit(): void {
  }

}
