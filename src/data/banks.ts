import { Bank } from "../domain/types";
import {
  amountRange,
  borrowerTypeAllowed,
  industryAllowed,
  loanTypeAllowed,
  maxRiskLevel,
  minIncome,
  stateAllowed
} from "../domain/constraints";

/**
 * In-memory bank rules.
 * Constraints are composable building blocks.
 * Priority is based on ACTIVE constraint count.
 */
export function getBanks(): Bank[] {
  return [
    {
      name: "First Lama Bank",
      constraints: [
        borrowerTypeAllowed(["consumer"]),
        maxRiskLevel(79)
      ]
    },
    {
      name: "Bank HaPoalLama",
      constraints: [
        loanTypeAllowed(["Student loan"]),
        stateAllowed(["CA"]),
        maxRiskLevel(59)
      ]
    },
    {
      name: "Salt and Pepper",
      constraints: [
        borrowerTypeAllowed(["business"]),
        amountRange(500001, 10000000),
        maxRiskLevel(79)
      ]
    },
    {
      name: "Bank Otzar Halama",
      constraints: [
        industryAllowed(["restaurant"])
      ]
    },
    {
      name: "Lama International Bank",
      constraints: [
        amountRange(1000, 199999)
      ]
    }
  ];
}
