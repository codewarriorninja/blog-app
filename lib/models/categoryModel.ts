import { Schema,model,models,Document,Types } from "mongoose";

export interface ICategory extends Document{
    title:string,
    user:Types.ObjectId
}

const CategorySchema = new Schema<ICategory>(
    {
        title:{type:String, required:true},
        user:{type:Schema.Types.ObjectId, ref:'User'}
    },
    {
        timestamps:true,
    }
);

const Category = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;