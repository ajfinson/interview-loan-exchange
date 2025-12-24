# interview-loan-exchange

A TypeScript/Node.js loan platform that matches loan applications with banks based on multiple criteria.

## Overview

This application provides a RESTful API that matches loan applications with suitable banks based on:
- Credit score (35% weight)
- Loan amount (25% weight)
- Annual income (20% weight)
- Loan purpose (10% weight)
- Loan term (10% weight)

## Project Structure

```
lama-loan-exchange/
├─ package.json
├─ tsconfig.json
├─ README.md
└─ src/
   ├─ main.ts                    # Entry point
   ├─ app.ts                      # Express application setup
   ├─ routes/
   │  └─ applicationMatch.ts      # Matching endpoint
   ├─ domain/
   │  ├─ types.ts                 # TypeScript type definitions
   │  ├─ constraints.ts           # Business constraints
   │  └─ matcher.ts               # Matching algorithm
   ├─ data/
   │  └─ banks.ts                 # Bank repository
   └─ utils/
      ├─ errors.ts                # Custom error classes
      └─ validate.ts              # Validation utilities
```

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Running

```bash
# Production mode
npm start

# Development mode
npm run dev
```

## API Endpoints

### Health Check
```
GET /health
```

Returns the health status of the API.

### Match Loan Application
```
POST /api/match
```

Matches a loan application with available banks.

**Request Body:**
```json
{
  "application": {
    "id": "app-001",
    "applicantName": "John Doe",
    "loanAmount": 100000,
    "loanPurpose": "home",
    "creditScore": 720,
    "annualIncome": 85000,
    "employmentStatus": "employed",
    "requestedTerm": 240
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "applicationId": "app-001",
    "matches": [
      {
        "bank": {
          "id": "bank-002",
          "name": "Community Credit Union",
          "minCreditScore": 600,
          "maxCreditScore": 850,
          "minLoanAmount": 5000,
          "maxLoanAmount": 250000,
          "minIncome": 35000,
          "interestRate": 5.2,
          "acceptedPurposes": ["home", "auto", "personal", "debt-consolidation"],
          "maxTermMonths": 240
        },
        "score": 56,
        "reasons": [
          "Credit score within range",
          "Loan amount within range",
          "Income meets minimum requirement",
          "Loan purpose accepted",
          "Requested term within limits"
        ]
      }
    ]
  }
}
```

## Validation Rules

- **Loan Amount**: Between $1,000 and $1,000,000
- **Credit Score**: Between 300 and 850
- **Annual Income**: Between $0 and $10,000,000
- **Term**: Between 12 and 360 months
- **Employment Status**: employed, self-employed, retired, unemployed
- **Loan Purpose**: home, auto, business, personal, education, debt-consolidation

## Matching Algorithm

The matching algorithm evaluates loan applications against bank criteria:

1. **Credit Score** (35%): Applicant's credit score must fall within the bank's accepted range
2. **Loan Amount** (25%): Requested loan amount must be within the bank's lending limits
3. **Income** (20%): Applicant's income must meet the bank's minimum requirement
4. **Loan Purpose** (10%): The loan purpose must be in the bank's accepted purposes list
5. **Term** (10%): Requested term must not exceed the bank's maximum term (shorter terms are preferred)

Banks with a matching score of 50 or higher are returned, sorted by score in descending order.

## Available Banks

The system includes five banks with different lending criteria:
- First National Bank
- Community Credit Union
- Business Capital Bank
- Quick Cash Lenders
- Premier Mortgage Corp

## Technologies Used

- TypeScript
- Node.js
- Express.js
