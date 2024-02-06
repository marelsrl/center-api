export default class User{
    constructor(name,password,alias,email,user_group,employee_id,is_left_handed ){
        this.name = name;
        this.email= email;
        this.password = password;
        this.alias= alias;
        this.user_group= user_group;
        this.employee_id= employee_id;
        this.is_left_handed= is_left_handed;

        this.tenant_id = 1;
        this.isCashier = true;
        this.isAdmin = false;
        this.isSuper = false;
        this.role = 'cassiere'
    }

    toJson(){
        return{
            name:this.name,
            email:this.email,
            password:this.password,
            alias:this.alias,
            user_group:this.user_group,
            employee_id:this.employee_id,
            is_left_handed:this.is_left_handed,
            isAdmin:this.isAdmin,
            isCashier:this.isCashier,
            isSuper:this.isSuper,
            role:this.role
        }
    }
}
