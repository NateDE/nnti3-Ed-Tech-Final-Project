import React, { useState, useEffect, Component } from "react";
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';

/** App Theme */
import { colors } from '../../Themes/Colors';

/** App Constatns */
import { AUTH_USER_TOKEN_KEY } from '../../Utils/constants';
import { ClickParam } from 'antd/lib/menu';
import logo from '../../assets/homeLogo2.png'
import MyChatBot from 'react-simple-chatbot';

import { DashboardOutlined, AccountBookOutlined, NotificationOutlined } from '@ant-design/icons';

class Review extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: '',
        country: '',
        gender: '',
        age: '',
        ethnicity: '',
        boolLang: '',
        lingual: '',
      };
    }
  
    componentWillMount() {
      const { steps } = this.props;
      const { name, country, gender, age, ethnicity, boolLang, lingual } = steps;
  
      this.setState({ name, country, gender, age, ethnicity, boolLang, lingual });
    }
  
    render() {
      const { name, country, gender, age, ethnicity, boolLang, lingual } = this.state;
      return (
        <div style={{ width: '100%' }}>
          <h3>Summary</h3>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td style={{textIndent: '10%'}}>{name.value}</td>
              </tr>
              <hr style={{color: colors.white, width: '175%'}}/>
              <tr>
                <td>Country</td>
                <td style={{textIndent: '10%'}}>{country.value}</td>
              </tr>
              <hr style={{color: colors.white, width: '175%'}}/>
              <tr>
                <td>Gender</td>
                <td style={{textIndent: '10%'}}>{gender.value}</td>
              </tr>
              <hr style={{color: colors.white, width: '175%'}}/>
              <tr>
                <td>Age</td>
                <td style={{textIndent: '10%'}}>{age.value}</td>
              </tr>
              <hr style={{color: colors.white, width: '175%'}}/>
              <tr>
                <td>Ethnicity</td>
                <td style={{textIndent: '10%'}}>{ethnicity.value}</td>
              </tr>
              <hr style={{color: colors.white, width: '175%'}}/>
              <tr>
                <td>Native language english</td>
                <td style={{textIndent: '35%'}}>{boolLang.value}</td>
              </tr>
              <hr style={{color: colors.white, width: '175%'}}/>
              <tr>
                <td>Number of languanges</td>
                <td style={{textIndent: '35%'}}>{lingual.value}</td>
              </tr>
              <hr style={{color: colors.white, width: '175%'}}/>
            </tbody>
          </table>
        </div>
      );
    }
}


Review.propTypes = {
    steps: PropTypes.object,
};
  
Review.defaultProps = {
    steps: undefined,
};


const Chatbot = (props) => {

    let [username, setUserName] = useState("");
    let [isSpeech, setSpeech] = useState();

    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then((user) => {
          //console.log(user);
          setUserName(user.attributes.name);
          console.log(user.attributes.name)
        })
        .catch((error) => {
            console.log (error)
        });
    });



    const theme = {
      background: '#f5f8fb',
      fontFamily: 'Helvetica Neue',
      headerBgColor: '#85f8db',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor:  colors.logoBorderColor,
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
    };

    var v = 0, a = 0, t = 0;
    var verb = 0, logic = 0, soc = 0, sol = 0;

    var array = Array(7).fill(0);


    function vat(letter){
        if (letter === 'a'){
            array[0]+=1;
            console.log(array[0])
        } else if (letter === 'b'){
            array[1]+=1;
            console.log(array[1])
        } else {
            array[2]+=1;
            console.log(array[2])
        }
    }
    function verbal(letter){
        if (letter === 'a'){
            array[3]+=1;
            console.log(array[3])
        }
    }
    function logical(letter){
        if (letter === 'a'){
            array[4]+=1;
            console.log(array[4])
        }
    }
    function social(letter){
        if (letter === 'a'){
            array[5]+=1;
            console.log(array[5])
        }
    }
    function solitary(letter){
        if (letter === 'a'){
            array[6]+=1;
            console.log(array[6])
        }
    }

    function grabtitle(title){
        console.log(title)
    }
    function grabdesc(desc){
        console.log(desc)
    }

    var results = (array) => {
        console.log(array)
        return (
        <Layout style={{backgroundColor: 'inherit'}}>
        <div style={{ width: '100%' }}>
            <h3>Learning Style(s)</h3>
            <table>
            <tbody>
                <tr>
                <td>Visual</td>
                <td style={{textIndent: '10%'}}>{((array[0] + 1)/2)*100}%</td>
                </tr>
                <hr style={{color: colors.white, width: '150%'}}/>
                <tr>
                <td>Auditory</td>
                <td style={{textIndent: '10%'}}>{((array[1] + 1)/2)*100}%</td>
                </tr>
                <hr style={{color: colors.white, width: '150%'}}/>
                <tr>
                <td>Kinesthetic</td>
                <td style={{textIndent: '10%'}}>{((array[2] + .5)/2)*100}%</td>
                </tr>
                <hr style={{color: colors.white, width: '150%'}}/>
                <tr>
                <td>Linguistic</td>
                <td style={{textIndent: '10%'}}>{((array[3] + .8)/2)*100}%</td>
                </tr>
                <hr style={{color: colors.white, width: '150%'}}/>
                <tr>
                <td>Logical</td>
                <td style={{textIndent: '10%'}}>{((array[4] + .81)/2)*100}%</td>
                </tr>
                <hr style={{color: colors.white, width: '150%'}}/>
                <tr>
                <td>Interpersonal</td>
                <td style={{textIndent: '10%'}}>{((array[5] + .21)/2)*100}%</td>
                </tr>
                <hr style={{color: colors.white, width: '150%'}}/>
                <tr>
                <td>Intrapersonal</td>
                <td style={{textIndent: '10%'}}>{((array[6] + .41)/2)*100}%</td>
                </tr>
                <hr style={{color: colors.white, width: '150%'}}/>
            </tbody>
            </table>
        </div>
        </Layout>
    )}

    localStorage.removeItem('rsc_cache')

    return (
        <ThemeProvider theme={theme}>
        <MyChatBot
          speechSynthesis={{ enable: true, lang: 'en' }}
          recognitionEnable={true}
          steps={[
            {
              id: '1',
              message: 'Hi. What is your name?',
              trigger: 'name',
            },
            {
              id: 'name',
              user: true,
              trigger: 'greetings',
            },
            {
                id: 'greetings',
                message: `Hi {previousValue}. ` +
                `I am your friendly Advisor AI here to assist you 
                by recommending if a course is right for you. ` + 
                `Are you ready to begin?`
                ,
                trigger: '2',
            },
            {
                id: '2',
                options: [
                  { value: 1, label: 'I am ready', trigger: 'bq1' },
                  { value: 2, label: 'Not yet', trigger: 'wait' },
                ],
            },
            {
                id: 'bq1',
                message: `Great. let's start by telling me where you are from?`,
                trigger: `country`,
            },
            {
                id: 'wait',
                message: `Ok no rush. I'll be here when you are ready.`,
                trigger: `2`,
            },

            {
                id: 'country',
                user: true,
                placeholder: `Ex: Brazil...`,
                trigger: 'bq2',
            },
            {
                id: 'bq2',
                message: `That's really cool. 
                I'd like to visit sometime. What's your gender?`,
                trigger: 'gender'
            },
            {
              id: 'gender',
              options: [
                { value: 'Male', label: 'Male', trigger: '5' },
                { value: 'Female', label: 'Female', trigger: '5' },
                { value: 'N/A', label: 'Prefer not to say', trigger: '5' },
              ],
            },
            {
              id: '5',
              message: 'How old are you?',
              trigger: 'age',
            },
            {
              id: 'age',
              user: true,
              trigger: 'bq3',
              validator: (value) => {
                if (isNaN(value)) {
                  return 'value must be a number';
                } else if (value < 0) {
                  return 'value must be positive';
                } else if (value > 120) {
                  return `${value}? Come on!`;
                }
  
                return true;
              },
            },
            {
                id: 'bq3',
                message: `Nice. What's your ethnicity?`,
                trigger: 'ethnicity'
            },
            {
                id: 'ethnicity',
                user: true,
                trigger: 'bq4',
            },
            {
                id: 'bq4',
                message: `Is English your first/primary language?`,
                trigger: 'boolLang'
            },
            {
                id: 'boolLang',
                options: [
                  { value: 'Yes', label: 'Yes', trigger: 'bq5' },
                  { value: 'No', label: 'No', trigger: 'bq5' },
                ],
            },
            {
                id: 'bq5',
                message: `How many languages do you know?`,
                trigger: 'lingual'
            },
            {
                id: 'lingual',
                options: [
                  { value: '1', label: '1', trigger: '7' },
                  { value: '2', label: '2', trigger: '7' },
                  { value: '3 or more', label: '3 or more', trigger: '7' },
                ],
            },
            {
              id: '7',
              message: 'Impressive! Check out your summary',
              trigger: 'review',
            },
            {
              id: 'review',
              component: <Review />,
              asMessage: true,
              trigger: 'update',
            },
            {
              id: 'update',
              message: 'Would you like to update some field?',
              trigger: 'update-question',
            },
            {
              id: 'update-question',
              options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-bq' },
              ],
            },
            {
              id: 'update-yes',
              message: 'What field would you like to update?',
              trigger: 'update-fields',
            },
            {
              id: 'update-fields',
              options: [
                { value: 'name', label: 'Name', trigger: 'update-name' },
                { value: 'country', label: 'Country', trigger: 'update-country' },
                { value: 'gender', label: 'Gender', trigger: 'update-gender' },
                { value: 'age', label: 'Age', trigger: 'update-age' },
                { value: 'ethnicity', label: 'Ethnicity', trigger: 'update-ethnicity' },
                { value: 'boolLang', label: 'Primary Language', trigger: 'update-boolLang' },
                { value: 'lingual', label: 'Muti-Lingual', trigger: 'update-lingual' },
              ],
            },
            {
              id: 'update-name',
              update: 'name',
              trigger: '7',
            },
            {
                id: 'update-country',
                update: 'country',
                trigger: '7',
            },
            {
              id: 'update-gender',
              update: 'gender',
              trigger: '7',
            },
            {
              id: 'update-age',
              update: 'age',
              trigger: '7',
            },
            {
                id: 'update-ethnicity',
                update: 'ethnicity',
                trigger: '7',
            },
            {
                id: 'update-boolLang',
                update: 'boolLang',
                trigger: '7',
            },
            {
                id: 'update-lingual',
                update: 'lingual',
                trigger: '7',
            },
            {
              id: 'end-bq',
              message: `Thanks! Now, let's figure out your learning style(s).
              The learning styles are Visual, Auditory, Kinesthetic, Linguistic, 
              Mathematical, Interpersonal, and Intrapersonal. 
              Are you ready?`,
              trigger: '8',
            },
            {
                id: '8',
                options: [
                  { value: 1, label: 'I am ready', trigger: 'pq0' },
                  { value: 2, label: 'Not yet', trigger: 'wait' },
                ],
            },
            {
                id: 'wait',
                message: `Ok, no rush. I'll be here when you are ready.`,
                trigger: `8`,
            },
            {
                id: 'pq0',
                message: `Great. let's begin.`,
                trigger: `pq1`,
            },
            {
                id: 'pq1',
                message: `When I operate new equipment I generally: `,
                asMessage: true,
                trigger: `pa1`,
            },
            {
                id: 'pa1',
                options: [
                  { value: 'a', label: 'a) read the instructions first', trigger: () => {
                      //vat('a');
                      array[0]+=1;
                      return 'pq2';
                  } },
                  { value: 'b', label: 'b) listen to an explanation from someone who has used it before', trigger: () => {
                        //vat('b');
                        array[1]+=1;
                        return 'pq2';
                    } },
                  { value: 'c', label: 'c) go ahead and have a go, I can figure it out as I use it', trigger: () => {
                        //vat('c');
                        array[2]+=1;
                        return 'pq2';
                    } },
                ],
            },
            {
                id: 'pq2',
                message: `When I need directions for travelling I usually: `,
                asMessage: true,
                trigger: `pa2`,
            },
            {
                id: 'pa2',
                options: [
                  { value: 'a', label: 'a) look at a map', trigger: () => {
                        //vat('a');
                        array[0]+=1;
                        return 'pq3';
                  } },
                  { value: 'b', label: 'b) ask for spoken directions', trigger: () => {
                        //vat('b');
                        return 'pq3';
                    } },
                  { value: 'c', label: 'c) follow my nose and maybe use a compass', trigger: () => {
                        //vat('c');
                        return 'pq3';
                    } },
                ],
            },
            {
                id: 'pq3',
                message: `When I cook a new dish, I like to: `,
                asMessage: true,
                trigger: `pa3`,
            },
            {
                id: 'pa3',
                options: [
                  { value: 'a', label: 'a) follow a written recipe', trigger: () => {
                        //vat('a');
                        array[0]+=1;
                        return 'pq4';
                  } },
                  { value: 'b', label: 'b) call a friend for an explanation', trigger: () => {
                        vat('b');
                        return 'pq4';
                    } },
                  { value: 'c', label: 'c) follow my instincts, testing as I cook', trigger: () => {
                        vat('c');
                        return 'pq4';
                    } },
                ],
            },
            {
                id: 'pq4',
                message: `If I am teaching someone something new, I tend to: `,
                asMessage: true,
                trigger: `pa4`,
            },
            {
                id: 'pa4',
                options: [
                  { value: 'a', label: 'a) write instructions down for them', trigger: () => {
                        //vat('a');
                        array[0]+=1;
                        return 'pq5';
                  } },
                  { value: 'b', label: 'b) give them a verbal explanation', trigger: () => {
                        vat('b');
                        return 'pq5';
                    } },
                  { value: 'c', label: 'c) demonstrate first and then let them have a go', trigger: () => {
                        vat('c');
                        return 'pq5';
                    } },
                ],
            },
            {
                id: 'pq5',
                message: ` I tend to say: `,
                asMessage: true,
                trigger: `pa5`,
            },
            {
                id: 'pa5',
                options: [
                  { value: 'a', label: 'a) watch how I do it', trigger: () => {
                        //vat('a');
                        array[0]+=1;
                        return 'pq6';
                  } },
                  { value: 'b', label: 'b) listen to me explain', trigger: () => {
                        vat('b');
                        return 'pq6';
                    } },
                  { value: 'c', label: 'c) you have a go', trigger: () => {
                        vat('c');
                        return 'pq6';
                    } },
                ],
            },
            {
                id: 'pq6',
                message: `During my free time I most enjoy: `,
                asMessage: true,
                trigger: `pa6`,
            },
            {
                id: 'pa6',
                options: [
                  { value: 'a', label: 'a) going to museums and galleries', trigger: () => {
                        //vat('a');
                        array[0]+=1;
                        return 'pq7';
                  } },
                  { value: 'b', label: 'b) listening to music and talking to my friends', trigger: () => {
                        vat('b');
                        return 'pq7';
                    } },
                  { value: 'c', label: 'c) playing sport or doing DIY', trigger: () => {
                        vat('c');
                        return 'pq7';
                    } },
                ],
            },
            {
                id: 'pq7',
                message: `I love learning new words. `,
                asMessage: true,
                trigger: `pa7`,
            },
            {
                id: 'pa7',
                options: [
                  { value: 'a', label: 'a) True', trigger: () => {
                        verbal('a');
                        return 'pq8';
                  } },
                  { value: 'b', label: 'b) False', trigger: () => {
                        verbal('b');
                        return 'pq8';
                    } },
                ],
            },
            {
                id: 'pq8',
                message: `I find that discussion and conversation tend to help me grasp information from a class. `,
                asMessage: true,
                trigger: `pa8`,
            },
            {
                id: 'pa8',
                options: [
                    { value: 'a', label: 'a) True', trigger: () => {
                          verbal('a');
                          return 'pq9';
                    } },
                    { value: 'b', label: 'b) False', trigger: () => {
                          verbal('b');
                          return 'pq9';
                      } },
                ],
            },
            {
                id: 'pq9',
                message: `Can you spot the pattern in these letters and numbers? 0, 1, 1, 2, 3, 5, 8, 13, 21`,
                asMessage: true,
                trigger: `pa9`,
            },
            {
                id: 'pa9',
                options: [
                    { value: 'a', label: 'a) Yes, very quickly (20 seconds or less)', trigger: () => {
                        logical('a');
                        return 'pq10';
                    } },
                    { value: 'b', label: 'b) Yes, but it took a while (more than 20 seconds)', trigger: () => {
                        logical('b');
                        return 'pq10';
                    } },
                    { value: 'c', label: `c) No, I don't know`, trigger: () => {
                        logical('c');
                        return 'pq10';
                    } },
                ],
            },
            {
                id: 'pq10',
                message: `Do you enjoy solving mathematical problems?`,
                asMessage: true,
                trigger: `pa10`,
            },
            {
                id: 'pa10',
                options: [
                    { value: 'a', label: 'a) Yes', trigger: () => {
                        logical('a');
                        return 'pq11';
                    } },
                    { value: 'b', label: 'b) No', trigger: () => {
                        logical('b');
                        return 'pq11';
                    } },
                ],
            },
            {
                id: 'pq11',
                message: `I love talking to people and meeting new people. `,
                asMessage: true,
                trigger: `pa11`,
            },
            {
                id: 'pa11',
                options: [
                  { value: 'a', label: 'a) Always', trigger: () => {
                        social('a');
                        return 'pq12';
                  } },
                  { value: 'b', label: 'b) Sometimes', trigger: () => {
                        social('b');
                        return 'pq12';
                    } },
                  { value: 'c', label: 'c) Rarely', trigger: () => {
                        social('c');
                        return 'pq12';
                    } },
                ],
            },
            {
                id: 'pq12',
                message: `I offer verbal signals while listening, things like, ‘Go on… ’ or ‘Uh huh’ to encourage the speaker to continue. `,
                asMessage: true,
                trigger: `pa12`,
            },
            {
                id: 'pa12',
                options: [
                    { value: 'a', label: 'a) Always', trigger: () => {
                        social('a');
                        return 'pq13';
                  } },
                  { value: 'b', label: 'b) Sometimes', trigger: () => {
                        social('b');
                        return 'pq13';
                    } },
                  { value: 'c', label: 'c) Rarely', trigger: () => {
                        social('c');
                        return 'pq13';
                    } },
                ],
            },
            {
                id: 'pq13',
                message: `Do you find that you can think best when you are not distracted by others? `,
                asMessage: true,
                trigger: `pa13`,
            },
            {
                id: 'pa13',
                options: [
                    { value: 'a', label: 'a) Yes', trigger: () => {
                        solitary('a');
                        return 'pq14';
                  } },
                  { value: 'b', label: 'b) Sometimes', trigger: () => {
                        solitary('b');
                        return 'pq14';
                    } },
                  { value: 'c', label: 'c) No', trigger: () => {
                        solitary('c');
                        return 'pq14';
                    } },
                ],
            },
            {
                id: 'pq14',
                message: `Do you consider yourself to be introspective – aware of your own thoughts and feelings? `,
                asMessage: true,
                trigger: `pa14`,
            },
            {
                id: 'pa14',
                options: [
                    { value: 'a', label: 'a) Yes', trigger: () => {
                        social('a');
                        return 'tally';
                  } },
                    { value: 'b', label: 'b) No', trigger: () => {
                        social('b');
                        return 'tally';
                    } },
                ],
            },
            {
                id: 'tally',
                message: `Nice work. I have your results!`,
                asMessage: true,
                trigger: 'review-pq',
            },
            {
                id: 'review-pq',
                component: <>{results(array)}</>,
                asMessage: true,
                trigger: '9',
            },
            {
                id: '9',
                message: `Now, I can provide recommendations based on your learning style(s). 
                Enter the class title you plan on taking.`,
                trigger: 'ctitle',
            },
            {
                id: 'ctitle',
                user: true,
                trigger: '10'
            },
            {
                id: '10',
                delay: 2000,
                message: () => {
                    //Do search keywords here. Delete grabtitle function.
                    var word = `{previousValue}`
                    if (word.toLowerCase().includes("math")) {
                        return 'Based on your learning style, you will succeed in this subject.'
                    } else {
                        return 'Based on your learning style, you will struggle in this subject.'
                    }
                },
                trigger: () => {
                    return 'desc';
                }
            },
            {
                id: 'desc',
                user: true,
                trigger: '11'

            },
            {
                id: '11',
                delay: 2000,
                message: `Thank you for trying out this service.`,
                trigger: () => {
                    grabdesc('{previousValue}');
                    return 'end-session';
                }
            },

            {
                id: 'end-session',
                message: 'Thanks! And GoodBye!',
                end: true,
            },
          ]}
        />
        </ThemeProvider>
    );



};

export default withRouter(Chatbot);