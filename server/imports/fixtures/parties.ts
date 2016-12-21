import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/models/party.model';

export function loadParties() {
  if (Parties.find().cursor.count() === 0) {
    const parties: Party[] = [{
      name: 'Dubstep-Free Zone',
      description: 'Can we please just for an evening not listen to dubstep.',
      location: 'Palo Alto',
      public: true
    }, {
      name: 'All dubstep all the time',
      description: 'Get it on!',
      location: 'Palo Alto',
      public: true
    }, {
      name: 'Savage lounging',
      description: 'Leisure suit required. And only fiercest manners.',
      location: 'San Francisco',
      public: false
    }];

    parties.forEach((party: Party) => Parties.insert(party));

    for (let i = 0; i < 27; i++) {
      Parties.insert({
        name: Fake.sentence(50),
        location: Fake.sentence(10),
        description: Fake.sentence(100),
        public: true
      });
    }
  }
}
