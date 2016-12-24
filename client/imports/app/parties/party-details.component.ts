import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import 'rxjs/add/operator/map';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';

import template from './party-details.component.html';

@Component({
  selector: 'party-details',
  template
})
@InjectUser('user')
export class PartyDetailsComponent implements OnInit, CanActivate {
  partyId: string;
  paramsSub: Subscription;
  party: Party;
  partySub: Subscription;
  users: Observable<User>;
  uninvitedSub: Subscription;
  user: Meteor.User;

  constructor (
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['partyId'])
      .subscribe(partyId => {
        this.partyId = partyId;

        if (this.partySub) {
          this.partySub.unsubscribe();
        }

        this.partySub = MeteorObservable.subscribe('party', this.partyId).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.party = Parties.findOne(this.partyId);
            this.getUsers(this.party);
          });
        });
      });

      if (this.uninvitedSub) {
        this.uninvitedSub.unsubscribe();
      }

      this.uninvitedSub = MeteorObservable.subscribe('uninvited', this.partyId).subscribe(() => {
         this.users = Users.find({
           _id: {
             $ne: Meteor.userId()
            }
          }).zone();
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.partySub.unsubscribe();
    this.uninvitedSub.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  saveParty() {
    if (!Meteor.userId()) {
      alert('Please log in to change this party');
      return;
    }

    let { name, description, location } = this.party;
    Parties.update(this.party._id, {
      $set: { name, description, location }
    });
  }

  canActivate() {
    const party = Parties.findOne(this.partyId);
    return (party && party.owner == Meteor.userId());
  }

  invite(user: Meteor.User) {
    MeteorObservable.call('invite', this.party._id, user._id).subscribe(() => {
      alert('User successfully invited.');
    }, (error) => {
      alert(`Failed to invite due to ${error}`);
    });
  }

  getUsers(party: Party) {
    if (party) {
      this.users = Users.find({
        _id: {
          $nin: party.invited || [],
          $ne: Meteor.userId()
        }
      }).zone();
    }
  }

  reply(rsvp: string) {
    MeteorObservable.call('reply', this.party._id, rsvp).subscribe(() => {
      alert('You successfully replied.');
    }, (error) => {
      alert(`Failed to reply due to ${error}`);
    });
  }

  get isOwner(): boolean {
    return this.party && this.user && this.user._id === this.party.owner;
  }

  get isPublic(): boolean {
    return this.party && this.party.public;
  }

  get isInvited(): boolean {
    if (this.party && this.user) {
      const invited = this.party.invited || [];

      return invited.indexOf(this.user._id) !== -1;
    }

    return false;
  }
}
