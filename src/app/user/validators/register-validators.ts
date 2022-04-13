import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    static match(controlName: string, matchingControlName:string) : ValidatorFn {
        return (group: AbstractControl) : ValidationErrors | null => {
            const control = group.get(controlName)
            const matchingControll = group.get(matchingControlName)

            if (!control || !matchingControll){
                console.error('Form controlls can not be found in the form group')
                return { controlNotFound: false }
            }


            const error = control.value === matchingControll.value ? 
            null : { noMatch: true }

            matchingControll.setErrors(error)

            return error
        }
    }
}
