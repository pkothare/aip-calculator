import CompanyPerformanceBandDropdownOption from "../CompanyPerformanceBandDropdownOption";
import IndividualPerformanceBandDropdownOption from "../IndividualPerformanceBandDropdownOption";
import RoleDropdownOption from "../RoleDropdownOption";

export interface IAipCalculatorProps {
  description: string;
  roles: RoleDropdownOption[];
  individualPerformanceBands: IndividualPerformanceBandDropdownOption[];
  companyPerformanceBands: CompanyPerformanceBandDropdownOption[];
}
