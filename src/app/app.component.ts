import { Component } from '@angular/core';
import { PrayServiceService } from './pray-service.service';
import * as moment from 'moment';
import { Time } from './time';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import Swal from 'sweetalert2';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mosquee';
  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription!: Subscription;
  hide: boolean = true;
  faj: number = 20
  dhoh: number = 10
  asr: number = 10
  magh: number = 5
  ish: number = 10
  mosqueeName: string = 'إسم المسجد'
  hijri!: number
  F: any
  D: any
  A: any
  SalatDouaa: string = "اللهمّ إنّي أستغفرك لكلّ ذنب خطوت إليه برجلي، ومددت إليه يدي أو تأمّلته ببصري، وأصغيت إليه بأذني، أو نطق به لساني، أو أتلفت فيه ما رزقتني ثمّ استرزقتك على عصياني فرزقتني، ثمّ استعنت برزقك على عصيانك فسترته عليّ، وسألتك الزّيادة فلم تحرمني ولا تزال عائدا عليّ بحلمك وإحسانك يا أكرم الأكرمين"
  timetoo:string=''
  M: any
  I: any
  d: any
  H: any
  timeToFajr: any; timeToDhohr: any; timeToAASR: any; timetoMaghr: any; timetoIsha: any; timetoNextSalat: any
  adhan: string = 'اذان صلاة العصر '
  pray: Time = { data: { timings: { Maghrib: "", Fajr: '', Dhuhr: '', Asr: '', Isha: '', Sunrise: '', Sunset: '' }, date: { hijri: { date: '', weekday: { ar: '' }, month: { ar: '' } } } } }

  year: number = 0
  day: number = 0


  constructor(private prayerTimesService: PrayServiceService) {
    this.prayerTimesService.get().subscribe(data => {
      this.pray = data; this.addMosqueeMomentJs(); console.log(this.pray);
    });
    this.addMosqueeMomentJs()
    // Now Time
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    // Change backgrounf after 30 min
    interval(50000).subscribe(x => {
      this.changeBackground()})
     
      // Change backgrounf after 30 min
      interval(30000).subscribe(x => {
        this.changeDoua()})
       
   // Calculation of pray time
    interval(1000).subscribe(x => {
    
      
      let d = new Date()
       // d.setHours(11);
       // d.setMinutes(40);  
      let now_ = moment(d);
      /* let today=new Date()
      let tooday=moment(today) */

      let now_5 = moment(this.pray.data.timings.Fajr, "hh:mm");

      let now_3 = moment(this.pray.data.timings.Dhuhr, "hh:mm");

      let now_2 = moment(this.pray.data.timings.Asr, "hh:mm");

      let now_4 = moment(this.pray.data.timings.Maghrib, "hh:mm");
      let now_1 = moment(this.pray.data.timings.Isha, "hh:mm");
      /* var durationtest=moment.duration(now_.diff(tooday)); */

      //Aasr
      var duration = moment.duration(now_.diff(now_2));
      // var hours = Math.floor(duration.asHours());
      // var mins = Math.floor(duration.asMinutes()) - hours * 60;
      // console.log("hours:" + hours + " mins:" + mins);
      console.log('Aasr', moment.utc(moment.duration(now_2.diff(now_)).as('seconds')).format('HH:mm:ss'));
      this.timeToAASR = (moment.utc(moment.duration(now_2.diff(now_)).as('seconds')))

      //Dhur
      var duration1 = moment.duration(now_.diff(now_3));
     
      
      this.timeToDhohr = (moment.utc(moment.duration(now_3.diff(now_)).as('seconds')))
      
      //Maghrib
      var duration2 = moment.duration(now_.diff(now_4));
      this.timetoMaghr = (moment.utc(moment.duration(now_4.diff(now_)).as('seconds')))
      
      //fajr
      var duration3 = moment.duration(now_.diff(now_5));
      this.timeToFajr = (moment.utc(moment.duration(now_5.diff(now_)).as('seconds')));
      
      //Ishaa
      var duration4 = moment.duration(now_.diff(now_1));
      
      this.timetoIsha = (moment.utc(moment.duration(now_1.diff(now_)).as('seconds')))

console.log('alltime',this.timetoIsha, this.timeToFajr, this.timetoMaghr, this.timeToAASR, this.timeToDhohr);

      this.timetoNextSalat = moment.min(this.timetoIsha, this.timeToFajr, this.timetoMaghr, this.timeToAASR, this.timeToDhohr)
     let times:any=[]
     if(Number(this.timetoIsha._i)>0)
     times.push(this.timetoIsha._i)
     if(Number(this.timeToFajr._i)>0)
     times.push(this.timeToFajr._i)
     if(Number(this.timetoMaghr._i)>0)
     times.push(this.timetoMaghr._i)
     if(Number(this.timeToAASR._i)>0)
     times.push(this.timeToAASR._i)
     if(Number(this.timeToDhohr._i)>0)
     times.push(this.timeToDhohr._i)

     if(Number(this.timeToDhohr._i)<0&&Number(this.timeToFajr._i)<0&&Number(this.timeToAASR._i)<0&&Number(this.timetoMaghr._i)<0&&Number(this.timetoIsha._i)<0)
     times.push(this.timeToFajr._i)
    

     console.log("ttttt",this.timeToDhohr._i);
     this.timetoNextSalat=times[0]
     times.forEach((salat: number) => {
      if(salat<times[0]){
        this.timetoNextSalat=salat
      }
     });
     const formatted = moment.utc(this.timetoNextSalat*1000).format('HH:mm');
     console.log("salat",formatted);
     this.timetoNextSalat=formatted
      var seconds = duration.asSeconds();
      var seconds1 = duration1.asSeconds();
      var seconds2 = duration2.asSeconds();
      var seconds3 = duration3.asSeconds();
      var seconds4 = duration4.asSeconds();

      if (Math.floor(seconds) == -1) {

        let audio = new Audio();
        audio.src = "assets/BEEP.mp3"; audio.load();
        audio.play();
        this.simpleAlert()

        interval(10000000).subscribe(x =>
          
          {
            this.SalatDouaa = "aasr";console.log('azzzzzzzzzzzz');
            this.doua[this.indice2]='aasr'
       });

        console.log("adhan aasr");
      }
      if (Math.floor(seconds1) == -1) {
        console.log(seconds1);


        this.adhan = '  اذان صلاة الظهر  '
        let audio = new Audio();
        audio.src = "assets/BEEP.mp3"; audio.load();
        audio.play();
        this.simpleAlert()
        interval(10000000).subscribe(x =>
          
          {
            this.doua[this.indice2] = "dhohr";
       });

        console.log("adhan dhohr");
      }
      if (Math.floor(seconds2) == -1) {


        this.adhan = ' اذان صلاة المغرب'
        let audio = new Audio();
        audio.src = "assets/BEEP.mp3"; audio.load();
        audio.play();
        this.simpleAlert()

        interval(10000000).subscribe(x =>
          
          {
            this.doua[this.indice2] = "Maghreb";
       });

        console.log("adhan mmaghreb");
      }
      if (Math.floor(seconds3) == -1) {
        this.adhan = 'اذان صلاة الفجر'
        let audio = new Audio();
        audio.src = "assets/BEEP.mp3"; audio.load();
        audio.play();
        this.simpleAlert()
        interval(10000000).subscribe(x =>
          
          {
            this.doua[this.indice2] = "fajr";
       });
        console.log("adhan fajr");
      }
      if (Math.floor(seconds4) == -1) {

        let audio = new Audio();
        audio.src = "assets/BEEP.mp3"; audio.load();
        audio.play();
        this.adhan = 'اذان صلاة العشاء'

        this.simpleAlert()
        interval(10000000).subscribe(x =>
          
          {
            this.doua[this.indice2] = "Isha";console.log('azzzzzzzzzzzz');
       });
        console.log("adhan Isha");
      }

    });


  }
  simpleAlert() {
    let timerInterval: string | number | NodeJS.Timer | undefined
    Swal.fire({
      imageHeight: '800px',
      heightAuto: true,
      title: this.adhan,
      html: '',
      timer: 12000,
      width: '800px',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b: any = Swal.getHtmlContainer()!.querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {

      }
    })
    let audio = new Audio();
    audio.src = "assets/BEEP.mp3"; audio.load();
    audio.play();
  }
  background: string[] = ['bg-image--1', 'bg-image--2', 'bg-image--3', 'bg-image--4', 'bg-image--5'
    , 'bg-image--7', 'bg-image--8', 'bg-image--9', 'bg-image--10', 'bg-image--11', 'bg-image--12', 'bg-image--13'
    , 'bg-image--15', 'bg-image--16', 'bg-image--17'
  ]
  doua: string[] =[
    "{ وَأَنَّ الْمَسَاجِدَ لِلَّهِ فَلَا تَدْعُوا مَعَ اللَّهِ أَحَداً }",
    "{ يَا بَنِي آدَمَ خُذُواْ زِينَتَكُمْ عِندَ كُلِّ مَسْجِدٍ }",
    "{ إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ } ",
    " { أَلَيْسَ اللَّهُ بِكَافٍ عَبْدَهُ ۖ }",
    "  تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ ",
    "  أحب عباد الله إلى الله أحسنهم خلقًا",
    " مَا مِنْ شَيْءٍ أَثْقَلُ فِي الْمِيزَانِ مِنَ حُسْنِ الْخُلُقِ ",
    " سبحان الله وبحمده ,  سبحان الله العظيم ",
    " لاحول ولا قوة إلا بالله ",
    " اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد",
    "{ رَّبِّ زِدْنِي عِلْمًا } ",
    "{ لا إِلَهَ إِلا أَنتَ سُبْحَانَكَ , إِنِّي كُنتُ مِنَ الظَّالِمِينَ }",
    "{ رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ }",
    "{ رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ }",
    " اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي , وَاهْدِنِي, وَعَافِنِي, وَارْزُقْنِي",
    " اللَّهُمَّ إنَّكَ عَفُوٌّ تُحِبُّ العَفْوَ فَاعْفُ عَنِّي ",
    "{ سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ } ",
    "{ رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي } ",
    ];

  indice: number = 0
  indice2:number=0
  getDoua(){
    return this.doua[this.indice2]
  }
  changeDoua() {
    this.indice2++
    if (this.indice2 > this.doua.length) {
      this.indice2 = 0;
    }

  }
  
  getBackground() {
    return this.background[this.indice]
  }
  changeBackground() {
    this.indice++
    if (this.indice > this.background.length) {
      this.indice = 0;
    }

  }
  toggle() {
    if (this.hide === false) {
      this.hide = true
    } else {
      this.hide = false
    }
  }
  addMosqueeMomentJs() {
    this.F = moment(this.pray.data.timings.Fajr, "hh:mm").add(this.faj, 'minutes').format("HH:mm ");
    this.D = moment(this.pray.data.timings.Dhuhr, "hh:mm").add(this.dhoh, 'minutes').format("HH:mm ");
    this.A = moment(this.pray.data.timings.Asr, "hh:mm").add(this.asr, 'minutes').format("HH:mm ");
    this.M = moment(this.pray.data.timings.Maghrib, "hh:mm").add(this.magh, 'minutes').format("HH:mm ");
    this.I = moment(this.pray.data.timings.Isha, "hh:mm").add(this.ish, 'minutes').format("HH:mm ")

  }
  changeHijriDate() {
    console.log(Number(this.pray.data.date.hijri.date.split("-")[0]) + this.hijri);
    console.log("this.pray.data.date.hijri.date", this.pray.data.date.hijri.date);
    console.log("", moment(this.pray.data.date.hijri.date, 'ar-SA').toDate());
    let date = new Date(Number(this.pray.data.date.hijri.date.split("-")[2]), Number(this.pray.data.date.hijri.date.split("-")[1]), Number(this.pray.data.date.hijri.date.split("-")[0]))
    //  console.log("date1",Number(this.pray.data.date.hijri.date.split("-")[0]));
    console.log("date", date);
    //  console.log("date",date);
    this.day = date.getUTCDate();
    this.year = date.getFullYear();
    this.H = moment(date).subtract(1, 'months').add(this.hijri, 'days').format('YYYY-MM-DD')
    console.log(this.H);
    this.pray.data.date.hijri.date = this.H
  }
}
