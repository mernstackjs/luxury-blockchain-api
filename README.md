# luxury-blockchain-api


Detta projekt är en enkel blockchain API byggd med Node.js och Express.

Projektet sparar historik för lyxprodukter, till exempel en klocka.

Varje produkt har ett unikt serienummer.

Exempel:

```text
ROLEX-001
```

Blockchain visar vem som äger produkten och hur ägaren har ändrats.

Exempel:

```text
Rolex → Ahmed
Ahmed → Muna
```

Nu är Muna den senaste ägaren.

## Teknik

Projektet använder:

- Node.js
- Express
- Node.js crypto
- SHA-256
- Proof of Work
- Vitest
- Supertest
- dotenv

## Installera projektet

Installera alla paket:

```bash
npm install
```

## Environment variables

Skapa en `.env` fil:

```env
PORT=3000
POW_DIFFICULTY=1
```

`PORT` är porten för servern.

`POW_DIFFICULTY` bestämmer hur svårt det är att mine ett block.

Exempel:

```text
POW_DIFFICULTY=1
```

Hash måste börja med:

```text
0
```

Om difficulty är:

```text
2
```

måste hash börja med:

```text
00
```

## Starta servern

Development:

```bash
npm run dev
```

Vanlig start:

```bash
npm start
```

Servern kör på:

```text
http://localhost:3000
```

## API

### GET /api/chain

Visar hela blockchain och pending transactions.

```http
GET /api/chain
```

### POST /api/transactions

Skapar en ny transaction.

```http
POST /api/transactions
```

Exempel:

```json
{
  "serialNumber": "ROLEX-001",
  "from": "Rolex",
  "to": "Ahmed"
}
```

Transaction läggs först i:

```text
pendingTransactions
```

Systemet kontrollerar också att rätt person äger produkten.

Om Ahmed äger produkten:

```text
Ahmed → Muna
```

är tillåtet.

Men:

```text
Ali → Muna
```

är inte tillåtet om Ali inte är ägare.

### POST /api/mine

Mine alla pending transactions och skapa ett nytt block.

```http
POST /api/mine
```

Efter mining blir pending transactions tom.

### GET /api/verify/:id

Visar historik och nuvarande ägare för en produkt.

Exempel:

```http
GET /api/verify/ROLEX-001
```

Exempel på svar:

```json
{
  "serialNumber": "ROLEX-001",
  "currentOwner": "Muna",
  "history": [
    {
      "from": "Rolex",
      "to": "Ahmed"
    },
    {
      "from": "Ahmed",
      "to": "Muna"
    }
  ]
}
```

## Blockchain

Varje block innehåller bland annat:

```text
index
timestamp
data
previousHash
nonce
hash
```

`previousHash` kopplar ihop blocken.

Exempel:

```text
Genesis Block
      ↓
Block 1
      ↓
Block 2
```

Om data i ett gammalt block ändras, ändras också hash.

Metoden:

```text
isChainValid()
```

kan kontrollera om blockchain fortfarande är giltig.

## Proof of Work

Projektet använder Proof of Work.

Systemet ändrar `nonce` tills hash börjar med rätt antal nollor.

Exempel med difficulty 2:

```text
00abc123...
```

## Validation

Systemet kontrollerar transaction innan den accepteras.

Exempel på fel:

```text
Missing transaction data
Invalid transaction data
Sender is not the current owner
Sender and receiver cannot be the same
```

API använder olika HTTP status codes:

```text
201 = Created
400 = Bad Request
404 = Not Found
422 = Unprocessable Entity
500 = Internal Server Error
```

## Struktur

Projektet är uppdelat i flera delar:

```text
src/
├── controllers/
├── engine/
├── middleware/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
```

`engine` innehåller blockchain-logiken.

`routes` innehåller API routes.

`controllers` tar emot requests och skickar responses.

`services` innehåller blockchain-instansen.

`middleware` hanterar errors.

`utils` innehåller hjälpfunktioner.

## Tester

Projektet använder Vitest och Supertest.

Kör tester:

```bash
npm test
```

Tester finns för:

- Block
- Hash
- Mining
- Blockchain
- Transactions
- Ownership validation
- Chain validation
- API endpoints
- Error handling

## Syfte

Syftet med projektet är att förstå hur en enkel blockchain fungerar tillsammans med en Node.js API.

Projektet visar bland annat:

- block
- hash
- Proof of Work
- transactions
- ownership
- validation
- API
- error handling
- testing