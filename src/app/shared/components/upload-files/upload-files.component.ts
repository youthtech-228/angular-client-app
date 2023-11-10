import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../../core/auth.service';
import {RemoveEvent, SuccessEvent} from '@progress/kendo-angular-upload';
import {DeleteFile} from '../../models/dtos';
import {pullAllBy} from 'lodash-es';

@Component({
   selector: 'app-upload-files',
   templateUrl: './upload-files.component.html',
   styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
   @Input() fetchType: string;
   @Input() autoUpload = false;

   @ViewChild('kendoUpload') kendoUpload: ElementRef;

   public uploadedFiles: any;
   public uploadSaveUrl: any;
   public uploadRemoveUrl: any;

   constructor(private dataService: DataService, @Inject('BASE_URL') private baseUrl: string, private authService: AuthService) {
      this.uploadSaveUrl = this.baseUrl + '/File';
      this.uploadRemoveUrl = this.baseUrl + `json/reply/DeleteFile`;
   }

   ngOnInit(): void {
      this.fetchUploadedFiles();
   }

   public onFileUpload(e) {
      const name = e.files[0].name;
      e.data = {type: this.fetchType, ncms_id: this.authService.getNcmsId(), name: name, size: e.files[0].size};
   }

   public fetchUploadedFiles() {
      this.dataService.getFiles(this.fetchType).then(({results}) => {
         const data = [];

         results.forEach((file) => {
            const name = file.filename;
            data.push({
               name,
               size: file.size,
               id: file.id,
            });
         });
         this.uploadedFiles = data;
      });
   }

   public onFileRemove(e: RemoveEvent) {
      // @ts-ignore
      const id = e.files[0].id;

      if (id) {
         e.data = {id};
      }
   }

   public successEventHandler(event: SuccessEvent) {
      if (event.operation === 'upload') {
         this.uploadedFiles.push(event.response.body);
      } else if (event.operation === 'remove') {
         pullAllBy(this.uploadedFiles, event.files, 'id');
      }
   }

   public onFileClear() {
      for (const uploadedFile of this.uploadedFiles) {
         if (uploadedFile.id) {
            // @ts-ignore
            this.dataService.getClient().delete(new DeleteFile({id: +uploadedFile.id}));
         }
      }
   }
}
