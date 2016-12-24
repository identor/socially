import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import template from './parties-form.component.html';
import style from './parties-form.component.scss';

@Component({
  selector: 'parties-form',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class PartiesFormComponent implements OnInit {
  addForm: FormGroup;
  user: Meteor.User;

  constructor (
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      location: ['', Validators.required],
      public: [false]
    });
  }

  addParty(): void {
    if (!Meteor.userId()) {
      alert('Please login to add a party');
      return;
    }

    if (this.addForm.valid) {
      Parties.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));
      this.addForm.reset();
    }
  }
}
