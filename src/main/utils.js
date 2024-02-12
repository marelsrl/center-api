// import {v4 as uuidv4} from 'uuid';

export function validateLogin(form){
    if(!form.password || !form.employee_id) return false;
    if(form.password.length < 8 ) return false;
    return true;
}



const requiredFileds = ["tenant_id","name","alias","email","user_group","employee_id","password"];

export function validateSignin(form){
    if(!form[requiredFileds[0]] || !form[requiredFileds[1]] || !form[requiredFileds[2]] || !form[requiredFileds[3]] ||!form[requiredFileds[4]] || !form[requiredFileds[5]]  || !form[requiredFileds[6]]) return false;
    if(form.password.length < 8 ) return false;
    return true;
}

export function checkDate(check,toBe,data){
    let notEqual = 0;

    for (let i = 1; i < toBe; i++) {
        if (check[i].price_date != data) {
            notEqual = i;
            break
        }
    }

    return notEqual > 0
}
