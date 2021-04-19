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
