import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactCalculatorWebPartStrings';
import ReactCalculator from './components/ReactCalculator';
import { IReactCalculatorProps } from './components/IReactCalculatorProps';

export interface IReactCalculatorWebPartProps {
  description: string;
  inputRate: number;
}

export default class ReactCalculatorWebPart extends BaseClientSideWebPart <IReactCalculatorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactCalculatorProps> = React.createElement(
      ReactCalculator,
      {
        description: this.properties.description,
        inputRate: this.properties.inputRate,
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
            description: strings.PropertyPaneDescription,

          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Please Enther a Title'
                }),
                PropertyPaneTextField('inputRate', {
                  label: 'Please Enter a Number for Rate'
                }),
                
              ]
            }
          ]
        }
      ]
    };
  }
}
