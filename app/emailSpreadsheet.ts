import { db } from '@/lib/db/db';

var users = []

async function getUsers() {
    users = await db.user.findMany()
}

getUsers();

var listOfNames = []

for(let i = 0; i < users.length; i++)
  {
    listOfNames[i] = users[i].email
  }

console.log(listOfNames)