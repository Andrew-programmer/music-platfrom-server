import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, Types} from "mongoose";
import {Track} from "./track.schema";

export type CommentDocument = HydratedDocument<Comment>;


@Schema()
export class Comment {

    @Prop()
    username: string;

    @Prop()
    isPositive: boolean;

    @Prop({type: {type: Types.ObjectId, ref: 'Track'}})
    track: Track;

    @Prop()
    text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
