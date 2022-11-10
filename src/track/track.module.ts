import {Module} from "@nestjs/common";
import {TrackService} from "./track.service";
import {TrackController} from "./track.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "./shemas/track.schema";
import {Comment, CommentSchema} from "./shemas/comment.schema";
import {FileModule} from "../files/file.module";
import {FileService} from "../files/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
        FileModule
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService]
})
export class TrackModule {}
