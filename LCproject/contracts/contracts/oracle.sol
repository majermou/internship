// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

import "./utils.sol";

contract Oracle is Utils {

    address oracle1 = 0x466d9994e17352c719359CF58C52ACCB46f447Ff; // Hardhat default accounts 
    address oracle2 = 0x7b97eB7f51F73fC22BA8D6d1c879869E26ff9Ad2;
    string  principalAffiliate = "M";
    string  emptyStr = "";
    string  bankA = "BankA";
    string  bankB = "BankB";
    string  dead = "D";

    struct Employee {
        string      nom; // Nom et prénom de l'employé
        uint        dateNaissance; // Date de naissance
        string      situationEmploye; // Situation de l'employé
        bool        BeneficieAC; // Bénéficié des AC
    }

    struct Response {

        // General infos of the Assuré
        string  NumIdentifiant;
        string  NomAssure;
        string  PrenomAssure;
        string  SitMatrimoniale;
        string  GenreAssure;
        string  StatusDeVie; // la situation de vie de l'assuré

        // Assuré data from bankA
        bool    AssureBeneficieAFBankA;
        uint    DateDerniereCotisationBankA;
        uint    DateDebPaiementAFBankA;
        uint    DateFinPaiementAFBankA;
        uint    NombreEmployesBankA;

        // Assuré data from bankB
        bool    AssureBeneficieAFBankB;
        uint    DateDerniereCotisationBankB;
        uint    DateDebPaiementAFBankB;
        uint    DateFinPaiementAFBankB;
        uint    NombreEmployesBankB;

        // General infos of the Assuré Partner
        string  TypeIdentifiantConjoint;
        string  NumIdentifiantConjoint;
        string  NomConjoint;
        string  PrenomConjoint;
        string  SitMtrimonialeConjoint;
        string  StatusDeVieConjoint;

        // Assuré Partner data from bankA
        bool    ConjointBeneficieAFBankA;
        uint    DateDerncotisationConjointBankA;
        uint    DateDebpaiementConjointBankA;
        uint    DateFinpaiementConjointBankA;
        uint    NombreEmployeConjointBankA;

        // Assuré Partner data from bankB
        bool    ConjointBeneficieAFBankB;
        uint    DateDerncotisationConjointBankB;
        uint    DateDebpaiementConjointBankB;
        uint    DateFinpaiementConjointBankB;
        uint    NombreEmployeConjointBankB;

    }

    mapping(string => Response) responses; // CINE vers l'assuré qui le represente
    mapping(string => Employee[]) employeesListBankA; // Les employés de l'assuré chez bankA
    mapping(string => Employee[]) employeesListBankB; // // Les employés de l'assuré chez bankB

    event newRequest (string cine);
    event responseByOracle1 (string cine);
    event responseByOracle2 (string cine);

    // Function that alerts the oracles to update the storage data of the insured defined by CINE
    function createRequest(string memory _cine) public {
        emit newRequest (
            _cine
        );
    }

    // This function is called by oracles and updates the storage data of the insured defined by CINE
    function updateRequest(string memory _cine, Response memory _resp) public {
        Response storage response = responses[_cine];

        if (msg.sender == oracle1) {
            if (_resp.AssureBeneficieAFBankA) {
                response.NumIdentifiant = _resp.NumIdentifiant;
                response.NomAssure = _resp.NomAssure;
                response.PrenomAssure = _resp.PrenomAssure;
                response.SitMatrimoniale = _resp.SitMatrimoniale;
                response.GenreAssure = _resp.GenreAssure;
                response.StatusDeVie = _resp.StatusDeVie;
                response.AssureBeneficieAFBankA = _resp.AssureBeneficieAFBankA;
                response.DateDerniereCotisationBankA = _resp.DateDerniereCotisationBankA;
                response.DateDebPaiementAFBankA = _resp.DateDebPaiementAFBankA;
                response.DateFinPaiementAFBankA = _resp.DateFinPaiementAFBankA;
                response.NombreEmployesBankA = _resp.NombreEmployesBankA;
                response.ConjointBeneficieAFBankA = _resp.ConjointBeneficieAFBankA;
                response.DateDerncotisationConjointBankA = _resp.DateDerncotisationConjointBankA;
                response.DateDebpaiementConjointBankA = _resp.DateDebpaiementConjointBankA;
                response.DateFinpaiementConjointBankA = _resp.DateFinpaiementConjointBankA;
                response.NombreEmployeConjointBankA = _resp.NombreEmployeConjointBankA;
            }

            emit responseByOracle1(
                _cine
            );
        } else if (msg.sender == oracle2) {
            if (_resp.AssureBeneficieAFBankB) {
                response.NumIdentifiantConjoint = _resp.NumIdentifiant;
                response.NomConjoint = _resp.NomAssure;
                response.PrenomConjoint = _resp.PrenomAssure;
                response.SitMtrimonialeConjoint = _resp.SitMatrimoniale;
                response.StatusDeVieConjoint = _resp.StatusDeVie;
                response.AssureBeneficieAFBankB = _resp.AssureBeneficieAFBankB;
                response.DateDerniereCotisationBankB = _resp.DateDerniereCotisationBankB;
                response.DateDebPaiementAFBankB = _resp.DateDebPaiementAFBankB;
                response.DateFinPaiementAFBankB = _resp.DateFinPaiementAFBankB;
                response.NombreEmployesBankB = _resp.NombreEmployesBankB;
                response.TypeIdentifiantConjoint = _resp.TypeIdentifiantConjoint;
                response.NumIdentifiantConjoint = _resp.NumIdentifiantConjoint;
                response.NomConjoint = _resp.NomConjoint;
                response.PrenomConjoint = _resp.PrenomConjoint;
                response.SitMtrimonialeConjoint = _resp.SitMtrimonialeConjoint;
                response.StatusDeVieConjoint = _resp.StatusDeVieConjoint;
                response.ConjointBeneficieAFBankB = _resp.ConjointBeneficieAFBankB;
                response.DateDerncotisationConjointBankB = _resp.DateDerncotisationConjointBankB;
                response.DateDebpaiementConjointBankB = _resp.DateDebpaiementConjointBankB;
                response.DateFinpaiementConjointBankB = _resp.DateFinpaiementConjointBankB;
                response.NombreEmployeConjointBankB = _resp.NombreEmployeConjointBankB;
            }
            
            emit responseByOracle2(
                _cine
            );
        }
    }

    // Function to determine the "dernier regime" system who is responsible for paying the insurance
    function dernierRegime(string memory _cine) public view returns(string memory) {
        Response memory assure = responses[_cine]; // Load the insured data from the SC storage

        if (isRecentDate(assure.DateDerniereCotisationBankA, assure.DateDerniereCotisationBankB) && assure.AssureBeneficieAFBankA) {
            return bankA;
        } else if (assure.AssureBeneficieAFBankB) {
            return bankB;
        } else {
            return emptyStr;
        }
    }

    // Function to determine if an insured defined by his CINE is eligible to benefit from the ACs or not & the regime responsible to pay them
    function allocationAC(string memory _cine) public view returns (
        bool isEligible,
        string memory responsibleRegime,
        string memory warning
    ) {
        Response memory assure = responses[_cine]; // Load the insured data from the SC storage

        // Case 1 : assure is AP
        if (isEqual(assure.GenreAssure, principalAffiliate)) {
            // AP is not dead & there's a regime to pay the ACs --> he's eligible
            if (!isEqual(assure.StatusDeVie, dead) && (!isEqual(dernierRegime(_cine), emptyStr) || !isEqual(dernierRegime(assure.TypeIdentifiantConjoint), emptyStr))) {
                isEligible = true;
                responsibleRegime = (!isEqual(dernierRegime(_cine), emptyStr) ? dernierRegime(_cine) : dernierRegime(assure.TypeIdentifiantConjoint)); // AC is paid by AP regime else by AS regime
                // if the AS is getting the AC then there's fraud (AC souldn't be paid twice)
                if (!isEqual(dernierRegime(_cine), emptyStr) && !isEqual(dernierRegime(assure.TypeIdentifiantConjoint), emptyStr)) {
                    warning = "Fraud Detected: AC est doublement servi, Le paiement des AC doit etre suspendu a l'AS";
                }
            } else {  // if AP is dead or there's no regime to pay the ACs --> he's not eligible
                isEligible = false;
            }
        } else {  // Case 2: assure is AS
            // if AP is dead & either the AP or AS is subscribed to an insurance regime
            if (isEqual(assure.StatusDeVieConjoint, dead) && (!isEqual(dernierRegime(_cine), emptyStr) || !isEqual(dernierRegime(assure.TypeIdentifiantConjoint), emptyStr)))
            {
                isEligible = true;
                responsibleRegime = (!isEqual(dernierRegime(_cine), emptyStr) ? dernierRegime(_cine) : dernierRegime(assure.TypeIdentifiantConjoint)); // AC is paid by AS regime else by AP regime
            } else {
                isEligible = false;
                // if the AP is alive & AS is getting the ACs (fraud: ACs shouldn't be paid)
                if (!isEqual(dernierRegime(_cine), emptyStr) && !isEqual(dernierRegime(assure.TypeIdentifiantConjoint), emptyStr)) {
                    warning = "Fraud Detected: AC est doublement servi, Le paiement des AC doit etre suspendu a l'AS";
                }
            }
        }
    }

    // Function to fetch the Insured data
    function getInsuredData(string memory _cine) public view returns(Response memory) {
        return responses[_cine];
    }

    // Function to get the list of employees of the insured (defined by CINE) from BankA & BankB
    function getInsuredEmployees(string memory _cine) public view returns(
        Employee[] memory employeesListFromBankA,
        Employee[] memory employeesListFromBankB
    ) {
        employeesListFromBankA = employeesListBankA[_cine];
        employeesListFromBankB = employeesListBankB[_cine];
    }
}
