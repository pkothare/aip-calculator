import * as React from 'react';
import styles from './AipCalculator.module.scss';
import { IAipCalculatorProps } from './IAipCalculatorProps';
import { escape } from '@microsoft/sp-lodash-subset';

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

  public render(): React.ReactElement<IAipCalculatorProps> {
    return (
      <div className={ styles.aipCalculator }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
