const arr = [{
    id: 1,
    content: {
      name: 'Quan',
      age: 19
    }
  },
  {
    id: 2,
    content: {
      name: 'Khoa',
      age: 13
    }
  },
  {
    id: 3,
    content: {
      name: 'Nam',
      age: 30
    }
  }
]

function findValue(array) {
  return array.id == 3;
}
console.log(arr.findIndex(findValue));
// arr.splice((arr.findIndex(findValue)), 1)
console.log(arr);

// const {
//   v5: uuid,
//   v4: uuidv4
// } = require('uuid')
// console.log(uuid(uuidv4(), '6ba7b811-9dad-11d1-80b4-00c04fd430c8'));
// console.log(uuid(uuidv4(), '6ba7b811-9dad-11d1-80b4-00c04fd430c8'));
// console.log(uuid('Vãi lồn', '6ba7b811-9dad-11d1-80b4-00c04fd430c8'));
// let str = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
// console.log(str.split('-').join(''));
// console.log('https://www.w3.org/', uuid.URL);

// arr[0]['id'] = 5

// console.log(arr);