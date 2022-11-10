import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, Types} from "mongoose";
import {Track} from "../../track/shemas/track.schema";
import {Comment} from "../../track/shemas/comment.schema";

export type AlbumDocument = HydratedDocument<Album>;


@Schema()
export class Album {

    @Prop()
    owner_id: number;

    @Prop()
    name: string;

    @Prop({type: [{type: Types.ObjectId, ref: 'Track'}]})
    tracks: Track[];

    @Prop()
    picture: string;

    @Prop({type: [{type: Types.ObjectId, ref: 'Comments'}]})
    comments: Comment[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
