declare interface IAipCalculatorWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  RolesFieldLabel: string;
  RolesFieldDescription: string;
  IndividualPerformanceBandsFieldLabel: string;
  IndividualPerformanceBandsFieldDescription: string;
  CompanyPerformanceBandsFieldLabel: string;
  CompanyPerformanceBandsFieldDescription: string;
}

declare module 'AipCalculatorWebPartStrings' {
  const strings: IAipCalculatorWebPartStrings;
  export = strings;
}
