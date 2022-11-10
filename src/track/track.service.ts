import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./shemas/track.schema";
import {Model, Types} from "mongoose";
import {Comment, CommentDocument} from "./shemas/comment.schema";
import {CreateTrackDto} from "./dto/createTrack.dto";
import {CreateCommentDto} from "./dto/createComment.dto";
import {FileService, FileType} from "../files/file.service";

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                private fileService: FileService) {
    }

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMG, picture);
        return await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath});
    }

    async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));
        return tracks;
    }

    async getOne(id: Types.ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }

    async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }

    async addComment(dto: CreateCommentDto, id: Types.ObjectId): Promise<Comment>{
        const comment = await this.commentModel.create({...dto, track: id})
        const track = await this.trackModel.findById(id);
        track.comments.push(comment);
        await track.save();

        return comment;
    }


    async listen(id: Types.ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save();
    }
}
