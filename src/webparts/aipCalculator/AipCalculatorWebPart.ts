import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AipCalculatorWebPartStrings';
import AipCalculator from './components/AipCalculator';
import { IAipCalculatorProps } from './components/IAipCalculatorProps';
import RoleDropdownOption from './RoleDropdownOption';
import AipDropdownOption from './AipDropdownOption';
import IndividualPerformanceBandDropdownOption from './IndividualPerformanceBandDropdownOption';
import CompanyPerformanceBandDropdownOption from './CompanyPerformanceBandDropdownOption';

export interface IAipCalculatorWebPartProps {
  description: string;
  roles: string;
  individualPerformanceBands: string;
  companyPerformanceBands: string;
}

export default class AipCalculatorWebPart extends BaseClientSideWebPart<IAipCalculatorWebPartProps> {

  private createDropDownOptions<T extends AipDropdownOption>(
    ctor: new (datatText: string) => T,
    propertyValue: string): T[] {
      let dropDownOptions = new Array<T>();
      if(!propertyValue) return dropDownOptions;
      const dataTextCollection = propertyValue.split('\n');
      for (var i = 0; i < dataTextCollection.length; i++) {
        dropDownOptions.push(new ctor(dataTextCollection[i]));
      }
      return dropDownOptions;
  }

  public render(): void {
    const element: React.ReactElement<IAipCalculatorProps> = React.createElement(
      AipCalculator,
      {
        description: this.properties.description,
        roles: this.createDropDownOptions(RoleDropdownOption, this.properties.roles),
        individualPerformanceBands: this.createDropDownOptions(IndividualPerformanceBandDropdownOption, this.properties.individualPerformanceBands),
        companyPerformanceBands: this.createDropDownOptions(CompanyPerformanceBandDropdownOption, this.properties.companyPerformanceBands),
      }
    );
    
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('roles', {
                  label: strings.RolesFieldLabel,
                  description: strings.RolesFieldDescription,
                  multiline: true,
                  resizable: false,
                  rows: 10
                }),
                PropertyPaneTextField('individualPerformanceBands', {
                  label: strings.IndividualPerformanceBandsFieldLabel,
                  description: strings.IndividualPerformanceBandsFieldDescription,
                  multiline: true,
                  resizable: false,
                  rows: 10
                }),
                PropertyPaneTextField('companyPerformanceBands', {
                  label: strings.CompanyPerformanceBandsFieldLabel,
                  description: strings.CompanyPerformanceBandsFieldDescription,
                  multiline: true,
                  resizable: false,
                  rows: 10
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
