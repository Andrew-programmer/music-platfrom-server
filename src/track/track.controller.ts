import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
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
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.trackService.getAll(count, offset);
    }

    // @Get()
    // search(@){
    //
    // }

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

    @Post('listen/:id')
    listen(@Param('id') id: Types.ObjectId) {
        return this.trackService.listen(id);
    }

}
