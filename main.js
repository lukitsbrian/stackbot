var stackexchange = require('stackexchange');

var options = { version: 2.2 };
var context = new stackexchange(options);

var tags = [
    // "cosmos",
    // "cosmos-sdk",
    // "cosmossdk",
    "tendermint",
    // "cosmoshub",
    // "starport",
];

var filter = {
//   key: 'YOUR_API_KEY',
  pagesize: 50,
  site: 'stackoverflow',
  tagged: tags,
  sort: 'activity',
  order: 'desc',
};

// TODO: filter?
var other_related_tags = [
    "blockchain"
];

var unrelated_tags = [
    "azure", // or, anything with `azure` in the name
    "c#",
    "azure-cosmosdb",
    "azure-cosmosdb-sqlapi",
    ".net",
    "xamarin",
    "sql",
    "nosql",
    "operating-system",
    "cosmosdb"
];

// Get all the questions (http://api.stackexchange.com/docs/questions)
context.questions.questions(filter, function(err, results){
  if (err) throw err;
  
  // first option is to pass through all questions, moderate in sqs queue
  // second option is to filter using unrelated tags, and still moderate in sqs queue

  console.log(results.items);
  results.items.forEach(item => {
    item.tags.forEach(tag => {
        if (unrelated_tags.indexOf(tag) > -1) {
             results.items[tag];
        }
    })
  });
  console.log(results.items);
  
  console.log(results.has_more);
});
