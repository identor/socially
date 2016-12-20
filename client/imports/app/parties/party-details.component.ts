import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import 'rxjs/add/operator/map';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import template from './party-details.component.html';

@Component({
  selector: 'party-details',
  template
})
export class PartyDetailsComponent implements OnInit {
  partyId: string;
  paramsSub: Subscription;
  party: Party;

  constructor (
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['partyId'])
      .subscribe(partyId => {
        this.partyId = partyId
        this.party = Parties.findOne(this.partyId);
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  saveParty() {
    let { name, description, location } = this.party;
    Parties.update(this.party._id, {
      $set: { name, description, location }
    });
  }
}
