# interview-loan-exchange
a repo for a interview question of a loan platform
Interview Question – API & Architecture

We are building Lama Loan Exchange, a service that matches loan applicants with potential lenders.

Each loan application includes:

requestedAmount

borrowerType (business / consumer)

loanType

industry (only if borrowerType is business)

state (US states for now, but may expand later)

riskLevel (1 = low risk, 100 = high risk)

currentYearIncome

previousYearIncome

Each bank has its own set of eligibility constraints.

Task:
Design and implement an API endpoint:

POST /applicationmatch


that:

Receives a loan application

Determines which banks are willing to finance the loan

Ranks the banks by priority, where priority is defined as:

The bank with more eligibility constraints (that the application satisfies) is considered a better match

Returns only the names of the top 2 banks, ordered by priority

Example response:

["Bank A", "Bank B"]



How would this design change if data needed to be persisted?

You may use in-memory data structures, and the focus is on clear architecture, clean logic, and tradeoff explanations, not framework knowledge.
