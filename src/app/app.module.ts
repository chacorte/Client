import { NgModule } from "@angular/core";
import { Storage } from "@ionic/storage";
import { IonicApp, IonicModule } from "ionic-angular";
import { CustomIconsModule } from "ionic2-custom-icons";

import { MyApp } from "./app.component";

import { CustomPage } from "../pages/custom/custom";
import { SpecDialog } from "../pages/custom/spec_dialog";
import { HelpPage } from "../pages/help/help";
import { HomePage } from "../pages/home/home";
import { TermsPage } from "../pages/terms/terms";

import { GistComponent } from "../components/gist/gist";

import { BootSettings } from "../providers/config/boot_settings";
import { Configuration } from "../providers/config/configuration";
import { Preferences } from "../providers/config/preferences";
import { S3File, S3Image } from "../providers/aws/s3file";
import { Cognito } from "../providers/aws/cognito";
import { Dynamo } from "../providers/aws/dynamo/dynamo";
import { FBConnect } from "../providers/facebook/fb_connect";
import { FBJSSDK } from "../providers/facebook/fb_jssdk";
import { Lineup } from "../providers/model/lineup";

@NgModule({
    declarations: [
        MyApp,
        GistComponent,
        CustomPage,
        SpecDialog,
        HelpPage,
        HomePage,
        TermsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        CustomIconsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        GistComponent,
        CustomPage,
        SpecDialog,
        HelpPage,
        HomePage,
        TermsPage
    ],
    providers: [
        Storage,
        BootSettings,
        Configuration,
        Preferences,
        S3File,
        S3Image,
        Cognito,
        Dynamo,
        FBConnect,
        FBJSSDK,
        Lineup
    ]
})
export class AppModule {}