import * as React from 'react';
import styles from './ReactCalculator.module.scss';
import { IReactCalculatorProps } from './IReactCalculatorProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, RatingBase } from 'office-ui-fabric-react';

import { IReactCalculatorState } from './IReactCalculatorState';

export default class ReactCalculator extends React.Component<IReactCalculatorProps, IReactCalculatorState> { 

  // Consturctor for declaring and initializing State variables 
  constructor(props:IReactCalculatorProps) {    
    super(props);    

    this.state = {
      inputData: 1000,
      outputData: 0,
      rate: 5,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTwoDigits = this.setTwoDigits.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    switch(this.props.choice) {
      case "Multiply":
        this.setState({ outputData: (this.state.inputData * this.props.inputRate) });  
        break;
      case "Add": 
        this.setState({ outputData: (+this.state.inputData + +this.props.inputRate) });
      break;
      case "Percent":
        this.setState({ outputData: this.state.inputData * ((this.props.inputRate / 100) + 1)  });
        break;
      }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({ inputData: e.target.value.substring(1) });
  }

  async setTwoDigits(e){
    e.preventDefault();

    var temp = this.state.inputData.toString();  
        //alert("wow" + Number(Number(parseFloat(this.state.inputData.toString())).toFixed(2)) );
        await this.setState({ inputData: Number(Number(parseFloat(this.state.inputData.toString())).toFixed(2))},  () => {
          // Any Callback function
        });
  }
  

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.choice !== prevProps.choice) {

    }
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
            

              
              <div style={{width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>
                
                <TextField style={{color:"#00394b"}} label="Requested Amount" defaultValue="0" onBlur={this.setTwoDigits} onChange={this.handleChange} value={"$" + this.state.inputData.toString()}/>
                
                <div style={{display: "flex" , flexDirection: "column" }}>

      
                  <div style={{margin: "1em 0" ,display: "flex" , flexDirection: "row", justifyContent:"space-between"}}>
                    <p style={{margin: "0", padding: "0", color:"#00394b", fontSize: "1.5em"}}>
                      Fee
                    </p> 
                    <p style={{margin: "0", borderStyle:"solid", borderRadius: "15px", padding: "0 1rem", borderColor: "#f5821f", color: "#00394b", fontSize: "1.5em", fontWeight: "bold"}}>                           
                      {this.props.choice == "Add"? "+":""}
                      {escape(this.props.inputRate.toString())} 
                      {this.props.choice == "Multiply"? "x":""} 
                      {this.props.choice == "Percent"? "%":""} 
                    </p>   
                  </div>
      
                  
                  <div style={{margin: 0, display: "flex" , flexDirection: "row", justifyContent:"space-between"}}>
                    <p style={{margin: 0, padding: "0", color:"#00394b", fontSize: "1.5em"}}>
                      Fee Amount 
                    </p> 

              
                    <p style={{margin: 0, borderStyle:"solid", borderRadius: "15px", padding: "0 1rem", borderColor: "navy", color: "#00394b", fontSize: "1.5em", fontWeight: "bold"}}>
                      {this.props.choice == "Add"? "$" + this.props.inputRate: "" }
                      {this.props.choice == "Multiply"? "N/A" :""} 
                      {this.props.choice == "Percent"? "$" + (this.props.inputRate / 100 * this.state.inputData).toString():""} 
                    </p>         


                  </div> 

                </div>   


              </div>
              
            
                
     

              <TextField label="Total Amount " readOnly defaultValue="0" value={"$" + this.state.outputData.toFixed(2).toString()} />
              <DefaultButton style={{ backgroundColor: "#00394b", color: "white", margin: "1rem 0 0 0"}} text="Calculate" onClick={this.handleClick} allowDisabledFocus /> 
            </div>
          </div>
        </div>
      </div>
    );
  }


  
}
