import React, {Component} from 'react';
import CardList from '../Components/CardList'
import {robots} from '../robots';
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'
import ErrorBoundary from '../Components/ErrorBoundary'
import './App.css';

class App extends Component {
    constructor () {
        super()
        this.state = {
            robots: robots,
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({ robots: robots}))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value})
    }

    render () {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0) {
            return <h1>Please Wait...</h1>
        } else {
            return (
                <div className ='tc'>
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = {filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>  
            );
        }
            }
    }


export default App;