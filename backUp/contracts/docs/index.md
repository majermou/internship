# Solidity API

## Oracle

### oracle1

```solidity
address oracle1
```

### oracle2

```solidity
address oracle2
```

### principalAffiliate

```solidity
string principalAffiliate
```

### emptyStr

```solidity
string emptyStr
```

### bankA

```solidity
string bankA
```

### bankB

```solidity
string bankB
```

### dead

```solidity
string dead
```

### Employee

```solidity
struct Employee {
  string nom;
  uint256 dateNaissance;
  string situationEmploye;
  bool BeneficieAC;
}
```

### Response

```solidity
struct Response {
  string NumIdentifiant;
  string NomAssure;
  string PrenomAssure;
  string SitMatrimoniale;
  string GenreAssure;
  string StatusDeVie;
  bool AssureBeneficieAFBankA;
  uint256 DateDerniereCotisationBankA;
  uint256 DateDebPaiementAFBankA;
  uint256 DateFinPaiementAFBankA;
  uint256 NombreEmployesBankA;
  bool AssureBeneficieAFBankB;
  uint256 DateDerniereCotisationBankB;
  uint256 DateDebPaiementAFBankB;
  uint256 DateFinPaiementAFBankB;
  uint256 NombreEmployesBankB;
  string TypeIdentifiantConjoint;
  string NumIdentifiantConjoint;
  string NomConjoint;
  string PrenomConjoint;
  string SitMtrimonialeConjoint;
  string StatusDeVieConjoint;
  bool ConjointBeneficieAFBankA;
  uint256 DateDerncotisationConjointBankA;
  uint256 DateDebpaiementConjointBankA;
  uint256 DateFinpaiementConjointBankA;
  uint256 NombreEmployeConjointBankA;
  bool ConjointBeneficieAFBankB;
  uint256 DateDerncotisationConjointBankB;
  uint256 DateDebpaiementConjointBankB;
  uint256 DateFinpaiementConjointBankB;
  uint256 NombreEmployeConjointBankB;
}
```

### responses

```solidity
mapping(string => struct Oracle.Response) responses
```

### employeesListBankA

```solidity
mapping(string => struct Oracle.Employee[]) employeesListBankA
```

### employeesListBankB

```solidity
mapping(string => struct Oracle.Employee[]) employeesListBankB
```

### newRequest

```solidity
event newRequest(string cine)
```

### responseByOracle1

```solidity
event responseByOracle1(string cine)
```

### responseByOracle2

```solidity
event responseByOracle2(string cine)
```

### Warning

```solidity
event Warning(string msg)
```

### createRequest

```solidity
function createRequest(string _cine) public
```

### updateRequest

```solidity
function updateRequest(string _cine, struct Oracle.Response _resp) public
```

### dernierRegime

```solidity
function dernierRegime(string _cine) public view returns (string)
```

### allocationAC

```solidity
function allocationAC(string _cine) public returns (bool isEligible, string responsibleRegime)
```

### getInsuredData

```solidity
function getInsuredData(string _cine) public view returns (struct Oracle.Response)
```

### getInsuredEmployees

```solidity
function getInsuredEmployees(string _cine) public view returns (struct Oracle.Employee[] employeesListFromBankA, struct Oracle.Employee[] employeesListFromBankB)
```

## Utils

### isRecentDate

```solidity
function isRecentDate(uint256 firstDate, uint256 secondDate) public pure returns (bool)
```

### isEqual

```solidity
function isEqual(string firstStr, string secondStr) public pure returns (bool)
```

