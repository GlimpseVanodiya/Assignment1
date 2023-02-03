const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    NAME: Symbol("name"),
    DELIVERYMETHOD : Symbol("dine"),
    VEGNONVEG : Symbol("veg"),
    SIZE:   Symbol("size"),
    DIPPING:   Symbol("dipping"),
    DRINKS:  Symbol("drinks"),
    PHONENUMBER: Symbol("phone")
});

module.exports = class BurgerKingOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sName = "";
        this.sdeliveryMethod = "";
        this.svegNonveg = "";
        this.sSize = "";
        this.sDipping = "";
        this.sDrinks = "";
        this.sphoneNumber = "";
        this.sItem = "burger";
        this.rate=0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.NAME;
                aReturn.push("Welcome to Burger King.");
                aReturn.push("May I have your name please?");
                break;
            case OrderState.NAME:
                this.stateCur = OrderState.PHONENUMBER;
                this.sName = sInput;
                aReturn.push("May we have your phone number please?");
                break;
            case OrderState.PHONENUMBER:
                this.stateCur = OrderState.DELIVERYMETHOD;
                this.sphoneNumber = sInput;
                aReturn.push("Would you like to dine in or take out?");
                break;
            case OrderState.DELIVERYMETHOD:
                this.stateCur = OrderState.VEGNONVEG;
                this.sdeliveryMethod = sInput;
                aReturn.push("Which burger would you like? Veg or Non-veg.");
                break;
            case OrderState.VEGNONVEG:
                this.stateCur = OrderState.SIZE;
                this.svegNonveg = sInput;
                aReturn.push("What size would you like?");
                break;
                //error for size 
            case OrderState.SIZE:
                this.stateCur = OrderState.DIPPING
                this.sSize = sInput;
                    if(this.sSize=="s" || this.sSize== "S"){
                        this.rate= this.rate + 20;
                    }
                    else if(this.sSize=="m" || this.sSize== "M"){
                        this.rate= this.rate + 25;
                    }
                    else if(this.sSize=="l"  || this.sSize== "L"){
                        this.rate= this.rate + 30;
                    }
                    else{
                        aReturn.push("incorrect input")
                        this.stateCur= OrderState.SIZE
                        break;
                    }
                aReturn.push("Which dipping sauce would you like?");
                break;
            case OrderState.DIPPING:
                this.stateCur = OrderState.DRINKS
                this.sDipping = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push(`Thank-you for your order of ${this.sSize} ${this.svegNonveg} ${this.sItem} with ${this.sDipping}`);
                
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                if(this.sdeliveryMethod == "take out"){
                    aReturn.push(`Please ${this.sName} pick it up at ${d.toTimeString()}. You will receive text message on ${this.sphoneNumber}.`)
                    aReturn.push( `Total amount is ${this.rate}`);
                } else{
                    aReturn.push(`${this.sName}, we will reserve table for you at ${d.toTimeString()}. You will receive text message on ${this.sphoneNumber}.`)
                    aReturn.push( `Total amount is ${this.rate}`);
                }            
                break;
        }
        return aReturn;
    }
}
