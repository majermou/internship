const assuresRoutes = (app, fs) => {
    const dataPath = './data/assures.json';

    app.get('/:cine', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            let assureObj = JSON.parse(data).find(assure => assure.cine == req.params['cine']);
            let isRegistered = true;
            if (assureObj == undefined) {
                assureObj = {
                    "cine": req.params['cine'],
                    "NumIdentifiant": "0",
                    "NomAssure": "",
                    "PrenomAssure": "",
                    "SitMatrimoniale": "",
                    "AssureBeneficieAF": false,
                    "GenreAssure": "",
                    "DateDerniereCotisation": "01/01/1970",
                    "DateDebPaiementAF": "01/01/1970",
                    "DateFinPaiementAF": "01/01/1970",
                    "NombreEmployes": 0,
                    "TypeIdentifiantConjoint": "",
                    "NumIdentifiantConjoint": "",
                    "NomConjoint": "",
                    "PrenomConjoint": "",
                    "SitMtrimonialeConjoint": "",
                    "ConjointBeneficieAF": false,
                    "DateDerncotisationConjoint": "01/01/1970",
                    "DateDebpaiementConjoint": "01/01/1970",
                    "DateFinpaiementConjoint": "01/01/1970",
                    "NombreEmployeConjoint": 0,

                }
                isRegistered = false;
            }
            res.send({assureObj, isRegistered});
        });
    });
};

module.exports = assuresRoutes;