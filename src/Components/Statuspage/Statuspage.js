import React, { Component } from 'react';



import './Statuspage.css'



class Statuspage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            status: "",
        }
	}
	
	updateStatus() {
        let headers = {
            accept: 'application/json; charset=utf-8'
        };
        headers['content-type'] = 'application/json; charset=utf-8';
        fetch('https://status.visma.com/index.json', headers).then(response => {
            return response.json()
        }).then(json => {
            var tmp = json.components.filter(comp => (comp.id === 'r0kl3clcllgd'));
            this.setState( {
                status: tmp[0].status
            })
        });
	}

    componentDidMount() {
		this.updateStatus();
		setInterval(() => {
			this.updateStatus();
		}, 60000)

    }

    render() {
		const ok = this.state.status === "operational";

		const className = `${ok == true ? 'statusOk' : ''} tlxStatus`;

        return (<div className={className}>Tripletex er : {this.state.status}</div>);
    }
}
export default Statuspage;
