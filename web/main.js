$(document).ready(function() {
  $.ajax('data/clause-mapping.json').then(function(body, status, res) {
    var container = $('#contract-types');

    Object.keys(body).forEach(function(short) {
      var contractType = body[short];
      var link = $('<a href="#">' + contractType.name + '</a>');
      var div = $('<div></div>');
      div.append(link);
      container.append(div);

      link.click(getClickHandler(contractType));
    });
  });
});

function getClickHandler(contractType) {
  return function() {
    var container = $('#contract-types');
    container.html('');

    container.append('<h2>These clauses are required if applicable:</h2>');
    contractType.ifApplicable.forEach(function(clause) {
      container.append('<div><b>' + clause.number + '</b> can' + (clause.canBeReferenced ? ' ' : ' not ') + ' be included by reference [prescribed by ' + clause.prescribedBy + ']');
    });

    container.append('<h2>These clauses are required:</h2>');
    contractType.required.forEach(function(clause) {
      container.append('<div><b>' + clause.number + '</b> can' + (clause.canBeReferenced ? ' ' : ' not ') + ' be included by reference [prescribed by ' + clause.prescribedBy + ']');
    });

    container.append('<h2>These clauses are optional if applicable:</h2>');
    contractType.optional.forEach(function(clause) {
      container.append('<div><b>' + clause.number + '</b> can' + (clause.canBeReferenced ? ' ' : ' not ') + ' be included by reference [prescribed by ' + clause.prescribedBy + ']');
    });
  };
}
