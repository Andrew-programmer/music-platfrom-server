import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./files/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';


@Module({
    imports: [
        TrackModule,
        MongooseModule.forRoot('mongodb+srv://hacker:1052@cluster0.mgebbs4.mongodb.net/?retryWrites=true&w=majority'),
        FileModule,
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        })
    ]
})

export class AppModule{}
