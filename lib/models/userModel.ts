import {Schema, model, models, Document} from 'mongoose'
import bcrypt from 'bcryptjs'


export interface Iuser extends Document {
    email:string,
    username:string,
    password:string,
    comparePassword(enteredPassword:string):Promise<boolean>;
};

const UserSchema = new Schema<Iuser>(
    {
        email:{type:String,required:true, unique:true},
        username:{type:String,required:true, unique:true},
        password:{type:String,required:true},
    },
    {
        timestamps:true,
    }
)

//hash password before saving
UserSchema.pre<Iuser>('save', async function (next){
    if(!this.isModified('password'))
        return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//compare Password Method
UserSchema.methods.comparePassword = async function (
    enteredPassword:string
):Promise<boolean>{
    return bcrypt.compare(enteredPassword, this.password)
}

//create a model const User = models.User || model<IUser>("User", UserSchema);
const User = models.User || model<Iuser>("User", UserSchema);

export default User;