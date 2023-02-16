const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    NAME: Symbol("name"),
    PASTASALAD: Symbol("pastasalad"),
    SELECT : Symbol('select'),
    DIPPING:   Symbol("dipping"),
    DRINKS:  Symbol("drinks"),
    PHONENUMBER: Symbol("phone"),
    PAYMENT: Symbol("payment")
});

module.exports = class BurgerKingOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sName = "";
        this.spastaSalad = "";
        this.sSelect = "";
        this.sDipping = "";
        this.sDrinks = "";
        this.sphoneNumber = "" ;
        this.rate=0;
        this.rrate=0;      
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.NAME;
                aReturn.push("Welcome to Pasta and Salad.");
                aReturn.push("May I have your name please?");
                break;
            case OrderState.NAME:
                this.stateCur = OrderState.PHONENUMBER;
                this.sName = sInput;
                aReturn.push(`Hey... ${this.sName}, Can we get your number please ?  `);
                break;
            case OrderState.PHONENUMBER:
                this.stateCur = OrderState.PASTASALAD;
                this.sphoneNumber = sInput;
                var num =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if(this.sphoneNumber == " "){
                    aReturn.push(" please fill it")
                }
                else if (num.test(this.sphoneNumber)){
                    aReturn.push(`Thankyou ${this.sName}`);
                  
                }
                else {
                    aReturn.push("proper format please")
                    this.stateCur=OrderState.PHONENUMBER
                    break;
                };
                aReturn.push(`What is your choice today ?`);
                aReturn.push(`pasta or salad`);
                break;
            
            case OrderState.PASTASALAD:
                this.stateCur = OrderState.SELECT
                this.spastaSalad = sInput;
                if(this.spastaSalad == "pasta"){
                    aReturn.push("ChickenRose - 20$ ")
                    aReturn.push("Type - ChickenRose")
                    aReturn.push("VegitableGrilled - 25$");
                    aReturn.push("Type - VegitableGrilled")
                }
                else if(this.spastaSalad == "salad"){
                    aReturn.push("FarmarsMarket - 10$")
                    aReturn.push("Type - FarmarsMarket")
                    aReturn.push("ApplePecan - 15$");
                    aReturn.push("Type - ApplePecan")
                    break;
                }
                else {
                    aReturn.push("Please write 'pasta' or 'salad' ")
                    this.stateCur=OrderState.PASTASALAD
                    break;
                }; 
                aReturn.push("Please enter your selection full name")
                break;

            case OrderState.SELECT:
                this.stateCur = OrderState.DIPPING;
                this.sSelect = sInput;
                if(this.sSelect == "ChickenRose"){
                    this.rrate = this.rrate + 20;
                    aReturn.push ("Thankyou for choicing Chicken Rose")
                }
                else if(this.sSelect == "VegitableGrilled"){
                    this.rrate = this.rrate + 25;
                    aReturn.push ("Thankyou for choicing Vegitable Grilled")
                }
                else if(this.sSelect == "FarmarsMarket"){
                    this.rrate = this.rrate + 10;
                    aReturn.push ("Thankyou for choicing Farmars Market")
                }
                else if(this.sSelect == "ApplePecan"){
                    this.rrate = this.rrate + 15;
                    aReturn.push ("Thankyou for choicing Apple Pecan")
                }
                else{
                    aReturn.push("please write full name for selection")
                    aReturn.push("Example - 'ApplePecan' ")
                    this.stateCur =OrderState.select
                }
                aReturn.push("Please select Dipping for you")
                aReturn.push("Ranch - 5$")
                aReturn.push("Type - Ranch ")

                aReturn.push("Bluecheese - 4$")
                aReturn.push("Type - Bluecheese")

                aReturn.push("Hotsauce - 3$")
                aReturn.push("Type - Hotsauce")
                break;
                
            
                  
            case OrderState.DIPPING:
                this.stateCur = OrderState.DRINKS
                this.sDipping = sInput;
                if(this.sDipping == "Ranch"){
                    this.rrate = this.rrate + 5;
                    aReturn.push ("Ranch will be added")
                }
                else if(this.sDipping == "Bluecheese"){
                    this.rrate = this.rrate + 4;
                    aReturn.push ("Bluecheese will be added")
                }
                else if(this.sDipping == "Hotsauce"){
                    this.rrate = this.rrate + 3;
                    aReturn.push ("Hotsauce will be added")
                }
                else {
                    aReturn.push("please write full name for selection")
                    aReturn.push("Example - 'Hotsauce' ")
                    this.stateCur= OrderState.DIPPING
                    break;
                }
                aReturn.push("Would you like to Drinks for $5 ");
                aReturn.push ("Coke")
                aReturn.push("Type - Coke")
                aReturn.push ("Sprite")
                aReturn.push("Type - Sprite")
                aReturn.push ("Nestea")
                aReturn.push("Type - Nestea")
                break;
               

            case OrderState.DRINKS:
                this.stateCur =OrderState.PAYMENT;
                this.sDrinks = sInput;
                if(this.sDrinks == "Coke" ){
                    this.rrate = this.rrate + 5;
                }
                 else if(this.sDrinks == "Sprite" ){
                    this.rrate = this.rrate + 5;
                }
                else if(this.sDrinks == "Nestea" ){
                    this.rrate = this.rrate + 5;
                }
                else{
                    aReturn.push("please write full name for selection")
                    aReturn.push("Example - 'Coke' ")
                    this.stateCur= OrderState.DRINKS
                    break;
                }

                aReturn.push(`Thank-you for your order of ${this.spastaSalad} as ${this.sSelect} Dipping as ${this.sDipping} and drink as ${this.sDrinks}`);
                    aReturn.push( `${this.sName} your final amount is ${this.rrate}`);
                    aReturn.push(`Please pay for your order here`);
                    aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                     
                break;
            case OrderState.PAYMENT:
                console.log(sInput);
                this.isDone(true);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                var payee = sInput.purchase_units[0].shipping;
                aReturn.push(`Thank you ${payee.name.full_name} for your order`);
                aReturn.push(`Your order will be delivered at ${d.toTimeString()} ${payee.address.address_line1} ${payee.address.address_line2} ${payee.address.country_code}`);
                break;
        }
        return aReturn;
    }


renderForm(sTitle = "-1", sAmount = "-1"){
    // your client id should be kept private
    if(sTitle != "-1"){
      this.sItem = sTitle;
    }
    if(sAmount != "-1"){
      this.nOrder = sAmount;
    }
    const sClientID = process.env.SB_CLIENT_ID || 'AfZmG_uAIoDJrH-oK4bxDupTan45CupJ9_JWhlWO0aoLDTsOBv206NVV112g1kw30ZR0r0Lohd_1WJxF'//client id to change
    return(`
    <!DOCTYPE html>

    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
    </head>
    
    <body>
      <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
      <script
        src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
      </script>
      Thank you ${this.sNumber} for your ${this.sItem} order of $${this.nOrder}.
      <div id="paypal-button-container"></div>

      <script>
        paypal.Buttons({
            createOrder: function(data, actions) {
              // This function sets up the details of the transaction, including the amount and line item details.
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '${this.nOrder}'
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              // This function captures the funds from the transaction.
              return actions.order.capture().then(function(details) {
                // This function shows a transaction success message to your buyer.
                $.post(".", details, ()=>{
                  window.open("", "_self");
                  window.close(); 
                });
              });
            }
        
          }).render('#paypal-button-container');
        // This function displays Smart Payment Buttons on your web page.
      </script>
    
    </body>
        
    `);

  }
}




