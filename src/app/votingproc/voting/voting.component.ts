import { Component, OnInit } from '@angular/core';
import { Dovoting } from '../../_models/Dovoting';
import { VotingprocessService } from '../../_services/votingprocess.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  votings: Dovoting[];

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private VotingprocessService: VotingprocessService, private alertify: AlertifyService) {
  }


  ngOnInit() {
    this.loadVoteHeader();
  }

  loadVoteHeader() {
    this.VotingprocessService.getVotingSubList().subscribe((votings: Dovoting[]) => {
      this.votings = votings;
    }, error => {
      this.alertify.error(error);
    });
  }

}
