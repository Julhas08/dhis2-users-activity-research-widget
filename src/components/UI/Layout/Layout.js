import React,{Component} from 'react';
import Aux from '../../../hoc/Auxi';
import classes from './Layout.css';

class Layout extends Component{
	render(){

		return(
			<Aux>
				<main className={classes.AppBarTitle}>
					{this.props.children}	
				</main>
			</Aux>
		);
	}
}


export default Layout;