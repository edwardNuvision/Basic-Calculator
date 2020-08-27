import * as React from 'react';
import styles from './ReactCalculator.module.scss';
import { IReactCalculatorProps } from './IReactCalculatorProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, RatingBase } from 'office-ui-fabric-react';

import { IReactCalculatorState } from './IReactCalculatorState'

export default class ReactCalculator extends React.Component<IReactCalculatorProps, IReactCalculatorState> { 

  // Consturctor for declaring and initializing State variables 
  constructor(props:IReactCalculatorProps) {
    super(props);
    this.state = {
      inputData: 15,
      outputData: 0,
      rate: 5,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    this.setState({ outputData: this.state.inputData * this.props.inputRate }
    );
  }

  handleChange(e){
    e.preventDefault();
    this.setState({ inputData: e.target.value });
  }
  handleClick2(e){
    e.preventDefault();
  }
  // Use State for React data manipulation f
  // Then set up ReactCalclatorWebpart so users can change 

  public render(): React.ReactElement<IReactCalculatorProps> {
    return (
      <div className={ styles.reactCalculator }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>

              <span className={ styles.title }>{escape(this.props.description)}</span>
            

              <TextField style={{color:"#00394b"}} label="Requested Amount " defaultValue="0" onChange={this.handleChange} value={this.state.inputData.toString()}/>
              
              <div style={{width: "100%", height: "auto" }}>
                <p style={{padding: "0 1rem", color:"#00394b", display:"inline-block", fontSize: "1.5em"}}>Rate </p> 
                <p style={{borderStyle:"solid", borderRadius: "15px", padding: "0 1rem", borderColor: "#f5821f", color: "#00394b", fontSize: "1.5em", display: "inline-block", float: "right", fontWeight: "bold"}}>
                  {escape(this.props.inputRate.toString())}% 
                </p>
              </div>
              

              <TextField label="Total Amount " readOnly defaultValue="0" value={this.state.outputData.toString()} />
              <DefaultButton style={{ backgroundColor: "#00394b", color: "white", margin: "1rem 0 0 0"}} text="Calculate" onClick={this.handleClick} allowDisabledFocus /> 
            </div>
          </div>
        </div>
      </div>
    );
  }


  
}
