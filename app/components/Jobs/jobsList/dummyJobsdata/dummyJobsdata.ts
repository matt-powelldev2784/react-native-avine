import { job } from '../../../../../types/Job'

export const dummyJobsdata: job[] = [
  {
    id: '1',
    name: 'John Smith',
    address: '123 Fake Street 123 Fake Street 123 Fake Street 123 Fake Street',
    town: '',
    postcode: 'AB1 2CD',
    cleanType: 'Front',
    price: '£2000',
    time: '1.50',
  },
  {
    id: '2',
    name: 'John Smith',
    address: '123 Fake Street',
    town: 'Aberdeen',
    postcode: 'AB1 2CD',
    cleanType: 'Front',
    price: '£20',
    time: '1.50',
  },
  {
    id: '3',
    name: 'John Smith',
    address: '123 Fake Street',
    town: 'Aberdeen',
    postcode: 'AB1 2CD',
    cleanType: 'Front Back Rear Tiles Cats Dogs',
    price: '£20',
    time: '1.75',
  },
]
