import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/createTrack.dto";
import {Types} from "mongoose";
import {CreateCommentDto} from "./dto/createComment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('/track')
export class TrackController{
    constructor(private trackService: TrackService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1}
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const {picture, audio} = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }

    @Get()
    getAll() {
        return this.trackService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: Types.ObjectId) {
        return this.trackService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: Types.ObjectId) {
        return this.trackService.delete(id);
    }

    @Post('comment/:id')
    addComment(@Body() dto: CreateCommentDto, @Param('id') id: Types.ObjectId){
        return this.trackService.addComment(dto, id);
    }

}
