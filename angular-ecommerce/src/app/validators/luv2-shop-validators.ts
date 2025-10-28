import { FormControl, ValidationErrors, Validator } from "@angular/forms";

export class Luv2ShopValidators {
    //white Space validation
    static notOnlywhiteSpaces(control:FormControl):ValidationErrors|null{
        //check if string only contain whitespace
        if((control.value!=null)&&(control.value.trim().length===0)){
            //invalid,return error object
            return{'notOnlyWhiteSpace':true};
        }else{
            //valid, return null
            return null;
        }
    }
}

