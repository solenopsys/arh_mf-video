import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {RouterModule, Routes} from '@angular/router';
import {BootstrapComponent, FuiTemplatesModule, TABLE_PAGE} from "@solenopsys/uimatrix-templates";
import {TABLES} from "./tables.config";
import {CamerasListComponent} from "./cameras-list/cameras-list.component";
import {FormsModule} from "@angular/forms";
import {createNgxs} from "@solenopsys/lib-storage";
import {NgxsModule} from "@ngxs/store";
import {FuiGridModule} from "@solenopsys/uimatrix-lists";
import {CommonModule} from "@angular/common";
import {VideoStreamComponent} from "@solenopsys/uimatrix-controls";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor-v2";
import {environment} from "../environments/environment";
import { UtilsModule } from "@solenopsys/uimatrix-utils";
import { VideoModule } from "./video.module";


export const PROVIDERS_CONF = [
  {provide: 'tables', useValue: TABLES},
  {provide: 'assets_dir', useValue: "/fm/modules/richteri/video"},
  {provide: 'mod_name', useValue: "video"}
]


export function onMonacoLoad() {

  console.log('MONACO OK', (window as any).monaco);
  (window as any).monaco.languages.typescript.typescriptDefaults.addExtraLib('export function drawPins() {\n' +
    '    console.log(\'OK\');\n' +
    '}\n');
}

const routes: Routes = [
  {
    path: 'video', component: CamerasListComponent, children: [
      {path: ':camera', component: VideoStreamComponent}
    ]
  },
  TABLE_PAGE(':table'),
  {path: 'video', redirectTo: 'video/video',pathMatch:'full'},
];



const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: {scrollBeyondLastLine: false},
  onMonacoLoad
};

export const IMPORTS_CONF = [
  BrowserModule,
  RouterModule.forRoot(routes),
  FormsModule,
  FuiTemplatesModule,
  ...createNgxs(!environment.production),
  MonacoEditorModule.forRoot(monacoConfig),
  FuiGridModule,
  VideoModule,
  CommonModule,
  UtilsModule
]


@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [...PROVIDERS_CONF],
  bootstrap: [BootstrapComponent],
})
export class AppModule {}
