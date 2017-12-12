import React, {Component} from 'react';
let firebase = require('firebase');
let uuid = require('uuid');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBNZlwwXAYzpqua1ImBbxYEDf1sxy8mb8k",
    authDomain: "fire-survey-9facd.firebaseapp.com",
    databaseURL: "https://fire-survey-9facd.firebaseio.com",
    projectId: "fire-survey-9facd",
    storageBucket: "fire-survey-9facd.appspot.com",
    messagingSenderId: "1039804054269"
  };
  firebase.initializeApp(config);

class Survey extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false
        };
        
        this.takeName = this.takeName.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionsSubmitted = this.questionsSubmitted.bind(this);
    }

    takeName() {
        this.setState({studentName: this.refs.nimbuName.value});
    }

    answerSelected(event) {            
        let anss = this.state.answers;
        switch(event.target.name) {
            case "answer1": anss.answer1 = event.target.value; break;
            case "answer2": anss.answer2 = event.target.value; break;
            default: anss.answer3 = event.target.value; break;
        }
        this.setState({answers: anss});
    }

    questionsSubmitted() {
        if (!(this.state.answers.answer1 === '' || this.state.answers.answer2 === '' || this.state.answers.answer3 === '')) {
            this.setState({isSubmitted: true});
        }
        
        firebase.database().ref('/fire-survey/'+this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers            
        });        

        console.log(this.state.uid)
    }

    render() {

        let studentNameStatus;
        let questions;

        if(this.state.studentName === '' && this.state.isSubmitted === false) {
            studentNameStatus = 
            <div> 
                <h1> Mew, what's your name? mew: </h1>
                <form onSubmit={this.takeName}> 
                    <input type='text' ref='nimbuName' className="namy"/>          
                </form>
            </div>;

            questions = '';
        } else if(this.state.studentName !== '' && this.state.isSubmitted === false) {
            studentNameStatus = 
            <div>
                <p>
                    Hey there, <b>{this.state.studentName}</b>, welcome to the survey ^_^ <br/>                
                </p>
            </div>;

            questions = 
            <div>
                <h3>Here are some questions: </h3>
                <form onSubmit={this.questionsSubmitted}>
                    <center>
                        <div className="card container">
                            <label> What kind of courses do you like? </label><br/><br/>    
                            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} /> Technology&nbsp;
                            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/> Design&nbsp;
                            <input type="radio" name="answer1" value="Fishing" onChange={this.answerSelected}/> Fishing&nbsp;
                            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected}/> Marketing
                            <br/><br/>
                        </div>
                        <br/><br/>
                        <div className="card container">
                            <label> What are you? </label><br/><br/>    
                            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} /> Student&nbsp;
                            <input type="radio" name="answer2" value="Pro" onChange={this.answerSelected}/> Pro&nbsp;
                            <input type="radio" name="answer2" value="Business" onChange={this.answerSelected}/> Business&nbsp;
                            <input type="radio" name="answer2" value="Looking" onChange={this.answerSelected}/> Looking
                            <br/><br/>
                        </div>
                        <br/><br/>

                        <div className="card container">
                            <label> Is online learning good? </label><br/><br/>    
                            <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} /> Fuck, Yes&nbsp;
                            <input type="radio" name="answer3" value="No" onChange={this.answerSelected}/> Aww, hell, Naww&nbsp;
                            <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected}/> Maybe
                            <br/><br/>
                        </div>
                        <br/><br/>
                        <input type="submit" className="feedback-button" value="Submit"/> <br/><br/>
                    </center>
                </form>
            </div>;
        } else if (this.state.isSubmitted === true && this.state.studentName !== '') {
            studentNameStatus = 
            <h1>
                Thanks, {this.state.studentName}
            </h1>
        }

        return(
            <div>
                {studentNameStatus}                
                ------------------------------------------
                {questions}  
            </div>
        );
    }
}

export default Survey;