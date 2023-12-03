const express = require('express');
const router = express.Router();

app.get('/account', (request, response) => {
  account.getAll((err, dbResult) => {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

app.get('/:id', function (request, response) {
  account.getById(request.params.id, function (err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult[0]);
    }
  });
});


app.post('/',
  function (request, response) {
    account.add(request.body, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  });


app.delete('/:id',
  function (request, response) {
    account.delete(request.params.id, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult.affectedRows);
      }
    });
  });


app.put('/:id',
  function (request, response) {
    account.update(request.params.id, request.body, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  });
  
module.exports = app;