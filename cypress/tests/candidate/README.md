# QA Lead Technical Assessment

## Overview

This document describes the testing strategy, architecture decisions, governance model, and CI/CD integration implemented for the Cypress Real World App as part of the QA Lead assessment.

The goal was to demonstrate an end-to-end quality strategy including:

- Scalable Cypress automation
- API testing aligned with the test pyramid
- CI/CD integration
- Test governance and traceability
- Practical use of AI in QA workflows

---

# Folder Structure

cypress/tests/candidate
├── e2e
│ ├── smoke
│ │ └── login.spec.ts
│ ├── bankAccounts
│ │ └── bank-account.spec.ts
│ └── transactions
│ └── transaction.spec.ts
│
├── api
│ ├── auth.api.spec.ts
│ └── check-auth.api.spec.ts
│
├── support
│ └── commands.ts
│
├── utils
│ └── testData.ts
│
└── README.md


### Rationale

This structure separates concerns clearly:

| Layer | Purpose |
|------|--------|
| e2e | Critical user journeys |
| api | Faster backend validations |
| support | Reusable Cypress commands |
| utils | Test data generation |
| smoke | Fast checks for CI |

This improves maintainability and scalability.

---

# Naming Conventions

| Type | Convention |
|-----|-------------|
| E2E tests | `feature.spec.ts` |
| API tests | `feature.api.spec.ts` |
| Commands | `verbNoun()` |
| Data generators | `featureData()` |

Selectors prioritize:

1. `data-test`
2. semantic elements
3. avoiding fragile CSS selectors

---

# Test Pyramid Strategy

The test suite follows the **test pyramid** principle.

### UI / E2E Tests

Used only for critical user flows:

- Login authentication
- Bank account lifecycle
- Money transfer between users

### API Tests

API tests validate backend behavior faster without UI overhead.

Implemented:

- authentication
- authenticated session validation

This reduces E2E test volume and execution time.

---

# Anti-Flake Strategy

To improve stability the following practices were applied:

- Avoid fixed `cy.wait()` delays
- Use `cy.intercept()` with assertions
- Reusable login sessions with `cy.session()`
- Unique test data generation
- Assertions on backend responses

---

# Implemented Coverage

## E2E Tests

| Test | Coverage |
|----|-----------|
Login | Authentication flow |
Bank Account | Create and delete account |
Transactions | Send payment and validate feed |

## API Tests

| Test | Coverage |
|----|-----------|
Auth API | User authentication |
CheckAuth API | Validate authenticated session |

---

# CI/CD Strategy

Pipeline implemented via **GitHub Actions**.

Location:


.github/workflows/qa.yml


Pipeline stages:

1. Checkout repository
2. Install dependencies
3. Start application
4. Run smoke tests
5. Upload artifacts if failure

Smoke tests run first to provide fast feedback during pull requests.

---

# Test Suites Proposal (Qase Model)

Suggested test organization:

- Smoke
- Authentication
- Bank Accounts
- Transactions
- Regression

---

# Example Test Plan for Release

Release Scope:

- Login
- Bank account management
- Money transfers

Entry Criteria:

- build deployed
- environment available
- test data seeded

Exit Criteria:

- all smoke tests passing
- no critical defects open
- regression suite executed

---

# Manual Test Cases

### TC-001 - Login with valid credentials

**Preconditions:**
- User account exists in the system
- Application is available
- User is logged out

**Steps:**
1. Navigate to the sign in page
2. Enter a valid username
3. Enter the correct password
4. Click the sign in button

**Expected Result:**
- User is successfully authenticated
- User is redirected to the authenticated home page
- Account balance and navigation menu are visible

---

### TC-002 - Login with invalid password

**Preconditions:**
- User account exists in the system
- Application is available
- User is logged out

**Steps:**
1. Navigate to the sign in page
2. Enter a valid username
3. Enter an invalid password
4. Click the sign in button

**Expected Result:**
- Authentication is rejected
- User remains on the sign in page
- Error message is displayed to the user

---

### TC-003 - Create bank account

**Preconditions:**
- User is authenticated
- User has access to the bank accounts area
- Bank account form is available

**Steps:**
1. Navigate to the bank account creation page
2. Enter a valid bank name
3. Enter a valid routing number
4. Enter a valid account number
5. Submit the form

**Expected Result:**
- New bank account is successfully created
- User is redirected or returned to the bank accounts list
- The newly created account is visible in the list

---

### TC-004 - Delete bank account

**Preconditions:**
- User is authenticated
- At least one bank account exists for the user
- Bank accounts list is available

**Steps:**
1. Navigate to the bank accounts page
2. Locate an existing bank account
3. Click the delete action for that account

**Expected Result:**
- Bank account is successfully removed
- Deleted account no longer appears in the bank accounts list

---

### TC-005 - Send payment to another user

**Preconditions:**
- User is authenticated
- At least one recipient user is available
- User has access to create a new transaction

**Steps:**
1. Start a new transaction
2. Select another user as recipient
3. Enter a valid payment amount
4. Enter a payment description
5. Submit the payment

**Expected Result:**
- Payment is successfully created
- Transaction confirmation is displayed
- The new transaction appears in the feed/history

---

### TC-006 - Validate transaction in feed

**Preconditions:**
- User is authenticated
- A transaction has been previously created
- Transaction feed is available

**Steps:**
1. Navigate to the home page or transaction feed
2. Locate the recently created transaction
3. Review displayed transaction details

**Expected Result:**
- Transaction is visible in the feed
- Recipient information is correct
- Amount is correct
- Description/note matches the submitted value

# Traceability Model

Traceability structure:

Feature → Test Case → Bug → Release

Example:

Transactions Feature  
→ TC-005 Send payment  
→ BUG-142 incorrect balance update  
→ Release v1.4

This ensures coverage visibility and release confidence.

---

# AI Applied to QA

### Practical Uses

1. Generate edge cases from pull request diffs
2. Classify test failures automatically
3. Suggest additional test scenarios

### Risks

AI generated tests may lack business context and require human review.

### Metrics to Monitor

- Flaky test rate
- Defect leakage
- Test execution time

---