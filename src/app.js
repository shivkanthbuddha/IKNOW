'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { GoogleSheetsCMS } = require('jovo-cms-googlesheets');


const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb(),
    new GoogleSheetsCMS()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        this.toIntent('WelcomeIntent');
    },

    WelcomeIntent() {
    //     let speech = this.speechBuilder()
    //     .addT('welcome_speech');
    //   this.ask(speech);
        
        this.ask( this.t('welcome.speech') ,this.t('welcome.reprompt'));
    },

    ActionIntent() {
        /**1.Policy Revenue 2. ClaimCost  */
        var userAction =  ""
        userAction = this.$inputs.Action.value
        var amount='0'
        if(userAction != null ) {
            userAction = userAction.toLowerCase()
            if(userAction.includes("revenue") || userAction.includes("income")){
                userAction =1
                amount = '8 Million'
                this.ask(this.t('policy.income', { amount: amount }));
            }
            else if (userAction.includes("claim") || userAction.includes("payment") )  {
                userAction =2
                amount = '2 Million'
                this.ask(this.t('claim.costs', { amount: amount }));
            }
            else if ( userAction.includes("underwriting") ) {
                userAction =3
                amount = '1 Million'
                this.ask(this.t('underwriting.costs', { amount: amount }));
            }        
            else if (userAction.includes("profit") || userAction.includes("loss") )  {
                userAction =4
                amount = '4 Million'
                this.ask(this.t('company.networth', { amount: amount }));
           }
    
        }
    },
    HelpIntent() {
        this.ask( 'help.message');
    },
});

module.exports.app = app;
