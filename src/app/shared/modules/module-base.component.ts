import {Component, Input, OnInit, Output, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {NavigationService} from '../services/navigation.service';
import {EventEmitter} from 'events';
import {DataService} from '../services/data.service';
import { environment } from '../../../environments/environment';
import {AuthService} from '../../core/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, Route } from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-module-base',
  templateUrl: './module-base.component.html',
  styleUrls: ['./module-base.component.scss'],
  animations: [
    trigger('slide', [
        state('in', style({ opacity:1,transform: 'translateX(0)' })),
          transition('void => *', [
            style({ opacity:0,transform: 'translateX(100%)' }),
            animate(200)
          ]),
          transition('* => void', [
            animate(200, style({ opacity:0,transform: 'translateX(100%)' }))
          ])
      ]
    )
  ]
})
export class ModuleBaseComponent implements OnInit {
  @Input() allowSave: any = true;
  @Input() pageTitle: string = '';
  @Input() instructions: string = '';
  @Input() isSaving: any = false;
  @Input() allowAdditionalInformation: any = true;
  @Input() ncms_id: any = true;
  @Input() fetchType: string;
  @Input() module: string;
  @Input() status: string;
  @Output() save = new EventEmitter();
  @Input() bVisibleChild = false;
  @Input() collapseBtnIcon = 'arrow-chevron-down';
  @Input() bVisibleCollapseBtn = false;
  @Input() alertMessage: any = { class: "alert-danger"};
  bSidebarVisible = false;
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('kendoUpload') kendoUpload: ElementRef;
  public uploadSaveUrl: any = environment.BASE_URL + '/File';
  public uploadRemoveUrl: any;
  public uploadedFiles: any;
  helpContent: any = ""
  constructor(
    private routes: Router, 
    private navigationService: NavigationService, 
    private dataService: DataService, 
    private renderer: Renderer2, 
    private el: ElementRef, 
    private authService: AuthService,
    private sanitizer: DomSanitizer) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const targetHtml = e.target;
      if ( 
          this.bSidebarVisible && 
          !this.sidebar.nativeElement.contains(e.target) && 
          (e.target as HTMLInputElement).id != 'img-question-mark') {
        this.bSidebarVisible = false;
      }
    });
  }

  async ngOnInit() {
    let fetchType = '';
    if (this.module != undefined) {
      this.module.split('-').forEach( name => {
        fetchType += name.slice(0, 3).toUpperCase() + '_';
      });
      fetchType += 'ADD_FILE';
      this.fetchType = fetchType;
      this.fetchUploadedFiles();
    }
    this.bSidebarVisible = false;
    let module = this.module.toUpperCase().split('-').join('_')
    const content = await this.dataService.getHelpContentByModule( { module_id: module } )
    if( content[0] )
    {
      if( content[0].helpContentVersions )
      {
        if( content[0].helpContentVersions.length > 0 )
        {
          this.helpContent = this.sanitizer.bypassSecurityTrustHtml(content[0].helpContentVersions[0].content);
        }
      }
    }
  }

  public onCollapse() {
    this.bVisibleChild = !this.bVisibleChild;
    this.collapseBtnIcon = this.bVisibleChild ? 'arrow-chevron-up' : 'arrow-chevron-down';
  }
  public fetchUploadedFiles() {
    const res = this.dataService.getFiles(this.fetchType).then(res => {
      const results = res['results'];
      const data = [];
      results.forEach((file, key) => {
        data.push({
          name: file.path.split('_')[1],
          id: file.id
        });
      });
      this.uploadedFiles = data;
    });
  }

  public completeEventHandler() {
    this.fetchUploadedFiles();
  }

  public onFileUpload(e) {
    const name = e.files[0].name;
    e.data = { type: this.fetchType, ncms_id: '23', name: name};
  }

  public async onDelete(id) {}

  public isAuditor() {
    return this.authService.isAuditor();
  }

  public toggleHelpPanel() {
    this.bSidebarVisible = !this.bSidebarVisible;
  }

  public moveNext()
  {
    const url = this.routes.url.slice( 1, this.routes.url.length )
    const nextRouteIdx = this.routes.config.findIndex( route => route.path == url ) + 1
    const nextRoute = this.routes.config[ nextRouteIdx ]
    this.routes.navigate( [ nextRoute.path ] )
  }
}
