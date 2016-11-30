const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

request({
    url: 'https://www.acquisition.gov/far/current/html/52_301Matrix.html',
    strictSSL: false
  }, (err, res, body) => {
    if(err) {
      console.log('ERROR:');
      console.log(err);
      return;
    }

    const dom = cheerio.load(body);
    const theClauses = dom('tr[valign=top]', dom('table')[2]);

    const contractTypes = [
      { name: 'Fixed-Price Supply', short: 'FP SUP' },
      { name: 'Cost-Reimbursement Supply', short: 'CR SUP' },
      { name: 'Fixed-Price Research & Development', short: 'FP R&D' },
      { name: 'Cost-Reimbursement Research & Development', short: 'CR R&D' },
      { name: 'Fixed-Price Service', short: 'FP SVC' },
      { name: 'Cost-Reimbursement Service', short: 'CR SVC' },
      { name: 'Fixed-Price Construction', short: 'FP CON' },
      { name: 'Cost-Reimbursement Construction', short: 'CR CON' },
      { name: 'Time & Material/Labor Hours', short: 'T&M LH' },
      { name: 'Leasing of Motor Vehicles', short: 'LMV' },
      { name: 'Communication Services', short: 'COM SVC' },
      { name: 'Dismantling, Demolition, or Removal of Improvements', short: 'DDR' },
      { name: 'Architect-Engineering', short: 'A&E' },
      { name: 'Facilities', short: 'FAC' },
      { name: 'Indefinite Delivery', short: 'IND DEL' },
      { name: 'Transportation', short: 'TRN' },
      { name: 'Simplified Acquisition Procedures', short: 'SAP' },
      { name: 'Utility Services', short: 'UTL SVC' },
      { name: 'Commercial Items', short: 'CI' }
    ];

    const clauseMapping = { };

    contractTypes.forEach(contractType => {
      clauseMapping[contractType.short] = {
        name: contractType.name,
        required: [ ],
        ifApplicable: [ ],
        optional: [ ]
      };
    });

    for(let i = 0; i < theClauses.length; i++) {
      const clauseRow = theClauses[i];
      const columns = dom('td', clauseRow);

      //console.log(clauseRow.html());
      let clauseNumber = dom('a', columns[0]).text().trim();
      if(!clauseNumber) {
        clauseNumber = dom('p.pCellBodyIndent', columns[0]).text().trim();
      }

      const prescribedBy = dom('a', columns[1]).text().trim();
      const provisionOrClause = dom('p.pCellBodyCtr', columns[2]).text().trim() == 'P' ? 'provision' : 'clause';
      const canBeReferenced = dom('p.pCellBodyCtr', columns[3]).text().trim() === 'Yes';

      if(canBeReferenced)
      console.log(clauseNumber);

      const clause = {
        number: clauseNumber,
        prescribedBy,
        provisionOrClause,
        canBeReferenced
      };

      for(let j = 5; j < columns.length; j++) {
        const contractType = contractTypes[j - 5];
        const mapping = clauseMapping[contractType.short];
        const requirement = dom('p.pCellBodyCtr', columns[j]).text().trim();

        if(requirement === 'R') {
          mapping.required.push(clause);
        } else if(requirement === 'A') {
          mapping.ifApplicable.push(clause);
        } else if(requirement === 'O') {
          mapping.optional.push(clause);
        }
      }
    }

    fs.writeFileSync('web/data/clause-mapping.json', JSON.stringify(clauseMapping, null, '  '));
});
