import { Component, OnInit, Input } from '@angular/core';
import { Dovoting } from 'src/app/_models/Dovoting';
import { VotingprocessService } from '../../_services/votingprocess.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-singlevote',
  templateUrl: './singlevote.component.html',
  styleUrls: ['./singlevote.component.css']
})
export class SinglevoteComponent implements OnInit {
  model: any = {};
  constructor(private voting: VotingprocessService, private alertify: AlertifyService, private datePipe: DatePipe) { }

  @Input() Dovoting: Dovoting;

  max = 10;
  overStar: number | undefined;
  percent: number;
  // date = new Date();
  // todaysdate: string; // this.datePipe.transform(this.date, 'dd/MM/yyyy');
  // todaysdate2: string;
  // timetocheck: string;
  // RatebuttonDisabled: boolean;

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }



  ngOnInit() {
    // const format = 'dd/MM/yyyy';
    // const format2 = 'HH:mm';
    // const locale = 'en-IN';
    // this.todaysdate = formatDate(this.date, format, locale);
    // this.timetocheck = formatDate(this.date, format2, locale);
    // // this.todaysdate2 = formatDate(this.Dovoting.closedate, format, locale);
    // // console.log(this.todaysdate);
    // console.log(this.Dovoting.closedate);
    // console.log(this.Dovoting.time);
    // console.log(this.timetocheck);
    // if (this.date.getDate() >= this.Dovoting.closedate.getDate() && ) {

    // }


  }

  submitVoting() {
    if (this.Dovoting.prediscussionrate === 5) {
      this.alertify.error('You are not permited to set rate 5');
      return;
    }
    this.model.cardcode = this.Dovoting.cardcode;
    this.model.clgcode = this.Dovoting.clgcode;
    this.model.recontact = this.Dovoting.recontact;
    this.model.closedate = this.Dovoting.closedate;
    this.model.prediscussionrate = this.Dovoting.prediscussionrate;
    this.model.postdiscussionrate = this.Dovoting.postdiscussionrate;
    this.model.prediscussionncommnets = this.Dovoting.prediscussionncommnets;
    this.model.postdiscussioncommnets = this.Dovoting.postdiscussioncommnets;
    this.model.notes = this.Dovoting.notes;
    this.model.userid = localStorage.getItem('userid');

    console.log(this.model);
    this.voting.postSingleVote(this.model).subscribe(() => {
      this.alertify.success('Vote submited succesfull');

    }, error => {
      this.alertify.error(error);
    });

  }

}
