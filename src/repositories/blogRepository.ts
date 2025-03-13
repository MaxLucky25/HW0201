import { BlogDBType, CreateBlogDto, UpdateBlogDto, BlogViewModel } from '../models/blogModels';
import {blogCollection} from "../db/mongo-db";


export const blogRepository = {

    async getById(id: string): Promise<BlogViewModel | null> {
        const blog = await blogCollection.findOne(
            {id:id},
            {projection: {_id: 0} }
        );
        return blog as BlogViewModel | null;
    },

    async create(input: CreateBlogDto): Promise<BlogViewModel> {
        const newBlog: BlogDBType = {
            id: Date.now().toString(),
            ...input,
            createdAt: new Date(),
            isMembership: false,
        };
        const result = await blogCollection.insertOne(newBlog);
        const created = await blogCollection.findOne({ _id: result.insertedId });
        return this.mapToOutput(created!);

    },

    async update(id: string, input: UpdateBlogDto): Promise<boolean> {
       const result = await blogCollection.updateOne(
           {id:id},
           { $set: {
                   name: input.name,
                   description: input.description,
                   websiteUrl: input.websiteUrl
               }}
       );
       return result.matchedCount === 1;
    },

    async delete(id: string): Promise<boolean> {
        const result = await blogCollection.deleteOne({id:id});
        return result.deletedCount === 1;
    },
    mapToOutput(blog: BlogDBType): BlogViewModel {
        const { _id, ...rest } = blog;
        return rest;
    }
};