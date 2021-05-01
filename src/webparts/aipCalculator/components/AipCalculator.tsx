import * as React from 'react';
import styles from './AipCalculator.module.scss';
import { IAipCalculatorProps } from './IAipCalculatorProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, Stack, IStackTokens, IStackStyles, IStackItemStyles, DefaultPalette, TextField, ITextFieldStyleProps, ITextFieldStyles, ILabelStyleProps, ILabelStyles, IDropdownOption } from '@fluentui/react';

interface IAipCalculatorState {
  annualSalary: number;
  selectedRolePercentage: number;
  selectedIndividualPerformanceBandPercentage: number;
  selectedCompanyPerformanceBandPercentage: number;
}

export default class AipCalculator extends React.Component<IAipCalculatorProps, IAipCalculatorState> {

  constructor(props: Readonly<IAipCalculatorProps>) {
    super(props);
    this.state = {
      annualSalary: NaN,
      selectedRolePercentage: NaN,
      selectedIndividualPerformanceBandPercentage: NaN,
      selectedCompanyPerformanceBandPercentage: NaN
    };
  }

  private getFinalMessage(state: Readonly<IAipCalculatorState>): string {
    if(isNaN(state.annualSalary)) {
      return "Enter a valid annual salary.";
    }
    else if(isNaN(state.selectedRolePercentage)) {
      return "Pick a valid role.";
    }
    else if(isNaN(state.selectedIndividualPerformanceBandPercentage)) {
      return "Pick a valid individual performance band.";
    }
    else if(isNaN(state.selectedCompanyPerformanceBandPercentage)) {
      return "Pick a valid company performance band.";
    }
    else  {
      let individualComponent = (state.selectedRolePercentage / 2) * state.selectedIndividualPerformanceBandPercentage;
      let corporateComponent = (state.selectedRolePercentage /2) * state.selectedCompanyPerformanceBandPercentage;
      let payout = state.annualSalary * (individualComponent + corporateComponent);
      return `Total payout is ${payout}`;
    }
  }

  private getErrorMessage = (value: string): string => {
    var numericValue = +value;
    if (isNaN(numericValue)) {
      return 'Enter a valid number.';
    }
    else if (numericValue < 0 || numericValue > 3000000) {
      return 'Enter a valid number beteween 0 and 300000.';
    }
    else {
      return '';
    }
  }

  private handleAnnualSalaryChange = (errorMessage: string, value: string) => {
    if (!errorMessage) {
      this.setState({ annualSalary: +value });
    }
    else {
      this.setState({ annualSalary: NaN });
    }
  }

  private handleRoleChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option && !isNaN(option.data)) {
      this.setState({ selectedRolePercentage: (option.data / 100) });
    }
    else {
      this.setState({ selectedRolePercentage: NaN });
    }
  }

  private handleIndividualPerformanceBandChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option && !isNaN(option.data)) {
      this.setState({ selectedIndividualPerformanceBandPercentage: (option.data / 100) });
    }
    else {
      this.setState({ selectedIndividualPerformanceBandPercentage: NaN });
    }
  }

  private handleCompanyPerformanceBandChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option && !isNaN(option.data)) {
      this.setState({ selectedCompanyPerformanceBandPercentage: (option.data / 100) });
    }
    else {
      this.setState({ selectedCompanyPerformanceBandPercentage: NaN });
    }
  }

  public render(): React.ReactElement<IAipCalculatorProps> {

    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.white,
      }
    };

    const stackItemStyles: IStackItemStyles = {
      root: {
        padding: 5
      }
    };

    const itemAlignmentsStackTokens: IStackTokens = {
      childrenGap: 5,
      padding: 10
    };

    const finalMessage = this.getFinalMessage(this.state);

    return (
      <div className={styles.aipCalculator}>
        <Stack styles={stackStyles} tokens={itemAlignmentsStackTokens}>
          <Stack.Item styles={stackItemStyles}>
            <span className={styles.title}>Annual Incentive Plan Calculator</span>
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            {escape(this.props.description)}
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <TextField
              label='Annual Salary'
              placeholder='Enter a dollar amount'
              onGetErrorMessage={this.getErrorMessage}
              onNotifyValidationResult={this.handleAnnualSalaryChange}
              prefix='$'
              type='number'
              min='0'
              max='300000'
              step='0.01'
            />
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <Dropdown
              placeholder="Select a role"
              label="Roles"
              onChange={this.handleRoleChange}
              options={this.props.roles}
            />
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <Dropdown
              placeholder="Select an individual performance band"
              label="Individual Performance Bands"
              onChange={this.handleIndividualPerformanceBandChange}
              options={this.props.individualPerformanceBands}
            />
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <Dropdown
              placeholder="Select a company performance band"
              label="Company Performance Bands"
              onChange={this.handleCompanyPerformanceBandChange}
              options={this.props.companyPerformanceBands}
            />
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            {finalMessage}
          </Stack.Item>
        </Stack>
      </div>
    );
  }
}
